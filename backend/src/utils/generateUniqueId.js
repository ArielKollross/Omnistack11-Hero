const crypto = require('crypto') // pode gerar id aleatório

module.exports =  function generateUniqueId() {
    return crypto.randomBytes(4).toString('HEX')
}