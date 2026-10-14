import React from "react";
import Image from "next/image";
import FeatureCardsSection from './FeatureCardsSection'
import MetricsStatsSection from './MetricsStatsSection'
import TrustBadgeSection from './TrustBadgeSection'
import ClientLogos from "./ClientLogos";






const WhyHealthSystemSection = ()=>{
    return (
        <>
        <div
            className="w-full bg-[#001131] bg-cover md:py-16 py-8  bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/events/healthsystem-bg.webp')" }}
            >
            <FeatureCardsSection/>
            <MetricsStatsSection/>
            <ClientLogos/>
            <TrustBadgeSection/>
           
        </div>
        </>
    )
}
export default WhyHealthSystemSection