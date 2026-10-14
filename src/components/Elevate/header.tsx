"use client"
import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

interface HeaderProps {
  page?: string
  category?: string
}

export default function Header({ page, category }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown) {
        const ref = dropdownRefs.current[openDropdown]
        if (ref && !ref.contains(event.target as Node)) {
          setOpenDropdown(null)
        }
      }
    }

    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [openDropdown])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu)
  }

  const whoWeServeItems = {
    bySize: [
      {
        title: "Solo Practice",
        description: "One clinician, lean staff, cash-pay or hybrid",
        href: "/elevate/solo-practice",
      },
      {
        title: "Group Practice",
        description: "2-10 providers, shared ops, growing demand",
        href: "/elevate/group-practice",
      },
      {
        title: "Multi-Location",
        description: "Multiple clinics, standardized workflows",
        href: "/elevate/multi-location",
      },
      {
        title: "Teleconsultation",
        description: "Nationwide care, virtual-first journeys",
        href: "/elevate/teleconsultation",
      },
    ],
    byModality: [
      {
        title: "Functional & Integrative",
        description: "Root-cause programs, labs + supplements",
        href: "/elevate/functional-and-integrative",
      },
      {
        title: "Longevity & Precision Health",
        description: "Membership models, high-touch journeys",
        href: "/elevate/longevity-and-precision",
      },
      {
        title: "Med Spa & Regenerative",
        description: "Offers, packages, retention + reactivation",
        href: "/elevate/med-spa-and-regenerative",
      },
    ],
  }

  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)

  
  // Products mega menu data structure
  const productsMenu = [
    {
      id: "patient-access-scheduling",
      title: "Patient Access & Scheduling",
      description: "Description for Patient Access & Scheduling",
      useCases: [
        "Online self-booking (web + chat)",
        "AI voice scheduling (after-hours capture)",
        "Capacity-aware routing (waitlist/backfill)",
        "No-show prevention (smart reminders)",
        "Pre-visit readiness (forms + instructions)",
        "Referral intake & conversion",
      ],
      href: "/elevate/patient-access-and-scheduling",
    },
    {
      id: "patient-engagement-communication",
      title: "Patient Engagement & Communication",
      description: "Consistent, personalized patient communication across the lifecycle—before, between, and after visits.",
      useCases: [
        "Two-way texting",
        "1:1 care team messaging",
        "Patient education sequences",
        "Broadcasts & campaigns",
        "Automated check-ins",
        "Review & feedback collection",
      ],
      href: "/elevate/patient-engagement-and-communication",
    },
    {
      id: "care-workflow-automation",
      title: "Care Workflow Automation (Between Visits)",
      description: "Orchestrate longitudinal care so patients don't drop off after labs, plans, or follow-ups—automation handles the \"next step.\"",
      useCases: [
        "Lab follow-through automation",
        "Tasking & internal routing",
        "Missed-step detection (gap closure)",
        "Care plan adherence nudges",
        "Follow-up sequencing",
        "Post-visit protocols",
      ],
      href: "/elevate/care-workflow-automation",
    },
    {
      id: "revenue-growth-reactivation",
      title: "Revenue Growth & Reactivation",
      description: "Convert more leads, upsell the right programs, and re-activate dormant patients with automated journeys.",
      useCases: [
        "Lead capture → booked consult",
        "Program/package promotion",
        "Membership conversion flows",
        "Reactivation campaigns",
        "Abandoned booking recovery",
        "Offer-based campaigns (IV, hormones, GLP-1)",
      ],
      href: "/elevate/revenue-growth-and-reactivation",
    },
    {
      id: "programs-labs-membership",
      title: "Programs, Labs & Membership Ops",
      description: "Operationalize the Functional Medicine business model—program delivery, labs, supplements, and memberships—without staff overload.",
      useCases: [
        "Program onboarding sequences",
        "Supplement/refill workflows",
        "Concierge communications",
        "Labs ordering + reminders",
        "Membership renewal nudges",
        "Progress tracking touchpoints",
      ],
      href: "/elevate/programs-labs-and-membership-ops",
    },
  ]

  const resourcesMenu = [
    {
      title: "Blog",
      href: "/elevate/blog",
    },
    {
      title: "Growth OS",
      pdf: "/elevate/pdfs/Growth-OS.pdf",
    },
    {
      title: "Growth & Retention OS",
      pdf: "/elevate/pdfs/Growth-Retention-OS.pdf",
    },
    {
      title: "Steer for Functional Medicine",
      pdf: "/elevate/pdfs/Steer-for-Functional-Medicine.pdf",
    }
  ]

  const navigationItems = [
    { label: "Who We Serve", href: "", hasDropdown: true, isWhoWeServe: true },
    { label: "Products", href: "", hasDropdown: true, isProducts: true },
    { label: "Resources", href: "", hasDropdown: true, isResources: true },
    { label: "Assess Your Practice", href: "/elevate/practice-score", hasDropdown: false },
  ]

  // Set selected product based on URL when dropdown opens, or default to first product
  useEffect(() => {
    if (openDropdown === "Products") {
      const activeProduct = productsMenu.find((product) => pathname === product.href)
      if (activeProduct) {
        setSelectedProduct(activeProduct.id)
      } else if (!selectedProduct && productsMenu.length > 0) {
        setSelectedProduct(productsMenu[0].id)
      }
    }
  }, [pathname, openDropdown])

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm" role="banner">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between md:px-2 px-4 py-4"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <div className="flex 2xl:gap-10 gap-2 items-center">
          <Link
            href="/elevate"
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#00B9B7] focus:ring-offset-2 rounded"
            aria-label="Steer Elevate Home"
          >
            {page==='elevate' ? (
              <Image
              src="/images/steerElevateLogo.svg"
              alt="Steer Elevate Logo"
              width={168}
              height={30}
              priority
              className="h-auto w-auto"
            />
            ):(
              <span className="font-gilroy-semibold text-2xl leading-6" style={{ letterSpacing: '-0.01em' }}>{page}</span>
            )}
            
            {/* <Image
              src="/images/steerElevateLogo.svg"
              alt="Steer Elevate Logo"
              width={168}
              height={30}
              priority
              className="h-auto w-auto"
            /> */}
          </Link>


          {/* Desktop Navigation */}
          <div className="hidden xl:flex lg:items-center 2xl:gap-8 gap-2">
            {/* Navigation Links */}
            <ul className="flex items-center gap-6" role="menubar">
              {navigationItems.map((item) => (
                <li key={item.label} role="none">
                  <div className="relative">
                    <button
                      onClick={() => item.hasDropdown && toggleDropdown(item.label)}
                      onMouseEnter={() => item.hasDropdown && setOpenDropdown(item.label)}
                      onMouseLeave={() => item.hasDropdown && setOpenDropdown(null)}
                      className={`flex items-center gap-2 px-3 relative py-3 text-sm font-medium font-inter leading-5 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00B9B7] focus:ring-offset-2 rounded ${openDropdown === item.label
                          ? "text-[#00B9B7]"
                          : "text-[#171717] hover:text-[#00B9B7]"
                        }`}
                      aria-expanded={openDropdown === item.label}
                      aria-haspopup={item.hasDropdown}
                      aria-label={`${item.label} menu`}
                    >
                      {item.href ? (
                        <Link 
                          href={item.href}
                          className="flex items-center gap-2"
                          onClick={(e) => !item.hasDropdown && e.stopPropagation()}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        item.label
                      )}
                      {item.hasDropdown && (
                        <svg
                          className={`w-4 h-4 transition-transform ${openDropdown === item.label ? "rotate-180" : ""
                            }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      )}
                    </button>
                    {/* Dropdown Menu */}
                    {item.hasDropdown && openDropdown === item.label && (
                      <div
                        ref={(el) => {
                          dropdownRefs.current[item.label] = el
                        }}
                        className={`absolute left-0 top-full bg-white shadow-2xl rounded-3xl  focus:outline-none ${item.isWhoWeServe
                            ? "w-[90vw] max-w-[600px] rounded-lg"
                            : item.isProducts
                              ? "w-[90vw] max-w-[800px] rounded-lg"
                              : item.isResources
                                ? "w-auto rounded-lg"
                                : "w-48 rounded-md"
                          }`}
                        role="menu"
                        aria-orientation="vertical"
                        onMouseEnter={() => setOpenDropdown(item.label)}
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        {item.isWhoWeServe ? (
                          // Who We Serve - Two Column Layout
                          <div className="p-4 sm:p-6 ">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                              {/* BY SIZE Column */}
                              <div>
                                <h3 className="text-sm font-inter font-bold text-gray-800 uppercase tracking-wide mb-4">
                                  BY SIZE
                                </h3>
                                <ul className="space-y-4" role="list">
                                  {whoWeServeItems.bySize.map((sizeItem) => (
                                    <li key={sizeItem.title}>
                                      <Link
                                        href={sizeItem.href}
                                        className="block group focus:outline-none focus:ring-2 focus:ring-[#00B9B7] focus:ring-offset-2 rounded p-2 -m-2"
                                        role="menuitem"
                                      >
                                        <div className="font-bold text-gray-900 text-base mb-1 group-hover:text-[#00B9B7] transition-colors">
                                          {sizeItem.title}
                                        </div>
                                        <div className="text-sm text-gray-600 leading-relaxed">
                                          {sizeItem.description}
                                        </div>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* BY MODALITY Column */}
                              <div>
                                <h3 className="text-sm font-inter font-bold text-gray-800 uppercase tracking-wide mb-4">
                                  BY MODALITY
                                </h3>
                                <ul className="space-y-4" role="list">
                                  {whoWeServeItems.byModality.map((modalityItem) => (
                                    <li key={modalityItem.title}>
                                      <Link
                                        href={modalityItem.href}
                                        className="block group focus:outline-none focus:ring-2 focus:ring-[#00B9B7] focus:ring-offset-2 rounded p-2 -m-2"
                                        role="menuitem"
                                      >
                                        <div className="font-bold font-inter text-gray-900 text-base mb-1 group-hover:text-[#00B9B7] transition-colors">
                                          {modalityItem.title}
                                        </div>
                                        <div className="text-sm text-gray-600 leading-relaxed font-inter">
                                          {modalityItem.description}
                                        </div>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        ) : item.isResources ? (
                          // Resources Dropdown - Simple list with PDF links
                          <div className="py-2 min-w-[200px] sm:min-w-[240px]">
                            <ul className="space-y-1" role="list">
                              {resourcesMenu.map((resource) => (
                                <li key={resource.title}>
                                  {resource.href ? (
                                    <Link
                                      href={resource.href}
                                      className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#00B9B7] transition-colors focus:outline-none focus:ring-2 focus:ring-[#00B9B7] focus:ring-inset rounded-md"
                                      role="menuitem"
                                      onClick={() => setOpenDropdown(null)}
                                    >
                                      <span className="font-inter">{resource.title}</span>
                                    </Link>
                                  ) : (
                                    <a
                                      href={resource.pdf}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#00B9B7] transition-colors focus:outline-none focus:ring-2 focus:ring-[#00B9B7] focus:ring-inset rounded-md"
                                      role="menuitem"
                                      onClick={() => setOpenDropdown(null)}
                                    >
                                      <div className="flex items-center justify-between">
                                        <span className="font-inter">{resource.title}</span>
                                        <svg
                                          className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                          aria-hidden="true"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                          />
                                        </svg>
                                      </div>
                                    </a>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : item.isProducts ? (
                          // Products Mega Menu - Two Column Layout
                          <div className="flex flex-col lg:flex-row rounded-lg overflow-hidden">
                            {/* Left Navigation Column */}
                            <div className="bg-gray-50 lg:w-72 w-full border-r border-gray-200 p-3">
                              <ul className="py-2" role="list">
                                {productsMenu.map((product) => {
                                  const isUrlActive = pathname === product.href
                                  return (
                                    <li key={product.id}>
                                      <Link
                                        href={product.href}
                                        onClick={() => setSelectedProduct(product.id)}
                                        onMouseEnter={() => setSelectedProduct(product.id)}
                                        className={`w-full cursor-pointer text-left px-4 py-3 flex items-center justify-between transition-colors focus:outline-none focus:ring-2 focus:ring-[#00B9B7] focus:ring-inset ${isUrlActive
                                            ? "bg-white shadow-md rounded-md text-[#00B9B7]"
                                            : "text-gray-700 font-inter hover:bg-gray-100"
                                          }`}
                                        role="menuitem"
                                        aria-selected={isUrlActive}
                                      >
                                        <span className="font-medium font-inter  text-sm leading-[24px] ">{product.title}</span>
                                        {isUrlActive && (
                                        <svg
                                          className="w-4 h-4 text-[#00B9B7] shrink-0"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                          aria-hidden="true"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                          />
                                        </svg>
                                      )}
                                    </Link>
                                  </li>
                                  )
                                })}
                              </ul>
                            </div>

                            {/* Right Content Column */}
                            <div className="bg-white lg:w-[480px] w-full p-4 sm:p-6 lg:p-8">
                              {selectedProduct && productsMenu.find((p) => p.id === selectedProduct) && (
                                <>
                                  {(() => {
                                    const product = productsMenu.find((p) => p.id === selectedProduct)!
                                    return (
                                      <>
                                        {/* Product Title */}
                                        <h3 className="text-xl font-inter  font-bold text-gray-900 mb-3 lg:mb-4">
                                          {product.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-sm  font-inter text-gray-600 mb-4 lg:mb-6 leading-relaxed">
                                          {product.description}
                                        </p>

                                        {/* Common Use Cases */}
                                        <h4 className="text-xs lg:text-sm font-inter font-bold text-gray-700 uppercase tracking-wide mb-3 lg:mb-4">
                                          COMMON USE CASES
                                        </h4>

                                        {/* Use Cases Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 mb-4 lg:mb-6">
                                          {product.useCases.map((useCase, index) => (
                                            <div
                                              key={index}
                                              className="flex items-start gap-2 lg:gap-3"
                                            >
                                              {/* Checkmark Icon */}
                                              <div className="flex-shrink-0 w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-[#00B9B7] flex items-center justify-center mt-0.5">
                                                <svg
                                                  className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-white"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  viewBox="0 0 24 24"
                                                  aria-hidden="true"
                                                >
                                                  <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={3}
                                                    d="M5 13l4 4L19 7"
                                                  />
                                                </svg>
                                              </div>
                                              <span className="text-xs lg:text-sm font-inter text-gray-700 leading-relaxed">
                                                {useCase}
                                              </span>
                                            </div>
                                          ))}
                                        </div>

                                        {/* Learn More Button */}
                                        <Link
                                          href={product.href}
                                          className="inline-flex items-center gap-2 px-4 lg:px-6 py-2.5 lg:py-3 bg-[#00B9B7] text-white font-inter font-medium  text-sm leading-[24px] rounded-lg hover:bg-[#2347e6] transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                          onClick={() => setOpenDropdown(null)}
                                        >
                                          Learn more about {product.title}
                                          <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth={2}
                                              d="M9 5l7 7-7 7"
                                            />
                                          </svg>
                                        </Link>
                                      </>
                                    )
                                  })()}
                                </>
                              )}
                            </div>
                          </div>
                        ) : (
                          // Other dropdowns - Simple list
                          <div className="py-1" role="none">
                            {/* <Link
                            href={`${item.href}/overview`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                            role="menuitem"
                          >
                            Overview
                          </Link> */}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Badges and Button */}
        <div className="flex items-center sm:gap-4 gap-1 sm:ml-4 ml-2">
          {/* HIPAA Badge */}
          {category !== 'elevateProducts' && (
            <div className="hidden md:flex flex-col items-center">
              <Image src={'/images/elevate-svg.svg'} alt="elevatesvg" width={38} height={36} />
            </div>
          )}

          {/* AICPA SOC 2 Badge */}
          {category !== 'elevateProducts' && (
            <div className="hidden md:flex flex-col items-center">
              <Image src={'/images/elevate-svg2.svg'} alt="elevatesvg2" width={57} height={36} />
            </div>
          )}

          {/* Free Demo Button */}
          <Link
            href="/elevate/contact-us"
            className="hidden md:flex  items-center gap-2 lg:gap-4  px-2 lg:px-4 py-2 lg:py-2.5 bg-gradient-to-r from-[#3794FF] to-[#00B9B7] text-white font-medium leading-[24px] lg:text-[16.73px] sm:text-sm text-xs rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Request a free demo"
          >
            Free Demo
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>



          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00B9B7] focus:ring-offset-2 rounded"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle mobile menu"
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden border-t border-gray-200 bg-white"
          role="menu"
        >
          <div className="px-4 py-4 space-y-2">
            {navigationItems.map((item) => (
              <div key={item.label}>
                {item.isProducts && item.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700 hover:text-[#00B9B7] hover:bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-expanded={openDropdown === item.label}
                    >
                      {item.label}
                      <svg
                        className={`w-4 h-4 transition-transform ${openDropdown === item.label ? "rotate-180" : ""
                          }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {openDropdown === item.label && (
                      <div className="mt-2 pl-4 space-y-4 border-l-2 border-gray-200">
                        {productsMenu.map((product) => (
                          <div key={product.id} className="space-y-3">
                            <Link
                              href={product.href}
                              className="block focus:outline-none focus:ring-2 focus:ring-[#00B9B7] rounded p-2 -m-2"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <div className="font-bold text-gray-900 text-sm mb-2">
                                {product.title}
                              </div>
                              <div className="text-xs text-gray-600 leading-relaxed mb-3">
                                {product.description}
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : item.isResources && item.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700 hover:text-[#00B9B7] hover:bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-expanded={openDropdown === item.label}
                    >
                      {item.label}
                      <svg
                        className={`w-4 h-4 transition-transform ${openDropdown === item.label ? "rotate-180" : ""
                          }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {openDropdown === item.label && (
                      <div className="mt-2 pl-4 space-y-2 border-l-2 border-gray-200">
                        {resourcesMenu.map((resource) => (
                          resource.href ? (
                            <Link
                              key={resource.title}
                              href={resource.href}
                              className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-[#00B9B7] hover:bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B9B7] transition-colors"
                              onClick={() => {
                                setIsMobileMenuOpen(false)
                                setOpenDropdown(null)
                              }}
                            >
                              <span className="font-inter">{resource.title}</span>
                            </Link>
                          ) : (
                            <a
                              key={resource.title}
                              href={resource.pdf}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-[#00B9B7] hover:bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B9B7] transition-colors"
                              onClick={() => {
                                setIsMobileMenuOpen(false)
                                setOpenDropdown(null)
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-inter">{resource.title}</span>
                                <svg
                                  className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  aria-hidden="true"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                  />
                                </svg>
                              </div>
                            </a>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                ) : item.isWhoWeServe && item.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700 hover:text-[#00B9B7] hover:bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-expanded={openDropdown === item.label}
                    >
                      {item.label}
                      <svg
                        className={`w-4 h-4 transition-transform ${openDropdown === item.label ? "rotate-180" : ""
                          }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {openDropdown === item.label && (
                      <div className="mt-2 pl-4 space-y-4 border-l-2 border-gray-200">
                        {/* BY SIZE Section */}
                        <div>
                          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-3">
                            BY SIZE
                          </h3>
                          <ul className="space-y-3">
                            {whoWeServeItems.bySize.map((sizeItem) => (
                              <li key={sizeItem.title}>
                                <Link
                                  href={sizeItem.href}
                                  className="block focus:outline-none focus:ring-2 focus:ring-[#00B9B7] rounded p-2 -m-2"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  <div className="font-bold text-gray-900 text-sm mb-1">
                                    {sizeItem.title}
                                  </div>
                                  <div className="text-xs text-gray-600 leading-relaxed">
                                    {sizeItem.description}
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {/* BY MODALITY Section */}
                        <div>
                          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-3">
                            BY MODALITY
                          </h3>
                          <ul className="space-y-3">
                            {whoWeServeItems.byModality.map((modalityItem) => (
                              <li key={modalityItem.title}>
                                <Link
                                  href={modalityItem.href}
                                  className="block focus:outline-none focus:ring-2 focus:ring-[#00B9B7] rounded p-2 -m-2"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  <div className="font-bold text-gray-900 text-sm mb-1">
                                    {modalityItem.title}
                                  </div>
                                  <div className="text-xs text-gray-600 leading-relaxed">
                                    {modalityItem.description}
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#00B9B7] hover:bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    role="menuitem"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-gray-200">
              <Link
                href="/demo"
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gradient-to-r from-[#335CFF] to-[#00D9A5] text-white font-medium leading-[24px] text-sm rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                role="menuitem"
              >
                Free Demo
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
            {page !== 'elevate' && (
              <div className="flex items-center justify-center gap-4 pt-4">
                <div className="flex flex-col items-center">
                  <svg
                    className="w-6 h-6 text-[#00B9B7] mb-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-label="HIPAA Compliant"
                  >
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                  </svg>
                  <div className="bg-[#335CFF] text-white text-[10px] px-2 py-0.5 rounded">
                    HIPAA - Compliant
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#00B9B7] flex items-center justify-center">
                  <span className="text-white text-[8px] font-medium text-center leading-tight px-1">
                    AICPA SOC 2 Type II
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
