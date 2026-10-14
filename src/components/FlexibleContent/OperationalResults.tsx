import Image from "next/image"
import { urlForImage } from "@/sanity/lib/utils";

export default function WhyItMatters({ data }: any) {
  if (!data) return null
  const { heading, results } = data

  return (
    <section className="lg:py-36 py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {heading && <h2 className="text-[#171717] md:text-[60px] text-4xl text-center mb-8 leading-[100%] font-gilroy-semibold pt-2">{heading}</h2>}

        <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-4">
          {results?.map((result: any, idx: number) => {
            const imageUrl = result.image &&
              urlForImage(result.image)
                ?.width(400)
                .auto("format")
                .fit("max")
                .url();
            return (
              <div key={idx} className="md:p-6 p-4 text-left rounded-2xl bg-[#F7F7F7]">
                {imageUrl && (
                  <div
                    className={`relative"
                        }`}
                  >
                    <Image
                      src={imageUrl}
                      alt={result.title || "Feature Image"}
                      width={300}
                      height={225}
                      className="object-contain rounded-[24px] w-full h-auto"
                      sizes="
                    (min-width: 1536px) 20vw,
                    (min-width: 1280px) 25vw,
                    (min-width: 1024px) 33vw,
                    (min-width: 640px) 50vw,
                    100vw
                    "
                    />
                  </div>
                )}           
                <h3 className="text-2xl text-[#0A0D14] text-left font-gilroy-medium my-3">{result.title}</h3>
                <h4 className="!text-left tracking-tight leading-[55px] text-[48px] font-space-grotesk-regular bg-gradient-to-b from-[#6FCAFF] via-[#3591FA] to-[#0030A6] bg-clip-text text-transparent">{result.highlight}{result.suffix}</h4>
                <p className="text-[#5C5C5C] text-base text-left font3">{result.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>

  )
}
