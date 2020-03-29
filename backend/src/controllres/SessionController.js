const connection =require('../database/connection')

module.exports = {
    async create(request, response) {
        const { id } = request.body

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first() // retorna o primeiro elemento e nao um array

        if (!ong) {
            return response.status(400).json({
                error: 'No ONG found with this id'
            })
        }

        return response.json(ong)

    }
}