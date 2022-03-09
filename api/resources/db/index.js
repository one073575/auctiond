import mongoose from 'mongoose'
import config from 'config'
import logger from '../../utils/logger'

export default async function connectDb(cb) {
    mongoose.connect(config.get('dbs.mongo.uri'), {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })

    const db = mongoose.connection

    db.on('error', (err) => {
        logger.error(err, 'Failed to connect to the db')
        process.exit(1)
    })

    db.once('open', () => {
        logger.info('Mongodb is up and running')
        cb()
    })
}
