// src/components/Common/GlobalLoader.tsx
import Image from "next/image";
const GlobalLoader = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-20 z-[9999]">
      <Image src="/images/loading.gif" alt="logo" width={100} height={100} className="lg:w-48 lg:h-48  w-32 h-32" />      {/* <div className="lg:w-16 lg:h-16  w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div> */}
    </div>
  );
  
  export default GlobalLoader;