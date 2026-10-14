"use client"
import { useEffect, useRef } from "react"
import Image from "next/image";

import LazyDirectVideo from "@/components/Elements/LazyDirectVideo";


const ProductSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        console.log("[v0] Video autoplay failed - browser may require user interaction")
      })
    }
  }, [])
  // return (
  //     <section
  //   className="relative w-full h-full overflow-hidden bg-gray-900 flex-shrink-0"
  //   style={{
  //     backgroundImage: `url(${process.env.NEXT_PUBLIC_SITE_URL}/images/luna/luna-hero.webp)`,
  //     backgroundSize: "cover",
  //     backgroundPosition: "center",
  //   }}
  // >

  //     <video
  //     ref={videoRef}
  //     autoPlay
  //     loop
  //     muted
  //     playsInline
  //     poster={`${process.env.NEXT_PUBLIC_SITE_URL}/images/luna/luna-hero.webp`}
  //     crossOrigin="anonymous"
  //     className="absolute top-0 left-0 w-full h-full object-cover"
  //     aria-hidden="true"
  //   >
  //     <source src={`${process.env.NEXT_PUBLIC_SITE_URL}/videos/luna-landing-demo-product.webm`} type="video/webm" />
  //   </video>


  //   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent -z-20" />

  //   <div className="relative max-w-3xl mx-auto hidden border border-red-600 z-10 flex flex-col items-center justify-center text-center h-full px-4">
  //     <div className="max-w-3xl">
  //       <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">headline</h1>
  //       <p className="text-lg md:text-xl mb-8 text-gray-100 drop-shadow-md max-w-2xl mx-auto">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>

  //     </div>
  //     <div className="max-w-3xl">
  //       <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">headline</h1>
  //       <p className="text-lg md:text-xl mb-8 text-gray-100 drop-shadow-md max-w-2xl mx-auto">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>

  //     </div>
  //     <div className="max-w-3xl">
  //       <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">headline</h1>
  //       <p className="text-lg md:text-xl mb-8 text-gray-100 drop-shadow-md max-w-2xl mx-auto">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>

  //     </div>
  //     <div className="max-w-3xl">
  //       <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">headline</h1>
  //       <p className="text-lg md:text-xl mb-8 text-gray-100 drop-shadow-md max-w-2xl mx-auto">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>

  //     </div>
  //     <div className="max-w-3xl">
  //       <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">headline</h1>
  //       <p className="text-lg md:text-xl mb-8 text-gray-100 drop-shadow-md max-w-2xl mx-auto">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>

  //     </div>
  //     <div className="max-w-3xl">
  //       <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">headline</h1>
  //       <p className="text-lg md:text-xl mb-8 text-gray-100 drop-shadow-md max-w-2xl mx-auto">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>

  //     </div>

  //   </div>
  //   <video
  //     autoPlay
  //     loop
  //     muted
  //     playsInline
  //     poster={`${process.env.NEXT_PUBLIC_SITE_URL}/images/luna/luna-hero.webp`}
  //     className="absolute inset-0 w-full h-full object-cover"
  //     aria-hidden="true"
  //   >
  //     <source src={`${process.env.NEXT_PUBLIC_SITE_URL}/videos/luna-landing-demo-product.webm`} type="video/webm" />
  //   </video>
  // </section>
  // )
  return (
    <>
      <section className="relative mx-4 bg-[#000000] overflow-hidden h-full !rounded-2xl">
        <div className="relative z-10 mx-auto md:p-4 md:py-20 py-8 ">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <h5 className="border border-[#2160FD] mx-auto text-[#2160FD] text-base flex flex-row gap-2 items-center rounded-full py-1 px-2"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.80957 1.0301C5.94765 1.0301 6.05957 1.14202 6.05957 1.2801V6.0301C6.05957 6.16816 5.94765 6.2801 5.80957 6.2801H1.05957C0.92149 6.2801 0.80957 6.16816 0.80957 6.0301V1.2801C0.80957 1.14202 0.92149 1.0301 1.05957 1.0301H5.80957ZM4.99707 2.0926H1.87207V5.2176H4.99707V2.0926ZM12.7054 3.46269C12.8031 3.56032 12.8031 3.71861 12.7054 3.81624L9.87697 6.64468C9.77937 6.7423 9.62107 6.7423 9.52337 6.64468L6.69499 3.81624C6.59737 3.71861 6.59737 3.56032 6.69499 3.46269L9.52347 0.63425C9.62107 0.53663 9.77937 0.53663 9.87697 0.63425L12.7054 3.46269ZM11.3796 3.63946L9.70017 1.9601L8.02082 3.63947L9.70017 5.31885L11.3796 3.63946ZM5.80957 7.2801C5.94765 7.2801 6.05957 7.39203 6.05957 7.5301V12.2801C6.05957 12.4182 5.94765 12.5301 5.80957 12.5301H1.05957C0.92149 12.5301 0.80957 12.4182 0.80957 12.2801V7.5301C0.80957 7.39203 0.92149 7.2801 1.05957 7.2801H5.80957ZM4.99707 8.3426H1.87207V11.4676H4.99707V8.3426ZM12.0596 7.2801C12.1977 7.2801 12.3096 7.39203 12.3096 7.5301V12.2801C12.3096 12.4182 12.1977 12.5301 12.0596 12.5301H7.30957C7.17149 12.5301 7.05957 12.4182 7.05957 12.2801V7.5301C7.05957 7.39203 7.17149 7.2801 7.30957 7.2801H12.0596ZM11.2471 8.3426H8.12207V11.4676H11.2471V8.3426Z" fill="#2160FD" />
              </svg> Product</h5>
              <h2 className="lg:text-[72px] md:text-[60px] sm:text-[48px] text-[30px] text-center text-white font-semibold font2 tracking-tighter leading-[110%]">Run your clinic on  <span className="bg-[linear-gradient(90deg,_#335CFF_59.13%,_#8DA4FF_100%)] bg-clip-text text-transparent">autopilot</span></h2>
              <h3 className="md:text-2xl text-xl text-[#ADADAD] font3 font-normal leading-[140%] max-w-4xl mx-auto text-center">Luna is a plug-and-play voice AI concierge that sits on top of your EHR to handle every routine call, freeing staff to focus on high-value clinical work.</h3>
            </div>
            <div className="flex flex-col gap-6 md:mt-16 my-5">
              <Image src={`/images/luna/product-img1.webp`} width={1200} height={600} alt="Client1" className="object-cover rounded-[24px]" />
              <h3 className="font-medium md:text-[23px] text-lg text-white flex flex-row gap-3 items-center"><svg width="18" height="27" viewBox="0 0 18 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.6501 20.9991C16.2503 22.4833 15.0112 24.2321 13.6079 25.6985C13.3176 26.0023 13.0876 26.1987 12.6662 26.3071H12.2086C11.3042 26.075 10.8313 25.2014 11.217 24.3267L14.8449 20.0349L12.3086 16.8858L11.7256 17.014L10.4676 21.4967C10.2559 22.1276 9.64683 22.5123 8.9847 22.4411C7.0993 21.9913 4.95783 21.8936 3.101 21.4087C1.29876 20.937 1.78184 18.5522 3.5295 18.6962L8.15678 19.5052L8.69597 17.6048L6.88914 10.3145C5.6266 9.01952 4.36813 7.71338 3.10457 6.42455C2.27206 5.57585 1.24316 4.6956 0.482571 3.81127C0.26271 3.55534 0.0943717 3.3279 0 2.99818V2.6934C0.164258 1.98818 0.789662 1.53839 1.51709 1.76329C2.05679 1.93018 3.06938 3.19153 3.50859 3.63421C4.88488 5.01971 6.27138 6.39453 7.62727 7.79937L7.80582 7.8757L10.8079 7.10942C12.4662 4.90777 14.0109 2.6008 15.7728 0.487686C16.8048 -0.139685 17.9699 0.985308 17.3685 2.02991L12.7121 8.35195L12.6677 8.50103L14.2563 14.9442C15.2826 16.3912 16.7216 17.7701 17.6934 19.2315C18.1224 19.8761 18.0954 20.3763 17.6501 20.9991Z" fill="#2160FD" />
                <path d="M8.26696 6.8574C5.50365 6.57908 5.59955 2.18036 8.58017 2.15441C11.7863 2.12643 11.7072 7.2039 8.26696 6.8574Z" fill="#2160FD" />
              </svg>
                Free up your team, No burnout-More Care</h3>
              <p className="text-[#AEB6BB] text-[15px] font-medium">Matches callers to their Epic (or other) chart in seconds</p>
            </div>

            <div className="grid md:grid-cols-2 md:gap-10 gap-5">
              <div className="flex flex-col gap-6 md:mt-16 my-5">
                <Image src={`/images/luna/product-img2.webp`} width={1200} height={600} alt="Client1" className="object-cover rounded-[24px]" />
                <h3 className="font-medium md:text-[23px] text-lg text-white flex flex-row gap-3 items-center"><svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.4287 8.26259V18.7626C21.4287 19.5015 21.1352 20.21 20.6128 20.7324C20.0903 21.2549 19.3818 21.5484 18.643 21.5484H5.35725C4.61843 21.5484 3.90987 21.2549 3.38745 20.7324C2.86503 20.21 2.57153 19.5015 2.57153 18.7626V8.26259H21.4287ZM7.49239 15.1206C7.20823 15.1206 6.93571 15.2335 6.73478 15.4345C6.53384 15.6354 6.42096 15.9079 6.42096 16.1921C6.42096 16.4762 6.53384 16.7488 6.73478 16.9497C6.93571 17.1506 7.20823 17.2635 7.49239 17.2635C7.77655 17.2635 8.04907 17.1506 8.25 16.9497C8.45094 16.7488 8.56382 16.4762 8.56382 16.1921C8.56382 15.9079 8.45094 15.6354 8.25 15.4345C8.04907 15.2335 7.77655 15.1206 7.49239 15.1206ZM11.9967 15.1206C11.7125 15.1206 11.44 15.2335 11.2391 15.4345C11.0381 15.6354 10.9252 15.9079 10.9252 16.1921C10.9252 16.4762 11.0381 16.7488 11.2391 16.9497C11.44 17.1506 11.7125 17.2635 11.9967 17.2635C12.2808 17.2635 12.5534 17.1506 12.7543 16.9497C12.9552 16.7488 13.0681 16.4762 13.0681 16.1921C13.0681 15.9079 12.9552 15.6354 12.7543 15.4345C12.5534 15.2335 12.2808 15.1206 11.9967 15.1206ZM7.49239 10.8349C7.20823 10.8349 6.93571 10.9478 6.73478 11.1487C6.53384 11.3497 6.42096 11.6222 6.42096 11.9064C6.42096 12.1905 6.53384 12.463 6.73478 12.664C6.93571 12.8649 7.20823 12.9778 7.49239 12.9778C7.77655 12.9778 8.04907 12.8649 8.25 12.664C8.45094 12.463 8.56382 12.1905 8.56382 11.9064C8.56382 11.6222 8.45094 11.3497 8.25 11.1487C8.04907 10.9478 7.77655 10.8349 7.49239 10.8349ZM11.9967 10.8349C11.7125 10.8349 11.44 10.9478 11.2391 11.1487C11.0381 11.3497 10.9252 11.6222 10.9252 11.9064C10.9252 12.1905 11.0381 12.463 11.2391 12.664C11.44 12.8649 11.7125 12.9778 11.9967 12.9778C12.2808 12.9778 12.5534 12.8649 12.7543 12.664C12.9552 12.463 13.0681 12.1905 13.0681 11.9064C13.0681 11.6222 12.9552 11.3497 12.7543 11.1487C12.5534 10.9478 12.2808 10.8349 11.9967 10.8349ZM16.5001 10.8349C16.2159 10.8349 15.9434 10.9478 15.7425 11.1487C15.5416 11.3497 15.4287 11.6222 15.4287 11.9064C15.4287 12.1905 15.5416 12.463 15.7425 12.664C15.9434 12.8649 16.2159 12.9778 16.5001 12.9778C16.7843 12.9778 17.0568 12.8649 17.2577 12.664C17.4587 12.463 17.5715 12.1905 17.5715 11.9064C17.5715 11.6222 17.4587 11.3497 17.2577 11.1487C17.0568 10.9478 16.7843 10.8349 16.5001 10.8349ZM18.643 2.69116C19.3818 2.69116 20.0903 2.98466 20.6128 3.50708C21.1352 4.0295 21.4287 4.73806 21.4287 5.47688V6.97688H2.57153V5.47688C2.57153 4.73806 2.86503 4.0295 3.38745 3.50708C3.90987 2.98466 4.61843 2.69116 5.35725 2.69116H18.643Z" fill="#2160FD" />
                </svg>
                  Smart Scheduling</h3>
                <p className="text-[#AEB6BB] text-[15px] font-medium">Fills calendars and eliminates double-booking through real-time EHR slots</p>
              </div>
              <div className="flex flex-col gap-6 md:mt-16 my-5">
                <Image src={`/images/luna/product-img3.webp`} width={1200} height={600} alt="Client1" className="object-cover rounded-[24px]" />
                <h3 className="font-medium md:text-[23px] text-lg text-white flex flex-row gap-3 items-center"><svg width="13" height="23" viewBox="0 0 13 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.9797 9.21945L2.44995 22.7158C2.06577 22.9229 1.65475 22.5972 1.75389 22.181L4.89752 13.1505H0.285347C0.140765 13.1505 -0.074043 12.7564 0.0271645 12.6096C1.9088 8.96609 3.51986 5.1838 5.39942 1.54026C5.56466 1.21853 5.63902 0.870668 6.05624 0.834474C7.95027 0.663557 10.1066 0.965175 12.0275 0.834474C12.3146 0.868657 12.5459 1.12403 12.4179 1.41157L8.10518 8.62828H12.5686C12.7938 8.62828 13.0829 8.98218 12.9797 9.21945Z" fill="#2160FD" />
                </svg>
                  Rx Refills</h3>
                <p className="text-[#AEB6BB] text-[15px] font-medium">Patients check status or refill meds without waiting on staff</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-10 gap-5">
              <div className="flex flex-col gap-6 md:mt-16 my-5">
                <Image src={`/images/luna/product-img4.webp`} width={1200} height={600} alt="Client1" className="object-cover rounded-[24px]" />
                <h3 className="font-medium md:text-[23px] text-lg text-white flex flex-row gap-3 items-center"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.33313 3.21175C-3.74493 10.2751 0.807795 24.8773 12.2111 25.5801C12.7213 25.6115 13.2603 25.5567 13.7734 25.5801C14.0507 25.497 14.3813 25.5131 14.6704 25.476C19.8311 24.8113 24.1437 20.7902 25.2119 15.7141L25.4892 13.8198V12.3069C24.9091 2.39296 13.2348 -2.93648 5.33313 3.21175ZM17.4222 7.14622C18.8152 6.94959 19.2192 9.2421 19.1454 10.235C19.0715 11.2216 18.307 13.067 17.028 12.3475C15.5102 11.4935 15.6907 7.39029 17.4222 7.14622ZM8.29474 7.1472C9.57526 6.98872 10.059 9.08313 10.014 10.0379C9.96753 11.0249 9.27249 13.0695 7.92057 12.3754C6.35245 11.5708 6.52609 7.36584 8.29474 7.1472ZM19.5054 17.9636C16.7756 22.5907 8.02671 22.1661 6.3187 16.9042C6.15533 16.4008 5.86724 15.5728 6.6332 15.4422C6.76967 15.4187 6.91298 15.4202 7.04944 15.4422C7.53123 15.5185 8.21746 15.8149 8.75403 15.9337C11.5924 16.5618 14.8959 16.5535 17.7284 15.8946C18.193 15.786 18.9619 15.4686 19.3625 15.4299C19.7475 15.3928 20.2214 15.584 20.2126 16.0345C20.2038 16.5124 19.7573 17.5366 19.5054 17.9636Z" fill="#2160FD" />
                </svg>
                  Unburden your team, Let joy return</h3>
                <p className="text-[#AEB6BB] text-[15px] font-medium">Go live in days; no maintenance required</p>
              </div>
              <div className="flex flex-col gap-6 md:mt-16 my-5">
                <Image src={`/images/luna/product-img5.webp`} width={1200} height={600} alt="Client1" className="object-cover rounded-[24px]" />
                <h3 className="font-medium md:text-[23px] text-lg text-white flex flex-row gap-3 items-center"><svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_16065_2525)">
                    <path d="M19.7357 18.3803L18.5656 17.212C20.8852 14.2185 20.8767 9.91598 18.557 6.92584L19.6843 5.8039C21.8977 6.71655 24.19 5.12456 23.9655 2.70226C23.8422 1.37617 22.6772 0.238781 21.3615 0.106687C18.9648 -0.1352 17.3338 2.12756 18.2709 4.33542L17.1042 5.51912C14.209 3.14657 9.77352 3.14486 6.87824 5.51912L5.71156 4.33542C6.64867 2.10011 5.00059 -0.160933 2.57301 0.115264C0.494914 0.352005 -0.637501 2.71598 0.374991 4.53099C1.15963 5.93771 2.82998 6.40776 4.29647 5.8039L5.42375 6.92584C3.10923 9.92456 3.09553 14.2219 5.4306 17.212L4.24507 18.3803C2.0659 17.4659 -0.192073 19.0425 0.0135088 21.4305C0.1163 22.6211 1.06369 23.7053 2.21495 23.99C4.74532 24.6162 6.72234 22.1562 5.71327 19.7922L6.8337 18.6685C6.95019 18.6394 7.26371 18.9464 7.39048 19.0271C10.4794 20.9913 14.1798 20.8729 17.1128 18.6702L18.2538 19.7596C18.0396 20.4835 17.9043 21.084 18.0876 21.8388C18.73 24.4875 22.4374 24.913 23.6674 22.4426C24.9403 19.8831 22.3123 17.2292 19.7357 18.3803ZM13.3935 9.42877C15.242 11.2506 12.4461 14.1001 10.589 12.2371C8.73876 10.3826 11.5535 7.61548 13.3935 9.42877ZM16.3967 16.8003C13.9451 18.9447 9.99109 18.9447 7.57037 16.766C8.25221 15.0505 10.0905 13.884 11.927 13.8565C13.3935 13.8342 14.9234 14.5822 15.8176 15.735C15.9376 15.8894 16.4618 16.6631 16.3967 16.8003Z" fill="#2160FD" />
                  </g>
                  <defs>
                    <clipPath id="clip0_16065_2525">
                      <rect width="24" height="24" fill="white" transform="translate(0 0.0898438)" />
                    </clipPath>
                  </defs>
                </svg>
                  Omnichannel Reach</h3>
                <p className="text-[#AEB6BB] text-[15px] font-medium">Consistent experience across phone, web, SMS & chat</p>
              </div>
            </div>
          </div>
        </div>
        {/* <video
        src={`${process.env.NEXT_PUBLIC_SITE_URL}/videos/luna-landing-demo-product.webm`}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 right-0 w-full h-full object-cover"
      /> */}
        <div className="absolute top-[inherit] bottom-0 left-0 right-0">
          <LazyDirectVideo
            className="w-full h-full object-scale-down"
            srcWebm={`${process.env.NEXT_PUBLIC_SITE_URL}/videos/luna-landing-demo-product.webm`}
            srcMp4={`${process.env.NEXT_PUBLIC_SITE_URL}/videos/luna-landing-demo-product.mp4`}
            poster={`${process.env.NEXT_PUBLIC_SITE_URL}/images/luna/luna-hero.webp`}
            width={1920}
            height={1080}
          />
        </div>

        {/* <div className="absolute inset-0">
          <LazyDirectVideo
            className="w-full h-full object-fill"
            srcWebm={`${process.env.NEXT_PUBLIC_SITE_URL}/videos/luna-landing-demo-product.webm`}
            srcMp4={`${process.env.NEXT_PUBLIC_SITE_URL}/videos/luna-landing-demo-product.mp4`}
            poster={`${process.env.NEXT_PUBLIC_SITE_URL}/images/luna/luna-hero.webp`}
            width={1920}
            height={1080}
          />
        </div> */}
      </section>
    </>
  )
}
export default ProductSection