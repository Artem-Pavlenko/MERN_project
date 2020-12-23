const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    // базовая проверка. В restAPI специальный метод который просто проверяет доступность сервера
    if (req.method === 'OPTIONS') {
        // если это просто проверка доступности сервера, то продожаем делать запрос
        return next()
    }
    // если это обычный запрос POST, GET ...
    try {
        // authorization - строка, которую будем передавать с фронта
        // (.split(' ') чтобы распарсить и по этогу это будеь массив [], в котором забераем первый эоемент[1])
        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            // 401 - нет авторизации
            return res.status(401).json({message: 'You are not authorized'})
        }
        // если token есть его нужно розкодировать с помощью библиотеки 'jsonwebtoken'.
        // вторым параметром указывает ключ который задавали при формировании токена
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({message: 'You are not authorized'})
    }
}