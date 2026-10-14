import React from "react";
import Image from "next/image";
import ImageComponent from "../Elements/ImageComponent";
import Link from "next/link";
import { PortableText } from '@portabletext/react'
import { urlForImage } from '@/sanity/lib/utils';


const CasestudyContentSection = ({ data }: any) => {
    const { logo, about, industry, companySize, headquarters, keyFeatures, challenge, solution, results, whyItMatters, lookingAhead } = data;
    const logoUrl = logo &&
        urlForImage(logo)
          ?.width(600)
          ?.format('webp')
          ?.url();
    
      const blurLogoUrl = logo &&
        urlForImage(logo)
          ?.width(30)
          ?.blur(50)
          ?.format('webp')
          ?.url();
    return (
        <>
            <div className="w-full md:py-16 py-8 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex md:flex-row flex-col gap-10">
                        <div className="md:w-[35%] w-full">
                            <div className=" flex flex-col gap-4 p-6 bg-[#F7F7F7]">
                                <div className="relative flex max-w-[300px]">
                                    {logoUrl && blurLogoUrl && (
                                        <Image
                                            src={logoUrl}
                                            alt={"About CaseStudy"}
                                            fill
                                            className="w-full h-auto rounded-lg object-cover"
                                            sizes="100vw"
                                            placeholder="blur"
                                            blurDataURL={blurLogoUrl}
                                        />
                                    )}
                                    {/* <Image
                                            src={imageUrl}
                                            alt={title || " "}
                                            width={1600}        // aspect ratio hint
                                            height={900}        // aspect ratio hint
                                            className="w-full h-auto rounded-lg object-cover"
                                            sizes="100vw"
                                            placeholder="blur"
                                            blurDataURL={blurImageUrl}
                                          /> */}
                                </div>
                                {/* <ImageComponent
                                    src="casestudy-content-logo-img.webp"
                                    alt="Casestudy Content Logo"
                                    width={360}
                                    height={32}
                                    className="w-full"
                                    sizes="(min-width: 768px) 1200px, 100vw"
                                /> */}
                                <h3 className="text-[#171717] font-medium font3 text-base leading-[24px] uppercase">About</h3>
                                <p className="text-[#5C5C5C]  font3 text-base leading-[24px] tracking-tight md:max-w-xs">{about}</p>
                                <h3 className="text-[#171717] font-medium font3 text-base leading-[24px] uppercase">INDUSTRY</h3>
                                <p className="text-[#5C5C5C]  font3 text-base leading-[24px] tracking-tight">{industry}</p>
                                <h3 className="text-[#171717] font-medium font3 text-base leading-[24px] uppercase">Company Size</h3>
                                <p className="text-[#5C5C5C]  font3 text-base leading-[24px] tracking-tight ">{companySize}</p>
                                <h3 className="text-[#171717] font-medium font3 text-base leading-[24px] uppercase">Headquarters</h3>
                                <p className="text-[#5C5C5C]  font3 text-base leading-[24px] tracking-tight ">{headquarters}</p>
                                <h3 className="text-[#171717] font-medium font3 text-base leading-[24px] uppercase">Key features</h3>
                                <div>
                                    <PortableText value={keyFeatures}
                                        components={{
                                            list: {
                                                bullet: ({ children }) => <ul className="text-[#5C5C5C]  font3 text-base leading-[24px] tracking-tight space-y-1 list-disc list-inside">{children}</ul>,
                                            },
                                            listItem: {
                                                bullet: ({ children }) => {
                                                    return (
                                                        <li>{children}</li>
                                                    )
                                                },
                                            },
                                        }} />

                                </div>
                            </div>
                            <div className=" flex flex-col items-center gap-6 p-6 bg-[#F7F7F7] mt-6">
                                <ImageComponent
                                    src="casestudy-content-img.webp"
                                    alt="Hero Image"
                                    width={360}
                                    height={101}
                                    className="w-full"
                                    sizes="(min-width: 768px) 1200px, 100vw"
                                />
                                <h4 className="text-[#171717] font-medium font3 text-base leading-[24px] uppercase tracking-[6%]">10x Results await, Book a call Now.</h4>
                                <Link href="#" className=" bg-[#335CFF] text-center leading-[24px] text-[17px] text-white rounded-xl w-full py-3">Get this solution</Link>
                            </div>

                        </div>

                        <div className="md:w-[65%] w-full">
                            <div className="flex flex-col gap-4">
                                <div className="grid sm:grid-cols-2 md:gap-24 gap-6 border-b border-[#EBEBEB] pb-6">
                                    {challenge && (
                                        <div className="flex flex-col gap-6">
                                            <h4 className="text-[#2160FD] font-medium font3 text-xl leading-[24px] uppercase tracking-[6%]">Challenge</h4>
                                            <PortableText value={challenge}
                                                components={{
                                                    block: {
                                                        normal: ({ children }) => <p className="text-[#5C5C5C]  font3 text-base leading-[24px] tracking-tight">{children}</p>,
                                                    },
                                                    list: {
                                                        bullet: ({ children }) => <ul className="list-disc font3 text-base leading-[24px] tracking-tight list-inherit pl-5 space-y-4 text-[#5C5C5C]">{children}</ul>,
                                                    },
                                                    listItem: {
                                                        bullet: ({ children }) => {
                                                            return (
                                                                <li>{children}</li>
                                                            )
                                                        },
                                                    },
                                                }} />
                                            {/* <p className="text-[#5C5C5C]  font3 text-base leading-[24px] tracking-tight">{challenge}</p> */}
                                        </div>
                                    )}

                                    {solution && (
                                        <div className="flex flex-col gap-6">
                                            <h4 className="text-[#2160FD] font-medium font3 text-xl leading-[24px] uppercase tracking-[6%]">Solution</h4>
                                            <PortableText value={solution}
                                                components={{
                                                    block: {
                                                        normal: ({ children }) => <p className="text-[#5C5C5C]  font3 text-base leading-[24px] tracking-tight">{children}</p>,
                                                    },
                                                    list: {
                                                        bullet: ({ children }) => <ul className="list-disc font3 text-base leading-[24px] tracking-tight list-inherit pl-5 space-y-4 text-[#5C5C5C]">{children}</ul>,
                                                    },
                                                    listItem: {
                                                        bullet: ({ children }) => {
                                                            return (
                                                                <li>{children}</li>
                                                            )
                                                        },
                                                    },
                                                }} />
                                            {/* <p className="text-[#5C5C5C]  font3 text-base leading-[24px] tracking-tight sm:max-w-sm">{solution}</p> */}
                                        </div>
                                    )}

                                </div>
                                {results && (
                                   <div className="border-b border-[#EBEBEB] pb-6">
                                    <div className="flex flex-col gap-6">
                                        <h4 className="text-[#2160FD] font-medium font3 text-xl leading-[24px] uppercase tracking-[6%]">Results</h4>
                                        <PortableText value={results}
                                            components={{
                                                list: {
                                                    bullet: ({ children }) => <ul className="list-disc font3 text-base leading-[24px] tracking-tight list-inherit pl-5 space-y-4 text-[#5C5C5C]">{children}</ul>,
                                                },
                                                listItem: {
                                                    bullet: ({ children }) => {
                                                        return (
                                                            <li>{children}</li>
                                                        )
                                                    },
                                                },
                                            }} />
                                    </div>
                                </div>  
                                )}
                               
                                {whyItMatters && (
                                   <div className="flex flex-col gap-6">
                                    <h4 className="text-[#2160FD] font-medium font3 text-xl leading-[24px] uppercase tracking-[6%]">Story</h4>
                                    <PortableText value={whyItMatters}
                                        components={{
                                            block: {
                                                normal: ({ children }) => <p className="text-base text-[#5C5C5C] font3 leading-[24px]">{children}</p>,
                                            },
                                            list: {
                                                bullet: ({ children }) => <ul className="text-[#5C5C5C]  font3 text-base leading-[24px] tracking-tight space-y-1 list-disc list-inside">{children}</ul>,
                                            },
                                            listItem: {
                                                bullet: ({ children }) => {
                                                    return (
                                                        <li>{children}</li>
                                                    )
                                                },
                                            },
                                        }} />
                                </div> 
                                )}
                                
                                {lookingAhead && (
                                    <div className="flex flex-col gap-6">
                                    <h4 className="text-[#2160FD] font-medium font3 text-xl leading-[24px] uppercase tracking-[6%]">Looking Ahead</h4>
                                    <PortableText value={lookingAhead}
                                        components={{
                                            block: {
                                                normal: ({ children }) => <p className="text-base text-[#5C5C5C] font3 leading-[24px] max-w-2xl">{children}</p>,
                                            },
                                            list: {
                                                bullet: ({ children }) => <ul className="text-[#5C5C5C]  font3 text-base leading-[24px] tracking-tight space-y-1 list-disc list-inside">{children}</ul>,
                                            },
                                            listItem: {
                                                bullet: ({ children }) => {
                                                    return (
                                                        <li>{children}</li>
                                                    )
                                                },
                                            },
                                        }} />
                                </div>
                                )}
                                

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default CasestudyContentSection