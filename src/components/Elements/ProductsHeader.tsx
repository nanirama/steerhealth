"use client";
import Link from "next/link";
import { useScrollPosition } from "./useScrollPosition";


const ProductsHeader = ({
  category,
  product,
  products,
}: {
  category: string;
  product: string;
  products: any[];
}) => {
  const isScrolled = useScrollPosition(150);

  return (
    <>
      <div
        className={`w-full z-40 transition-all duration-300 border-b border-[#EBEBEB] bg-[#F1F5FD] py-3 ${isScrolled
            ? "fixed top-0 left-0 shadow-lg bg-[#F1F5FD] animate-slideDown"
            : "relative bg-[#F1F5FD]"
          }`}
      >
        <div className="max-w-[1366px] mx-auto lg:px-10 px-4 py-3">
          <div className="flex md:flex-row flex-col gap-4 items-center justify-between">
            <h2 className="capitalize font2 text-[24px] leading-[24px] font-semibold tracking-[-0.01em] text-[#171717]">
              {category}
            </h2>
            <div className="flex md:flex-row flex-col gap-4 items-center">
              <ul className="flex flex-row gap-4 flex-wrap justify-center items-center">
                {products.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={`/products/${item.slug}`}
                      className={`text-sm text-[#5C5C5C] hover:text-[#171717] font-medium relative after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-[2px] pb-2 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] ${product === item.slug
                          ? "after:scale-x-100 after:bg-[#335CFF] text-[#171717]"
                          : "after:scale-x-0 after:bg-[#335CFF] hover:after:scale-x-100"
                        }`}
                    >
                      {item?.title}
                    </Link>
                  </li>
                ))}
              </ul>
              {/* <div className="md:block hidden">
                <Link href="/contact-us"
                  aria-label="Talk to Sales"
                  className="bg-[#335CFF] md:block hidden cursor-pointer group relative inline-flex flex-row gap-2 items-center justify-between leading-[24px] text-white font-medium rounded-[8px] py-3 px-4 text-sm"
                >
                  Talk to Sales
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductsHeader;
