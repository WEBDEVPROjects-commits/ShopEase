import { useContext } from "react";
import { homeContext } from "../Context/context";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import {
  FiHome,
  FiInfo,
  FiPhone,
  FiSearch,
  FiShoppingCart,
  FiPackage,
} from "react-icons/fi";

function Header() {
  const [OnFocus, setOnFocus] = useState(false);

  const {
    products,
    setProducts,
    CartItems,
    setCartItems,
    currentSearch,
    setCurrentSearch,
    SearchedProducts,
    setSearchedProducts,
    FilteredProducts,
    setFilteredProducts,
    SearchBy,
    setSearchBy,
  } = useContext(homeContext);
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-between px-8 h-16 bg-white shadow-md border-b border-zinc-200">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <FiShoppingCart className="text-3xl text-green-500" />
          <h1 className="text-2xl font-bold text-green-600">ShopEase</h1>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-6 font-medium text-gray-700">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-green-100 hover:text-green-600 transition-all"
            onClick={(e) => {
              navigate("/");
            }}
          >
            <FiHome />
            <span>Home</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-green-100 hover:text-green-600 transition-all">
            <FiInfo />
            <span>About</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-green-100 hover:text-green-600 transition-all">
            <FiPhone />
            <span>Contact</span>
          </div>
        </div>

        {/* Search */}
        <div className="flex relative items-center bg-zinc-100 rounded-full px-3 py-2 w-95 shadow-sm gap-2">
          <select
            className="bg-white border border-zinc-200 rounded-full px-3 py-1 text-sm outline-none cursor-pointer hover:border-green-400"
            value={SearchBy}
            onChange={(e) => {
              setSearchBy(e.target.value);
            }}
          >
            <option value="title">Title</option>
            <option value="category">Category</option>
          </select>

          <FiSearch
            className="text-lg text-gray-500 cursor-pointer hover:text-green-600"
            onClick={(e) => {
              navigate("/SearchedProducts");
              setFilteredProducts(SearchedProducts);
            }}
          />

          <input
            type="search"
            placeholder="Search your favourite products..."
            className="bg-transparent outline-none ml-3 w-full text-sm"
            value={currentSearch}
            onFocus={(e) => {
              setOnFocus(true);
            }}
            onBlur={(e) => {
              setOnFocus(false);
            }}
            onChange={(e) => {
              setCurrentSearch(e.target.value);
              setSearchedProducts(
                products.filter((product) =>
                  product[SearchBy].toLowerCase().includes(
                    e.target.value.toLowerCase().trim(),
                  ),
                ),
              );
            }}
          />
          <div className="absolute top-full left-0 mt-2 w-full bg-white border border-zinc-200 rounded-xl shadow-lg max-h-60 overflow-y-auto z-50">
            {OnFocus &&
              SearchedProducts.map((product) => {
                // console.log(product);
                return (
                  <div
                    className="px-4 py-3 hover:bg-zinc-100 cursor-pointer transition border-b border-zinc-100"
                    key={product.id}
                  >
                    <p className="font-medium text-zinc-800">{product.title}</p>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          {/* Orders */}
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-green-100 hover:text-green-600 transition-all"
            onClick={(e) => {
              navigate("/MyOrders");
            }}
          >
            <FiPackage />
            <span className="font-medium">All Orders</span>
          </div>

          {/* Cart */}
          <Link
            to="/AddToCart"
            className="relative flex items-center justify-center"
          >
            <FiShoppingCart className="text-3xl text-gray-700 hover:text-green-600 transition-all" />

            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {CartItems.length}
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
export default Header;
