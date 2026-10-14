export default function Loading() {
  return (
    <main className="min-h-screen bg-[#F5F5F5] pt-28 md:pt-36" aria-busy="true" aria-label="Loading knowledge assistant">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-3 w-40 animate-pulse rounded bg-[#E6E6E6] motion-reduce:animate-none" />
        <div className="mt-4 h-10 w-full max-w-xl animate-pulse rounded bg-[#E6E6E6] motion-reduce:animate-none" />
        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="h-[560px] animate-pulse rounded-[24px] bg-white motion-reduce:animate-none" />
          <div className="h-[420px] animate-pulse rounded-[24px] bg-white motion-reduce:animate-none" />
        </div>
      </div>
    </main>
  )
}
