import React from "react";

function About() {
  return (
    <>
      <div className="about flex justify-between items-center flex-col gap-3 py-5">
        <h1 className="text-center text-3xl font-semibold">About us</h1>
        <div className=" about-banner flex justify-between items-center gap-5 px-10 py-5 mb-5">
          <div className="banner-content  flex justify-between items-start flex-col gap-3 w-1/2">
            <h2 className="about-banner-title text-5xl font-medium leading-relaxed">
              Welcome to{" "}
              <span className="text-white bg-[#018294] px-2 py-1">
                smaller online shop.
              </span>
            </h2>
            <p className="banner-desc">
              We serve all kind of legal ,original, authentic products,
              specially clothing, cosmetics, extra ordinary electronics devices,
              any kind of leather goods like. We serve all kind of legal
              ,original, authentic products, specially clothing, cosmetics,
              extra ordinary electronics devices, any kind of leather goods like{" "}
            </p>
            <div className="but px-4 py-2 bg-[#018294] text-white">
              Learn More
            </div>
          </div>
          <div className="banner-image w-1/2">
            <img src="/Image-banner-about.png" alt="" />
          </div>
        </div>
        <div className="member flex justify-between items-center flex-col gap-3 py-5">
          <h2 className="mamber-title text-4xl font-semibold mb-4">
            OUR TEAM Members
          </h2>
          <div className="member-list flex justify-between items-center gap-5">
            <div className="member-item text-center bg-white rounded-3xl">
              <div className="item-image p-3 ">
                <img src="/Rectangle10.png" alt="" />
              </div>
              <h3 className="item-name text-xl font-medium">BESSIE COOPER</h3>
              <p className="item-role text-gray-500">Marketing Expert</p>
              <img src="/Social1.png" className="mx-auto mt-3 mb-5" alt="" />
            </div>
            <div className="member-item text-center bg-white rounded-3xl">
              <div className="item-image p-3 ">
                <img src="/Rectangle11.png" alt="" />
              </div>
              <h3 className="item-name text-xl font-medium">JENNIE WILSON</h3>
              <p className="item-role text-gray-500">Shop Manager</p>
              <img src="/Social1.png" className="mx-auto mt-3 mb-5" alt="" />
            </div>
            <div className="member-item text-center bg-white rounded-3xl">
              <div className="item-image p-3 ">
                <img src="/Rectangle12.png" alt="" />
              </div>
              <h3 className="item-name text-xl font-medium">BESSIE COOPER</h3>
              <p className="item-role text-gray-500">Marketing Expert</p>
              <img src="/Social1.png" className="mx-auto mt-3 mb-5" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
