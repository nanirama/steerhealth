"use client";
import React, { useState } from "react";
import { X, Menu, ChevronRight, ChevronLeft } from 'lucide-react';
import Link from "next/link";
import Image from "next/image";
import ImageComponent from '../Elements/ImageComponent';
import HeaderClientsSlider from "./HeaderClientsSlider";

// const MobileHeader = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {

//   }, [menuOpen]);

//   return (
//     <header className="flex items-center justify-between p-4 border-b border-gray-200 md:hidden">
//       {/* Logo */}
//       <div className="w-[32px] h-[32px]">
//         <Link href="/" >
//           <ImageComponent
//             src="logo-mobile-home.webp"
//             alt="Steer Health Logo"
//             width={32} height={32}
//             priority={true}
//             cdn={false}
//             sizes="(min-width: 768px) 161px, 100vw"
//           />
//         </Link>
//       </div>

//       {/* Hamburger */}
//       <button onClick={() => setMenuOpen(true)}>
//         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//         </svg>
//       </button>

//       {/* Slide-in Menu */}
//       <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
//     </header>
//   );
// };

// export default MobileHeader;


export default function MobileHeader({ products, categories }) {
  const [open, setOpen] = useState(false);
  const [subopen, setSubopen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const menuTitle =
    activeMenu && ['platform', 'whoweserve', 'company', 'resources'].includes(activeMenu)
      ? {
        platform: 'AI Platform',
        whoweserve: 'Who We Serve',
        company: 'Company',
        resources: 'Resources',
      }[activeMenu]
      : '';

  const submenuItems = {
    platform: [
      {
        label: 'Drive Growth',
        learnmore: 'Optimize care capacity to expand patient volume and maximize revenue.', image: 'drive-growth.webp', href: "/drive-growth"
      },
      {
        label: "Reduce Costs",
        learnmore: "Eliminate patient leakage and secure downstream revenue with Steer.", image: 'reduce-costs.webp', href: "/reduce-costs"
      },
      {
        label: "Simplify Work",
        learnmore: "Boost efficiency and lower operational overhead with intelligent automation.", image: 'simplify-work.webp', href: "/simplify-work"
      },
    ],
    whoweserve: [
      { label: 'Hospitals', learnmore: "Cut costs and connect care across every department.", image: 'hospitals-menu-img.webp', href: "/who-we-serve/hospitals" },
      { label: "ASC's", learnmore: "Run operating rooms smoother with automated workflows.", image: 'asc-menu-img.webp', href: '/who-we-serve/ambulatory-surgery-centers' },
      { label: "Medical Groups", learnmore: "Grow visits and simplify intake, no-shows, and reputation.", image: 'clinics-menu-img.webp', href: '/who-we-serve/medical-groups' },
      { label: "Functional Medicine", learnmore: "Care with easy intake, virtual visits, and engagement.", image: 'fm-menu-img.webp', href: '/who-we-serve/functional-medicine' },
    ],

    company: [
      {
        label: 'About Us',
        subItems: [
          { label: 'Mission & Vision', href: '/about' },
          { label: 'Security', href: '/security' },
          { label: 'FAQs', href: '/faq' },
          { label: 'Careers', href: '/careers' },
        ],
      },
      {
        label: 'Legal',
        subItems: [
          { label: "Terms of use", href: "/terms-of-use" },
          { label: "Privacy Policy", href: "/privacy-policy" },
          { label: "Cookie Notice", href: "/cookie-notice" },
          { label: "Developer Agreement", href: "/developer-agreement" },
        ],
      },
      {
        label: 'Contact Us',
        description: 'Drop us a message and we will surely reach out.',
        href: '/contact-us',
      },
    ],

    resources: [
      { label: 'Blog', href: '/blog' },
      { label: 'Case Studies', href: '/partnerships' },
      { label: 'EHR Integration', href: '/ehr' },
    ],
  };

  return (
    <div className="">
      {/* Top bar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <Link href="/" >
          <Image
            src="/images/logo.webp"
            alt="Steer Health Logo"
            width={161}
            height={32}
            priority
            fetchPriority="high"
            loading="eager"
            sizes="(min-width: 768px) 161px, 100vw"
          />
        </Link>
        <button aria-label="Mobile Menu Icon" onClick={() => setOpen(true)} className="p-1">
          <Menu size={28} />
        </button>
      </div>

      {/* Overlay */}
      <div
        className={`absolute min-h-screen inset-0 bg-black bg-opacity-40 z-30 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => {
          setOpen(false);
          setActiveMenu(null);
        }}
      />

      {/* Sidebar */}
      <div
        className={`fixed h-screen flex flex-col justify-between top-0 left-0 w-full bg-white z-50 transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex flex-col gap-0">
          {/* Header */}
          <div className="flex items-center justify-between p-4 ">
            {activeMenu ? (
              <>
                <button aria-label="Back" onClick={() => setActiveMenu(null)} className="flex items-center gap-1">
                  <ChevronLeft size={24} />
                </button>
                <span className="font-semibold font3 text-sm text-[#5C5C5C]">{menuTitle}</span>
              </>
            ) : (
              <span className="font-bold text-lg"></span>
            )}
            <button
              aria-label="Close"
              onClick={() => {
                setOpen(false);
                setActiveMenu(null);
                setSubopen(true);
              }}
            >
              <X />
            </button>
          </div>

          {/* Main Menu */}
          {!activeMenu && (
            <ul className="flex flex-col gap-6 mt-2 pl-4 pr-2 font-bold animate-slide-inright h-[70vh]">
              {['platform', 'whoweserve', 'company', 'resources'].map((key) => {
                return (
                  <li key={key}>
                    <button
                      aria-label={key}
                      onClick={() => {
                        setActiveMenu(key);
                        setSubopen(true);
                      }}
                      className="w-full mb-4 flex items-center justify-between px-4 cursor-pointer"
                    >
                      <span className="font2 font-semibold text-xl text-[#171717]">{menuTitleCase(key)}</span> <ChevronRight />
                    </button>
                  </li>
                )
              })}
              <li>
                <Link
                  href="/ai-assistant"
                  onClick={() => {
                    setOpen(false);
                    setActiveMenu(null);
                  }}
                  className="w-full mb-4 flex items-center justify-between px-4"
                >
                  <span className="font2 font-semibold text-xl text-[#171717]">AI Assistant</span> <ChevronRight />
                </Link>
              </li>
            </ul>
          )}

          {/* Submenu */}
          {activeMenu && (
            <div className="p-4 animate-slide-in h-[80vh] overflow-y-scroll">
              {activeMenu && (
                <div className="">
                  {activeMenu === 'platform' && (
                    <h3 className="sm:text-xl text-lg text-[#171717] font-semibold font2 p-4">
                      Value We Deliver
                    </h3>
                  )}
                  {activeMenu === 'whoweserve' && (
                    <h3 className="sm:text-xl text-lg text-[#171717] font-semibold font2 p-4">
                      Solutions For
                    </h3>
                  )}
                </div>
              )}
              <ul className="flex flex-col gap-4 font-medium ">
                {submenuItems[activeMenu]?.map((item, idx) => (
                  <li
                    key={idx}
                    className={`
    ${(activeMenu === 'platform' || activeMenu === 'whoweserve')
                        ? 'bg-transparent hover:bg-[#F9FAFB] rounded-[16px] p-4'
                        : 'border-b border-gray-200 pb-4 px-4'
                      } 
    ${activeMenu === 'company' ? 'last:border-0' : ''}
  `}
                  >
                    <div className="flex items-start">
                      <div
                        className={`${(activeMenu === 'platform' || activeMenu === 'whoweserve') ? 'w-full' : 'w-[50%]'
                          } ${activeMenu !== 'resources' ? 'w-[50%]' : 'w-full'}`}
                      >
                        <div className={`flex items-center justify-between cursor-pointer`}>
                          <span className="flex flex-col text-[#171717] font2 text-xl font-semibold">
                            {item?.href ? (
                              <Link href={item?.href || '#'}>{item.label}</Link>
                            ) : (
                              <span>{item.label}</span>
                            )
                            }

                            {(activeMenu === 'platform' || activeMenu === 'whoweserve') && (
                              <span className="text-xs text-gray-500 py-1"><Link href={item?.href || '#'}>{item?.learnmore}</Link></span>
                            )}
                          </span>

                          {item?.image && (
                            <Link href={item?.href || '#'} >
                              <ImageComponent
                                src={item.image}
                                alt={item.label}
                                width={54} height={54}
                                className="w-[54px] h-[54px] object-contain"
                                sizes="(min-width: 768px) 54px, 100vw"
                              />
                            </Link>
                          )}

                          {activeMenu === 'resources' && <ChevronRight size={16} />}

                        </div>
                      </div>


                      {item.subItems && (
                        <ul className="text-sm text-gray-600 space-y-1">
                          {item.subItems.map((sub, subIdx) => (
                            <li key={subIdx}>
                              {sub?.href ? (
                                <Link
                                  href={sub.href || '#'}
                                  className="block cursor-pointer hover:underline text-[#5C5C5C] text-base font3 mb-3 hover:text-[#171717]"
                                >
                                  {sub.label}
                                </Link>
                              ) : (
                                <span>{sub.label}</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    {item.description && (
                      <span className="text-xs text-gray-500"><Link
                        href={item?.href || '#'}
                        className="block cursor-pointer hover:underline"
                      >{item.description}</Link></span>
                    )}
                  </li>
                ))}
              </ul>
              {activeMenu === 'platform' && (
                <div className='flex flex-row w-full gap-2 xl:col-span-2 relative px-4 mt-[20px]'>
                  <h4 className='flex-1 font-semibold text-[#171717] text-xl font2 mb-2'>Products</h4>
                  <ul className='flex-1 flex flex-col gap-3'>
                    {products && products.map((item, index) => (
                      <li key={index}><Link href={`/products/${item?.slug}`} className='text-base text-[#5C5C5C] font3 capitalize hover:underline hover:text-[#171717]'>{item?.title}</Link></li>
                    ))}
                    {/* <li><Link href="#" className='text-base text-[#5C5C5C] font3 capitalize hover:underline hover:text-[#171717]'>Digital Front Door</Link></li>
                    <li><Link href="#" className='text-base text-[#5C5C5C] font3 capitalize hover:underline hover:text-[#171717]'>Luna AI</Link></li>
                    <li><Link href="#" className='text-base text-[#5C5C5C] font3 capitalize hover:underline hover:text-[#171717]'>Steer Notes</Link></li>
                    <li><Link href="#" className='text-base text-[#5C5C5C] font3 capitalize hover:underline hover:text-[#171717]'>FastrackCare</Link></li>
                    <li><Link href="#" className='text-base text-[#5C5C5C] font3 capitalize hover:underline hover:text-[#171717]'>AI Kiosk</Link></li> */}
                  </ul>
                </div>
              )}
              {activeMenu === 'whoweserve' && (
                <div className='flex flex-row gap-2 xl:col-span-2 relative px-4 mt-[20px]'>
                  <h4 className='flex-1 font-semibold text-[#171717] text-xl font2 mb-2'>Features</h4>
                  <ul className='flex-1 flex flex-col gap-3'>
                    {categories && categories.map((category, index) => (
                      <li key={index}><Link href={`/blog/${category.slug}`} className='text-base text-[#5C5C5C] font3 capitalize hover:underline hover:text-[#171717]'>{category?.title}</Link></li>
                    ))}
                  </ul>
                </div>
              )}


            </div>
          )}
        </div>

        <div className="">
          <HeaderClientsSlider />
        </div>
      </div>
    </div>
  );
}

function menuTitleCase(key) {
  if (key === 'whoweserve') {
    return 'Who We Serve'
  }
  return key.charAt(0).toUpperCase() + key.slice(1);
}