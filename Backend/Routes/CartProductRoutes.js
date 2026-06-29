const express=require('express');
const router=express.Router();
const {getCartProducts,addCartProduct,UpdateCartProduct, decreaseQuantity,DeleteCartProduct}=require("../Controllers/CartProductController.js")

router.get("/getCartProducts",getCartProducts)
router.post("/addCartProduct",addCartProduct)
router.patch("/UpdateCartProduct",UpdateCartProduct)
router.patch("/decreaseProductQuantity",decreaseQuantity)
router.delete("/deleteCartProduct",DeleteCartProduct)

module.exports=router