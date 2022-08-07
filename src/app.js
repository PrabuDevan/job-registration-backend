import express from 'express'
import 'dotenv/config.js'
import startLoaders from './loaders/index.js'
import constant from './constant.js'

const app = express()

app.listen(constant.PORT, () => {
    console.log(`Server listening on port: ${constant.PORT} 💪 `)
})

startLoaders(app)
