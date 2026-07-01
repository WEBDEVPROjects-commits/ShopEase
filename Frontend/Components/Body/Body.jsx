import { useContext, useState } from "react";
import { homeContext } from "../Context/context";
import { useNavigate } from "react-router-dom";

function Body() {
  const {
    products,
    loading,
    setLoading,
    CartItems,
    setCartItems,
    currentSearch,
    setCurrentSearch,
  } = useContext(homeContext);
  const navigate = useNavigate();
  console.log(CartItems);
  return (
    <>
      {/* loading bar  */}
      {loading && (
        <div className="h-screen flex items-center justify-center bg-zinc-50">
          <div className="flex flex-col items-center gap-4">
            {/* Spinner */}
            <div className="w-16 h-16 border-4 border-zinc-300 border-t-green-500 rounded-full animate-spin"></div>

            {/* Loading Text */}
            <p className="text-zinc-600 text-lg font-medium">
              Loading products...
            </p>
          </div>
        </div>
      )}
      <div className="bg-zinc-100 min-h-screen p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => {

          const AddToCart = async () => {
            try {
              const resp = await fetch(
                `http://localhost:3000/api/addCartProduct`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(product),
                },
              );
              const data = await resp.json();
              setCartItems((prev) => [...prev, data.addedProduct]);
            } catch (err) {
              console.log("Error in adding items to cart", +err);
            }
          };
          const UpdateInCart=async () => {
                      const resp=await fetch("http://localhost:3000/api/UpdateCartProduct",{
                        method:"PATCH",
                        headers:{
                          "Content-Type":"application/json",
                        },
                        body:JSON.stringify({
                         _id:product._id 
                        })
                      })
                      const data=await resp.json();

                      setCartItems((prev) => {
                         return prev.map((element) => {
                           return ( product._id===data.UpdatedProducts._id? {...element,quantity:data.UpdatedProducts.quantity,total:data.UpdatedProducts.total}: element); 
                          })
                      })
            }

          return (
            <div
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-zinc-200 flex flex-col"
              key={product._id}
              onClick={(e) => {
                navigate(`/Product/${product._id}`);
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
                    e.stopPropagation();
                   
                    const exists=CartItems.some((element) => element._id===product._id )
                    console.log(exists);
                    exists?UpdateInCart():AddToCart();
                    
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
