const mongoose = require('mongoose');

const CartProductSchema = mongoose.Schema(
    {
        title: {
            type: String,
        },
        price: {
            type: Number,
        },
        description: {
            type: String,
        },
        category: {
            type: String,
        },
        image: {
            type: String
        },
        rating: {
            rate: {
                type: Number
            },
            count: {
                type: Number
            }
        },
        quantity:{
            type:Number,
            default:1,
            min:1,
            max:9
        },
        total:{
            type:Number
        }
    }
)

module.exports = mongoose.model("CartProduct", CartProductSchema)