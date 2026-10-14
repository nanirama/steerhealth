import React from "react";
import BlogCard2 from "../Elements/Blog/BlogCard2";
import ButtonComponent from "../Elements/ButtonComponent";


// const formatDate = (dateStr: string) => {
//   const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
//   return new Date(dateStr).toLocaleDateString("en-US", options);
// };

export default function BlogSection({ data }: any) {

  const { blogPosts } = data;


  return (
    <section className="bg-white w-full py-16 px-4 ">
      <div className="max-w-7xl mx-auto">

        {data?.heading && (
          <h2 className="text-[#171717] md:text-[60px] text-4xl leading-[100%] font-semibold text-center font2">{data?.heading}</h2>
        )}
        {data?.subheading && (
          <h3 className="text-2xl text-[#5C5C5C] font3 leading-[140%] max-w-4xl mx-auto text-center pt-6">{data?.subheading}</h3>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 my-10">
          {blogPosts && blogPosts.map((item: any, index: number) => {
            return (
              <div key={index} className="bg-white rounded-lg mb-6">
                <BlogCard2 post={item} />
              </div>
            )
          })}
        </div>

        <div className="mx-auto my-8 flex justify-center items-center text-center">
          {data?.ctaButtonPrimary && (
            <ButtonComponent button={data?.ctaButtonPrimary} />
          )}
          {/* <Link href="/blog" className="bg-[#171717] mx-auto text-center cursor-pointer group relative items-center justify-between leading-[24px] text-white font-medium rounded-[8px] py-3 px-4 text-sm">Check it Out</Link> */}
        </div>
      </div>
    </section>
  );
}
