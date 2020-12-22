const {Router} = require('express')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post('/register', async (req, res) => {
    try {

        const {email, password} = req.body

        // логика регистрации (если уже есть такой пользователь то должны выдать ошибку и не регистрировать пользователя)
        // проходим по модели пользователя findOne({email}) по email и если такой пользователь уже есть выдаём ошибку
        const candidate = await User.findOne({email: email})
        if (candidate) {
           return res.status(400).json({ message: 'This user already exists'})
        }

    } catch (e) {
        res.status(500).json({message: 'Something\'s wrong... Try again'})
    }
})

// /api/auth/login
router.post('/login', async (req, res) => {
    try {

    } catch (e) {

    }
})

module.exports = router