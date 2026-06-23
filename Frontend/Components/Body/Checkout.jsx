import { homeContext } from "../Context/context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
function Checkout() {
  const {
    products,
    CartItems,
    setCartItems,
    OrderedItems,
    setOrderedItems,
    completedOrder,
    setCompletedOrder,
  } = useContext(homeContext);
  const navigate = useNavigate();
  return (
    <>
      <div className="h-screen">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 p-8">
          <div className="bg-white rounded-2xl shadow-md p-8 lg:w-2/3">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Checkout</h1>
              <p className="text-zinc-500 mt-2">
                Complete your order by providing shipping details.
              </p>
            </div>
            <h1 className="text-3xl font-bold mb-6">Shipping Information</h1>

            <form>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="FirstName">First Name</label>
                  <input
                    placeholder="First Name.."
                    type="text"
                    id="FirstName"
                    className="w-full border border-zinc-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="LastName">Last Name</label>
                  <input
                    placeholder="Last Name..."
                    type="text"
                    id="LastName"
                    className="w-full border border-zinc-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="Email">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email.."
                    id="Email"
                    className="w-full border border-zinc-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="PhoneNumber">Phone Number</label>
                  <input
                    type="number"
                    placeholder="Last Name..."
                    id="PhoneNumber"
                    className="w-full border border-zinc-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="">Shipping Address</label>
                <textarea
                  rows="5"
                  placeholder="Enter your shipping address"
                  className="w-full border border-zinc-300 rounded-xl px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <button type="submit" className="bg-green-400 p-2 rounded-md">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 lg:w-1/3 h-fit sticky top-6">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="">
              {CartItems.map((item) => {
                return (
                  <div
                    className="flex justify-between items-center border-b py-4"
                    key={item.id}
                  >
                    <div className="flex ">
                      <img
                        src={item.image}
                        className="w-16 h-16 object-contain bg-zinc-50 rounded-lg p-1"
                      />
                      <div className="">
                        <div className="font-medium text-zinc-800 w-40 line-clamp-2">
                          {item.title}
                        </div>
                        <div className="text-green-600 font-bold mt-1">
                          {item.price}
                        </div>
                      </div>
                    </div>
                    <div>
                      <p>Units:{item.quantity}</p>
                      <p>Total Price:{item.price * item.quantity}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="border m-1 p-2">
              <div className="mt-6 border-t pt-6 space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    ₹...
                    {CartItems.reduce((accumulator, currentValue) => {
                      accumulator =
                        accumulator +
                        currentValue.price * currentValue.quantity;
                      return accumulator;
                    }, 0)}
                  </span>
                </div>

                <div className="flex">
                  <p>
                    Shipping:
                    <span className="text-green-300 font-bold">50.0</span>
                  </p>
                </div>
                <div className="flex">
                  <p>
                    Discount:
                    <span className="text-green-300 font-bold"> -20.0</span>
                  </p>
                </div>
                <div className="flex justify-between text-xl font-bold border-t pt-4">
                  <span>Total</span>
                  <span className="text-green-600">
                    {CartItems.reduce((accumulator, currentValue) => {
                      accumulator =
                        accumulator +
                        currentValue.price * currentValue.quantity;
                      return accumulator;
                    }, 0) +
                      50 -
                      20}
                  </span>
                </div>
              </div>
              <div className="flex">
                <button
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-semibold text-lg mt-6 transition"
                  onClick={(e) => {
                    try {
                      setOrderedItems((prev) => {
                        return [
                          ...prev,
                          {
                            id: crypto.randomUUID(),
                            Items: [...CartItems],
                            TotalCost:
                              CartItems.reduce((accumulator, currentValue) => {
                                accumulator =
                                  accumulator +
                                  currentValue.price * currentValue.quantity;
                                return accumulator;
                              }, 0) +
                              50 -
                              20,
                            TotalItems: CartItems.reduce(
                              (accumulator, currentValue) => {
                                accumulator =
                                  accumulator + currentValue.quantity;
                                return accumulator;
                              },
                              0,
                            ),
                          },
                        ];
                      });
                      setCompletedOrder(true);
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                >
                  Pay now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {completedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-87.5 text-center">
            {/* Tick Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            {/* Success Message */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Order Completed!
            </h2>

            <p className="text-gray-600 mb-6">
              Your order has been placed successfully.
            </p>

            {/* Shop More Button */}
            <a
              href="/"
              onClick={(e) => {
                setCompletedOrder(false);
              }}
            >
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
                Shop More
              </button>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
export default Checkout;
