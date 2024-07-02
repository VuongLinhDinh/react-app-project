import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.scss";
import AdminLayout from "./components/layouts/AdminLayout";
import ClientLayout from "./components/layouts/ClientLayout";
import AuthForm from "./pages/AuthForm";
import NotFound from "./pages/NotFound";
import PrivateRouter from "./pages/PrivateRouter";
import ProductForm from "./pages/admin/products/ProductForm";
import ProductList from "./pages/admin/products/ProductList";
import Home from "./pages/client/Home";
import Product from "./pages/client/Product";
import ProductDetail from "./pages/client/ProductDetail";
import About from "./pages/client/About";
import Blog from "./pages/client/Blog";
import Contact from "./pages/client/Contact";
import Pricing from "./pages/client/Pricing";

function App() {
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
          <Route path="/product" element={<Product />}></Route>
          <Route path="/pricing" element={<Pricing />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/blog" element={<Blog />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/product-detail/:id" element={<ProductDetail />}></Route>
        </Route>
        <Route path="/admin" element={<PrivateRouter />}>
          <Route path="" element={<AdminLayout />}>
            <Route path="/admin/product-list" element={<ProductList />}></Route>
            <Route path="/admin/product-add" element={<ProductForm />}></Route>
            <Route
              path="/admin/product-edit/:id"
              element={<ProductForm />}
            ></Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
