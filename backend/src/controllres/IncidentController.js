const connection = require('../database/connection')

module.exports = {
    async index(request, response){
        const {page = 1} = request.query

        const [count] = await connection('incidents').count() //contar casos totais
        console.log(count)

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5) // limite de caso por pagina
        .offset((page -1)*5) //paginação
        .select([
        'incidents.*', 
        'ongs.name', 
        'ongs.email', 
        'ongs.whatsapp',
        'ongs.city', 
        'ongs.uf'
        ])
        // ('*') -> selecionar todo os dados

        response.header('X-Total-Count', count['count(*)'])

        return response.json(incidents)
    },

    async create(request, response) {
        const {title, description, value} = request.body
        request.headers
        const ong_id = request.headers.authorization

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        })

        return response.json({ id })
    },

    async delete(request, response) {
        const {id} = request.params
        const ong_id = request.headers.authorization

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first()

        if (incident.ong_id != ong_id){
            return response.status(401).json({error: 'Operation not permitted.'})
        }

        await connection('incidents').where('id',id).delete()

        return response.status(204).send()
    }
}