const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))

const PORT = config.get('port') || 5000


async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            // эти параметры нужны чтобы наш connect успешно работал
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT} ...`))
    } catch (e) {
        console.log('Server error', e.message)
        // для того чтобы выйти из процесса node.js (завершим процесс в случае если пошло что-то нетак)
        process.exit(1)
    }
}


start()