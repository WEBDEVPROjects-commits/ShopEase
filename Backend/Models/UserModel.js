const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/ShopEase")

const userSchema=mongoose.Schema({
    Name:{
        type:String
    },
    Email:{
        type:String
    },
    Phone: {
        type:Number
    },
    Password:{
        type:String
    },
    OrderedProducts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products'
    }],
    CartProducts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products'
    }]

})

module.exports=mongoose.model("user",userSchema)


