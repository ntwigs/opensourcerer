import mongoose from 'mongoose'

const db = mongoose.connection

mongoose.Promise = global.Promise

mongoose.connect(process.env.DB_HOST)

db.on('error', err => {
    console.log(err, 'Mongo could not establish connection')
})

db.once('open', () => {
    console.log('Mongo established connection')
})

process.on('SIGINT', () => {
    console.log('Mongo connection has been terminated')
    process.exit(0)
})

export default db