import Header from "../Header/Header";
import { useParams } from "react-router-dom";
import { homeContext } from "../Context/context";
import { useContext } from "react";
function ProductDetail() {
    const {id}=useParams();
    const {products,setProducts}=useContext(homeContext)
    const shownItem=products.find((element) => element.id===Number(id))
    console.log(shownItem)
  return (
    <div>
       <Header/>
    <div className="min-h-screen bg-zinc-50 p-8">

      {/* Product Section */}
      <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col lg:flex-row gap-10">
        {/* Product Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={shownItem.image}
            alt="KuchBhi"
            className="w-[400px] h-[400px] object-contain rounded-xl"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-zinc-800">{shownItem.title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
              ★ {shownItem.rating.rate}
            </span>

            <span className="text-zinc-500 text-sm">{shownItem.rating.count}Ratings</span>
          </div>

          {/* Price */}
          <div className="mt-6">
            <p className="text-4xl font-bold text-green-600">
              ₹{shownItem.price}
            </p>

            <p className="text-zinc-400 line-through">
              ₹{Math.round((shownItem.price) * 1.2)}
              {/* put price of proudct instead of 50  */}
            </p>

            <p className="text-green-600 font-medium">20% Off</p>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h2 className="font-semibold text-lg">Description</h2>

            <p className="text-zinc-600 mt-2 leading-relaxed">
              {shownItem.description}
            </p>
          </div>

          {/* Stock */}
          <div className="mt-6">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              In Stock
            </span>
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <label className="font-medium">Quantity</label>

            <select className="ml-3 border rounded-lg px-3 py-2">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-medium transition">
              Add To Cart
            </button>

            <button className="bg-zinc-800 hover:bg-zinc-900 text-white px-8 py-3 rounded-xl font-medium transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="bg-white rounded-2xl shadow-md p-8 mt-8">
        <h2 className="text-2xl font-bold mb-6">Specifications</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="font-medium">Brand:</span> Generic
          </div>

          <div>
            <span className="font-medium">Category:</span>{shownItem.category}
          </div>

          <div>
            <span className="font-medium">Warranty:</span> 1 Year
          </div>

          <div>
            <span className="font-medium">Delivery:</span> 2-4 Days
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-white rounded-2xl shadow-md p-8 mt-8">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

        <div className="space-y-6">
          <div className="border-b pb-4">
            <div className="flex items-center gap-2">
              <span className="bg-green-500 text-white px-2 rounded">★ 5</span>

              <span className="font-semibold">Rahul Sharma</span>
            </div>

            <p className="text-zinc-600 mt-2">
              Amazing product. Quality exceeded my expectations.
            </p>
          </div>

          <div className="border-b pb-4">
            <div className="flex items-center gap-2">
              <span className="bg-green-500 text-white px-2 rounded">★ 4</span>

              <span className="font-semibold">Priya Singh</span>
            </div>

            <p className="text-zinc-600 mt-2">
              Good value for money. Delivery was quick.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="bg-green-500 text-white px-2 rounded">★ 5</span>

              <span className="font-semibold">Aman Verma</span>
            </div>

            <p className="text-zinc-600 mt-2">
              Highly recommended. Would definitely buy again.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ProductDetail;
