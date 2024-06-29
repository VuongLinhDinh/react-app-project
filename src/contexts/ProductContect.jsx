import { createContext, useEffect, useReducer } from "react";
import productReducer from "../reducers/productReducer";
import instance from "../axious";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [state, dispath] = useReducer(productReducer, { products: [] });
  useEffect(() => {
    const fetchApi = async () => {
      const { data } = await instance.get(`/products`);
      console.log(data);
      dispath({ type: "SET_PRODUCT", payload: data });
    };
    fetchApi();
  }, []);
  return (
    <ProductContext.Provider value={{ state, dispath }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
