import mongoose from 'mongoose'

export default () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, err => {
        err ? console.error('Database connection ❌', err) : console.log('Database connection ✔️')
    })
}
