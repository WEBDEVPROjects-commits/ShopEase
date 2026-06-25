const express=require('express')
const router=express.Router();
const {Products,getProducts}=require('../Controllers/ProductController.js')

router.post("/Products",Products)
router.get("/Products",getProducts)


module.exports=router