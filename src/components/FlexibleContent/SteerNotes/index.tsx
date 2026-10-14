import { Suspense } from "react";
import SteerNotesHeroSection from "./SteerNotesHeroSection";
import SteerNotesStats from "./SteerNotesStats";
import ModernHealthCare from "./ModernHealthCare";
import DataIntegrity from "./DataIntegrity";
import SteerNotesWhoWeServe from "./SteerNotesWhoWeServe";
import SteerNotesTestimonials from "./SteerNotesTestimonials";
import HowSteerNotesWorks from "./HowSteerNotesWorks";
import ContentImageSection from "./ContentImageSection";
import CtaSection from "./CtaSection";

const sectionComponents: { [key: string]: any } = {
  steerNotesHeroSection: SteerNotesHeroSection,
  steerNotesStats: SteerNotesStats,
  modernHealthCare: ModernHealthCare,
  dataIntegrity: DataIntegrity,
  steerNotesWhoWeServe: SteerNotesWhoWeServe,
  steerNotesTestimonials: SteerNotesTestimonials,
  howSteerNotesWorks: HowSteerNotesWorks,
  contentImageSection: ContentImageSection,
  ctaSection: CtaSection,
};

type FlexibleContentProps = {
  steerServiceId?: string;
  data: any;
  page?: string;
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
          {section && <Section data={section} page={page} />}
        </Suspense>
      );
    }) || []
  );

  return <div className="w-full">{sections}</div>;
};

export default FlexibleContent;
export { sectionComponents as steerNotesSectionComponents };
