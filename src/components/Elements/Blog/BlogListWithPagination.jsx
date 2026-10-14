'use client';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import BlogCard from "./BlogCard";

import BlogLargeCard from "@/components/Elements/Blog/BlogLargeCard";
import BlogMediumCard from "@/components/Elements/Blog/BlogMediumCard";



const BlogListWithPagination = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 5;
  const maxPagesToShow = 5;
  const sectionRef = useRef(null); // 👈 Ref for scroll target

  const totalPages = Math.ceil(data.length / POSTS_PER_PAGE);

  const paginatedPosts = data.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);

      // Delay scroll to ensure DOM updates after pagination
      // setTimeout(() => {
      //   const sectionTop = document.getElementById("blog-section")?.offsetTop || 0;
      //   window.scrollTo({
      //     top: sectionTop - 140, // scroll offset of 50px from top
      //     behavior: "smooth",
      //   });
      // }, 100); // small delay to ensure render
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const sectionTop = document.getElementById("blog-section")?.offsetTop || 0;
          window.scrollTo({
            top: sectionTop - 140,
            behavior: "smooth",
          });
        });
      });
    }
  };

  const getPageNumbers = () => {
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const [firstItem, ...remainingItems] = paginatedPosts;
  return (
    <>
      {/* 👇 Scroll Target */}
      <div className="w-full px-4" id="blog-section" ref={sectionRef}>
        <BlogLargeCard
          title={firstItem?.title}
          category={firstItem?.categories && firstItem?.categories[0] && firstItem?.categories[0]?.title}
          publishedAt={firstItem?.publishedAt}
          image={firstItem?.mainImage}
          imageAlt={firstItem?.title}
          href={firstItem?.slug}
          className="p-0" />
        <div className="w-full py-12">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {remainingItems && remainingItems.map((item, index) => (
                <div className="w-full" key={index}>
                  <BlogMediumCard
                    title={item?.title}
                    category={item?.categories && item?.categories[0] && item?.categories[0]?.title}
                    publishedAt={dayjs(item?.publishedAt).format('MMMM D, YYYY')}
                    image={item?.mainImage}
                    imageAlt={item?.title}
                    href={item?.slug}
                    className="p-0"
                  />
                </div>
              ))}
            

            </div>
          </div>
        </div>


        {data.length > POSTS_PER_PAGE && (
          <div className="flex gap-2 items-center justify-center md:my-16 my-8 w-full mx-auto">
            <button
              aria-label='Previous Page'
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="border cursor-pointer border-[#D1D1D1]/40 hover:border-[#335CFF] !text-[#a5a2a3] rounded-full w-[40px] h-[40px] flex justify-center items-center disabled:opacity-50"
            >
              <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.72154 5.33327L6.29754 1.75726L5.35474 0.814453L0.169271 5.99993L5.35474 11.1853L6.29754 10.2425L2.72154 6.6666H10.8359V5.33327H2.72154Z" fill="#1D1718" />
              </svg>
            </button>

            {getPageNumbers().map((page) => (
              <button
                aria-label={`Page ${page}`}
                key={page}
                onClick={() => goToPage(page)}
                className={`border cursor-pointer border-[#D1D1D1]/40 rounded-full w-[40px] h-[40px] flex justify-center items-center transition-colors duration-200
              hover:border-[#1D1718]
              ${currentPage === page ? "text-[#335CFF] !border-[#335CFF]" : "text-[#1D1718]"}`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="border cursor-pointer border-[#D1D1D1]/40 hover:border-[#335CFF] rounded-full w-[40px] h-[40px] flex justify-center items-center disabled:opacity-50"
            >
              <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.27846 5.33327L4.70246 1.75726L5.64526 0.814453L10.8307 5.99993L5.64526 11.1853L4.70246 10.2425L8.27846 6.6666H0.164062V5.33327H8.27846Z" fill="#1D1718" />
              </svg>
            </button>
          </div>
        )}
        
      </div>
    </>
  );
};

export default BlogListWithPagination;
