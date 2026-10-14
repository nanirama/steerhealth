export default function CompanyTimelineSection() {
  const milestones = [
    {
      year: "2021",
      title: "Steer Health is founded",
      description: "Our founders, a team of passionate healthcare entrepreneurs, come together to form Steer Health.",
    },
    {
      year: "2022",
      title: "Platform Launch",
      description: "We launch our first product, a platform that helps providers connect with patients.",
    },
    {
      year: "2024",
      title: "Platform Expansion", // Fixed the duplicate title
      description: "We expand our platform to include care coordination and referral management tools.",
    },
  ]

  return (
    <div className="w-full bg-[#EBF1FE]">
    <div className="max-w-7xl w-full px-2 mx-auto py-16">
      {/* Timeline Container */}
      <div className=" ">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-6 left-0 right-0 h-0.5 border-t-2 border-dotted border-blue-300 hidden md:block"></div>

          <div className="absolute left-10 top-8 bottom-0 w-0.5 border-l-2 border-dotted border-blue-400 md:hidden block"></div>


          {/* Timeline Items */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:gap-8 md:gap-4 gap-0 md:px-0 px-4">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative mb-4">
                {/* Year Badge - positioned at start of content box */}
                <div className="flex justify-start mb-4">
                  <div className="bg-blue-600 text-white font2 px-8 py-2 text-center rounded-full font-semibold text-[24px] relative z-10">
                    {milestone.year}
                  </div>
                </div>

                {/* Content Box */}
                <div className="md:ml-0 ml-12 py-2">
                  <h3 className="text-[24px] font-bold text-[#0A0D14] leading-[110%] mb-3 font2 max-w-[150px]">{milestone.title}</h3>
                  <p className="text-[#0A0D14] text-base leading-relaxed leading-[110%] font3 md:max-w-[250px] max-w-[90%]">{milestone.description}</p>
                </div>

                {/* Connection Dots for Mobile */}
                {/* {index < milestones.length - 1 && (
                  <div className="flex justify-center mt-4 md:hidden">
                    <div className="w-2 h-8 border-l-2 border-dashed border-blue-300"></div>
                  </div>
                )} */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
