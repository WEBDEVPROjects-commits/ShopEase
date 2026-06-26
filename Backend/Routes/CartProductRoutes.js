const express=require('express');
const router=express.Router();
const {getCartProducts,addCartProduct,UpdateCartProduct}=require("../Controllers/CartProductController.js")

router.get("/getCartProducts",getCartProducts)
router.post("/addCartProduct",addCartProduct)
router.patch("/UpdateCartProduct",UpdateCartProduct)

module.exports=router