
import HeroSection from "@/components/Luna/HeroSection";
import LunaStats from "@/components/Luna/LunaStats";
import ProductSection from "@/components/Luna/ProductSection";
import TryItYourSelfSection from "@/components/Luna/TryItYourSelfSection";
import MoreFeaturesSection from "@/components/Luna/MoreFeaturesSection"
import EHRIntegrations from "@/components/Luna/EHRIntegrations";
import WhyEveryoneSection from "@/components/Luna/WhyEveryoneSection";
import SolutionSection from "@/components/Luna/SolutionSection";
import ROISection from "@/components/Luna/ROISection";
import LunaTrustedSection from "@/components/Luna/LunaTrustedSection";
import LiveDemoDarkSection from "@/components/Luna/LiveDemoDarkSection";


const LunaIndexpage = () => {
    return (
        <>
            <HeroSection />
            <TryItYourSelfSection />
            <LunaStats />
            <ProductSection />
            <MoreFeaturesSection />
            <EHRIntegrations />
            <WhyEveryoneSection />
            <SolutionSection />
            <ROISection />
            <LunaTrustedSection />
            <LiveDemoDarkSection />
        </>
    )
}

export default LunaIndexpage;