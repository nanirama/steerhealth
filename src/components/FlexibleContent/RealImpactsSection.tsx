import React from "react";
import { PortableText } from "next-sanity";
import CustomCounter from "../Elements/CustomCounter";

export default function RealImpactsSection({ data }: any) {
  const { metrics } = data;

  return (
    <section className="bg-white py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 grid-cols-1 md:gap-14 gap-8 items-center">
        <div>
          <PortableText value={data?.heading}
            components={{
              block: {
                normal: ({ children }) => <h2 className="md:text-[60px] text-[40px] font-semibold text-gray-900 leading-[100%] lg:text-left text-center">{children}</h2>,
              },
            }} />
        </div>

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4   ">
          {metrics && metrics.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className="text-center bg-gray-50 rounded-lg md:p-10 p-8 shadow-sm"
              >
                <h2 className="text-[#335CFF] text-[60px] font-semibold font2">
                  <CustomCounter count={item.value} suffix={item.suffix} />
                </h2>
                <div className="text-xl  text-[#0A0D14] mt-1 font-normal leading-[140%] font2">{item.description}</div>
              </div>
            )
          })}
       
        </div>
      </div>
    </section>
  );
}
