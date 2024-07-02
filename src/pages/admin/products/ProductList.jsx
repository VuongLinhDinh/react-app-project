import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../../contexts/ProductContect";
import instance from "../../../axious";
import {
  notityError,
  notitySuccess
} from "../../../notifications/productNotify";

function ProductList() {
  const { state, dispath } = useContext(ProductContext);
  const [hiddenProducts, setHiddenProducts] = useState(() => {
    const saved = localStorage.getItem("hiddenProducts");
    return saved ? JSON.parse(saved) : [];
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState("name");

  const handleRemove = async (id) => {
    try {
      if (confirm("Bạn chắc chắn muốn xóa chứ !!!")) {
        await instance.delete(`/products/${id}`);
        dispath({ type: "DELETE_PRODUCT", payload: id });
        notitySuccess("Bạn đã xóa sản phẩm thành công");
      }
    } catch (error) {
      console.error("Error remove product", error);
      notityError("Xóa thất bại, vui lòng thử lại");
    }
  };

  const handleCheckboxChange = (id) => {
    let updatedHiddenProducts = [...hiddenProducts];
    if (updatedHiddenProducts.includes(id)) {
      updatedHiddenProducts = updatedHiddenProducts.filter(
        (productId) => productId !== id
      );
    } else {
      updatedHiddenProducts.push(id);
    }
    setHiddenProducts(updatedHiddenProducts);
    localStorage.setItem(
      "hiddenProducts",
      JSON.stringify(updatedHiddenProducts)
    );
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleFilterChange = (filter) => {
    setFilterBy(filter);
    setIsDropdownOpen(false);
  };

  const filteredProducts = state.products.filter((product) => {
    switch (filterBy) {
      case "name":
        return product.name.toLowerCase().includes(search.toLowerCase());
      case "price":
        return product.price.toString().includes(search);
      case "category":
        return product.category.toLowerCase().includes(search.toLowerCase());
      case "brand":
        return product.brand.toLowerCase().includes(search.toLowerCase());
      default:
        return true;
    }
  });

  return (
    <>
      <div className="overflow-x-auto w-full">
        <form className="w-full my-5 pr-5 relative">
          <div className="flex">
            <label
              htmlFor="search-dropdown"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Your Email
            </label>
            <button
              id="dropdown-button"
              onClick={toggleDropdown}
              className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
              type="button"
            >
              Filter by{" "}
              <svg
                className="w-2.5 h-2.5 ms-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <div
              id="dropdown"
              className={`z-10 ${
                isDropdownOpen ? "block" : "hidden"
              } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute top-14 -left-3`}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdown-button"
              >
                <li>
                  <button
                    type="button"
                    onClick={() => handleFilterChange("name")}
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Name
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleFilterChange("price")}
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Price
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleFilterChange("category")}
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Category
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleFilterChange("brand")}
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Brand
                  </button>
                </li>
              </ul>
            </div>
            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                placeholder={`Search product by ${filterBy}...`}
                value={search}
                onChange={handleSearchChange}
                required
              />
              <button
                type="submit"
                className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>

        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 w-1/4">
                <input type="checkbox" name="" id="" />
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 w-1/4">
                Product
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 w-1/12">
                Price
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 w-1/4">
                Desc
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 w-1/12">
                Category
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 w-1/12">
                Rate
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 w-1/12">
                Stock
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 w-1/12">
                Brand
              </th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 w-1/12">
                  <input
                    type="checkbox"
                    checked={hiddenProducts.includes(product.id)}
                    onChange={() => handleCheckboxChange(product.id)}
                  />
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 flex items-center">
                  <div className="w-16 h-20 mr-4 flex-shrink-0">
                    {product.images ? (
                      <img
                        src={product.images}
                        alt={product.name}
                        className="object-cover w-full h-full rounded-md"
                      />
                    ) : (
                      <p className="text-red-500">Updating...</p>
                    )}
                  </div>
                  <span className="text-wrap w-1/2">{product.name}</span>
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 w-1/12">
                  {product.price}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 w-1/4">
                  <span className="text-wrap">{product.description}</span>
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 w-1/12">
                  {product.category}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 w-1/12">
                  {product.rating}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 w-1/12">
                  {product.stock}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 w-1/12">
                  {product.brand}
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  <Link
                    to={`/admin/product-edit/${product.id}`}
                    className="inline-block rounded bg-teal-600 px-4 py-2 text-xs font-medium text-white hover:bg-teal-700 mr-2"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                  <button
                    onClick={() => handleRemove(product.id)}
                    className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProductList;
