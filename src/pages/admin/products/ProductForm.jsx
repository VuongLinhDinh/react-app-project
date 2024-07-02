import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import instance from "../../../axious";
import { ProductContext } from "../../../contexts/ProductContect";
import {
  notityError,
  notitySuccess
} from "../../../notifications/productNotify";

const schema = z.object({
  name: z.string().min(3),
  price: z.number().min(0),
  images: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  rating: z.number().min(0).max(5),
  stock: z.number().min(0),
  brand: z.string().min(4),
  size: z.array(z.number()).nonempty("At least one size must be selected")
});

function ProductForm() {
  const { id } = useParams();
  const nav = useNavigate();
  const { dispath } = useContext(ProductContext);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    resolver: zodResolver(schema)
  });

  useEffect(() => {
    if (id) {
      (async () => {
        const { data } = await instance.get(`/products/${id}`);
        reset(data);
        setSelectedSizes(data.size || []); // Initialize selected sizes if editing existing product
      })();
    }
  }, [id, reset]);

  useEffect(() => {
    setValue("size", selectedSizes); // Update form value for `size`
  }, [selectedSizes, setValue]);

  const handleCheckboxChange = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const handleProduct = async (data) => {
    data.size = selectedSizes; // Assign selected sizes to the data object
    if (id) {
      try {
        const res = await instance.patch(`/products/${id}`, data);
        dispath({ type: "UPDATE_PRODUCT", payload: res.data });
        notitySuccess("Bạn đã sửa sản phẩm thành công");
      } catch (error) {
        notityError("Sửa thất bại, vui lòng thử lại");
      }
    } else {
      try {
        const res = await instance.post(`/products`, data);
        dispath({ type: "ADD_PRODUCT", payload: res.data });
        notitySuccess("Bạn đã thêm sản phẩm thành công");
      } catch (error) {
        notityError("Thêm thất bại, vui lòng thử lại");
      }
    }
    nav("/admin/product-list");
  };

  const sizes = [39, 40, 41, 42, 43];

  return (
    <>
      <h1 className="text-2xl font-semibold mt-2 px-2">
        {id ? "Edit" : "Add"} product
      </h1>
      <form
        className="w-full flex justify-between items-start flex-wrap gap-3 bg-gray-100 px-5 py-5 mt-10"
        onSubmit={handleSubmit((data) => handleProduct({ ...data, id }))}
      >
        <div className="mb-3 w-1/2 px-4 -mx-3">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your name
          </label>
          <input
            {...register("name", { required: true })}
            type="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="mb-3 w-1/2 px-4 -mx-3">
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your price
          </label>
          <input
            {...register("price", { required: true, valueAsNumber: true })}
            type="number"
            id="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}
        </div>
        <div className="mb-3 w-1/2 px-4 -mx-3">
          <label
            htmlFor="images"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your images
          </label>
          <input
            {...register("images")}
            type="text"
            id="images"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.images && (
            <p className="text-red-500">{errors.images.message}</p>
          )}
        </div>
        <div className="mb-3 w-full px-4 -mx-3">
          <div>
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
              Select Sizes
            </h3>
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              {sizes.map((size) => (
                <li
                  key={size}
                  className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
                >
                  <div className="flex items-center ps-3">
                    <input
                      type="checkbox"
                      id={`size-${size}`}
                      value={size}
                      checked={selectedSizes.includes(size)}
                      onChange={() => {
                        handleCheckboxChange(size);
                        console.log(size);
                      }}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor={`size-${size}`}
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {size}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
            {errors.size && (
              <p className="text-red-500">{errors.size.message}</p>
            )}
          </div>
        </div>
        <div className="mb-3 w-full px-2.5">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your description
          </label>
          <textarea
            {...register("description")}
            type="description"
            id="description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>
        <div className="mb-3 w-1/2 px-4 -mx-3">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your category
          </label>
          <select
            {...register("category")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ps-3 pe-10"
          >
            <option value="">-- select category --</option>
            <option value="Running">Running</option>
            <option value="Casual">Casual</option>
            <option value="Puma">Puma</option>
          </select>
        </div>
        <div className="mb-3 w-1/2 px-4 -mx-3">
          <label
            htmlFor="rating"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your rating
          </label>
          <input
            {...register("rating", { valueAsNumber: true })}
            type="number"
            id="rating"
            step={0.1}
            min={0}
            max={5}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.rating && (
            <p className="text-red-500">{errors.rating.message}</p>
          )}
        </div>
        <div className="mb-3 w-1/2 px-4 -mx-3">
          <label
            htmlFor="stock"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your stock
          </label>
          <input
            {...register("stock", { required: true, valueAsNumber: true })}
            type="number"
            id="stock"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.stock && (
            <p className="text-red-500">{errors.stock.message}</p>
          )}
        </div>
        <div className="mb-3 w-1/2 px-4 -mx-3">
          <label
            htmlFor="brand"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your brand
          </label>
          <input
            {...register("brand")}
            type="text"
            id="brand"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.brand && (
            <p className="text-red-500">{errors.brand.message}</p>
          )}
        </div>
        <div className="flex items-start mb-5 w-full">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            />
          </div>
          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Remember me
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {id ? "Edit" : "Add"} product
        </button>
      </form>
    </>
  );
}

export default ProductForm;
