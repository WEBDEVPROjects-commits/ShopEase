const express=require('express');
const userRoutes=require('./Routes/userRoutes.js')
const ProductRoutes=require("./Routes/ProductRoutes.js")
const ProductModel=require("./Models/ProductModel.js")
const CartProductRoutes=require("./Routes/CartProductRoutes.js")
const app=express();
const cors=require('cors');
const PORT=3000

app.use(cors({
    origin: "http://localhost:5173",
  }));
app.use(express.json());

app.use("/api/User",userRoutes)
app.use("/api",ProductRoutes)
app.use("/api",CartProductRoutes)

app.listen(PORT,()=>{
    console.log("Server running on port " + PORT)
})