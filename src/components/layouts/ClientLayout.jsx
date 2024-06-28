import React from "react";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";

function ClientLayout() {
  return (
    <>
      <Header />
      <div className="content bg-[#F2EDE6] ">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default ClientLayout;
