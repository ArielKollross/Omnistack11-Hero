const app = require('./app')

const ip = '192.168.15.23'
const port = 3333

//ligar o servidor e realizar acesso na porta 3000
app.listen(port, ip , () => {
    console.log(`Servidor rodando em http://${ip}:${port}`)
    console.log('Para finalizar o servidor: ctrl + C')
})