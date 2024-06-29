/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import instance from "../axious";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { notitySuccess } from "../notifications/productNotify";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});
function AuthForm({ isRegister }) {
  console.log(isRegister);
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema)
  });
  const onSubmit = async (data) => {
    try {
      if (isRegister) {
        await instance.post("/register", data);
        notitySuccess("Bạn đã đăng kí thành công");
        nav("/login");
      } else {
        const result = await instance.post("/login", data);
        localStorage.setItem("user", JSON.stringify(result.data));
        notitySuccess("Bạn đã đăng nhập thành công");
        nav("/admin");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form
        className="w-1/2 mx-auto mt-5 px-3 py-3 shadow-lg bg-gray-50"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-semibold px-3 py-2  mb-5">
          {isRegister ? "Register" : "Login"}
        </h1>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            {...register("email", { required: true })}
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
          />
          {errors.email && (
            <p classNameName="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            {...register("password", { required: true })}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.password && (
            <p classNameName="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="flex items-start mb-5">
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
          Submit
        </button>
      </form>
    </>
  );
}

export default AuthForm;
