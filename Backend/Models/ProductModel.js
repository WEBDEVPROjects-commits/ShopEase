const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/ShopEase")
const ProductSchema=mongoose.Schema({
    title:{
        type:String,
    },
    price: {
        type:Number,
    },
    description: {
        type:String,
    },
    category: {
        type:String,
    },
    image: {
        type:String
    },
    rating: {
      rate:{
        type:Number
      },
      count:{
        type:Number
      } 
    }

})


module.exports=mongoose.model("Product",ProductSchema)