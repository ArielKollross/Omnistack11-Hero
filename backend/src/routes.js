const express = require('express')
const {Joi, celebrate, Segments} = require('celebrate') // validações 

const OngController = require('./controllres/OngController')
const incidentController = require('./controllres/IncidentController')
const ProfileController = require('./controllres/ProfileController')
const SessionController = require('./controllres/SessionController')

const routes = express.Router()

//criando rota para listar ongs
// routes.get('/ongs', async (resquest, response)=> {
//     const ongs = await connection('ongs').select('*')

//     return response.json(ongs)
// })

/*
TIPOS DE PARAMETROS
=================================
Query Params: parametros que enviamos na nossa URL, apos o simbulo ?,
servem para filtros, paginações

Route Params: parametros utilizados para identificar recursos. Como por exemplo Ids

Request body: Corpo da requesição, utilizado para criar ou alterar 
*/

//routes.post('/ongs', async (request, response) =>{
    // const params = request.query //app.get('/users', 
    // const id = request.params //app.get('/users/:id', ...
    // const body = request.body //app.post('/users',
    // console.log(body)

    // return response.json({
    //     evento: 'Semana OmniStack 11',
    //     Aluno: 'Ariel Kollross'
    // })

    // const {name, email, whatsapp, city, uf} = request.body

    // const id = crypto.randomBytes(4).toString('HEX')

    // await connection('ongs').insert({
    //     id,
    //     name,
    //     email,
    //     whatsapp,
    //     city,
    //     uf,
    // })

    // console.log(name, email, whatsapp, city, uf)
    
    // return response.json({id})
//})
routes.get('/ongs', OngController.index) //listagem

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().length(2),
    })
}) ,OngController.create) // criação de usuário


routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}) ,incidentController.index)


routes.post('/incidents', incidentController.create)

routes.delete('/incidents/:id',celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}) ,incidentController.delete)

routes.get('/profile',celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown()
}) ,ProfileController.index)

routes.post('/session', SessionController.create)

module.exports = routes