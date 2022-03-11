import mongoose from 'mongoose'

const NotificationSchema = new mongoose.Schema({
    from: {
        type: String,
        default: 'bot',
        required: true,
    },

    to: {
        type: String,
        default: '',
        required: true,
    },

    message: {
        type: String,
        default: '',
    },

    isRead: {
        type: Boolean,
        default: false,
    },

    created: {
        type: Date,
        default: Date.now,
    },
})

NotificationSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        // eslint-disable-next-line
        ret.id = ret._id
        // eslint-disable-next-line
        delete ret._id
    },
})

const notification =
    mongoose.models.notification ||
    mongoose.model('notification', NotificationSchema)
export default notification
