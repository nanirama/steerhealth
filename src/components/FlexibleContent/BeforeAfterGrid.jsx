'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock ImageComponent - replace with your actual ImageComponent
const ImageComponent = ({ src, alt, width, height, sizes, className }) => (
  <img 
    src={src} 
    alt={alt} 
    className={className}
    style={{ width: '100%', height: 'auto' }}
  />
);

const BeforeAfterCard = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    initial: {
      scale: 1,
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const overlayVariants = {
    initial: {
      opacity: 0,
    },
    hover: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  const textVariants = {
    initial: {
      y: 0,
      opacity: 1,
    },
    hover: {
      y: -10,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const afterTextVariants = {
    initial: {
      y: 10,
      opacity: 0,
    },
    hover: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 0.1,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      className="relative overflow-hidden rounded-3xl shadow-xs shadow-[#0A0D1408]/3% cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        {item?.ImageUrl && (
          <>
            {/* Grayscale Image */}
            <ImageComponent
              src={item?.ImageUrl}
              alt="Before And After"
              width={386}
              height={247}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 600px, 400px"
              className="rounded-t-3xl w-full transition-all duration-500 filter grayscale example"
            />
            
            {/* Color Image Overlay */}
            <motion.div
              variants={overlayVariants}
              initial="initial"
              animate={isHovered ? "hover" : "initial"}
              className="absolute inset-0"
            >
              <ImageComponent
                src={item?.ImageUrl}
                alt="Before And After - Color"
                width={386}
                height={247}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 600px, 400px"
                className="rounded-t-3xl w-full"
              />
            </motion.div>
          </>
        )}

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6">
          {/* Before Content */}
          <motion.div
            variants={textVariants}
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
            className="absolute inset-6"
          >
            <h4 className="text-white text-2xl leading-[120%] font-bold mb-2">
              {item?.beforeTitle}
            </h4>
            <p className="text-white/90 text-[15px] leading-[140%]">
              {item?.beforeDescription}
            </p>
          </motion.div>

          {/* After Content */}
          <motion.div
            variants={afterTextVariants}
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
            className="relative"
          >
            <h4 className="text-emerald-200 text-2xl leading-[120%] font-bold mb-2">
              {item?.afterTitle}
            </h4>
            <p className="text-emerald-100 text-[15px] leading-[140%]">
              {item?.afterDescription}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Main Component
const BeforeAfterGrid = () => {
  // Mock data with placeholder images
  const beforeAfterItems = [
    {
      ImageUrl: "https://via.placeholder.com/400x250/E5E7EB/6B7280?text=Healthcare+Team",
      beforeTitle: "Before Optimizing",
      beforeDescription: "Staffing gaps raise costs and slow care.",
      afterTitle: "After Optimizing", 
      afterDescription: "Automation cuts costs and speeds delivery."
    },
    {
      ImageUrl: "https://via.placeholder.com/400x250/E5E7EB/6B7280?text=Medical+Office",
      beforeTitle: "Before Automation",
      beforeDescription: "Lost patient referrals.",
      afterTitle: "After Automation",
      afterDescription: "Streamlined referral automation."
    },
    {
      ImageUrl: "https://via.placeholder.com/400x250/E5E7EB/6B7280?text=Patient+Care",
      beforeTitle: "Before Retain",
      beforeDescription: "High leakage, low brand loyalty.",
      afterTitle: "After Retain",
      afterDescription: "Easy access and retention across service."
    },
    {
      ImageUrl: "https://via.placeholder.com/400x250/E5E7EB/6B7280?text=Digital+Health",
      beforeTitle: "Before Integration",
      beforeDescription: "Fragmented systems and processes.",
      afterTitle: "After Integration",
      afterDescription: "Unified platform with seamless workflow."
    },
    {
      ImageUrl: "https://via.placeholder.com/400x250/E5E7EB/6B7280?text=Analytics",
      beforeTitle: "Before Analytics",
      beforeDescription: "Limited insights and data visibility.",
      afterTitle: "After Analytics",
      afterDescription: "Real-time reporting and actionable insights."
    },
    {
      ImageUrl: "https://via.placeholder.com/400x250/E5E7EB/6B7280?text=Communication",
      beforeTitle: "Before Communication",
      beforeDescription: "Inconsistent patient engagement.",
      afterTitle: "After Communication",
      afterDescription: "Automated multi-channel patient outreach."
    }
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Transform Your Healthcare Practice
        </h2>
        
        <motion.div 
          className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 md:pt-18 pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
        >
          {beforeAfterItems && beforeAfterItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <BeforeAfterCard item={item} index={index} />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-gray-600 text-lg">
            Hover over each card to see the transformation
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default BeforeAfterGrid;