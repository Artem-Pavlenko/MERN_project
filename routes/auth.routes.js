const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Minimum password length is 6 characters')
            .isLength({min: 6})
    ],
    async (req, res) => {
        try {

            // check будет проверять входящие данные и результат будет в validationResult.
            const errors = validationResult(req)
            // проверка на наличие ошибок
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect registration data'
                })
            }
            const {email, password} = req.body
            // логика регистрации (если уже есть такой пользователь то должны выдать ошибку и не регистрировать пользователя)
            // проходим по модели пользователя findOne({email}) по email и если такой пользователь уже есть выдаём ошибку
            const candidate = await User.findOne({email: email})
            if (candidate) {
                return res.status(400).json({message: 'This user already exists'})
            }
            // шифруем пароль (против взлома) с помощью библиотеки bcrypt. 12 - позволяет ещё больше зашифровать пароль
            const hashedPassword = await bcrypt.hash(password, 12)
            // после шифрования создаем нового пользователя
            const user = new User({email, password: hashedPassword})
            // далие ждём пока полльзователь сохранится
            await user.save()
            // и далие отвечаем фронту
            res.status(201).json({message: 'User was created'})

        } catch (e) {
            res.status(500).json({message: 'Something\'s wrong... Try again'})
        }
    })

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Enter correct email').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req, res) => {
        try {
            // check будет проверять входящие данные и результат будет в validationResult.
            const errors = validationResult(req)
            // проверка на наличие ошибок
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect login data'
                })
            }

            const {email, password} = req.body
            // ищем пользователя по почте так как происходит логинизация
            const user = await User.findOne({email})
            if(!user) {
                return res.status(400).json({ message: 'User is not found'})
            }
            // проверяем на освпадения пароля
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({message: 'Incorrect password, try again'})
            }

            // регистрация будет происходит через jwd token
            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.json({ token, userId: user.id})

        } catch (e) {
            res.status(500).json({message: 'Something\'s wrong... Try again'})
        }

    })

module.exports = router