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
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("data")) || [],
  );
  // console.log(products)
  const [loading, setLoading] = useState(true);
  const [CartItems,setCartItems]=useState(JSON.parse(localStorage.getItem("CartItems")) || []);
  const [currentSearch,setCurrentSearch]=useState("");
  const [OrderedItems,setOrderedItems]=useState(JSON.parse(localStorage.getItem("OrderedItems"))||[]);
  const [completedOrder,setCompletedOrder]=useState(false);
  const [OrderDropId,setOrderDropId]=useState([]);
  const [SearchedProducts,setSearchedProducts]=useState(JSON.parse(localStorage.getItem("SearchedProducts"))||[]);
  const [SearchBy, setSearchBy] = useState("title");
  const [FilteredProducts,setFilteredProducts]=useState(JSON.parse(localStorage.getItem("FilteredProducts"))||[])
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(products));
    localStorage.setItem("CartItems", JSON.stringify(CartItems));
    localStorage.setItem("OrderedItems",JSON.stringify(OrderedItems))
    localStorage.setItem("SearchedProducts",JSON.stringify(SearchedProducts))
    localStorage.setItem("FilteredProducts",JSON.stringify(FilteredProducts))
    console.log(products);
  }, [products,CartItems,OrderedItems,SearchedProducts,FilteredProducts]);

  useEffect(() => {
    try {
      async function fetchData() {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        // console.log(products)
        setLoading(false);
        setProducts(data);
      }
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <>
      <div className="h-screen">
        <homeContext.Provider
          value={{ products,setProducts,CartItems,setCartItems,currentSearch,setCurrentSearch,OrderedItems,setOrderedItems,completedOrder,setCompletedOrder,OrderDropId,setOrderDropId,SearchedProducts,setSearchedProducts,FilteredProducts,setFilteredProducts,SearchBy, setSearchBy}}
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
