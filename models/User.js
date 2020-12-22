const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    // email типа строка, обязательное и чтобы было уникальное - unique: true
    email: {type: String, required: true, unique: true},
    // password - строка,обязательное и так как пароль может быть одинаковым для РАЗНЫХ пользоваьлей мы не указываем unique: true
    password: {type: String, required: true},
    // у каждого пользователя будет свой массив[] ссылок. Тип будет айди который определён в mongoDB. ref - к какой колекции мы привязываемся
    // 'Link' модель которую создам
    links: [{type: Types.ObjectId, ref: 'Link'}]
})

module.exports = model('User', schema)