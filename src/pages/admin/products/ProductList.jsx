import React, { useState } from "react";
import { Link } from "react-router-dom";

function ProductList({ data, removeProduct }) {
  const [filters, setFillters] = useState({
    name: "",
    price: "",
    stock: "",
    rating: "",
    brand: ""
  });
  const handleFilterChange = (event) => {
    console.log(event.target.value);
    const { name, value } = event.target;
    setFillters({ ...filters, [name]: value });
  };
  const filteredData = data.filter((product) => {
    return (
      product.name &&
      product.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      (filters.price === "" || product.price <= parseFloat(filters.price)) &&
      (filters.stock === "" || product.stock <= parseInt(filters.stock)) &&
      (filters.rating === "" || product.rating >= parseFloat(filters.rating)) &&
      product.brand &&
      product.brand.toLowerCase().includes(filters.brand.toLowerCase())
    );
  });

  return (
    <>
      <div className="filter-container m-4 flex justify-between flex-wrap items-start">
        <i className=" fas fa-sort-amount-down mr-4 text-2xl text-gray-500"></i>
        <div className="flex justify-between flex-wrap items-start gap-2 w-3/4 ">
          <input
            type="text"
            name="name"
            placeholder="Filter by name"
            value={filters.name}
            onChange={handleFilterChange}
            className="mr-2 px-4 py-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Max price"
            value={filters.price}
            onChange={handleFilterChange}
            className="mr-2 px-4 py-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="stock"
            placeholder="Max stock"
            value={filters.stock}
            onChange={handleFilterChange}
            className="mr-2 px-4 py-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="rating"
            placeholder="Min rating"
            value={filters.rating}
            onChange={handleFilterChange}
            className="mr-2 px-4 py-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="brand"
            placeholder="Filter by brand"
            value={filters.brand}
            onChange={handleFilterChange}
            className="px-4 py-2 border border-gray-300 rounded"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Image
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Price
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Desc
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Category
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Rate
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                stock
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                brand
              </th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data.map((product) => (
              <tr key={product.id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-wrap w-1/2">
                  {product.name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 w-[20px] h-[30px] ">
                  {product.images ? (
                    <img
                      src={product.images}
                      alt="Dang cap nhat"
                      className="rounded-md "
                    />
                  ) : (
                    <p className="text-red-500">Dang cap nhat..</p>
                  )}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {product.price}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-wrap w-1/2">
                  {product.description}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-wrap">
                  {product.category}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-wrap">
                  {product.rating}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-wrap">
                  {product.stock}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-wrap">
                  {product.brand}
                </td>
                <td className="whitespace-nowrap px-4 py-2 ">
                  <Link
                    to={`/admin/product-edit/${product.id}`}
                    className="inline-block rounded bg-teal-600 px-4 py-2 text-xs font-medium text-white hover:bg-teal-700 mr-2"
                  >
                    edit
                  </Link>
                  <Link
                    onClick={() => {
                      removeProduct(product.id);
                    }}
                    className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                  >
                    delete
                  </Link>
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
