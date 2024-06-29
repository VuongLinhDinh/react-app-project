import React from "react";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";

function ClientLayout() {
  return (
    <>
      <Header />
      <div className="content bg-gray-200  ">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default ClientLayout;
