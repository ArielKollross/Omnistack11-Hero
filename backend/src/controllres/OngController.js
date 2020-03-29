const generateUniqueId = require('../utils/generateUniqueId')
// habilitar operações com o bd
const connection = require('../database/connection')

module.exports = {
    async index(resquest, response) {
         const ongs = await connection('ongs').select('*')
        
        return response.json(ongs)
    },

    async create(request, response) {
        const {name, email, whatsapp, city, uf} = request.body

        const id = generateUniqueId()

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
    })

    console.log(name, email, whatsapp, city, uf)
    
    return response.json({id})
    }
}