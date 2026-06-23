import { homeContext } from "../Context/context";
import { useContext, useMemo, useState } from "react";
import Header from "../Header/Header";
import ProductDetail from "./ProductDetail";
import { useNavigate } from "react-router-dom";
function SearchedProducts() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    sortBy: null,
    categories:[],
    priceRange: null,
  });
  const {
    SearchedProducts,
    setSearchedProducts,
    FilteredProducts,
    setFilteredProducts,
  } = useContext(homeContext);

  let displayedResults = useMemo(() => {
    let result = SearchedProducts;

    // filter by sortBy

    if (filters.sortBy !== null) {
      if (filters.sortBy === "Featured") {
        result = SearchedProducts;
      } else if (filters.sortBy === "HighToLow") {
        result = [...result].sort((a, b) => b.price - a.price);
      } else if (filters.sortBy === "LowToHigh") {
        result = [...result].sort((a, b) => a.price - b.price);
      }
    }
    //filter by priceRange
    if (filters.priceRange !== null) {
      result = [...result].filter((product) => {
        if (
          filters.priceRange === "0-200" &&
          product.price >= 0 &&
          product.price < 200
        ) {
          return product;
        } else if (
          filters.priceRange === "200-600" &&
          product.price >= 200 &&
          product.price < 600
        ) {
          return product;
        } else if (filters.priceRange === "600+" && product.price >= 600) {
          return product;
        }
      });

    }

    //filter by category 

    // men's clothing,jewelery,electronics,women's clothing
    if(filters?.categories?.length >0){ 
            result =[...result].filter((product) => filters.categories.includes(product.category))
    }

    return result;
  }, [filters, SearchedProducts]);

  return (
    <>
      <div className="h-screen flex flex-col overflow-hidden">
        <Header></Header>
        {/* Header section  */}
        <div className="bg-linear-to-r from-green-50 to-white border-b p-4">
          <h1 className="text-3xl font-bold text-zinc-800">Search Results</h1>

          <p className="text-zinc-500 mt-2">
            Showing products matching your search
          </p>
        </div>
        {/* Main layout */}
        <div className="flex gap-8 p-8 bg-zinc-50 flex-1 overflow-hidden">
          <div className="w-72 bg-white rounded-2xl shadow-md p-6 overflow-y-auto">
            <h2 className="font-bold text-xl mb-6">Filters</h2>
            <div className="mb-8">
              <h3 className="font-semibold mb-3">Sort By</h3>

              <select
                className="w-full border rounded-xl p-3 outline-none"
                defaultValue="Featured"
                onChange={(e) => {
                  // setSelectedPriceRange(null)
                  if (e.target.value === "Featured") {
                    setFilters((prev) => {
                      return { ...prev, sortBy: "Featured" };
                    });
                  } else if (e.target.value === "HighToLow") {
                    setFilters((prev) => {
                      return { ...prev, sortBy: "HighToLow" };
                    });
                  } else if (e.target.value === "LowToHigh") {
                    setFilters((prev) => {
                      return { ...prev, sortBy: "LowToHigh" };
                    });
                  }
                }}
              >
                <option value="Featured">Featured</option>
                <option value="LowToHigh">Price: Low to High</option>
                <option value="HighToLow">Price: High to Low</option>
              </select>
            </div>
            <div className="mb-8">
              <h3 className="font-semibold mb-3">Price Range</h3>

              <div className="space-y-3">
                <label className="flex gap-2">
                  <input
                    type="radio"
                    name="Price"
                    value="0-200"
                    checked={filters.priceRange === "0-200"}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters((prev) => {
                          return { ...prev, priceRange: "0-200" };
                        });
                      }
                    }}
                  />
                  ₹0 - ₹200
                </label>

                <label className="flex gap-2">
                  <input
                    type="radio"
                    name="Price"
                    value="200-600"
                    checked={filters.priceRange === "200-600"}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters((prev) => {
                          return { ...prev, priceRange: "200-600" };
                        });
                      }
                    }}
                  />
                  ₹200 - ₹600
                </label>

                <label className="flex gap-2">
                  <input
                    type="radio"
                    name="Price"
                    value="600+"
                    checked={filters.priceRange === "600+"}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters((prev) => {
                          return { ...prev, priceRange: "600+" };
                        });
                      }
                    }}
                  />
                  ₹600+
                </label>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Categories</h3>

              <div className="space-y-3">
                <label className="flex gap-2">
                  <input type="checkbox" onChange={(e) => {
                        if(e.target.checked){
                          setFilters((prev) => {
                             return {...prev,categories:[...prev.categories,"Electronics"]}
                          })
                        }
                        else{
                          setFilters((prev) => {
                            return {...prev,categories: prev.categories.filter((element) => element!=="Electronics")}
                          })
                        }
                  }}/>
                  Electronics
                </label>

                <label className="flex gap-2">
                  <input type="checkbox" onChange={(e) => {
                        if(e.target.checked){
                          setFilters((prev) => {
                             return {...prev,categories:[...prev.categories,"men's clothing"]}
                          })
                        }else{
                          setFilters((prev) => {
                            return {...prev,categories: prev.categories.filter((element) => element!=="men's clothing")}
                          })
                        }
                  }} />
                 Men's Clothing
                </label>

                <label className="flex gap-2">
                  <input type="checkbox" onChange={(e) => {
                        if(e.target.checked){
                          setFilters((prev) => {
                             return {...prev,categories:[...prev.categories,"jewelery"]}
                          })
                        } else{
                          setFilters((prev) => {
                            return {...prev,categories: prev.categories.filter((element) => element!=="jewelery")}
                          })
                        }
                  }}/>
                  Jewellery
                </label>
                <label className="flex gap-2">
                  <input type="checkbox" onChange={(e) => {
                        if(e.target.checked){
                          setFilters((prev) => {
                             return {...prev,categories:[...prev.categories,"women's clothing"]}
                          })
                        }else{
                          setFilters((prev) => {
                            return {...prev,categories: prev.categories.filter((element) => element!=="women's clothing")}
                          })
                        }
                  }}/>
                  Women's Clothing
                </label>
              </div>
            </div>
          </div>
          {/* Products Section */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              {displayedResults.length === 0 ? (
                <h2 className="text-2xl font-bold">Products Not Found</h2>
              ) : (
                <h2 className="text-2xl font-bold">Products Found</h2>
              )}
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
                {displayedResults.length} Results
              </span>
            </div>
            <div className="grid grid-cols-3 gap-6 overflow-y-auto pr-2">
              {displayedResults.map((product) => {
                return (
                  <div
                    className="bg-white rounded-2xl p-5 border border-zinc-200 hover:shadow-xl transition-all"
                    key={product.id}
                  >
                    <img
                      src={product.image}
                      className="h-48 mx-auto object-contain"
                    />

                    <h3 className="font-semibold mt-4 line-clamp-2">
                      {product.title}
                    </h3>

                    <p className="text-green-600 font-bold text-xl mt-2">
                      ₹{product.price}
                    </p>

                    <button
                      className="w-full mt-4 bg-zinc-900 text-white py-3 rounded-xl hover:bg-black transition"
                      onClick={(e) => {
                        navigate(`/Product/${product.id}`);
                      }}
                    >
                      View Product
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchedProducts;
