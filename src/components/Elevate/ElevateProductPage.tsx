import React from 'react';
import { PortableText } from '@portabletext/react';

interface ElevateProductPageProps {
  data: {
    title?: string;
    shortDescription?: any;
    UseCases?: any;
  };
}

export default function ElevateProductPage({ data }: ElevateProductPageProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {data?.title && (
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#171717]">
          {data.title}
        </h1>
      )}
      {data?.shortDescription && (
        <div className="mb-8">
          <PortableText
            value={data.shortDescription}
            components={{
              block: {
                normal: ({ children }) => (
                  <p className="text-base md:text-lg leading-[160%] font-normal text-[#5C5C5C] mb-4 font3">
                    {children}
                  </p>
                ),
              },
              marks: {
                strong: ({ children }) => (
                  <strong className="font-semibold">{children}</strong>
                ),
                em: ({ children }) => (
                  <em className="italic">{children}</em>
                ),
              },
            }}
          />
        </div>
      )}
      {data?.UseCases && (
        <div className="mt-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#171717]">
            Use Cases
          </h2>
          <PortableText
            value={data.UseCases}
            components={{
              block: {
                normal: ({ children }) => (
                  <p className="text-base md:text-lg leading-[160%] font-normal text-[#5C5C5C] mb-4 font3">
                    {children}
                  </p>
                ),
              },
              marks: {
                strong: ({ children }) => (
                  <strong className="font-semibold">{children}</strong>
                ),
                em: ({ children }) => (
                  <em className="italic">{children}</em>
                ),
              },
              list: {
                bullet: ({ children }) => (
                  <ul className="list-disc pl-6 space-y-2 text-[#5C5C5C] my-6">
                    {children}
                  </ul>
                ),
                number: ({ children }) => (
                  <ol className="list-decimal pl-6 space-y-2 text-[#5C5C5C] my-6">
                    {children}
                  </ol>
                ),
              },
              listItem: {
                bullet: ({ children }) => (
                  <li className="leading-relaxed text-base md:text-lg leading-[140%] font-normal text-[#5C5C5C] font3">
                    {children}
                  </li>
                ),
                number: ({ children }) => (
                  <li className="leading-relaxed text-base md:text-lg leading-[140%] font-normal text-[#5C5C5C] font3">
                    {children}
                  </li>
                ),
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
