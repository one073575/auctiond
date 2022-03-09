const mongoose = require('mongoose')

const BidSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    startPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    bid: {
        type: Number,
        required: true,
        default: 0.0,
    },
    updated: {
        type: Date,
        default: Date.now,
    },
    created: {
        type: Date,
        default: Date.now,
    },
})

BidSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        // eslint-disable-next-line
        ret.id = ret._id
        // eslint-disable-next-line
        delete ret._id
    },
})

const bid = mongoose.models.bid || mongoose.model('bid', BidSchema)
export default bid
