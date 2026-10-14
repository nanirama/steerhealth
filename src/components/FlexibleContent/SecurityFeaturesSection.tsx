import LazyVideo from "../Elements/LazyVideo";
import { PortableText } from '@portabletext/react';
import { getVideoName } from '../../lib/index';



export default function SecurityFeaturesSection({ data }: any) {
  const { features } = data
  return (
    <section className="py-10 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {features && features.map((feature: any, index: number) => {
        const videoName = getVideoName(feature?.videoUrl);
        const videoPoster = `${videoName}.webp`;
          return (
            <div key={index} className="flex justify-between flex-col">
              <div className={`flex ${feature.videoPosition === "right" ? "md:flex-row" : "md:flex-row-reverse"}  flex-col gap-12`}>
                <div className='flex flex-col items-start justify-center gap-4 md:w-[50%] w-full'>

                  <div className='inline-flex'>
                    <span className=' text-[#335CFF] text-sm leading-[20px] font2 font-bold border border-[#335CFF] py-2 px-3 rounded-lg w-auto'>{feature?.tabline}</span>
                  </div>
                  <div className=''>
                    {feature?.title && (
                      <PortableText value={feature?.title}
                        components={{
                          block: {
                            normal: ({ children }) => <h3 className="md:text-[36px] text-[32px] text-[#171717] leading-[120%] text-semibold">{children}</h3>,
                          },

                        }} />
                    )}
                  </div>
                  {feature?.description && <p className="text-xl text-[#0E0F10] font3 leading-[140%] my-2">{feature?.description}</p>}
                </div>
                <div className=' md:w-[50%] w-full'>
                  <LazyVideo
                    className="h-full w-full border border-[#EBEBEB] md:rounded-[18px] rounded-[12px]"
                    width={600}
                    height={500}
                    srcWebm={feature.videoUrl}
                    srcMp4={feature.videoUrl}
                    poster={videoPoster}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  );
}
