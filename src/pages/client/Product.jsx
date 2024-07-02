import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContect";

function Product() {
  const { state } = useContext(ProductContext);
  const [visibleProducts, setVisibleProducts] = useState(6);
  const [sortOption, setSortOption] = useState(
    localStorage.getItem("sortOption") || "relevancy"
  );
  const [hiddenProducts, setHiddenProducts] = useState(() => {
    const saved = localStorage.getItem("hiddenProducts");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("sortOption", sortOption);
  }, [sortOption]);

  const handleLoadMore = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 6);
  };

  const handleHide = () => {
    setVisibleProducts(6);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortedProducts = [...state.products]
    .filter((product) => !hiddenProducts.includes(product.id))
    .sort((a, b) => {
      if (sortOption === "price") {
        return a.price - b.price;
      } else if (sortOption === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });

  return (
    <>
      <section className="products mx-auto w-11/12 md:w-3/4 px-5 py-5 mt-9">
        <div className="title-block text-4xl font-semibold">
          Find Your Products
        </div>
        <div className="filter-block flex flex-wrap justify-between items-center mt-6">
          <div className="all-filter bg-white px-4 py-1">
            <i className="fa-solid fa-arrow-up-wide-short" />
            <span>All Filter</span>
          </div>
          <div className="sort-by flex gap-4 items-center">
            <span className="text-gray-500">Sort By:</span>
            <select
              name="sort"
              id="sort"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="relevancy">Relevancy</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
        <div className="product-list flex flex-wrap justify-between gap-2 mt-7 -mx-20">
          {sortedProducts.slice(0, visibleProducts).map((item) => (
            <div
              key={item.id}
              className="product-card px-4 py-2 mb-5 rounded-lg border-collapse hover:shadow-lg"
            >
              <div className="image-card w-[400px] h-[500px] relative group">
                <Link to={`/product-detail/${item.id}`}>
                  <img
                    className="w-full h-full object-fill rounded-lg "
                    src={item.images}
                    alt={item.name}
                  />
                </Link>
                <div className="add-to-card bg-[#018294] text-center px-2 py-3 text-white hidden absolute bottom-0 left-0 right-0 group-hover:block transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                  Add to Card
                </div>
              </div>
              <div className="card-info">
                <div className="flex justify-between my-3">
                  <div className="product-category font-normal text-gray-400 text-sm">
                    {item.category}
                  </div>
                  <div className="heart-icon">
                    <i className="fa-regular fa-heart" />
                  </div>
                </div>
                <div className="product-title text-xl font-semibold mb-3">
                  {item.name}
                </div>
                <div className="flex justify-between items-center">
                  <div className="rate flex justify-between items-center gap-1">
                    <i className="fa-solid fa-star text-yellow-500" />
                    <span className="rate-num text-gray-600">
                      {item.rating} (18)
                    </span>
                  </div>
                  <div className="price-product font-medium">
                    {item.price} (VND)
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center my-4">
          {visibleProducts < sortedProducts.length ? (
            <button
              className="btn-more bg-[#018294] text-white px-5 py-2"
              onClick={handleLoadMore}
            >
              Load More
            </button>
          ) : (
            <button
              className="btn-more bg-[#018294] text-white px-5 py-2"
              onClick={handleHide}
            >
              Hide
            </button>
          )}
        </div>
      </section>
    </>
  );
}

export default Product;
