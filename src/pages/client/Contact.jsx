import React from "react";

function Contact() {
  return (
    <>
      <div>
        <section className="products mx-auto w-full md:w-3/4 px-5 py-5 mt-9">
          <div className="title-blog text-center mb-10">
            <h1 className="title-block text-4xl font-semibold">
              Contact With Us
            </h1>
            <p className="sub-title mt-3 text-gray-600 text-wrap">
              The right move at the right time saves your investment. live the
              dream of expanding your business.
            </p>
          </div>
          <div className="w-full flex justify-center my-4">
            <form className="form-contact w-full mx-auto">
              <div className="input-contact">
                <div className="mb-5 flex justify-between items-center gap-7">
                  <input
                    type="text"
                    placeholder="First name"
                    className="px-5 py-3 w-full"
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    className="px-5 py-3 w-full"
                  />
                </div>
                <div className="mb-5 flex justify-between items-center gap-7">
                  <input
                    type="text"
                    placeholder="Your email"
                    className="px-5 py-3 w-full"
                  />
                  <input
                    type="text"
                    placeholder="Phone number"
                    className="px-5 py-3 w-full"
                  />
                </div>
                <div className="mb-5">
                  <textarea
                    name
                    id
                    placeholder="Tell us about yourself"
                    className="w-full h-32 px-5 py-3"
                    defaultValue={""}
                  />
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button className="btn-more bg-[#018294] text-white text-center mx-auto px-5 py-2">
                  Contact us
                </button>
              </div>
            </form>
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

export default Contact;
