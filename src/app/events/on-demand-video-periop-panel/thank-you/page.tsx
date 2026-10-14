
import BaseLayout from '@/components/Common/BaseLayout';
import YouTubePlayer from '@/components/Elements/YouTubePlayer'
const ThankYouPage = () => {
    return (
        <BaseLayout>
            <div className="w-full max-w-[980px] mx-auto px-4 flex flex-col items-start lg:gap-10 gap-5 py-6 my-8">
                <div className="w-full mx-auto lg:max-w-[780px] py-4 flex flex-col items-center justify-between">
                    <h1 className="md:text-[48px] text-[40px] font-semibold font2 text-[#171717] text-center my-2 leading-[100%]">Turn Surgical Chaos<br/>into Predictable Capacity</h1>
                    <p className="text-[#5C5C5C] leading-[140%] font3 md:text-2xl text-xl text-center my-2">Watch how Prime Healthcare and Steer Health uses AI orchestration to reduce last-minute cancellations and lift OR utilization.</p>
                </div>
                <YouTubePlayer videoId="VhXofohj3I0" />
                <div className="w-full mx-auto lg:max-w-[780px] py-4 flex flex-col items-center justify-between">
                   <p className="text-[#5C5C5C] leading-[140%] font3 md:text-xl text-lg text-center my-2">See what this could look like in your hospital. <a href="https://steerhealth.io/contact-us" className="text-[#335cff] hover:text-blue-800 underline" target='_blank' rel='noreferrer noopener'>Book a 30-minute demo.</a></p>
                </div>
            </div>
        </BaseLayout>
    )
}
export default ThankYouPage;