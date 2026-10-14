export default function HospitalResults({ data }: any) {
  if (!data) return null

  const { heading, stats } = data

  return (
    <section className="lg:py-20 py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {heading && <h2 className="text-[#171717] md:text-[60px] text-4xl text-center leading-[100%] font-gilroy-semibold pt-2 mb-12">{heading}</h2>}

          <div className="flex sm:flex-row flex-col lg:flex-nowrap flex-wrap xl:gap-32 gap-16 w-full justify-center md:items-start items-center ">
            {stats && stats.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="flex flex-col gap-4"
                >
                  <h2 className="text-center tracking-tight leading-[70px] text-[72px] h-[74px] font-space-grotesk-regular bg-gradient-to-b from-[#6FCAFF] via-[#3591FA] to-[#0030A6] bg-clip-text text-transparent">
                    {item.value}{item.suffix}
                  </h2>
                  <h3 className="text-xl text-[#5C5C5C] font3 text-center max-w-60">{item.description}</h3>
                </div>
              )
            })}
          </div>
      </div>
    </section>

  )
}
