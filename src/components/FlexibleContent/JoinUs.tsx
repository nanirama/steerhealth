
import Link from "next/link"
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";

export default function JoinUs({ data }: any) {
  if (!data) return null

  const { title, subtitle, cards, buttonText, buttonLink } = data

  return (
    <>
      <div className="w-full sm:pt-16 pt-4 bg-white pb-10">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="flex flex-col gap-2 items-center justify-center ">
            {title && <h2 className="md:text-[36px] text-[32px] leading-[120%] text-[#181D27] text-center font-gilroy-semibold tracking-[-2%] mb-4">{title}</h2>}
            {subtitle && <h2 className="md:text-xl text-base leading-[140%] text-[#535862] text-center font3">{subtitle}</h2>}
          </div>

          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-10 gap-4 pb-8 pt-10">
            {cards?.map((card: any, idx: number) => {
              const imageUrl = card.icon &&
                urlForImage(card.icon)
                  ?.width(42)
                  .auto("format")
                  .fit("max")
                  .url();
              return (
                <div key={idx} className="p-6 rounded-2xl">
                  <div className="mx-auto mb-4">
                    {imageUrl && (
                      <div className="relative block w-[42px] h-[50px] my-2 text-center mx-auto">
                        <Image
                          src={imageUrl}
                          alt="Client"
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>
                  <h3 className="text-2xl text-[#0A0D14] font-gilroy-medium mb-3 text-center">{card.title}</h3>
                  <p className="text-[#5C5C5C] text-base font3 text-center">{card.description}</p>
                </div>
              )
            })}          
          </div>
          <div className="flex justify-center">
            <Link href="/contact-us" className="text-white text-center bg-[#335CFF] rounded-xl cursor-pointer px-4 py-3 ">Get Support</Link>
          </div>
        </div>
      </div>

    </>
    // <section className="py-20 bg-white">
    //   <div className="container mx-auto px-4 text-center">
    //     {/* Heading */}
    //     {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
    //     {subtitle && <p className="max-w-2xl mx-auto text-gray-600 mb-12">{subtitle}</p>}

    //     {/* Cards */}
    //     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
    //       {cards?.map((card:any, idx:number) => (
    //         <div key={idx} className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition">
    //           {card.icon && (
    //             <img
    //               src={card.icon}
    //               alt={card.title}
    //               className="w-12 h-12 mx-auto mb-4 object-contain"
    //             />
    //           )}
    //           <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
    //           <p className="text-gray-600 mb-4">{card.description}</p>
    //           {card.linkText && card.linkUrl && (
    //             <a
    //               href={card.linkUrl}
    //               className="text-blue-600 font-medium hover:underline"
    //             >
    //               {card.linkText}
    //             </a>
    //           )}
    //         </div>
    //       ))}
    //     </div>

    //     {/* CTA */}
    //     {buttonText && buttonLink && (
    //       <a
    //         href={buttonLink}
    //         className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
    //       >
    //         {buttonText}
    //       </a>
    //     )}
    //   </div>
    // </section>
  )
}
