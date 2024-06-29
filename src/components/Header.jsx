import { Link } from "react-router-dom";
import React from "react";
function Header() {
  return (
    <>
      <section className="navbar flex flex-wrap justify-between items-center mx-auto w-11/12 md:w-3/4 px-5 pb-5">
        <div className="box-start flex flex-wrap justify-between items-center gap-4">
          <div className="logo">
            <Link to="index.html">
              <img
                src="https://i.pinimg.com/564x/37/4b/bf/374bbfa2ba213dc74edec502949305a8.jpg"
                className="w-[80px]"
                alt="my-logo"
              />
            </Link>
          </div>
          <nav className="menu">
            <ul className="flex flex-wrap justify-between gap-4 mx-2 my-1">
              <Link to={"/product"}>
                <li className="hover:text-[#018294] cursor-pointe">Product</li>
              </Link>
              <Link to={"/pricing"}>
                <li className="hover:text-[#018294] cursor-pointe">Pricing</li>
              </Link>
              <Link to={"/contact"}>
                <li className="hover:text-[#018294] cursor-pointe">
                  {" "}
                  Contact us
                </li>
              </Link>
              <Link to={"/blog"}>
                <li className="hover:text-[#018294] cursor-pointe"> Blog</li>
              </Link>
              <Link to={"/about"}>
                <li className="hover:text-[#018294] cursor-pointe">About us</li>
              </Link>
            </ul>
          </nav>
        </div>
        <div className="box-end flex flex-wrap justify-between gap-4 items-center">
          <Link to="">
            <button className="font-medium">Login</button>
          </Link>
          <Link to="">
            <button className="font-normal text-white bg-[#2D2D2D] px-4 py-2 rounded-[40px]">
              Book a Demo
            </button>
          </Link>
          <Link to="">
            <div className="cart ">
              <i class="fa-solid fa-cart-shopping text-xl "></i>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Header;
