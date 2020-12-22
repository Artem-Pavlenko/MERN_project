const {Schema, model} = require('mongoose')

const schema = new Schema({
    // email типа строка, обязательное и чтобы было уникальное - unique: true
    email: {type: String, required: true, unique: true},
    // password - строка,обязательное и так как пароль может быть одинаковым для РАЗНЫХ пользоваьлей мы не указываем unique: true
    password: {type: String, required: true}
})

module.exports = model('User', schema)