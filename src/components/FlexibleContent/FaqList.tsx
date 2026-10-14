'use client';
import React, { useState, useRef, useId } from 'react';
import { PortableText } from '@portabletext/react';

type FAQItemProps = {
  question: any;
  answer: any;
  isOpen: boolean;
  onClick: () => void;
};
const isPortableText = (field: any): boolean =>
  Array.isArray(field) && field.some(block => block._type === 'block');

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
  const contentId = useId();
  const contentRef = useRef<HTMLDivElement>(null);
  return (
    <div className="border-b border-black/20 my-2 overflow-hidden">
      <button
        className="flex items-center justify-between gap-4 w-full px-4 py-3 cursor-pointer text-left text-[#181D27] leading-[140%] text-base font3"
        onClick={onClick}
        aria-label="Question"
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        {question}
        <span
          className={`transform transition-transform border border-[#A4A7AE] rounded-full md:p-2 p-1 ${isOpen ? 'rotate-180' : ''
            }`}
        >
          {isOpen ? (
            // Minus icon
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path d="M4.16699 9.16699H15.8337V10.8337H4.16699V9.16699Z" fill="#A4A7AE" />
            </svg>
          ) : (
            // Plus icon
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9.16699 9.16699V4.16699H10.8337V9.16699H15.8337V10.8337H10.8337V15.8337H9.16699V10.8337H4.16699V9.16699H9.16699Z"
                fill="#A4A7AE"
              />
            </svg>
          )}
        </span>
      </button>

      {/* <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden bg-white px-4"
          >
            <div className="py-3 text-[#535862] text-base">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence> */}
      <div
        ref={contentRef}
        id={contentId}
        className={`overflow-hidden transition-all duration-300 px-4 ease-in-out bg-white ${isOpen ? 'max-h-full opacity-100 pt-2 !mb-6' : 'max-h-0 opacity-0 py-0'
          }`}
      >
        {isPortableText(answer) ? (
          <PortableText
            value={answer}
            components={{
              block: {
                normal: ({ children }) => <p className="text-[#535862] sm:text-[17px] text-base py-1">{children}</p>,
              },
              marks: {
                strong: ({ children }) => <span className="italic">{children}</span>,
              },
              list: {
                bullet: ({ children }) => (
                  <ul className="list-disc pl-6 space-y-2 overflow-hidden text-[#5C5C5C]">{children}</ul>
                ),
                number: ({ children }) => (
                  <ol className="list-decimal pl-6 space-y-2 text-[#5C5C5C] my-3">{children}</ol>
                ),
              },

              listItem: {
                bullet: ({ children }) => (
                  <li className="leading-relaxed text-[17px] leading-[140%] font-normal text-[#535862]">{children}</li>
                ),
                number: ({ children }) => (
                  <li className="leading-relaxed text-[17px] leading-[140%] font-normal text-[#535862]">{children}</li>
                ),
              },
            }}
          />
        ) : (
          <p className="text-[#535862] text-base px-4">{answer}</p>
        )}
      </div>

    </div>
  );
};

const FAQList = ({ data }: { data: any[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index));
  };

  // const FAQList = ({ data }: { data: any[] }) => {
  // const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto my-10">
      {data && data.map((faq, index) => (
        <FAQItem
          key={index}
          //{...faq}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === index}
          onClick={() => handleClick(index)}
        />
      ))}
      {/* {data.map((faq, index) => (
        <FAQItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === index}
          onClick={() => toggleOpen(index)}
        />
      ))} */}
    </div>
  );
};

export default FAQList;
