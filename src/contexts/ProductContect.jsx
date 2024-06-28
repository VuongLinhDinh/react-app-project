import { createContext } from "react";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  return <ProductContext.Provider>{children}</ProductContext.Provider>;
};

export default ProductProvider;
