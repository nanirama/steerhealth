import type { Metadata } from 'next'
import BaseLayout from '@/components/Common/BaseLayout'
import RagWorkspace from '@/components/Rag/RagWorkspace'

// Rendered per request: the page is interactive and its header data is fetched at request time.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Knowledge Assistant | Steer Health',
  description: "Ask questions about Steer Health's products, solutions and FAQs. Answers are grounded in Steer Health content with cited sources.",
  // Keep out of search results until the assistant is launched publicly.
  robots: { index: false, follow: false },
}

export default function RagPage() {
  return (
    <BaseLayout>
      <main className="bg-[#F5F5F5] pb-16">
        <section className="bg-gradient2 pb-10 pt-14 md:pt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#335CFF]">Knowledge assistant</p>
            <h1 className="font3 mt-3 max-w-3xl text-[34px] font-semibold leading-[1.1] tracking-tight text-[#171717] md:text-[48px]">
              Ask anything about <span className="font4 font-normal text-[#0030A6]">Steer Health</span>
            </h1>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[#5C5C5C] md:text-[18px]">
              Get instant, sourced answers about our AI platform, products, solutions and integrations, drawn only from Steer Health&rsquo;s published content.
            </p>
          </div>
        </section>
        <div className="mx-auto -mt-2 max-w-7xl px-4 sm:px-6 lg:px-8">
          <RagWorkspace />
        </div>
      </main>
    </BaseLayout>
  )
}
