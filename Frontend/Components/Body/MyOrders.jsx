import { useContext } from "react";
import { homeContext } from "../Context/context";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
function MyOrders() {
  const { OrderedItems, setOrderedItems, OrderDropId, setOrderDropId } =
    useContext(homeContext);
    const navigate=useNavigate();
  return (
    <>
      <div className="h-screen">
        <Header/>
        <div className="mt-4">
          {OrderedItems.map((item) => {
            return (
              <div
                className="bg-white rounded-2xl shadow-md border border-zinc-200 p-6 hover:shadow-lg transition-all duration-300"
                key={item.id}
              >
                {/* Top Section */}
                <div className="flex justify-between items-center border-b pb-4 mb-4 ">
                  <div>
                    <p className="text-sm text-zinc-500">Order ID</p>
                    <p className="font-semibold text-zinc-800">#{item.id}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-zinc-500">Total Order Value</p>
                    <p className="font-bold text-green-600 text-lg">
                      ₹{item.TotalCost}
                    </p>
                  </div>
                  <div className="text-center">
                    <div
                      className="flex items-center justify-between px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg hover:bg-zinc-100 transition-all cursor-pointer"
                      onClick={(e) => {
                        setOrderDropId((prev) => {
                          if (!OrderDropId.includes(item.id)) {
                            return [...prev, item.id];
                          } else {
                            return prev.filter(
                              (element) => element !== item.id,
                            );
                          }
                        });
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-zinc-700">
                          Products
                        </p>

                        <span className="text-xs bg-zinc-200 text-zinc-700 px-2 py-0.5 rounded-full">
                          {item.TotalItems}
                        </span>
                      </div>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-zinc-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-zinc-500">Ordered On</p>
                    <p className="font-medium">12 June 2026</p>
                  </div>
                </div>

                {/* Product Section */}
                {OrderDropId.includes(item.id) &&
                  item.Items.map((product) => {
                    return (
                      <div
                        className="flex gap-5 border-2 border-zinc-200 p-6"
                        key={product.id}
                      >
                        <img
                          src={product.image}
                          alt="Product"
                          className="w-28 h-28 object-cover rounded-xl border"
                        />

                        <div className="flex flex-col justify-between flex-1">
                          <div>
                            <h2 className="text-xl font-bold text-zinc-800">
                              {product.title}
                            </h2>

                            <p className="text-zinc-500 mt-1">
                              {product.description}
                            </p>

                            <div className="flex gap-6 mt-3 text-sm">
                              <p>
                                Qty:
                                <span className="font-semibold ml-1">
                                  {product.quantity}
                                </span>
                              </p>

                              <p>
                                Payment:
                                <span className="font-semibold ml-1">UPI</span>
                              </p>
                            </div>
                          </div>

                          {/* Status */}
                          <div className="mt-3">
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                              ✓ Delivered
                            </span>
                          </div>
                        </div>

                        {/* Price Section */}
                        <div className="text-right flex flex-col justify-between">
                          <div>
                            <p className="text-sm text-zinc-500">
                              Total Amount
                            </p>

                            <p className="text-2xl font-bold text-green-600">
                              ₹{product.price}
                            </p>
                          </div>

                          <div className="flex flex-col gap-2">
                            <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-medium transition" onClick={(e) => {
                              navigate(`/Product/${product.id}`)
                              }}>
                              Order Again
                            </button>

                            {/* <button className="border border-zinc-300 hover:bg-zinc-100 px-5 py-2 rounded-lg font-medium transition">
                              View Details
                            </button> */}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
        <div></div>
      </div>
    </>
  );
}
export default MyOrders;
