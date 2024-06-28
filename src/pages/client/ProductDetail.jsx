import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../../axious";

function ProductDetail() {
  const { id } = useParams();
  const [productDetail, setDetail] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get(`/products/${id}`);
        console.log(data);
        setDetail(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      <section className="detail flex justify-center items-start gap-4 px-10 py-20">
        <div className="image-datail w-[400px] h-[500px]">
          <img
            src={productDetail.images}
            className="w-full h-full object-cover rounded-xl"
            alt=""
          />
        </div>
        <div className="detail-info">
          <span className="text-gray-400 text-md mb-2">
            {productDetail.category}
          </span>
          <h1 className="text-[#018294] text-2xl font-semibold mb-3">
            {productDetail.name}
          </h1>
          <div className="font-medium text-lg mb-1">
            {productDetail.price} VND
          </div>
          <p className="text-gray-400 text-md mb-3">
            {productDetail.description}
          </p>
          <div>
            <p className="font-semibold">SELECT SIZE</p>
            <div className="size-list flex justify-start items-start gap-2 mt-2 mb-3">
              {productDetail.size &&
                productDetail.size.map((sz, index) => (
                  <p
                    key={index}
                    className="size p-3 w-[10px] h-[10px] rounded-full bg-[#018294] flex justify-center items-center"
                  >
                    <span className="text-white"> {sz}</span>
                  </p>
                ))}
            </div>
            <div className="flex justify-start items-start gap-2">
              <button className="btn-favorite px-5 py-2 bg-gray-500 text-white">
                <i className="fa-solid fa-heart mr-2"></i> WISHLIST
              </button>
              <button className="btn-favorite px-5 py-2 bg-[#018294] text-white">
                <i className="fa-solid fa-cart-shopping mr-2"></i> ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductDetail;
