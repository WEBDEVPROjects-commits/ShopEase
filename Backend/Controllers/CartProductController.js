const CartProductModel = require("../Models/CartProductModel.js");

const getCartProducts = async (req, res) => {
    const CartProducts=await CartProductModel.find();

    res.json({
        success:true,
        CartProducts:CartProducts  
    })

}
const addCartProduct = async (req, res) => {

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
        res.json({
            addedProduct:addedProduct
        })
        console.log(addedProduct)

    } catch (err) {
        console.log("adding cart to product (server)" + err)
    }
}

const UpdateCartProduct=(req,res) => {

        try{
            const a=await CartProductModel.findByIdAndUpdate(req.body._id,{
                    $set:{
                        quantity:quantity
                    }

            })
        }catch(err){ 
            console.log("Error while upating some section of cart :"+err)
        }
}

module.exports = { getCartProducts, addCartProduct,UpdateCartProduct}