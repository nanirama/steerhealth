import CustomCounter from "@/components/Elements/CustomCounter";
import Link from 'next/link';

export default function FmStats({ data, page }: any) {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 max-w-7xl md:py-16 ">
        <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 sm:gap-16 gap-10 text-center">
          {data?.stats && data?.stats.map((stat: any, index: number) => {
            return (
              <div
                key={index}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-row gap-0 items-center justify-center">
                  {stat.trend === 'up' && (
                    <svg clipRule="evenodd" className="w-[60px] h-[50px]  rotate-180" fill="#1daf61" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z" /></svg>
                  )}
                  {stat.trend === 'down' && (
                    <svg
                      clipRule="evenodd"
                      className="w-[60px] h-[50px]"
                      fill="#e93544"
                      fillRule="evenodd"
                      strokeLinejoin="round"
                      strokeMiterlimit="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z" />
                    </svg>
                  )}
                  <h2
                    className={`text-center tracking-tight leading-[70px] md:text-[72px] text-[60px] font-space-grotesk-regular bg-clip-text text-transparent 
    ${page === 'p2p-landingpage'
                        ? 'bg-gradient-to-br from-[#4FFFE3] via-[#043A3D] to-[#043A3D] font-bold font-inter'
                        : 'bg-gradient-to-b from-[#6FCAFF] via-[#3591FA] to-[#0030A6]'
                      }`}
                  >
                    <CustomCounter count={stat.percentage} suffix="%" />
                  </h2>

                  {/* <h2 className="text-center tracking-tight leading-[70px] text-[72px] font-space-grotesk-regular bg-gradient-to-b from-[#6FCAFF] via-[#3591FA] to-[#0030A6] bg-clip-text text-transparent">
                    <CustomCounter count={stat.percentage} suffix={`%`} />
                  </h2> */}
                </div>

                {stat?.title && (
                  <h3
                    className={`text-xl text-[#0A0D14] text-center font-semibold capitalize lg:h-auto md:h-[80px] h-auto 
      ${page === 'p2p-landingpage' ? 'font3' : 'font-space-grotesk-regular'}`}
                  >
                    {stat?.title}
                  </h3>
                )}
                {stat?.description && (
                  <p
                    className={`sm:text-xl text-sm text-[#0a0d14] md:max-w-60 w-full mx-auto 
      ${page === 'p2p-landingpage' ? 'font-inter' : 'font-gilroy-medium '}`}
                  >
                    {stat?.description}
                  </p>
                )}
                {/* {stat?.title && <h3 className="text-xl text-[#0A0D14] text-center font-semibold font-space-grotesk-regular capitalize lg:h-auto md:h-[80px] h-auto">{stat?.title}</h3>} */}
                {/* {stat?.description && <p className="text-xl text-[#0a0d14] md:max-w-60 w-full mx-auto font-gilroy-medium">{stat?.description}</p>} */}
              </div>
            )
          })}
        </div>
        {page === 'p2p-landingpage' && (
          <div className="mt-12 mb-2 flex justify-center items-center">
            <Link href='/power2practice/contact-us' className="bg-[#0c517b] cursor-pointer group relative inline-flex flex-row gap-2 items-center justify-between leading-[24px] text-white font-medium rounded-[8px] py-3 md:px-4 px-2 text-sm">
              Book a Demo
              <div className="relative ml-1 h-5 w-5 overflow-hidden">
                <div className="absolute transition-all duration-200 group-hover:-translate-y-5 group-hover:translate-x-4">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 -translate-x-4"><path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                </div>
              </div>
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
