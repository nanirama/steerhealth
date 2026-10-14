// components/OutcomesThatMatter.tsx
import { urlForImage } from '@/sanity/lib/utils';
import Image from "next/image";


export default function OutcomesThatMatter({ data }: any) {

  if (!data) return null

  return (
    <div className='w-full'>
      <section className="bg-gradient-to-r from-[#2160FD]/100 to-[#C0D5FF]/80 px-4 py-20">
        <div className="mx-auto max-w-3xl">

          <h2 className="mb-12 text-center md:text-[60px] text-[40px] font-medium text-white">
            {data.title}
          </h2>

          <ul className="space-y-4" role="list">
            {data.items?.map((item: any) => (
              <li
                key={item._key}
                className="flex items-center gap-4 rounded-lg bg-white/10 p-6 backdrop-blur-sm border border-white/20"
              >
                {item.icon && (
                  <div className="flex h-[36px] w-[36px] flex-shrink-0 items-center justify-center rounded-full bg-white/20 p-2">
                    <div className="relative h-full w-full">
                      <Image
                        src={item.icon}
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}
                <p className="font3 text-xl text-white">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}