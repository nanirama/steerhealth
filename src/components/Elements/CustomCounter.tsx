'use client'
import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const CustomCounter = ({
  count,
  decimals,
  suffix,
  prefix,
}: {
  count: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [inView, setInView] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // subtle settings only for product page
  const isProductPage = pathname?.startsWith("/productstore/");

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {inView && (
        <>
          {prefix && <span>{prefix}</span>}
          <CountUp
            end={count}
            decimals={decimals || 0}
            duration={isProductPage ? 0 : 4} 
            delay={0.2}
            separator=","
            suffix={suffix || ""}
            {...(isProductPage
              ? {} // no easing, smoother
              : {
                  easingFn: (t: number, b: number, c: number, d: number) =>
                    c * (-Math.pow(2, -10 * t / d) + 1) + b,
                })}
          />
        </>
      )}
    </motion.span>
  );
};

export default CustomCounter;
