import React from "react";
// import pricing_01 from "../../assets/images";
function Pricing() {
  return (
    <>
      <div>
        <section className="products mx-auto w-full md:w-3/4 py-5 px-7 mt-10">
          <div className="title text-center">
            <h1 className="title-block text-4xl font-semibold">
              Simple pricing
            </h1>
            <p className="sub-title mt-3 text-gray-400 text-wrap">
              No credit card required. Cancel any time.
            </p>
          </div>
          <div className="pricing bg-white w-full h-[550px] flex justify-between items-center gap-6 rounded-xl shadow-2xl  mx-auto mt-40">
            <div className="pricing_first w-1/3 px-10 py-6 rounded-xl">
              <div className="img_pricing flex justify-start items-center gap-3">
                <img
                  src="/pricing_01.png"
                  className="w-[60px] object-fill"
                  alt
                />
                <div className="price text-3xl font-semibold">Free</div>
              </div>
              <p className="decs_price text-sm text-gray-500 my-3">
                Starter plan to manage your one category and try everything
                Sortler has to offer
              </p>
              <div className="choose_price text-center">
                <div className="price mb-5 text-gray-500">
                  $<span className="text-black text-3xl font-semibold">0</span>
                  /free forever
                </div>
                <button className="rounded-3xl bg-[#F7D047] px-7 py-2 w-full text-lg">
                  Book a Demo
                </button>
              </div>
              <div className="advance">
                <ul className="flex flex-col gap-3 mt-10">
                  <li className="flex justify-start items-center gap-2">
                    <img src="/up.png" className="w-[15px]" alt />
                    <span className="text-gray-500 text-[15px]">
                      Up to 1K products included
                    </span>
                  </li>
                  <li className="flex justify-start items-center gap-2">
                    <img src="/up.png" className="w-[15px]" alt />
                    <span className="text-gray-500 text-[15px]">
                      1 category included
                    </span>
                  </li>
                  <li className="flex justify-start items-center gap-2">
                    <img src="/up.png" className="w-[15px]" alt />
                    <span className="text-gray-500 text-[15px]">
                      1 staff account included
                    </span>
                  </li>
                  <li className="flex justify-start items-center gap-2">
                    <img src="/up.png" className="w-[15px]" alt />
                    <span className="text-gray-500 text-[15px]">
                      Indexation: ones a day
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="pricing_second w-1/3 px-10 py-6 rounded-xl bg-[#028193] shadow-2xl z-30 mb-60">
              <div className="img_pricing flex justify-start items-center gap-3">
                <img src="/pricing2.png" className="w-[60px] object-fill" alt />
                <div className="price text-3xl text-white font-semibold">
                  Business
                </div>
              </div>
              <p className="decs_price text-sm text-gray-200 my-3">
                More power with thouthands products and dozens of categories
              </p>
              <div className="choose_price text-center">
                <div className="price mb-5 text-gray-200">
                  $<span className="text-white text-3xl font-semibold">39</span>
                  /month billed monthly
                </div>
                <button className="rounded-3xl bg-[#F7D047] px-7 py-2 w-full text-lg">
                  Book a Demo
                </button>
              </div>
              <div className="advance">
                <ul className="flex flex-col gap-3 mt-10">
                  <li className="flex justify-start items-center gap-2">
                    <img src="/up.png" className="w-[15px]" alt />
                    <span className="text-gray-200 text-[15px]">
                      Up to 100k products included
                    </span>
                  </li>
                  <li className="flex justify-start items-center gap-2">
                    <img src="/up.png" className="w-[15px]" alt />
                    <span className="text-gray-200 text-[15px]">
                      Up to 50 category included
                    </span>
                  </li>
                  <li className="flex justify-start items-center gap-2">
                    <img src="/up.png" className="w-[15px]" alt />
                    <span className="text-gray-200 text-[15px]">
                      3 staff account included
                    </span>
                  </li>
                  <li className="flex justify-start items-center gap-2">
                    <img src="/up.png" className="w-[15px]" alt />
                    <span className="text-gray-200 text-[15px]">
                      3 staff account included
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="pricing_third w-1/3 px-10 py-6 rounded-xl">
              <div className="img_pricing flex justify-start items-center gap-3">
                <img src="/pricing3.png" className="w-[60px] object-fill" alt />
                <div className="price text-3xl font-semibold">Advanced</div>
              </div>
              <p className="decs_price text-sm text-gray-500 my-3">
                A lot of categories and products, premium support and more...
              </p>
              <div className="choose_price text-center">
                <div className="price mb-5 text-gray-500">
                  $<span className="text-black text-3xl font-semibold">99</span>
                  /month billed monthly
                </div>
                <button className="rounded-3xl bg-[#F7D047] px-7 py-2 w-full text-lg">
                  Book a Demo
                </button>
              </div>
              <div className="advance">
                <ul className="flex flex-col gap-3 mt-10">
                  <li className="flex justify-start items-center gap-2">
                    <img src="/up.png" className="w-[15px]" alt />
                    <span className="text-gray-500 text-[15px]">
                      Up to 200k products included
                    </span>
                  </li>
                  <li className="flex justify-start items-center gap-2">
                    <img src="/up.png" className="w-[15px]" alt />
                    <span className="text-gray-500 text-[15px]">
                      Up to 100 category included
                    </span>
                  </li>
                  <li className="flex justify-start items-center gap-2">
                    <img src="/up.png" className="w-[15px]" alt />
                    <span className="text-gray-500 text-[15px]">
                      5 staff account included
                    </span>
                  </li>
                  <li className="flex justify-start items-center gap-2">
                    <img src="/up.png" className="w-[15px]" alt />
                    <span className="text-gray-500 text-[15px]">
                      Indexation: each hour
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="footer-product-page mx-auto w-11/12 md:w-3/4 mt-20 mb-20 text-center">
          <p className="title-footer text-4xl font-semibold">
            All eCommerce CMS platforms supported
          </p>
          <p className="text-sm text-gray-400 mt-3">
            Magento 2, Shopify, WooCommerce, BigCommerce, Opencart and more.
          </p>
          <div className="brand flex flex-col md:flex-row md:justify-between items-center mt-10">
            <img src="/Brand1.png" alt className="py-3 md:py-0 w-[170px]" />
            <img src="/Brand2.png" alt className="py-3 md:py-0 w-[170px]" />
            <img src="/Brand3.png" alt className="py-3 md:py-0 w-[170px]" />
            <img src="/Brand4.png" alt className="py-3 md:py-0 w-[170px]" />
            <img src="/Brand5.png" alt className="py-3 md:py-0 w-[170px]" />
          </div>
          <div className="banner-footer flex justify-center mt-20">
            <img src="/BannerFooter.png" alt />
          </div>
          <div className="nav-footer flex flex-wrap justify-between mt-10">
            <div className="logo">
              <img src="/Logo.png" alt />
            </div>
            <div className="menu-footer">
              <ul className="flex flex-wrap justify-between gap-4 mx-2 my-1 text-gray-400">
                <li>Pricing</li>
                <li>Company</li>
                <li>About us</li>
                <li>Contact us</li>
              </ul>
            </div>
            <div className="social-icon sm:mt-4 md:mt-4">
              <img src="/Social Icon.png" alt />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Pricing;
