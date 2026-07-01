import { homeContext } from "../Context/context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
function AddToCart() {
  const { products, CartItems, setCartItems } = useContext(homeContext);
  console.log(CartItems);

  return (
    <>
      <div>
        <Header />
        {CartItems.length !== 0 ? (
          CartItems.map((CartItem) => {
            const UpdateInCart = async () => {
              const resp = await fetch(
                "http://localhost:3000/api/UpdateCartProduct",
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    _id: CartItem._id,
                  }),
                },
              );
              const data = await resp.json();
              setCartItems((prev) => {
                return prev.filter((element) => {
                   return (CartItem._id === data.UpdatedProducts._id
                    ? {
                        ...element,
                        quantity: data.UpdatedProducts.quantity,
                        total: data.UpdatedProducts.total,
                      }
                    : element);
                });
              });
            };

            const decreaseProductQuantity = async () => {
              const resp = await fetch(
                "http://localhost:3000/api/decreaseProductQuantity",
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    _id: CartItem._id,
                  }),
                },
              );
              const data = await resp.json();
              setCartItems((prev) => {
                return prev.filter((element) => {
                  return (CartItem._id === data.UpdatedProducts._id
                    ? {
                        ...element,
                        quantity: data.UpdatedProducts.quantity,
                        total: data.UpdatedProducts.total,
                      }
                    : element);
                });
              });
            };
            const DeleteInCart = async () => {
              const resp = await fetch(
                "http://localhost:3000/api/DeleteCartProduct",
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    _id: CartItem._id,
                  }),
                },
              );
              const data=await resp.json();
              setCartItems((prev) => {
                return prev.filter((element) => element._id!==CartItem._id);
              });
            };
            return (
              <div
                className="bg-white shadow-md rounded-2xl p-5 mb-5 mt-3 flex justify-between items-center border border-zinc-200 hover:shadow-lg transition-all duration-300"
                key={CartItem._id}
              >
                <div className="flex gap-5 items-center">
                  <img
                    src={CartItem.image}
                    className="w-28 h-28 object-contain bg-zinc-50 p-2 rounded-xl"
                  />
                  <div className="max-w-md">
                    <div className="font-semibold text-lg text-zinc-800">
                      {CartItem.title}
                    </div>
                    <div className="text-green-600 font-bold text-xl mt-2">
                      ₹{CartItem.price}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-5 border rounded-xl px-4 py-2 bg-zinc-50">
                    <div
                      className="cursor-pointer text-xl font-bold text-zinc-700 hover:text-red-500"
                      onClick={(e) => {
                        CartItem.quantity > 1 && decreaseProductQuantity();
                      }}
                    >
                      -
                    </div>
                    <div>{CartItem.quantity}</div>
                    <div
                      className="cursor-pointer text-xl font-bold text-zinc-700 hover:text-green-500"
                      onClick={(e) => {
                        CartItem.quantity < 8 && UpdateInCart();
                      }}
                    >
                      +
                    </div>
                  </div>
                  <div>
                    <p
                      className="bg-red-500 hover:bg-red-600 text-white cursor-pointer rounded-lg px-4 py-2 font-medium transition"
                      onClick={() => {
                        DeleteInCart();
                      }}
                    >
                      Delete
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-zinc-500">Total</p>

                    <p className="text-xl font-bold text-green-600">
                      ₹{CartItem.price * CartItem.quantity}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex justify-center items-center h-[60vh]">
            <div className="bg-white shadow-md rounded-2xl p-10 text-center">
              <h2 className="text-2xl font-bold text-zinc-700">
                Your Cart is Empty
              </h2>

              <p className="text-zinc-500 mt-2">
                Add some products to continue shopping.
              </p>
            </div>
          </div>
        )}
        <div className="sticky bottom-0 bg-white border-t py-5 flex justify-center mt-8">
          <Link
            to="/Checkout"
            className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-md transition"
            onClick={(e) => {}}
          >
            {" "}
            Buy cart Items:{" "}
            {CartItems.reduce((accumulator, currentValue) => {
              accumulator =
                accumulator + currentValue.price * currentValue.quantity;
              return accumulator;
            }, 0)}{" "}
          </Link>
        </div>
      </div>
    </>
  );
}
export default AddToCart;
