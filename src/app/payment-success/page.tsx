import { Metadata } from "next";
import Link from "next/link";
import BaseLayout from '@/components/Common/BaseLayout';

export const metadata: Metadata = {
  title: 'Payment Successful | Steer Health',
  description: 'Your payment has been successfully processed. Thank you for choosing Steer Health.',
};

export default function PaymentSuccessPage() {
  return (
    <BaseLayout>
      <div className="w-full min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-white to-[#f5f5f5] py-8 md:py-12">
        <div className="w-full max-w-[680px] mx-auto px-4">
          {/* Success Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12 text-center">
            {/* Success Icon */}
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#3ee089] flex items-center justify-center">
                <svg 
                  className="w-12 h-12 md:w-14 md:h-14 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={3} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
            </div>

            {/* Heading */}
            <h1 className="md:text-[48px] text-[36px] font-semibold font2 text-[#171717] mb-4 leading-[100%] tracking-[-0.02em]">
              Payment Successful!
            </h1>

            {/* Description */}
            <p className="text-[#5C5C5C] leading-[140%] font3 md:text-xl text-lg mb-8 max-w-[540px] mx-auto">
              Thank you for your payment. Your transaction has been processed successfully. 
              You will receive a confirmation email shortly with your receipt and transaction details.
            </p>

            {/* Transaction Info Box */}
            <div className="bg-[#f7f7f7] rounded-xl p-6 mb-8 text-left">
              <h3 className="text-lg font-semibold font2 text-[#171717] mb-4">
                What's Next?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <svg 
                      className="w-5 h-5 text-[#335CFF]" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </div>
                  <p className="text-[#5C5C5C] font3 text-base leading-[140%]">
                    Check your email for payment confirmation and receipt
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <svg 
                      className="w-5 h-5 text-[#335CFF]" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </div>
                  <p className="text-[#5C5C5C] font3 text-base leading-[140%]">
                    Our team will contact you within 24 hours to get started
                  </p>
                </li>
                
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/"
                className="bg-[#335CFF] hover:bg-[#2F55EB] text-white font-medium font3 text-sm leading-[24px] rounded-[8px] py-3 px-6 transition-all duration-300 ease-in-out hover:shadow-md hover:scale-[1.02] inline-flex items-center justify-center"
              >
                Return to Home
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
                Need help? Contact our support team
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
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
