import { Metadata } from "next";
import { seoGenerateMetadata } from "@/components/Seo";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL + '/elevate/thank-you';

  return {
    ...seoGenerateMetadata({
      title: "Thank You | Steer Elevate",
      description: "Thank you for your submission.",
      url: baseUrl,
      imageUrl: "",
    })
  };
}

export default async function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center my-12 p-6 bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <div className="max-w-3xl text-center space-y-8">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4 font-inter tracking-wide uppercase">
          STEER ELEVATE
        </div>
        <h1 className="xl:text-[60px] sm:text-[40px] text-[30px] mt-3 mx-auto text-center text-[#171717] mb-2 font-semibold font2 md:leading-[100%] leading-[130%]">
          Thank You for Choosing Steer Elevate
        </h1>
        <p className="xl:text-2xl text-xl text-[#5C5C5C] !font3 text-center sm:py-4">
          Your request for a demo has been received! One of our practice growth specialists will reach out shortly to show you how to scale healing, not chaos.
        </p>
        <p className="xl:text-xl text-lg text-[#171717] !font-inter font-semibold text-center mt-8">
          While you wait, here is a quick look at how we'll help you scale without adding headcount:
        </p>

        <div className="mt-12 text-left space-y-8">
          <h2 className="text-3xl sm:text-4xl font-light font-interdisplay-light text-[#171717] text-center mb-6">
            What to Expect in Your Demo
          </h2>
          <p className="text-lg text-[#5C5C5C] font3 text-center mb-8">
            We will provide a personalized walkthrough of the AI Digital Workforce and show you how to:
          </p>

          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-[#335CFF] to-[#00D9A5] flex items-center justify-center mt-1">
                  <svg fill="#fff" width="24px" height="24px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M760 380.4l-61.6-61.6-263.2 263.1-109.6-109.5L264 534l171.2 171.2L760 380.4z" /></svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold font2 text-[#171717] mb-2">
                    Make Your Stack Smarter
                  </h3>
                  <p className="text-base text-[#5C5C5C] font3 leading-relaxed">
                    See how Steer Elevate acts as an active layer that connects journeys across your existing tools so your team can stop "duct-taping" workflows across multiple tabs.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white shadow-sm">
              <div className="flex items-start gap-4">
               <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-[#335CFF] to-[#00D9A5] flex items-center justify-center mt-1">
                  <svg fill="#fff" width="24px" height="24px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M760 380.4l-61.6-61.6-263.2 263.1-109.6-109.5L264 534l171.2 171.2L760 380.4z" /></svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold font2 text-[#171717] mb-2">
                    Automate the "In-Between"
                  </h3>
                  <p className="text-base text-[#5C5C5C] font3 leading-relaxed">
                    Learn how we orchestrate the critical steps between visits—like lab follow-through, supplement reorders, and protocol adherence—so patients don't drop off.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white shadow-sm">
              <div className="flex items-start gap-4">
               <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-[#335CFF] to-[#00D9A5] flex items-center justify-center mt-1">
                  <svg fill="#fff" width="24px" height="24px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M760 380.4l-61.6-61.6-263.2 263.1-109.6-109.5L264 534l171.2 171.2L760 380.4z" /></svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold font2 text-[#171717] mb-2">
                    Unlock Proven ROI
                  </h3>
                  <p className="text-base text-[#5C5C5C] font3 leading-relaxed">
                    We'll discuss how clinics like yours have achieved a 36% increase in revenue and a 70% reduction in admin work time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-interdisplay-light text-[#171717] mb-6">
            Why clinicians love Steer
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white shadow-sm text-left">
              <div className="mb-4">
                <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-base text-[#5C5C5C] font-inter leading-relaxed mb-4 italic">
                "With the systems Steer helped us build, I often say we're doing the work of 8 to 10 people, with only 3.5 staff members. That kind of leverage is priceless."
              </p>
              <p className="text-sm font-semibold font2 text-[#171717]">
                — Dr. Habib Dalhoumi, MD & Founder, Inspire Wellness
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white shadow-sm text-left">
              <div className="mb-4">
                <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-base text-[#5C5C5C] font-inter leading-relaxed mb-4 italic">
                "Within 60 days, we cut new-patient onboarding time from 45 minutes to under 10, grew monthly visits by 38%, and our NPS climbed to 92."
              </p>
              <p className="text-sm font-semibold font2 text-[#171717]">
                — Dr. Nicole Rivera, Medical Director, Integrative Wellness Group
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
