import { useContext, useState } from "react";
import { homeContext } from "../Context/context";
import { useNavigate } from "react-router-dom";

function Body() {
  const { products, CartItems, setCartItems,currentSearch,setCurrentSearch } = useContext(homeContext);
  const navigate=useNavigate();
  return (
    <>
  <div className="bg-zinc-100 min-h-screen p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

    {products.map((product) => {
      return (
        <div
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-zinc-200 flex flex-col"
          key={product.id} onClick={(e) => {
              navigate(`/Product/${product.id}`)
          }}
        >

          {/* Product Image */}
          <div className="h-64 flex items-center justify-center bg-white p-6">
            <img
              src={product.image}
              alt={product.category}
              className="h-48 object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Product Info */}
          <div className="p-5 flex flex-col grow">

            <p className="text-xs text-zinc-500 uppercase tracking-wide">
              {product.category}
            </p>

            <h2 className="font-semibold text-zinc-800 mt-2 line-clamp-2 min-h-12">
              {product.title}
            </h2>

            <div className="mt-3">
              <span className="text-2xl font-bold text-green-600">
                ₹{product.price}
              </span>
            </div>

            <button
              className="mt-auto bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-medium transition-all duration-300"
              onClick={(e) => {
                setCartItems((prev) => {
                  const item = prev.find(
                    (item) => item.id === product.id
                  );

                  return item
                    ? prev.map((item) => {
                        if (item.id === product.id) {
                          return {
                            ...item,
                            quantity:
                              Number(item.quantity) + 1,
                          };
                        } else {
                          return item;
                        }
                      })
                    : [
                        ...prev,
                        {
                          ...product,
                          quantity: 1,
                        },
                      ];
                });
              }}
            >
              Add to Cart
            </button>

          </div>

        </div>
      );
    })}

  </div>
</>
  );
}
export default Body;
