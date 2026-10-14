"use client"
import React from "react"
import Link from "next/link"
import Image from "next/image"

interface HeaderProps {
  page?: string
  category?: string
}

export default function Header({ page, category }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#e9e9e9]" role="banner">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <div className="flex items-center">
          <Link
            href="/steernotes"
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-[#00B9B7] focus:ring-offset-2 rounded"
            aria-label="SteerNotes Home"
          >
            <Image src={`/images/steernotes-logo.svg`} alt="SteerNotes Logo" width={245} height={33} />
            {/* <span className="font-gilroy-semibold text-2xl leading-6 text-[#171717]" style={{ letterSpacing: '-0.01em' }}>
              SteerNotes<sup className="text-xs">™</sup>
            </span> */}
          </Link>
        </div>

        {/* CTA Button */}
        <div className="flex items-center">
          <Link
            href="/steernotes/contact-us"
            className="flex items-center gap-2 px-4 py-2.5 bg-[#335cff] text-white font-medium text-base leading-6 rounded-[12px] hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Get a 20-minute demo"
          >
            Get a 20-minute demo
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
      </nav>
    </header>
  )
}
