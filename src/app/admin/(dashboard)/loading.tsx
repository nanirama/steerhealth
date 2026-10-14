export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading" className="space-y-4">
      <div className="h-8 w-64 animate-pulse rounded bg-[#E6E6E6] motion-reduce:animate-none" />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl bg-white motion-reduce:animate-none" />
        ))}
      </div>
      <div className="h-64 animate-pulse rounded-[20px] bg-white motion-reduce:animate-none" />
    </div>
  )
}
