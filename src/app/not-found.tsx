// app/not-found.tsx
import Link from 'next/link'
import BaseLayout from '@/components/Common/BaseLayout'

export default function NotFound() {
  return (
    <BaseLayout>
      <main className=" bg-white flex flex-col gap-6 items-center justify-center text-center py-28 px-4">
        <h2 className="lg:text-[180px] md:text-[120px] text-[90px] font-gilroy-semibold leading-[100%] bg-gradient-to-t from-[#6FCAFF] via-[#3591FA] to-[#2160FD] bg-clip-text text-transparent false mb-4">404</h2>
        <h3 className="sm:text-[36px] text-2xl text-black font-gilroy-semibold md:-mt-12 -mt-5">Oops! Page not found</h3>
        <p className='font3 text-[#5C5C5C] text-xl leading-[140%]'>The page you’re looking for doesn’t exist or has been moved</p>
        <Link href="/" className='inline-flex items-center justify-center rounded-[8px] transition-all duration-200 border border-[#335CFF] cursor-pointer group relative flex-row sm:gap-2 gap-1 leading-[24px] text-black font-medium py-3 sm:px-4 px-1 sm:text-sm text-xs'>
          Back to homepage
          <div className="relative ml-1 h-5 w-5 overflow-hidden">
            <div className="absolute transition-all duration-200 group-hover:-translate-y-5 group-hover:translate-x-4">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 -translate-x-4"><path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
            </div>
          </div>
        </Link>        
      </main>
    </BaseLayout>
  )
}
