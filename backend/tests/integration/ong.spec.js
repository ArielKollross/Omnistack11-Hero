const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () =>{
    beforeEach( async ()=> {
        await connection.migrate.rollback() //zerando o banco de dados
        await connection.migrate.latest()
    })

    afterAll( async () => {
        await connection.destroy()
    })

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
          //  .set('Authorization', 'xxxxx')
            .send({
                name: "IronMan",
                email: "email@emai.com",
                whatsapp: "41999999999",
                city: "CTBA",
                uf: "PR"
            })

        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8)
    })
})