export default function ReactImpactsSection({data}:any) {
  return (
    <section className="bg-white py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 grid-cols-1 md:gap-14 gap-8 items-center">
        {/* Left Text */}
        <div>
          <h2 className="md:text-[60px] text-[40px] font-semibold text-gray-900 leading-[100%] lg:text-left text-center">
            Real Impact.<br />
            Proven Outcomes.
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4   ">
          {/* Stat Item */}
          <div className="text-center bg-gray-50 rounded-lg md:p-10 p-8 shadow-sm"> 
            <h1 className="text-blue-600 text-[60px] font-semibold font2">18%</h1>
            <div className="text-xl  text-[#0A0D14] mt-1 font-normal leading-[140%] font2">Increase in Care Capacity</div>
          </div>

          <div className="text-center bg-gray-50 rounded-lg md:p-10 p-8 shadow-sm"> 
            <h1 className="text-blue-600 text-[60px] font-semibold font2">70%</h1>
            <div className="text-xl  text-[#0A0D14]  mt-1 font-normal leading-[140%] font2">Reduction in Inbound Call Volumes</div>
          </div>

          <div className="text-center bg-gray-50 rounded-lg md:p-10 p-8 shadow-sm"> 
            <h1 className="text-blue-600 text-[60px] font-semibold font2">36%</h1>
            <div className="text-xl   text-[#0A0D14]  mt-1 font-normal leading-[140%] font2">Boost in Revenue Velocity</div>
          </div>

          <div className="text-center bg-gray-50 rounded-lg md:p-10 p-8 shadow-sm"> 
            <h1 className="text-blue-600 text-[60px] font-semibold font2">30X</h1>
            <div className="text-xl  text-[#0A0D14]  mt-1 font-normal leading-[140%] font2 mx-auto lg:max-w-36 max-w-20">Return on Investment</div>
          </div>
        </div>
      </div>
    </section>
  );
}
