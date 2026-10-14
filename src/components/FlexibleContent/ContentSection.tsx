import React from 'react';
import { PortableText } from '@portabletext/react';
import { urlForImage } from '@/sanity/lib/utils';

const ContentSection = ({ data }: any) => {
    return (
        <section className="w-full bg-white py-4 px-4 page_content">
            <div className="max-w-7xl mx-auto">
                {data?.content && <PortableText value={data?.content} components={{
                    block: {
                        normal: ({ children }) => <p className="text-base leading-[24px] font-normal text-[#5C5C5C] mb-4 font3">{children}</p>,
                        h2: ({ children }) => <h2 className="text-base text-[#5C5C5C] leading-[100%] font-bold mt-5 mb-[6px] py-0">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-base text-[#5C5C5C] leading-[100%] font-bold mt-5 mb-[6px] py-0">{children}</h3>,
                        h4: ({ children }) => <h4 className="text-xl text-[#5C5C5C] font-medium mb-2">{children}</h4>,
                        h5: ({ children }) => <h5 className="text-lg text-[#5C5C5C] font-medium mb-2">{children}</h5>,
                        h6: ({ children }) => <h6 className="text-base text-[#5C5C5C] font-medium mb-2">{children}</h6>,
                        blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-gray-400 pl-4 italic text-gray-600">
                                {children}
                            </blockquote>
                        ),
                    },
                    list: {
                        bullet: ({ children }) => (
                            <ul className="list-disc py-0 !mt-[6px] mb-4">{children}</ul>
                        ),
                        number: ({ children }) => (
                            <ol className="list-decimal !mt-[6px] mb-4">{children}</ol>
                        ),
                    },

                    listItem: {
                        bullet: ({ children }) => (
                            <li className="text-base text-[#5C5C5C] py-[5px] leading-[24px] ">{children}</li>
                        ),
                        number: ({ children }) => (
                            <li className="text-base text-[#5C5C5C] py-[5px] leading-[24px] ">{children}</li>
                        ),
                    },

                    marks: {
                        strong: ({ children }) => <strong className="text-base text-[#5C5C5C] leading-[100%] font-bold">{children}</strong>,
                        em: ({ children }) => <em className="italic">{children}</em>,
                        underline: ({ children }) => <span className="underline">{children}</span>,
                        code: ({ children }) => (
                            <code className="bg-gray-200 text-red-600 px-1 rounded">{children}</code>
                        ),
                    }
                }} />}
            </div>
        </section>
    );
};

export default ContentSection;
