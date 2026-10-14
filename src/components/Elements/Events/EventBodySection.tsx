'use client'
import React, { useState, useEffect } from "react";

import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";
import ButtonComponent from "@/components/Elements/ButtonComponent";
import { ArrowRight } from "@/components/Elements/Icons";
import ContactSalesModal from "@/components/FlexibleContent/ContactSalesModal";

export default function EventBodySection({ post }: { post: any }) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  //const [isScrolled, setIsScrolled] = useState(false);
  const [selected, setSelected] = useState(false);
  const [hubspotFormId, setHubspotFormId] = useState('');

  

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

  return (
    <>
      <main className="lg:max-w-[1366px] w-full mx-auto px-4 py-4 md:pt-4">
        <article className="prose prose-invert max-w-3xl mx-auto xl:px-4">
          {post?.body && (
            <PortableText
              value={post?.body}
              components={{
                block: {
                  normal: ({ children }) => (
                    <p className="text-[#5C5C5C] leading-[140%] font3 md:text-xl text-base  my-2 ">
                      {children}
                    </p>
                  ),
                  h2: ({ children }) => (
                    <h2 className="md:text-[36px] text-[24px] leading-[120%] max-w-2xl text-black font-gilroy-semibold my-5 ">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="md:text-[24px] text-[20px] leading-[120%] text-[#171717] font-gilroy-semibold my-4">
                      {children}
                    </h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="text-lg font-gilroy-semibold text-[#040404] mb-2">
                      {children}
                    </h4>
                  ),
                  h5: ({ children }) => (
                    <h5 className="text-lg font-medium mb-2">{children}</h5>
                  ),
                  h6: ({ children }) => (
                    <h6 className="text-base font-medium mb-2">{children}</h6>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-gray-400 pl-4 italic text-gray-600">
                      {children}
                    </blockquote>
                  ),
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="list-disc list-outside pl-6 space-y-2  my-6">
                      {children}
                    </ul>
                  ),
                  number: ({ children }) => (
                    <ol className="list-decimal list-outside pl-6 space-y-2 my-6">
                      {children}
                    </ol>
                  ),
                },
                listItem: {
                  bullet: ({ children }) => (
                    <li className="text-[#5C5C5C] leading-[120%] font3 md:text-xl text-base my-4 pl-2">
                      {children}
                    </li>
                  ),
                  number: ({ children }) => (
                    <li className="text-[#5C5C5C] leading-[120%] font3 md:text-xl text-base my-4 pl-2">
                      {children}
                    </li>
                  ),
                },
                marks: {
                  strong: ({ children }) => (
                    <strong className="text-[#040404] text-lg font3 font-semibold ">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => <em className="italic">{children}</em>,
                  underline: ({ children }) => (
                    <span className="underline">{children}</span>
                  ),
                  code: ({ children }) => (
                    <code className="bg-gray-200 text-red-600 px-1 rounded">
                      {children}
                    </code>
                  ),
                  link: ({ children, value }: any) => {
            const target = value?.openInNewTab ? "_blank" : undefined;
            const rel = value?.openInNewTab ? "noopener noreferrer" : undefined;
            return (
              <a href={value?.href} target={target} rel={rel} className="underline text-[#344ead]">
                {children}
              </a>
            );
          },
                },
                types: {
                  image: ({ value }) => {
                    console.log('post?.slugpost?.slug',post?.slug)
                    if (!value?.asset) return null;

                    const imageUrl = urlForImage(value)
                      ?.width(1200)
                      .format('webp')
                      .auto("format")
                      ?.fit('crop')?.url();
                    const blurImageUrl = urlForImage(value)
                      ?.width(20) // tiny size for blur placeholder
                      .blur(10)
                      .format('webp')
                      .auto("format")
                      .url();
                    if (!imageUrl) return null;
                    return (
                      <div className="relative">
                        <figure className="my-6">
                          <Image
                            src={imageUrl}
                            alt={value.alt || " "}
                            width={800}
                            height={500}
                            className={`"rounded-lg ${post?.slug === 'a4m-tnc' ? 'max-w-[300px]' : ''}`}
                            sizes="(max-width: 640px) 100vw,
                                        (max-width: 1024px) 80vw,
                                        800px"
                            placeholder="blur"
                            blurDataURL={blurImageUrl}
                          />
                          {value.caption && (
                            <figcaption className="text-center text-sm text-gray-500">
                              {value.caption}
                            </figcaption>
                          )}
                        </figure>
                      </div>
                    );
                  },
                  button: ({ value }) => {
                    if (value?.externalLink === 'hubspotform') {
                      return (
                        <div className="inline-flex my-4">
                          <button
                            onClick={() => {
                              setHubspotFormId(value?.hubspotFormId);
                              setSelected(true);
                            }}
                            className="border border-[#335CFF] cursor-pointer group relative text-sm text-[#171717] rounded-[8px] py-3 px-4 font-medium hover:bg-[#2F55EB] hover:text-white transition-colors">
                            {value?.buttontext}
                          </button>

                        </div>
                      )
                    } else {
                      return (
                        <div className="inline-flex my-4">
                          <ButtonComponent button={value} />
                        </div>
                      )
                    }
                  },
                  divider: () => <hr className="my-0 border-t border-gray-300" />,
                  speakersSection: ({ value }) => (
                    <section className="my-6">
                      <div className="grid gap-6 grid-cols-2 md:grid-cols-3">
                        {value.speakers?.map((speaker: any, i: number) => {
                          const speakerImageUrl =
                            speaker?.image &&
                            urlForImage(speaker?.image)
                              ?.height(822)
                              ?.width(708)
                              .format("webp")
                              ?.fit("crop")
                              ?.url();

                          return (
                            <div key={i} className="text-center">
                              {speakerImageUrl && (
                                <Image
                                  src={speakerImageUrl}
                                  alt={speaker.image.alt || speaker.name}
                                  width={354}
                                  height={411}
                                  className="rounded-[12px] mx-auto mb-4"
                                />
                              )}
                              <h3 className="font-semibold text-lg font3 text-black">
                                {speaker.name}
                              </h3>
                              <div className="flex flex-col gap-1 items-center justify-center">
                                {speaker.role && <p>{speaker.role}</p>}
                                {speaker.company && (
                                  <p className="text-black font3 text-base">
                                    {speaker.company}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  ),
                },
              }}
            />
          )}

          {post?.eventCta && (
            <section className="blog-cta rounded-xl text-left! p-6! my-10 flex flex-col items-start justify-stretch">
              {post?.eventCta?.ctaHeading && (
                <h2 className="text-2xl text-[#171717] leading-[120%] font-bold font2 mb-2 sm:pt-2 pt2">
                  {post?.eventCta?.ctaHeading}
                </h2>
              )}
              {post?.eventCta?.ctaSubHeading && (
                <h3 className="text-base text-black text-left! leading-[140%] font3 my-4">
                  {post?.eventCta?.ctaSubHeading}
                </h3>
              )}
              {post?.eventCta?.button && post?.eventCta?.button?.text && (
                <button
                  onClick={() => setSelected(true)}
                  className="inline-flex items-center justify-center gap-4 bg-[#2662F0] hover:bg-[#3B82F6] text-white text-[17px] px-6 py-3 rounded-[12px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#2662F0] focus:ring-offset-2 focus:ring-offset-[#111316]"
                >
                  {post?.eventCta?.button?.text}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </section>
          )}
        </article>
      </main>
      {selected && hubspotFormId && <ContactSalesModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleModalToggle={handleModalToggle}
        selected={selected}
        hubspotFormId={hubspotFormId}
      />}
    </>
  );
}
