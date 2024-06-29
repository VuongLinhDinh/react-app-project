/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import instance from "../axious";
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
        <h1 className="font-bold text-[28px] px-2 mb-5">
          {isRegister ? "Register" : "Login"}
        </h1>
        <div class="flex justify-between gap-4">
          <div class="thumb-form w-1/2 p-2">
            {" "}
            {isRegister ? (
              <img
                class="object-fill mx-auto rounded-lg shadow-lg"
                src="https://img.freepik.com/free-vector/hand-drawn-thrift-store-illustration_23-2150052944.jpg?t=st=1717575826~exp=1717579426~hmac=4275ef4514121265d3b50cfdb66ba6be7334f79a6e91ad1d7cd8c992d6e6255a&w=740"
                alt=""
              />
            ) : (
              <img
                class="object-fill mx-auto rounded-lg shadow-lg"
                src="https://img.freepik.com/free-vector/flat-hand-drawn-flea-market-illustration-with-people_23-2148830089.jpg?t=st=1717580380~exp=1717583980~hmac=051ba1d593c4fdb086f572b668a0afadab9911ca30bcd3cd86b20daca0a513eb&w=740"
                alt=""
              />
            )}
          </div>

          <div class="content-form w-1/2 my-auto pr-3">
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
            <div class="flex justify-between items-center">
              <button
                type="submit"
                className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
              >
                Submit
              </button>
              {isRegister ? (
                <Link
                  to={"/login"}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 flex justify-between items-center gap-1"
                >
                  {" "}
                  Login
                  <i class="fa-solid fa-arrow-right"></i>
                </Link>
              ) : (
                <Link
                  to={"/register"}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 flex justify-between items-center gap-1"
                >
                  {" "}
                  Register
                  <i class="fa-solid fa-arrow-right"></i>
                </Link>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default AuthForm;
