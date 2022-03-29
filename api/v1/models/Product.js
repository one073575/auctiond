import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    // main attributes
    name: {
        type: String,
        required: true,
        unique: true,
    },

    slug: {
        type: String,
        required: true,
        unique: true,
    },

    description: {
        type: String,
        default: '',
        required: true,
    },

    userId: {
        type: String,
        required: true,
    },

    images: {
        type: [Object],
        default: [],
    },

    shipping: {
        type: Number,
        default: 0.0,
    },

    price: {
        type: Number,
        default: 0.0,
        required: true,
    },
    quantity: {
        type: Number,
        default: 0,
        required: true,
    },
    category: {
        type: String,
        default: '',
        required: true,
    },
    status: {
        type: String,
        default: 'new', // if set to active status = sale if set to bid status = bid if product is sold status is sold via bid or sale
    },
    condition: {
        type: String,
        default: 'new',
        required: true,
    },
    deal: {
        type: Boolean,
        default: false,
    },
    discount: {
        type: Number,
        default: 0,
    },
    featured: {
        type: Boolean,
        default: false,
    },

    bidEnd: {
        type: Date,
        default: null,
    },

    numberOfSold: {
        type: Number,
        default: 0,
    },

    amountSold: {
        type: Number,
        default: 0,
    },

    productFor: {
        type: String, // should be "sale" or "bid"
        default: 'sale',
    },

    active: {
        type: Boolean,
        default: false,
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

ProductSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        // eslint-disable-next-line
        ret.id = ret._id
        // eslint-disable-next-line
        delete ret._id
    },
})

ProductSchema.index({
    name: 'text',
    category: 'text',
})

const product =
    mongoose.models.product || mongoose.model('product', ProductSchema)
export default product
