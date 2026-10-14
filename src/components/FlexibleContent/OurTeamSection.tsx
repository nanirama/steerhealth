
import TeamMember from "@/components/Elements/TeamMember";
export default function OurTeamSection({ data }: any) {
  return (
    <>
      <div className="w-full md:py-12 py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header Section */}
          <div className="text-center sm:mb-12 mb-6  ">
            <h2 className="text-[40px] md:text-[60px] font-semibold text-gray-950 leading-tighter text-center font2 mb-4 ">{data?.heading}</h2>
            <p className="text-[#5C5C5C] text-2xl text-center font3  ">{data?.subheading}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-6">
            {data?.teamMembers && data?.teamMembers.map((member:any, idx: number) => (
              <TeamMember member={member} key={idx} idx={idx} />
            ))}
          </div> 
        </div>
      </div>
    </>
  )
}
