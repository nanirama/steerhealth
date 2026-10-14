import type React from "react"
import Image from "next/image"

import { PortableText } from '@portabletext/react';
import { urlForImage } from '@/sanity/lib/utils';

export const ArticleBody = ({ content }: { content: any }) => {
  return (
    <article className="prose prose-invert max-w-none">
      {content && <PortableText value={content} components={{
        block: {
          normal: ({ children }) => <p className="text-[17px] leading-[160%] font-normal text-[#5C5C5C] mb-4 mt-1 font3">{children}</p>,
          h2: ({ children }) => <h2 className="!md:text-[36px] !text-[26px] leading-[120%] text-black font2 font-semibold my-4">{children}</h2>,
          h3: ({ children }) => <h3 className="!md:text-[28px] !text-[20px] leading-[120%] text-black font2 font-semibold my-2">{children}</h3>,
          h4: ({ children }) => <h4 className="text-xl font-medium mb-2">{children}</h4>,
          h5: ({ children }) => <h5 className="text-lg font-medium mb-2">{children}</h5>,
          h6: ({ children }) => <h6 className="text-base font-medium mb-2">{children}</h6>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-400 pl-4 italic text-gray-600">
              {children}
            </blockquote>
          ),
        },
        list: {
          bullet: ({ children }) => (
            <ul className="list-disc pl-6 space-y-2 text-[#5C5C5C] my-6">{children}</ul>
          ),
          number: ({ children }) => (
            <ol className="list-decimal pl-6 space-y-2 text-[#5C5C5C] my-6">{children}</ol>
          ),
        },

        listItem: {
          bullet: ({ children }) => (
            <li className="leading-relaxed text-[17px] leading-[140%] font-normal text-[#5C5C5C] font3">{children}</li>
          ),
          number: ({ children }) => (
            <li className="leading-relaxed text-[17px] leading-[140%] font-normal text-[#5C5C5C] font3">{children}</li>
          ),
        },
        marks: {
          strong: ({ children }) => <strong className="text-[#5C5C5C] font-semibold ">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          underline: ({ children }) => <span className="underline">{children}</span>,
          code: ({ children }) => (
            <code className="bg-gray-200 text-red-600 px-1 rounded">{children}</code>
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
                <figure className="my-10">
                  <Image
                    src={imageUrl}
                    alt={value.alt || " "}
                    width={800}
                    height={500}
                    className="rounded-lg"
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
          table: ({ value }: any) => {
            // Match TableInput structure: 
            // value = { _type: 'table', heading?: string, rows: [{ _type: 'tableRow', _key: string, cells: string[] }] }
            if (!value?.rows || !Array.isArray(value.rows) || value.rows.length === 0) return null;

            const rows = value.rows;
            // First row is treated as header (matching TableInput behavior where rowIndex === 0 is header)
            const headerRow = rows[0];
            const bodyRows = rows.slice(1);

            // Ensure headerRow has cells
            if (!headerRow?.cells || !Array.isArray(headerRow.cells) || headerRow.cells.length === 0) return null;

            // Get column count from header for consistent alignment
            const columnCount = headerRow.cells.length;

            return (
              <div className="my-8">
                {/* Table Heading - matches TableInput heading field */}
                {value?.heading && (
                  <h3 className="text-[20px] md:text-[24px] leading-[120%] text-black font2 font-semibold mb-4">
                    {value.heading}
                  </h3>
                )}
                
                {/* Table Container */}
                <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200 bg-white">
                  <table className="min-w-full border-collapse">
                    {/* Header Row - matches TableInput first row styling (bold, gray background) */}
                    <thead className="bg-gray-50">
                      <tr>
                        {headerRow.cells.map((cell: string, i: number) => (
                          <th
                            key={headerRow._key ? `${headerRow._key}-header-${i}` : `header-${i}`}
                            className="px-4 md:px-6 py-3 md:py-4 text-center font-semibold text-[15px] md:text-[17px] leading-[160%] text-black border-b-2 border-gray-300 font2 whitespace-nowrap"
                          >
                            {cell || ''}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    {/* Body Rows - matches TableInput row structure */}
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bodyRows.length > 0 ? (
                        bodyRows.map((row: any, rowIndex: number) => {
                          // Match TableInput structure: each row has _type: 'tableRow', _key, cells
                          if (!row?.cells || !Array.isArray(row.cells)) return null;
                          
                          // Ensure row has same number of cells as header (pad if needed)
                          const cells = [...row.cells];
                          while (cells.length < columnCount) {
                            cells.push('');
                          }
                          
                          return (
                            <tr
                              key={row._key || `row-${rowIndex}`}
                              className={`transition-colors ${
                                rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                              } hover:bg-gray-100`}
                            >
                              {cells.slice(0, columnCount).map((cell: string, cellIndex: number) => (
                                <td
                                  key={row._key ? `${row._key}-cell-${cellIndex}` : `cell-${rowIndex}-${cellIndex}`}
                                  className="px-2 md:px-4 py-2 md:py-3 text-[15px] md:text-[17px] leading-[160%] text-[#5C5C5C] font-normal font3 border-r border-gray-200 last:border-r-0"
                                >
                                  {cell || ''}
                                </td>
                              ))}
                            </tr>
                          );
                        })
                      ) : (
                        // Empty state if no body rows
                        <tr>
                          <td 
                            colSpan={columnCount} 
                            className="px-4 py-8 text-center text-[#5C5C5C] font3 text-sm"
                          >
                            No data rows
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          },
        },
      
      }} />}
    </article>
  )
}
