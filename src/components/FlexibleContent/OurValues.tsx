import Image from "next/image"
import { urlForImage } from "@/sanity/lib/utils";

export default function OurValues({ data }: any) {
  if (!data) return null

  const { title, description, items } = data

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {title && <h2 className="text-[#171717] md:text-[60px] text-4xl text-center mb-8 leading-[100%] font-gilroy-semibold lg:py-5 pb-4 pt-2">{title}</h2>}
        {description && <p className="max-w-2xl mx-auto text-gray-600 mb-12">{description}</p>}

        <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-4">
          {items?.map((item: any, idx: number) => {
            const imageUrl = item.icon &&
              urlForImage(item.icon)
                ?.width(28)
                .auto("format")
                .fit("max")
                .url();
            return (
              <div key={idx} className="bg-white border border-[#EBEBEB] rounded-2xl md:p-8 p-4">

                {imageUrl && (
                  <div className="relative block w-[28px] h-[30px] my-2 ">
                    <Image
                      src={imageUrl}
                      alt="Client"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                {/* {item.icon && (
                <Image
                  src={item.icon}
                  alt={item.title}
                  className="w-12 h-12 mx-auto mb-4 object-contain"
                />
              )} */}
                <h3 className="text-2xl text-[#171717] font-gilroy-semibold mb-3">{item.title}</h3>
                {item.subtitle && <p className="text-[#5C5C5C] text-base font3">{item.subtitle}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
