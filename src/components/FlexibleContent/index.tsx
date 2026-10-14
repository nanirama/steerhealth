import { Suspense } from "react";

import HeroVideoSection from "./HeroVideoSection";
import HeroImageSection from "./HeroImageSection";
import SteerAdvantageSection from "./SteerAdvantageSection";
import HowSteerSolutionsHelps from "./HowSteerSolutionsHelps";
import ClientsSection from "./ClientSection";
import PatientAcquisitionBenefits from "./PatientAcquisitionBenefits";
import TestimonialsSection from "./TestimonialsSection";
import MoreThingsToExplore from "./MoreThingsToExplore";
import FaqSection from "./FaqSection";
import FaqPageSection from "./FaqPageSection";
import CtaSection from "./CtaSection";
import SteerHealthBenefits from "./SteerHealthBenefits";
import WorkWithYourEcoSystem from "./WorkWithYourEcoSystem";
import SteerHealthPartnershipOutcomes from "./SteerHealthPartnershipOutcomes";
import AcquireCapabilitiesBeingBeginning from "./AcquireCapabilitiesBeingBeginning";
import AutomateCapabilitiesBeingBeginning from "./AutomateCapabilitiesBeingBeginning";
import NavigateCapabilitiesBeingBeginning from "./NavigateCapabilitiesBeingBeginning";
import SeamlessIntakes from "./SeamlessIntakes";
import SolutionsStats from "./SolutionsStats";
import HowSteerProductsHelps from "./HowSteerProductsHelps";
import BeforeAfterSection from "./BeforeAfterSection";
import HowSteerHelps from "./HowSteerHelps";
import SolutionsCtaSection from "./SolutionsCtaSection";
import SolutionsBeingAtBeginning from "./SolutionsBeingAtBeginning"
import SolutionsSteamline from "./SolutionsSteamline"
import SolutionsheroImageSection from "./SolutionsheroImageSection"
import AboutHeroSection from "./AboutHeroSection";
import CompanyTimelineSection from "./CompanyTimelineSection";
import ProblemByNumbers from "./ProblemByNumbers";
import HowSteerSolves from "./HowSteerSolves";
import CheckoutOurIntegrations from "./CheckoutOurIntegrations";
import WhatWeSolveSection from "./whatWeSolveSection";
import LeadershipSection from "./LeadershipSection";
import BlogSection from "./BlogSection";
import BlogPageSection from "./BlogPageSection";
import ContactSection from "./ContactSection";
import SecurityFeatures from "./SecurityFeaturesSection"
import ContentHighlightSection from "./ContentHighlightSection";
import HowItWorks from "./HowItWorks";
import WhySteerOutperform from "./WhySteerOutperform";
import LegalPagesHeaderSection from "./LegalPagesHeaderSection";
import ContentSection  from "./ContentSection";
import RealImpactsSection from "./RealImpactsSection"
import SteerPowersBenefits from "./SteerPowersBenefits"
import SteerPowersFutureOfCare from "./SteerPowersFutureOfCare"
import ClientLogos from "./ClientLogos";
import HowSteerHelpscareProviders from "./HowSteerHelpscareProviders";
import ClientLogosSlider from "./ClientLogosSlider";
import WhyChooseSteerHealth from "./WhyChooseSteerHealth";
import FmStats from "./FmStats";

import HomeHeroSection from "./HomeHeroSection"
import HomeStats from './HomeStats'
import HomeSteerSolutionsSection from './HomeSteerSolutionsSection'
import SteerEffortlessIntegration from './SteerEffortlessIntegration'
import SolutionsForEverySystems from './SolutionsForEverySystems'
import OurTeamSection from './OurTeamSection'
import WorkBuddiesSection from './WorkBuddiesSection'
import FmFeatures from "./FmFeatures";
import FmTestimonials from "./FmTestimonials";
import ProductHeroSection from "./ProductHeroSection";
import ProductDetailsSection from "./ProductDetailsSection";
import WhyEveryOneLoves from "./WhyEveryOneLoves";

import VisionAndMission from "./VisionAndMission";
import WhatWeDo from "./WhatWeDo";
import WhyItMatters from "./WhyItMatters";
import OurValues from "./OurValues";
import JoinUs from "./JoinUs";
import WhoWeServe from "./WhoWeServe";
import OurStory from "./OurStory";
import WorkingAtSteer from "./WorkingAtSteer";
import OurHiringProcess from "./OurHiringProcess";

import HospitalsHeroSection from "./HospitalsHeroSection";
import HospitalTestimonials from "./HospitalTestimonials";
import OperationalResults from "./OperationalResults";
import HospitalResults  from "./HospitalResults";
import CustomerStories from "./CustomerStories";
import HowWeCreateValue from "./HowWeCreateValue";

import EventPageSection from './EventPageSection'
import CredibilityShowcase from "./CredibilityShowcase";
import FounderMessage from "./FounderMessage";
import P2PHdrLogosSection from "./P2PHdrLogosSection"
import Implementation from "./Implementation";
import WhyAscsChooseSteer from "./WhyAscsChooseSteer";
import IntelligentAdaptiveLayer from "./IntelligentAdaptiveLayer";
import OutcomesThatMatter from "./OutcomesThatMatter";
import SecurityCompliance from "./SecurityCompliance";
import WhatIncluded from "./WhatIncluded";
import EventHeroSection from "./EventHeroSection";
import SurgeryTimeline from "./SurgeryTimeline";

