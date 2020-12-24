const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    // в моделе Link будет обязательное(required: true) параметр from, типа строка
    from: {type: String, required: true},
    to: {type: String, required: true, uniqueL: true},
    code: {type: String, required: true, uniqueL: true},
    date: {type: Date, default: Date.now},
    clicks: {type: Number, default: 0},
    owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Link', schema)