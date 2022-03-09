require('dotenv').config()

module.exports = {
    dbs: {
        mongo: {
            uri: process.env.MONGO_URI,
        },
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    port: 4000,
    cors: {
        enabled: true,
        origins: ['http://localhost:3000'],
    },
    cloudinary: {
        name: process.env.CLOUD_NAME,
        api: process.env.CLOUD_API,
        secret: process.env.CLOUD_SECRET,
        upload_preset: process.env.CLOUD_UPLOAD_PRESET,
    },
}
