import mongoose from 'mongoose'

const WishlistSchema = new mongoose.Schema({
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
    created: {
        type: Date,
        default: Date.now,
    },
})

WishlistSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        // eslint-disable-next-line
        ret.id = ret._id
        // eslint-disable-next-line
        delete ret._id
    },
})

const wishlist =
    mongoose.models.wishlist || mongoose.model('wishlist', WishlistSchema)
export default wishlist
