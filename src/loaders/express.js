import express from 'express'
import cors from 'cors'
import routes from '../router.js'
import helmet from 'helmet'

export default (app) => {

    // Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
    app.use(helmet())

    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors())

    // Middleware that transforms the raw string of req.body into json
    app.use(express.json({ limit: '5mb' }))

    // Middleware that transforms the query string into json
    app.use(express.urlencoded({ limit: '5mb', extended: true }))

    // Load API routes
    app.use(routes())

    // For testing backend is working or not
    app.get('/test', (req, res) => {
        res.send('Job Registration backend connected successfully')
    })

}
