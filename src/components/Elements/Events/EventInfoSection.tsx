'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import EventMetaBar from "@/components/Elements/Events/EventMetaBar";
import ContactSalesModal from "@/components/FlexibleContent/ContactSalesModal";
import { formatEventDate } from "@/lib/index";
// import ButtonComponent from "@/components/Elements/ButtonComponent"; 

export default function EventInfoSection({ post, featuredImageUrl, pageUrl }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //const [isScrolled, setIsScrolled] = useState(false);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (isModalOpen !== undefined) {
      setSelected(isModalOpen);
    }
  }, [isModalOpen]);

  const handleModalToggle = (open: any) => {
    setSelected(open);
    if (setIsModalOpen) {
      setIsModalOpen(open);
    }
  };
  const formattedDate = formatEventDate(post?.startDate, post?.endDate);
  return (
    <>
      <div className="w-full lg:max-w-[1336px] mx-auto px-4 flex md:flex-row flex-col lg:items-center items-start lg:gap-10 gap-5 pt-8">
        {/* Left Image */}
        <div className="md:w-1/2 w-full bg-[#ECF1FF] sm:p-6 p-4 rounded-[24px]">
          {featuredImageUrl && (
            <Image
              src={featuredImageUrl}
              alt={post?.mainImage?.alt || "Event Image"}
              width={800}
              height={497}
              className="z-20 w-full rounded-[24px]"
              priority
              placeholder="blur"
              blurDataURL={featuredImageUrl}
              sizes="
              (min-width: 1280px) 800px,
              (min-width: 1024px) 700px,
              (min-width: 768px) 600px,
              100vw
            "
            />
          )}
        </div>

        <div className="md:w-1/2 w-full flex flex-col gap-4">
          <span className="font-medium text-xs text-[#818181]">NEW EVENT</span>
          <h2 className="md:!text-[36px] text-[26px] leading-[120%] max-w-md text-black font-gilroy-semibold">
            {post?.name}
          </h2>
          <div className="flex flex-col gap-0">
            {formattedDate && (
              <h3 className="font3 text-[#535862] leading-[140%] text-xl m-0 p-0">
                {formattedDate}
              </h3>
            )}
            {post?.address && (
              <h3 className="font3 text-[#535862] leading-[140%] text-xl max-w-60 m-0 p-0">
                {post.address}
              </h3>
            )}

          </div>
          {post?.expert && (
            <p className="text-base text-[#808080] font3 max-w-md">
              {post.expert}
            </p>
          )}

          <div className="flex w-full lg:flex-row flex-col gap-4 justify-between mb-6">

            <div>
              <div
                onClick={() => setSelected(true)}
                aria-label="Register Now"
                className="inline-flex items-center justify-center rounded-[8px] transition-all duration-200 bg-[#335CFF] cursor-pointer group relative flex-row gap-2 leading-[24px] text-white font-medium py-3 md:px-4 px-2 text-sm"
              >
                {post?.registrationLinkText ? post?.registrationLinkText : 'Book a breakout room'}
                <div className="relative ml-1 h-5 w-5 overflow-hidden">
                  <div className="absolute transition-all duration-200 group-hover:-translate-y-5 group-hover:translate-x-4">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                    >
                      <path
                        d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 -translate-x-4"
                    >
                      <path
                        d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <EventMetaBar title={post?.title} url={pageUrl} />
          </div>
        </div>
      </div>
      {selected && <ContactSalesModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleModalToggle={handleModalToggle}
        selected={selected}
        hubspotFormId={post?.hubspotFormId}
      />}
    </>
  );
}
