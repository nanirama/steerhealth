import ImageComponent from "../Elements/ImageComponent"

export default function WhySteerOutperform({ data }: any) {
  return (
    <>
      <div className="w-full md:py-20 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 border-amber-700">
          <div className="flex flex-col gap-4 items-center justify-center">
            {data?.tagline && (
              <p className="text-base leading-[24px] text-[#5C5C5C] font-medium font3 uppercase tracking-[6%]">{data.tagline}</p>
            )}
            {data?.heading && (
              <h2 className="text-4xl md:text-[60px] font-semibold text-[#171717] pt-2 text-center max-w-2xl leading-[100%] mb-6">{data?.heading}</h2>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
            {/* Comparison Section */}
            <div className="lg:col-span-2 bg-[#F8FAFB] rounded-2xl border border-[#E9EAEB] px-6 py-8">
              {/* Header Row */}
              <div className="grid grid-cols-2 gap-8 mb-2">
                <div className="text-center">
                  <div className="flex items-center justify-center min-h-[100px]">
                    <ImageComponent
                      src={`ehr-outerperform-logo.webp`}
                      alt="Hero Image"
                      width={194}
                      height={34}
                      className=""
                      sizes="
                       (min-width: 1280px) 800px,
                       (min-width: 1024px) 700px,
                        (min-width: 768px) 600px,
                          100vw "/>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center min-h-[100px]">
                    <span className="font-medium text-[#181D27] text-2xl leading-[120%] text-center font2">Others</span>
                  </div>
                </div>
              </div>

              {/* Comparison Points */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-8 text-center">
                  <div className="text-lg leading-[120%] font-medium font2 text-black max-w-[200px] mx-auto text-center border-t border-[#E9EAEB] pt-6">
                    Full HITRUST & SOC 2
                    Type II compliance
                  </div>
                  <div className="text-lg leading-[120%] font-medium font2 text-black max-w-[240px] mx-auto text-center border-t border-[#E9EAEB] pt-6">
                    Partial compliance or third-party
                    certifications only
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 text-center">
                  <div className="text-lg leading-[120%] font-medium font2 text-black  mx-auto text-center">
                    Seamless Epic & Cerner integration
                  </div>
                  <div className="text-lg leading-[120%] font-medium font2 text-black  mx-auto text-center">Limited or one-way EHR integrations</div>
                </div>

                <div className="grid grid-cols-2 gap-8 text-center">
                  <div className="text-lg leading-[120%] font-medium font2 text-black  mx-auto text-center  max-w-[260px] ">
                    AI-powered workflows across
                    departments
                  </div>
                  <div className="text-lg leading-[120%] font-medium font2 text-black  mx-auto text-center max-w-[200px] ">
                    Manual workflows with
                    minimal AI
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 text-center">
                  <div className="text-lg leading-[120%] font-medium font2 text-black  mx-auto text-center max-w-xs " >
                    Customizable modules for hospitals,
                    ASCs, and medical groups
                  </div>
                  <div className="text-lg leading-[120%] font-medium font2 text-black  mx-auto text-center max-w-[240px] ">
                    Generic, one-size-fits-all
                    models
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 text-center">
                  <div className="text-lg leading-[120%] font-medium font2 text-black  mx-auto text-center max-w-[270px] ">
                    Performance-based contracting
                    & ROI guarantees
                  </div>
                  <div className="text-lg leading-[120%] font-medium font2 text-black  mx-auto text-center max-w-xs ">
                    Long implementation cycles with
                    no performance incentives
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 text-center">
                  <div className="text-lg leading-[120%] font-medium font2 text-black  mx-auto text-center max-w-xs ">
                    Consolidates up to 6+ vendor tools
                    in one system
                  </div>
                  <div className="text-lg leading-[120%] font-medium font2 text-black  mx-auto text-center max-w-[240px] ">
                    Requires multiple vendors
                    and logins
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Section */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-b from-[#E6F5FD] to-[#FFFFFF] p-8 rounded-2xl h-full flex flex-col justify-between">

                <div className="min-h-[100px] flex items-end">
                  <ImageComponent
                    src={`ehr-outer-logo2.webp`}
                    alt="Hero Image"
                    width={60}
                    height={60}
                    className=" "
                    sizes="
                       (min-width: 1280px) 800px,
                       (min-width: 1024px) 700px,
                        (min-width: 768px) 600px,
                          100vw "/>
                </div>

                {/* <blockquote className="text-blue-600 text-lg font-medium mb-6">
                &quot;Steer is not just another vendor - it&apos;s a true <span className="text-blue-400">partner</span>. We{" "}
                <span className="text-blue-400">saved over $3M</span> in our{" "}
                <span className="text-blue-400">first year</span>.&quot;
              </blockquote> */}
              <div className="flex flex-col gap-10">
                <blockquote className=" text-[32px] leading-[36px] font-semibold mb-6 text-transparent bg-clip-text  bg-gradient-to-r from-[#2160FD] to-sky-[#B1C7FF]">
                  “Steer is not just another vendor - it’s a true partner. We saved over $3M in our first year.”
                </blockquote>


                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-3 overflow-hidden">
                    <ImageComponent
                      src={`ehr-client-img.webp`}
                      alt="Hero Image"
                      width={64}
                      height={64}
                      className=" "
                      sizes="
                       (min-width: 1280px) 800px,
                       (min-width: 1024px) 700px,
                        (min-width: 768px) 600px,
                          100vw "/>
                  </div>
                  <div>
                    <p className="text-base leading-[140%] font3 font-semibold text-black">VP of Operations,</p>
                    <p className="text-base text-black font3">National Health System</p>
                  </div>
                </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  )
}
