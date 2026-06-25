const mongoose=require('mongoose');
const ProductModel = require('../Models/ProductModel.js');


const Products=async (req,res) => {
    const products=req.body
    const x=await ProductModel.insertMany(products)
    res.json({
        success:true
    })
}
const getProducts=async (req,res) => {
    const products=await ProductModel.find({})
    res.json({
        success:true,
        products:products
    })
}


module.exports={Products,getProducts}