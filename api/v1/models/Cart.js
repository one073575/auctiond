import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: '',
        required: true,
    },
    productId: {
        type: String,
        default: '',
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },
})

CartSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        // eslint-disable-next-line
        ret.id = ret._id
        // eslint-disable-next-line
        delete ret._id
    },
})

const cart = mongoose.models.cart || mongoose.model('cart', CartSchema)
export default cart
