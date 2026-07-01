const CartProductModel = require("../Models/CartProductModel.js");

const getCartProducts = async (req, res) => {
    const CartProducts = await CartProductModel.find();

    res.json({
        success: true,
        CartProducts: CartProducts
    })

}
const addCartProduct = async (req, res) => {
    const g = req.body

    try {
        console.log(req.body)
        const addedProduct = await CartProductModel.create({
            _id: req.body._id,
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            image: req.body.image,
            rating: {
                rate: req.body.rating.rate,
                count: req.body.rating.count
            },
            quantity: 1,
            total: req.body.price
        })
        res.status(200).json({
            addedProduct: addedProduct,
            success:true
        })
        console.log(addedProduct)

    } catch (err) {
        console.log("adding product to cart (server)" + err)
        
    }
}

const UpdateCartProduct = async (req, res) => {
    try {
        const product = await CartProductModel.findById({ _id: req.body._id })
        console.log(product)
        const updated = await CartProductModel.findByIdAndUpdate(req.body._id, {
            $set: {
                quantity: Number(product.quantity) + 1,
                total: ((Number((product.quantity + 1))) * (Number(product.price))).toFixed(2)
            }
        }, { new: true })
        res.json({
            success: true,
            UpdatedProducts: updated
        })
        console.log(updated)

    } catch (err) {
        console.log("Error while upating some section of cart :" + err)
    }
}

const decreaseQuantity = async (req, res) => {
    try {
        const product = await CartProductModel.findById({ _id: req.body._id })
        console.log(product)
        const updated = await CartProductModel.findByIdAndUpdate(req.body._id, {
            $set: {
                quantity: Number(product.quantity) - 1,
                total: ((Number((product.quantity - 1))) * (Number(product.price))).toFixed(2)
            }
        }, { new: true })
        res.json({
            success: true,
            UpdatedProducts: updated
        })
        console.log(updated)

    } catch (err) {
        console.log("Error while upating some section of cart :" + err)
    }
}


const DeleteCartProduct=async (req,res)=>{
    try{
            const deleted=await CartProductModel.findOneAndDelete({_id:req.body._id})
            console.log(deleted)
            res.json({
                deletedItem:deleted
            })
            
    }catch(err){
        console.log("Server Error while deleting product:"+err)
    }

}
module.exports = { getCartProducts, addCartProduct, UpdateCartProduct, decreaseQuantity, DeleteCartProduct}