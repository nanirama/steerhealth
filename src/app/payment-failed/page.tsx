import { Metadata } from "next";
import Link from "next/link";
import BaseLayout from '@/components/Common/BaseLayout';

export const metadata: Metadata = {
  title: 'Payment Failed | Steer Health',
  description: 'Your payment could not be processed. Please try again or contact support for assistance.',
};

export default function PaymentFailedPage() {
  return (
    <BaseLayout>
      <div className="w-full min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-white to-[#f5f5f5] py-6 md:py-12">
        <div className="w-full max-w-[680px] mx-auto px-4">
          {/* Failed Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12 text-center">
            {/* Failed Icon */}
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#ef4444] flex items-center justify-center">
                <svg 
                  width="56" 
                  height="56" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 18L18 6" />
                  <path d="M6 6l12 12" />
                </svg>
              </div>
            </div>

            {/* Heading */}
            <h1 className="md:text-[48px] text-[36px] font-semibold font2 text-[#171717] mb-4 leading-[100%] tracking-[-0.02em]">
              Payment Failed
            </h1>

            {/* Description */}
            <p className="text-[#5C5C5C] leading-[140%] font3 md:text-xl text-lg mb-8 max-w-[540px] mx-auto">
              We're sorry, but your payment could not be processed at this time. 
              No charges have been made to your account. Please review the information below and try again.
            </p>

            {/* Troubleshooting Info Box */}
            {/* <div className="bg-[#f7f7f7] rounded-xl p-6 mb-8 text-left">
              <h3 className="text-lg font-semibold font2 text-[#171717] mb-4">
                Common Reasons & Solutions
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <svg 
                      className="w-5 h-5 text-[#ef4444]" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </div>
                  <p className="text-[#5C5C5C] font3 text-base leading-[140%]">
                    <strong className="text-[#171717] font3 font-semibold">Insufficient funds:</strong> Ensure your payment method has sufficient balance
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <svg 
                      className="w-5 h-5 text-[#ef4444]" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </div>
                  <p className="text-[#5C5C5C] font3 text-base leading-[140%]">
                    <strong className="text-[#171717] font3 font-semibold">Card details:</strong> Verify your card number, expiry date, and CVV are correct
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <svg 
                      className="w-5 h-5 text-[#ef4444]" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </div>
                  <p className="text-[#5C5C5C] font3 text-base leading-[140%]">
                    <strong className="text-[#171717] font3 font-semibold">Network issues:</strong> Check your internet connection and try again
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <svg 
                      className="w-5 h-5 text-[#ef4444]" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </div>
                  <p className="text-[#5C5C5C] font3 text-base leading-[140%]">
                    <strong className="text-[#171717] font3 font-semibold">Bank restrictions:</strong> Contact your bank to ensure international/online payments are enabled
                  </p>
                </li>
              </ul>
            </div> */}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/"
                className="bg-[#335CFF] hover:bg-[#2F55EB] text-white font-medium font3 text-sm leading-[24px] rounded-[8px] py-3 px-6 transition-all duration-300 ease-in-out hover:shadow-md hover:scale-[1.02] inline-flex items-center justify-center"
              >
                Try Again
              </Link>
              <Link
                href="/contact-us"
                className="bg-white border border-[#335CFF] text-[#335CFF] hover:bg-[#f7f7f7] font-medium font3 text-sm leading-[24px] rounded-[8px] py-3 px-6 transition-all duration-300 ease-in-out hover:shadow-md hover:scale-[1.02] inline-flex items-center justify-center"
              >
                Contact Support
              </Link>
            </div>

            {/* Support Info */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-[#5C5C5C] font3 text-sm leading-[140%] mb-2">
                Still having issues? Our support team is here to help
              </p>
              <p className="text-[#335CFF] font3 text-sm leading-[140%]">
                <a 
                  href="mailto:hello@steerhealth.ai" 
                  className="hover:underline"
                >
                  hello@steerhealth.ai
                </a>
                {' '}or{' '}
                <a 
                  href="tel:+12149452952" 
                  className="hover:underline"
                >
                  +1-214-945-2952
                </a>
              </p>
              <p className="text-[#5C5C5C] font3 text-xs leading-[140%] mt-3">
                Available Monday - Friday, 8:00 AM - 6:00 PM CST
              </p>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
