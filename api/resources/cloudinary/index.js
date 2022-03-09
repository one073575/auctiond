const cloudinary = require('cloudinary').v2
const config = require('config')

const cloud = config.get('cloudinary')

cloudinary.config({
    cloud_name: cloud.name,
    api_key: cloud.api,
    api_secret: cloud.secret,
})

module.exports = cloudinary
