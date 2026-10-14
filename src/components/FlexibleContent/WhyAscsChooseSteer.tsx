import Image from "next/image"
import { urlForImage } from "@/sanity/lib/utils"
import { PortableText } from '@portabletext/react'

interface WhyAscsItem {
  _key: string
  icon?: any
  title: string
  subtitle?: string
}

interface WhyAscsChooseSteerProps {
  data: {
    heading: any[]
    description?: string
    items: WhyAscsItem[]
  }
}

export default function WhyAscsChooseSteer({ data }: any) {
  if (!data) return null

  const { heading, description, items } = data

  return (
    <section className="bg-[#F7F7F7] px-4 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        {heading && (
          <div className="mb-8 text-center">
            <PortableText
              value={heading}
              components={{
                block: {
                  normal: ({ children }) => (
                    <h2 className="xl:text-[56px] sm:text-[40px] text-[30px] font-bold leading-tight font2 text-[#171717]">
                      {children}
                    </h2>
                  ),
                },
                marks: {
                  strong: ({ children }) => (
                    <span className="italic font1 pr-2 font-medium bg-gradient-to-r from-[#6FCAFF] via-[#3591FA] to-[#0030A6] bg-clip-text text-transparent false">{children}</span>
                  ),
                },
              }}
            />
          </div>
        )}

        {/* Description */}
        {description && (
          <p className="mx-auto mb-12 max-w-3xl text-center text-gray-600">
            {description}
          </p>
        )}

        {/* Items Grid */}
        <div className="grid md:gap-8 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items?.map((item: any, idx: number) => {
            const imageUrl = item.icon &&
              urlForImage(item?.icon)
                ?.height(35)
                .width(35)
                .format("webp")
                .auto("format")
                .fit("max")
                .url();
            return (
              <div key={idx} className="rounded-2xl  bg-white p-6 transition-shadow hover:shadow-md flex flex-col gap-4">
                {item.icon && (
                  <div className="flex h-[36px] w-[36px] flex-shrink-0 items-center justify-center">
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt="Client"
                          width={28}
                          height={28}
                          sizes="(max-width: 768px) 28px, 28px"
                          className="object-contain w-full"
                        />
                      )}
                  </div>
                )}
                <h3 className="font2 sm:text-2xl text-xl font-semibold text-[#171717] max-w-xs ">
                  {item.title}
                </h3>
                <p className="text-base leading-relaxed text-[#5c5c5c] pt-4 border-t border-[#EFEFEF]">
                  {item.subtitle}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}