import React from "react";
import Image from "next/image";
import { PortableText } from '@portabletext/react';
import { urlForImage } from "@/sanity/lib/utils";
import ContactForm from "@/components/Elements/ContactForm";
 
const ContactSection = ({ data }) => {
    return (
        <>
            <section className="bg-[#f7f7f7] md:py-20 py-10 px-4 contact_hero md:relative">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 grid-cols-1 gap-10 md:items-stretch items-stretch justify-between z-10 relative">
                    {/* Left Side - Text + Stats */}
                    <div className="mx-auto flex flex-col items-center justify-start">
                        <div>
                        <PortableText value={data?.heading}
                            components={{
                                block: {
                                    normal: ({ children }) => <h1 className="md:max-w-full max-w-[265px] mx-auto  md:text-[60px] text-[40px] text-[#171717] md:text-left text-center font-gilroy-semibold tracking-tighter leading-[100%]">{children}</h1>,
                                },
                                marks: {
                                     textColor: ({ children, value }) => {
                                        return getGradientTextColor(children, value)
                                    },
                                    em: ({ children }) => <i className="bg-gradient-to-r from-[#6FCAFF] via-[#3591FA] to-[#0030A6] bg-clip-text text-transparent">{children}</i>,
                                },
                            }} />
 
                        {data?.description && (
                            <p className="text-base leading-[140%] text-[#535862] md:pt-4 py-2 mt-4 md:text-left text-center">{data?.description}</p>
                        )}
 
                        <p className="mb-8  text-base font-bold md:text-left text-center">
                            {data?.preferToTalk}{" "}
                            <a href={`tel:${data?.phoneNumber}`} className="text-[#2160FD] text-base font-bold">
                                {data?.phoneNumber}
                            </a>
                        </p>
                        </div>
 
                        {/* Stats Grid */}
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 md:mt-12 mt-6 sm:mx-0 mx-8">
                            {data?.stats && data?.stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-[16px] p-4 flex flex-col items-center text-center h-full justify-center"
                                >
                                    <p className="text-[48px] font-space-grotesk-regular tracking-[-3%] bg-gradient-to-b from-[#6FCAFF] via-[#3591FA] to-[#0030A6] bg-clip-text text-transparent ">{stat?.prefix}{stat.value}{stat?.suffix}</p>
                                    <p className="text-base text-[#5C5C5C] font3 mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
 
                    {/* Right Side - Form */}
                    <div className="bg-white rounded-md px-4 py-4 w-full">
                        {/* <h3 className="text-lg font-medium mb-4 text-[#262626]">Get in Touch</h3> */}
                    
                        <ContactForm selected={true} formId={data?.hubspotFormId || ""} />
                    </div>
                </div>
            </section>
            <section className="md:py-24 py-16 px-4 md:px-10 lg:px-16 bg-white">
                <div className="max-w-6xl mx-auto text-center mb-10">
                    <h2 className="text-3xl md:text-[60px] text-[#171717] font-semibold">General Inquiries</h2>
                </div>
 
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto ">
                    {data?.items && data?.items.map((item, index) => {
                        const imageUrl = item?.icon &&
                            urlForImage(item?.icon)
                                ?.height(43)
                                .width(47)
                                .format("webp")
                                .auto("format")
                                .fit("max")
                                .url();
 
                        return (
                            <div
                                key={index}
                                className="bg-gray-50 rounded-xl px-6 py-8 text-center shadow-sm"
                            >
                                <div className="flex justify-center mb-4">
                                    <div className="w-12 h-12 rounded-full bg-white border border-blue-200 flex items-center justify-center">
                                        {imageUrl && (
                                            <Image
                                                src={imageUrl}
                                                alt="Client"
                                                width={47}
                                                height={43}
                                                sizes="(max-width: 768px) 28px, 28px"
                                                className="object-contain w-full m-3"
                                            />
                                        )}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-medium font2  text-[#171717]">
                                    {item.title}
                                </h3>
                                <p className="text-base text-[#5C5C5C] font3 mt-3 max-w-64 mx-auto">{item.description}</p>
                            </div>
                        )
                    })}
                </div>
            </section>
        </>
    );
};
 
// Tailwind Input Style (Utility Component Style - optional)
const inputFieldStyles =
    "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
 
// Optional: Add this as a global style or via Tailwind plugin/component library
// or replace `className="input-field"` with `className={inputFieldStyles}` directly
 
export default ContactSection;