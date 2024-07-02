import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../../contexts/ProductContect";
import instance from "../../../axious";
import {
  notityError,
  notitySuccess
} from "../../../notifications/productNotify";

function ProductList() {
  const { state, dispath } = useContext(ProductContext);

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

  return (
    <>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
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
            {state.products.map((product) => (
              <tr key={product.id}>
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
