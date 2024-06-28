import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import ClientLayout from "./components/layouts/ClientLayout";
import AdminLayout from "./components/layouts/AdminLayout";
import NotFound from "./pages/NotFound";
import Home from "./pages/client/Home";
import Product from "./pages/client/Product";
import { useEffect, useState } from "react";
import instance from "./axious";
import ProductDetail from "./pages/client/ProductDetail";
import AuthForm from "./pages/AuthForm";
import PrivateRouter from "./pages/PrivateRouter";
import ProductList from "./pages/admin/products/ProductList";
import ProductForm from "./pages/admin/products/ProductForm";
import { ToastContainer } from "react-toastify";
import { notityError, notitySuccess } from "./notifications/productNotify";

function App() {
  // notify

  const nav = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await instance.get("/products");
      setProducts(data);
    })();
  }, []);

  const handleRemove = async (id) => {
    try {
      if (confirm("Bạn chắc chắn muốn xóa chứ !!!")) {
        await instance.delete(`/products/${id}`);
        const newData = await instance.get("/products");
        setProducts(newData.data);
        notitySuccess("Bạn đã xóa sản phẩm thành công");
      }
    } catch (error) {
      console.error("Error remove product", error);
      notityError("Xóa thất bại, vui lòng thử lại");
    }
  };
  const handleProduct = async (data) => {
    console.log(data);
    if (data.id) {
      // login edit
      try {
        // Log thêm để kiểm tra trước khi gọi API

        await instance.put(`/products/${data.id}`, data);
        const newData = await instance.get(`/products`);
        setProducts(newData.data);
        notitySuccess("Bạn đã sửa sản phẩm thành công");
      } catch (error) {
        notityError("Sửa thất bại, vui lòng thử lại");
        console.error("Error updating product:", error);
      }
    } else {
      // logic add
      try {
        const res = await instance.post(`/products`, data);
        console.log(res.data);
        setProducts([...products, res.data]);
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
      <div className="notis z-10">
        <ToastContainer />
      </div>

      <Routes>
        <Route path="/*" element={<NotFound />}></Route>
        <Route path="/login" element={<AuthForm />}></Route>
        <Route path="/register" element={<AuthForm isRegister />}></Route>
        <Route path="" element={<Navigate to={"/home"} />}></Route>
        <Route path="/" element={<ClientLayout />}>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/product" element={<Product data={products} />}></Route>
          <Route path="/product-detail/:id" element={<ProductDetail />}></Route>
        </Route>
        <Route path="/admin" element={<PrivateRouter />}>
          <Route path="" element={<AdminLayout />}>
            <Route
              path="/admin/product-list"
              element={
                <ProductList data={products} removeProduct={handleRemove} />
              }
            ></Route>
            <Route
              path="/admin/product-add"
              element={<ProductForm handleProduct={handleProduct} />}
            ></Route>
            <Route
              path="/admin/product-edit/:id"
              element={<ProductForm handleProduct={handleProduct} />}
            ></Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
