import Image from "next/image"
import { urlForImage } from "@/sanity/lib/utils"
import { PortableText } from '@portabletext/react'


export default function IntelligentAdaptiveLayer({ data }: any) {
  if (!data) return null

  const { heading, description, items } = data

  return (
    <div className="bg-white px-4 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        {heading && (
          <div className="mb-8 text-center">
            <PortableText
              value={heading}
              components={{
                block: {
                  normal: ({ children }) => (
                    <h2 className="xl:text-[56px] sm:text-[40px] text-[30px] font-bold leading-tight font2 text-[#171717]">
                      {children}
                    </h2>
                  ),
                },
                marks: {
                  strong: ({ children }) => (
                    <span className="italic font1 pr-2 font-medium bg-gradient-to-r from-[#6FCAFF] via-[#3591FA] to-[#0030A6] bg-clip-text text-transparent false">{children}</span>
                  ),
                },
              }}
            />
          </div>
        )}


        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 md:px-0 px-4">

          {items?.map((item: any, idx: number) => {
            const imageUrl = item?.icon &&
              urlForImage(item?.icon)
                ?.height(20)
                .width(20)
                .format("webp")
                .auto("format")
                .fit("max")
                .url();
            return (
              <div key={idx} className="rounded-2xl  bg-white p-8  flex flex-col gap-4 border border-[#DAE0E7] relative">
                <div className="flex justify-center items-center bg-[linear-gradient(90deg,#2160FD_0%,#C0D5FF_100%)] w-[48px] h-[48px] rounded-full absolute -top-5 -left-5 text-white font-semibold">
                  {String(idx + 1).padStart(2, '0')}
                </div>

                {item.icon && (
                  <>
                    <div className="flex items-center justify-center bg-[#F2F2F2]/50 w-[57px] h-[57px] rounded-xl p-4">
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt="Client"
                          width={22}
                          height={22}
                          sizes="(max-width: 768px) 22px, 22px"
                          className="object-contain w-full"
                        />
                      )}
                    </div>
                  </>
                )
                }
                <h3 className="font2 sm:text-2xl text-xl font-semibold text-[#171717] max-w-xs ">
                  {item.title}
                </h3>
                <p className="text-base leading-relaxed text-[#5c5c5c]">
                  {item.subtitle}
                </p>
              </div>
            )
          })}


          {/* <div className="rounded-2xl  bg-white p-8  flex flex-col gap-4 border border-[#DAE0E7] relative">
            <div className="flex justify-center items-center bg-[linear-gradient(90deg,#2160FD_0%,#C0D5FF_100%)] w-[48px] h-[48px] rounded-full absolute top-[-20] left-[-20] text-white">01</div>
            <div className="flex items-center justify-center bg-[#F2F2F2]/50 w-[57px] h-[57px] rounded-xl">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.8601 17.3705C9.54643 17.6425 10.1154 18.147 10.4678 18.7957C10.8202 19.4445 10.9336 20.1964 10.7883 20.9202C10.6429 21.6441 10.248 22.2939 9.67241 22.7563C9.09685 23.2187 8.3772 23.4643 7.63904 23.4502C6.90088 23.4362 6.19108 23.1634 5.63351 22.6795C5.07593 22.1956 4.70598 21.5312 4.58821 20.8024C4.47044 20.0736 4.61233 19.3265 4.98912 18.6916C5.36591 18.0567 5.95367 17.5743 6.64985 17.3285V10.6715C5.94898 10.4238 5.35825 9.93626 4.98207 9.29512C4.60589 8.65398 4.46848 7.90049 4.59414 7.16784C4.7198 6.43519 5.10043 5.77055 5.66875 5.2914C6.23708 4.81226 6.95649 4.54946 7.69985 4.54946C8.4432 4.54946 9.16261 4.81226 9.73094 5.2914C10.2993 5.77055 10.6799 6.43519 10.8055 7.16784C10.9312 7.90049 10.7938 8.65398 10.4176 9.29512C10.0414 9.93626 9.45071 10.4238 8.74985 10.6715V14C9.62765 13.3406 10.7175 12.95 11.8998 12.95H16.0998C16.7909 12.95 17.4627 12.7229 18.012 12.3036C18.5613 11.8843 18.9575 11.296 19.1396 10.6295C18.4499 10.3564 17.8787 9.84872 17.5265 9.1959C17.1743 8.54307 17.0637 7.78693 17.2142 7.06058C17.3647 6.33423 17.7665 5.68424 18.3491 5.22506C18.9316 4.76587 19.6575 4.52692 20.3989 4.55027C21.1403 4.57362 21.8497 4.85778 22.4022 5.35271C22.9547 5.84765 23.3149 6.52164 23.4194 7.25602C23.5238 7.99039 23.3659 8.73808 22.9733 9.36745C22.5807 9.99682 21.9787 10.4675 21.2732 10.6967C21.0617 11.9154 20.4268 13.0203 19.4804 13.8167C18.534 14.6131 17.3368 15.0499 16.0998 15.05H11.8998C11.2088 15.0499 10.537 15.2771 9.9877 15.6964C9.43844 16.1157 9.04223 16.7039 8.8601 17.3705Z" fill="#2160FD" />
              </svg>
            </div>
            <h3 className=" text-2xl font-semibold  text-[#171717]">
              Ingest & Classify
            </h3>
            <p className="text-base leading-relaxed text-[#5c5c5c] ">
              Ingests the schedule from your EHR/PM and
              classifies each case by procedure, surgeon,
              payor, and risk.
            </p>
          </div> */}


        </div>

      </div>
    </div >

  )
}