// import {
//   loadLatestPosts,
//   loadAllProviders,
//   loadAllClinics,
//   loadAllLabTests,
// } from '@/sanity/loader/loadQuery';

const sectionComponents: { [key: string]: any } = {
  homeHeroSection:HomeHeroSection,
  homeStats:HomeStats,
  homeSteerSolutionsSection:HomeSteerSolutionsSection,
  steerEffortlessIntegration:SteerEffortlessIntegration,
  solutionsForEverySystems:SolutionsForEverySystems,
  howSteerHelpscareProviders:HowSteerHelpscareProviders,
  heroVideoSection: HeroVideoSection,
  heroImageSection: HeroImageSection,
  steerAdvantageSection:SteerAdvantageSection,
  howSteerSolutionsHelps:HowSteerSolutionsHelps,
  clientsSection:ClientsSection,
  testimonialsSection:TestimonialsSection,
  moreThingsToExplore:MoreThingsToExplore,
  faqSection:FaqSection,
  ctaSection:CtaSection,
  steerHealthBenefits:SteerHealthBenefits,
  workWithYourEcoSystem:WorkWithYourEcoSystem,
  steerHealthPartnershipOutcomes:SteerHealthPartnershipOutcomes,
  acquireCapabilitiesBeingBeginning:AcquireCapabilitiesBeingBeginning,
  automateCapabilitiesBeingBeginning:AutomateCapabilitiesBeingBeginning,
  navigateCapabilitiesBeingBeginning:NavigateCapabilitiesBeingBeginning,
  seamlessIntakes:SeamlessIntakes,
  solutionsStats:SolutionsStats,
  howSteerProductsHelps:HowSteerProductsHelps,
  beforeAndAfterSection:BeforeAfterSection,
  howSteerHelps:HowSteerHelps,
  solutionsCtaSection:SolutionsCtaSection,
  solutionsBeingAtBeginning:SolutionsBeingAtBeginning,
  solutionsSteamline:SolutionsSteamline,
  solutionsheroImageSection:SolutionsheroImageSection,
  aboutHeroSection:AboutHeroSection,
  companyTimelineSection:CompanyTimelineSection,
  problemByNumbers:ProblemByNumbers,
  howSteerSolves:HowSteerSolves,
  checkoutOurIntegrations:CheckoutOurIntegrations,
  whatWeSolveSection:WhatWeSolveSection,
  leadershipSection:LeadershipSection,
  blogSection:BlogSection,
  faqPageSection:FaqPageSection,
  blogPageSection:BlogPageSection,
  contactSection:ContactSection,
  securityFeatures:SecurityFeatures,
  contentHighlightSection:ContentHighlightSection,
  howItWorks:HowItWorks,
  whySteerOutperform:WhySteerOutperform,
  legalPagesHeaderSection:LegalPagesHeaderSection,
  contentSection:ContentSection,
  realImpactSection:RealImpactsSection,
  steerPowersBenefits:SteerPowersBenefits,
  steerPowersFutureOfCare:SteerPowersFutureOfCare,
  clientLogos:ClientLogos,
  clientLogosSlider:ClientLogosSlider,
  ourTeamSection:OurTeamSection,
  workBuddiesSection:WorkBuddiesSection,
  fmFeatures:FmFeatures,
  whyChooseSteerHealth:WhyChooseSteerHealth,
  fmStats:FmStats,
  fmTestimonials:FmTestimonials,
  productHeroSection:ProductHeroSection,
  productDetailsSection:ProductDetailsSection,
  whyEveryOneLoves:WhyEveryOneLoves,
  ourValues:OurValues,
  joinUs:JoinUs,
  whoWeServe:WhoWeServe,
  whyItMatters:WhyItMatters,
  whatWeDo:WhatWeDo,
  visionAndMission:VisionAndMission,
  ourStory:OurStory,
  ourHiringProcess:OurHiringProcess,
  workingAtSteer:WorkingAtSteer,
  hospitalsHeroSection:HospitalsHeroSection,
  hospitalTestimonials:HospitalTestimonials,
  operationalResults:OperationalResults,
  hospitalResults:HospitalResults,
  customerStories:CustomerStories,
  howWeCreateValue:HowWeCreateValue,
  eventPageSection:EventPageSection,
  credibilityShowcase:CredibilityShowcase,
  founderMessage:FounderMessage,
  p2pHdrLogosSection:P2PHdrLogosSection,
  implementation:Implementation,
  whyAscsChooseSteer:WhyAscsChooseSteer,
  intelligentAdaptiveLayer:IntelligentAdaptiveLayer,
  outcomesThatMatter:OutcomesThatMatter,
  securityCompliance:SecurityCompliance,
  whatIncluded:WhatIncluded,
  surgeryTimeline:SurgeryTimeline,
  eventHeroSection:EventHeroSection
};

type FlexibleContentProps = {
  steerServiceId?: string;
  data: any;
  page?:string;
};
const FlexibleContent = async ({
  steerServiceId,
  data,
  page
}: FlexibleContentProps) => {
  const sections = await Promise.all(
    data?.sections && data?.sections?.map(async (section: any, index: number) => {
      const Section = sectionComponents[section._type];
      console.log('section._type: ', section._type);
      if (!Section) return null;
      const extraProps: any = {};

      extraProps.page = page ? page : '';

      return (
        <Suspense fallback={<div className="min-h-[200px]">Loading...</div>} key={index}>
          {section && <Section data={section} page={page}  />}
        </Suspense>
      );
    }) || []
  );

  return <div className="w-full">{sections}</div>;
};
export default FlexibleContent;