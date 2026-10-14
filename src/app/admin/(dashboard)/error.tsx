'use client'

export default function AdminError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div role="alert" className="rounded-[20px] border border-[#F5C2C0] bg-white p-6">
      <h2 className="font3 text-[18px] font-semibold text-[#171717]">This view could not be loaded</h2>
      <p className="mt-1 text-[14px] text-[#5C5C5C]">The telemetry store may be unavailable. Details are in the server logs.</p>
      <button type="button" onClick={reset} className="mt-4 rounded-[8px] bg-[#335CFF] px-4 py-2 text-[14px] font-medium text-white hover:bg-[#2F55EB]">
        Try again
      </button>
    </div>
  )
}
