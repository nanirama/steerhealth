import React from "react";
import { PortableText } from "@portabletext/react";
import EventForm from "@/components/Elements/EventForm"

export default function EventFormSection({ post }: any) {
  console.log('post', post?.hubspotFormId)

  return (
    <>
      <div className="w-full lg:max-w-[1336px] mx-auto px-4 flex md:flex-row flex-col items-start lg:gap-10 gap-5 pt-8">
        {/* Left Image */}
        <div className="md:w-1/2 w-full flex flex-col gap-1">
          <div className="w-full">
            {/* <h2 className="md:!text-[38px] text-[32px] leading-[140%] text-black font-gilroy-semibold my-3">
              {post?.name}
            </h2> */}
            {post?.formContent && (
              <PortableText
                value={post?.formContent}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="text-[#5C5C5C] leading-[140%] font3 md:text-xl text-lg  my-2">
                        {children}
                      </p>
                    ),
                    h2: ({ children }) => (
                      <h2 className="md:!text-[38px] text-[32px] leading-[120%] text-black font-gilroy-semibold my-3">
                        {children}
                      </h2>
                    )
                  }
                }}
              />
            )}
          </div>
        </div>
        <div className="md:w-1/2 w-full bg-[#ECF1FF] sm:p-2 p-4 rounded-[24px]">
          <EventForm
            selected={true}
            formId={post?.hubspotFormId}
            content={post?.formblowContent}
          />
          
        </div>
      </div>
    </>
  );
}
