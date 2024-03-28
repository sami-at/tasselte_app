const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: [true, "The product name is required"],
        unique: [true, "The product name should be unique"],
        minLength: [4, 'The product name must be at least 4 characters'],
        maxLength: [70, "The product name shouldn't exceed 30 characters"]
    },
    price: {
        type: Number,
        required: [true, "Please provide the product price"],

    },
    description: {
        type: String,
        required: [true, "Please provide the product description"],
        minLength: [10, "The Product description must be at least 10 characters long"],
        maxLength: [270, "The Product description must be at most 270 characters long"],
    },
    image: {
        id: {
            type: String,
            required: true,
        },
        src: {
            type: String,
            required: true,
        }
    },
    category: {
        type: String,
        trim: true,
        required: [true, "The product name is required"],
        unique: [true, "The product name should be unique"],
        minLength: [4, 'The product name must be at least 4 characters'],
        maxLength: [70, "The product name shouldn't exceed 30 characters"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Product', productSchema);
