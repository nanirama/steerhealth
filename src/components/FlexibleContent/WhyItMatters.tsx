import Image from "next/image"
import { urlForImage } from "@/sanity/lib/utils";
export default function WhyItMatters({ data }: any) {
  if (!data) return null

  const { heading, subheading, features } = data

  return (
    <section className="lg:py-20 py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {heading && <h2 className="text-[#171717] md:text-[60px] text-4xl text-center mb-8 leading-[100%] font-gilroy-semibold pt-2">{heading}</h2>}
        {subheading && <p className="max-w-2xl mx-auto text-gray-600 mb-8">{subheading}</p>}

        <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-4">
          {features?.map((feature: any, idx: number) => {
            const imageUrl = feature.icon &&
              urlForImage(feature.icon)
                ?.width(25)
                .auto("format")
                .fit("max")
                .url();
            return (
              <div key={idx} className="p-6 rounded-2xl">
                <div className="border border-[#EBEBEB] shadow-[0px_4px_7px_0px_#00000012] flex justify-center items-center rounded-[8px] w-[48px] h-[48px] mx-auto mb-4">
                  {imageUrl && (
                    <div
                      className={`relative block my-2 ${idx === 1 ? "w-[15px] h-[20px]" : "w-[28px] h-[30px]"
                        }`}
                    >
                      <Image
                        src={imageUrl}
                        alt="Client"
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
                <h3 className="text-2xl text-[#0A0D14] font-gilroy-medium mb-3">{feature.title}</h3>
                <p className={`text-[#5C5C5C] text-base font3 ${idx === 0 || idx === 1 ? "max-w-[180px] mx-auto" : ""}`}>{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>

  )
}
