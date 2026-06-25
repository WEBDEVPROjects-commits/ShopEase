const express=require('express');
const router=express.Router();
const {getCartProduct,addCartProduct}=require("../Controllers/CartProductController.js")

router.get("/getCartProduct",getCartProduct)
router.post("/addCartProduct/:id",addCartProduct)


module.exports=router