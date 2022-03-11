import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },

    number: {
        type: String,
        default: '+2547xxxxxxxx',
    },

    active: {
        type: Boolean,
        default: true,
    },

    updated: {
        type: Date,
        default: new Date().toLocaleString(),
    },

    created: {
        type: Date,
        default: new Date().toLocaleString(),
    },
})

UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        // eslint-disable-next-line
        ret.id = ret._id
        // eslint-disable-next-line
        delete ret._id
    },
})

UserSchema.index({
    name: 'text',
    email: 'text',
})

const user = mongoose.models.user || mongoose.model('user', UserSchema)
export default user
