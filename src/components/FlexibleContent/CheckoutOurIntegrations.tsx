import React from "react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";
import Link from "next/link";
export default function CheckoutOurIntegrations({ data, page }: any) {


  return (
    <>
      <div className="w-full py-12 bg-white">
        <div className="max-w-7xl mx-auto sm:px-8 px-4 bg-white">
          <div className="text-center sm:mb-10">
            <div className=" sm:px-8 inline-block">
              <h2 className="text-[40px]  md:text-[60px] leading-[100%] font-semibold text-[#171717] font2 mb-6 max-w-xl text-center mx-auto">
                {data?.heading}
              </h2>
              <p className="md:text-[24px] text-lg text-[#5C5C5C] leading-[32px] text-center">
                {data?.subheading}
              </p>
            </div>
          </div>



          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.allIntegrations && data?.allIntegrations.map((integration: any, index: number) => {
              if(page===integration?.slug) return false;
              const imageUrl = integration?.image &&
                urlForImage(integration?.image)
                  ?.height(102)
                  .width(102)
                  .format("webp")
                  .auto("format")
                  .fit("max")
                  .url();
              
              return (
                <div
                  key={index}
                  className={`bg-white rounded-2xl border border-[#D1D1D1] px-2 py-7`}
                >
                  <Link href={`/integrations/${integration?.slug}`}>
                    <div className="flex flex-row justify-start items-center space-x-2">
                      <div
                        className={`w-[90px] h-[90px] rounded-lg flex items-center justify-center`}
                      >
                        {imageUrl && (
                          <Image
                            src={imageUrl}
                            alt="Client"
                            width={90}
                            height={90}
                            sizes="(max-width: 768px) 90px, 90px"
                            className="object-contain w-full h-full mt-2"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl leading-[120%] font-medium text-[#171717] mb-1">{integration?.title}</h3>
                        <p className=" text-base text-[#5C5C5C] leading-[140%] font3">
                          {integration?.shortdescription}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
