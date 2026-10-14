import { Suspense } from "react";
import ContentImageSection from "./ContentImageSection";
import CostOfDisconnectedSystems from "./CostOfDisconnectedSystems";
import EhrIntegrationSection from "./EhrIntegrationSection";
import ElevateCtaSection from "./ElevateCtaSection";
import ElevateStats from "./ElevateStats";
import ElevateTestimonials from "./ElevateTestimonials";
import FounderMessage from "./FounderMessage";
import SolutionsHeroImageSection from "./SolutionsHeroImageSection";
import SteerAdvantageSection from "./SteerAdvantageSection";
import SteerElevateHeroSection from "./SteerElevateHeroSection";
import TimeForFullWorkforce from "./TimeForFullWorkforce";
import FaqSection from "./FaqSection";
import ClientLogosSlider from "./ClientLogosSlider";
import RoiCalculator from "./RoiCalculator";

const sectionComponents: { [key: string]: any } = {
  contentImageSection: ContentImageSection,
  costOfDisconnectedSystems: CostOfDisconnectedSystems,
  ehrIntegrationSection: EhrIntegrationSection,
  elevateCtaSection: ElevateCtaSection,
  elevateStats: ElevateStats,
  elevateTestimonialsSection: ElevateTestimonials,
  founderMessage: FounderMessage,
  solutionsheroImageSection: SolutionsHeroImageSection,
  steerAdvantageSection: SteerAdvantageSection,
  steerElevateHeroSection: SteerElevateHeroSection,
  timeForFullWorkforce: TimeForFullWorkforce,
  faqSection: FaqSection,
  clientLogosSlider: ClientLogosSlider,
  roiCalculator: RoiCalculator,
};
type FlexibleContentProps = {
    steerServiceId?: string;
    data: any;
    page?:string;
    postType?:string;
  };
  const FlexibleContent = async ({
    data,
    page,
    postType
  }: FlexibleContentProps) => {
    console.log('postType: ', postType);
    const sections = await Promise.all(
      data?.sections && data?.sections?.map(async (section: any, index: number) => {
        const Section = sectionComponents[section._type];
        console.log('section._type: ', section._type);
        if (!Section) return null;
        const extraProps: any = {};
  
        extraProps.page = page ? page : '';
        extraProps.postType = postType ? postType : '';
  
        return (
          <Suspense fallback={<div className="min-h-[200px]">Loading...</div>} key={index}>
            {section && <Section data={section} page={page} postType={postType} />}
          </Suspense>
        );
      }) || []
    );
  
    return <div className="w-full">{sections}</div>;
  };
  export default FlexibleContent;