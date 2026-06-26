import { use, useEffect, useState } from "react";
import "./App.css";
import HomePage from "../Components/HomePage/homePage";
import { homeContext } from "../Components/Context/context";
import { Route, Routes } from "react-router-dom";
import AddToCart from "../Components/Body/AddToCart";
import Checkout from "../Components/Body/Checkout";
import MyOrders from "../Components/Body/MyOrders";
import ProductDetail from "../Components/Body/ProductDetail"
import SearchedProductss from "../Components/Body/SearchedProducts";

function App() {
  const [products, setProducts] = useState([]);
  // console.log(products)
  const [loading, setLoading] = useState(true);
  const [CartItems,setCartItems]=useState([]);
  const [currentSearch,setCurrentSearch]=useState("");
  const [OrderedItems,setOrderedItems]=useState(JSON.parse(localStorage.getItem("OrderedItems"))||[]);
  const [completedOrder,setCompletedOrder]=useState(false);
  const [OrderDropId,setOrderDropId]=useState([]);
  const [SearchedProducts,setSearchedProducts]=useState(JSON.parse(localStorage.getItem("SearchedProducts"))||[]);
  const [SearchBy, setSearchBy] = useState("title");
 
  useEffect(() => {
    localStorage.setItem("OrderedItems",JSON.stringify(OrderedItems))
    localStorage.setItem("SearchedProducts",JSON.stringify(SearchedProducts))

  }, [products,CartItems,OrderedItems,SearchedProducts]);

  async function fetchProducts() {
    const response = await fetch("http://localhost:3000/api/Products");
    const data = await response.json();
    console.log(data)
    setProducts(data.products);
    setLoading(false);
  }
  async function CartProducts(){
    const response=await fetch("http://localhost:3000/api/getCartProducts")
    const data=await response.json();
    setCartItems(data.CartProducts)
  }
  useEffect(() => {
    try {
      fetchProducts();
      CartProducts();
      
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <>
      <div className="h-screen">
        <homeContext.Provider
          value={{ products,setProducts,loading, setLoading,CartItems,setCartItems,currentSearch,setCurrentSearch,OrderedItems,setOrderedItems,completedOrder,setCompletedOrder,OrderDropId,setOrderDropId,SearchedProducts,setSearchedProducts,SearchBy, setSearchBy}}
        >
          <Routes>
              <Route path="/" element={<HomePage/>}></Route>
              <Route path="/AddToCart" element={<AddToCart/>}></Route>
              <Route path="/Checkout" element={<Checkout/>}></Route>
              <Route path="/MyOrders" element={<MyOrders/>}></Route>
              <Route path="/Product/:id" element={<ProductDetail/>}></Route>
              <Route path="/SearchedProducts" element={<SearchedProductss/>}></Route>
              
          </Routes>
         
        </homeContext.Provider>
      </div>
    </>
  );
}

export default App;
