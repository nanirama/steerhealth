"use client";
import ButtonComponent from "@/components/Elements/ButtonComponent";
import TeamMember from "@/components/Elements/TeamMember";

export default function LeadershipSection({ data }: any) {
  const firstRow = data?.teamMembers?.slice(0, 3) || [];
  const secondRow = data?.teamMembers?.slice(3, 7) || [];

  return (
    <div className="w-full bg-white md:py-12 py-8">
      <div className="max-w-[1340px] mx-auto px-4">
        <div className="text-center mb-12">
          {data?.title && (
            <h2 className="text-[#171717] lg:text-[60px] text-[40px] leading-[100%] font-semibold font2 w-full mb-6">{data?.title}</h2>
          )}
        </div>
        {/* First Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-[80%] mx-auto justify-items-center mb-12">
          {firstRow.map((member: any, idx: number) => (
            <TeamMember member={member} key={idx} idx={idx} />
          ))}
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center mb-8">
          {secondRow.map((member: any, idx: number) => (
            <TeamMember member={member} key={idx + 3} idx={idx + 3} />
          ))}
        </div>
        

        {/* <div className="flex flex-row items-center justify-center flex-wrap md:gap-12 gap-6 border border-red-600">
          {data?.teamMembers && data?.teamMembers.map((member:any, idx: number) => (
            <TeamMember member={member} key={idx} idx={idx} />
          ))}
        </div> */}
        <div className="mx-auto my-8 flex justify-center items-center text-center">
          {data?.ctaButtonPrimary && (
            <ButtonComponent button={data?.ctaButtonPrimary} />
          )}
        </div>
      </div>
    </div>
  );
}
