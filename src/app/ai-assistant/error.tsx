'use client'

export default function RagError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-[#F5F5F5] px-4 pt-28">
      <div role="alert" className="max-w-md rounded-[24px] border border-[#EBEBEB] bg-white p-8 text-center">
        <h1 className="font3 text-[22px] font-semibold text-[#171717]">The assistant could not load</h1>
        <p className="mt-2 text-[14px] text-[#5C5C5C]">Please try again. If the problem continues, contact the Steer Health team.</p>
        <button type="button" onClick={reset} className="mt-5 rounded-[8px] bg-[#335CFF] px-4 py-2.5 text-[14px] font-medium text-white hover:bg-[#2F55EB]">
          Try again
        </button>
      </div>
    </main>
  )
}
