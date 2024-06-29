import React, { useContext, useEffect } from "react";
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
  brand: z.string().min(4)
});
function ProductForm() {
  const { id } = useParams();
  const nav = useNavigate();
  const { dispath } = useContext(ProductContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(schema)
  });
  console.log("ProductForm id:", id);
  if (id) {
    useEffect(() => {
      (async () => {
        const { data } = await instance.get(`/products/${id}`);
        reset(data);
      })();
    }, [id, reset]);
  }

  const handleProduct = async (data) => {
    console.log(data);
    if (id) {
      // login edit
      try {
        // Log thêm để kiểm tra trước khi gọi API

        const res = await instance.patch(`/products/${id}`, data);
        dispath({ type: "UPDATE_PRODUCT", payload: res.data });
        notitySuccess("Bạn đã sửa sản phẩm thành công");
      } catch (error) {
        notityError("Sửa thất bại, vui lòng thử lại");
        console.error("Error updating product:", error);
      }
    } else {
      // logic add
      try {
        const res = await instance.post(`/products`, data);
        dispath({ type: "ADD_PRODUCT", payload: res.data });
        notitySuccess("Bạn đã thêm sản phẩm thành công");
      } catch (error) {
        notityError("Thêm thất bại, vui lòng thử lại");
        console.error("Error adding product:", error);
      }
    }
    nav("/admin/product-list");
  };

  return (
    <>
      <h1 className="text-2xl font-semibold mt-2 px-2">
        {" "}
        {id ? "Edit" : "Add"} product
      </h1>
      <form
        className=" w-full flex justify-between items-start flex-wrap gap-3 bg-gray-100 px-5 py-5 mt-10"
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
            htmlFor="title"
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
        <div className="mb-3 w-full px-2.5">
          <label
            htmlFor="title"
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
            name=""
            id=""
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ps-3 pe-10"
            {...register("category")}
          >
            <option value="">-- select category</option>
            <option value="Running">Running</option>
            <option value="Casual">Casual</option>
            <option value="puma">Puma</option>
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
            htmlFor="brand "
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your brand
          </label>
          <input
            {...register("brand")}
            type="brand "
            id="brand"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
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
