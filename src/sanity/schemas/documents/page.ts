import { DocumentIcon, ImageIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  type: 'document',
  name: 'page',
  title: 'Pages',
  icon: DocumentIcon,
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (rule:any) => rule.required(),
    }),
    defineField({
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
      validation: (rule:any) => rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO Meta Data',
      type: 'seo',
      validation: (rule:any) => rule.required(),
    }),
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'solutionsheroImageSection',
        },
        {
          type: 'problemByNumbers',
        },
        {
          type: 'howSteerSolves',
        },
        {
          type: 'checkoutOurIntegrations',
        },
        {
          type: 'testimonialsSection',
        },
        {
          type: 'faqSection',
        }, 
        {
          type: 'aboutHeroSection',
        }, 
        {
          type: 'companyTimelineSection',
        },
        {
          type: 'whatWeSolveSection',
        },
        {
          type: 'howWeSolveSection',
        },
        {
          type: 'leadershipSection',
        },
        {
          type: 'ctaSection',
        },
        {
          type: 'solutionsStats',
        },
        {
          type: 'steerAdvantageSection',
        },
        {
          type: 'legalPagesHeaderSection',
        },
        {
          type: 'contentSection',
        },
        {
          type: 'faqPageSection',
        }, 
        {
          type: 'blogPageSection',
        }, 
        {
          type: 'eventPageSection',
        }, 
        {
          type: 'blogSection',
        }, 
        {
          type: 'contactSection',
        }, 
        {
          type: 'securityFeatures',
        },
        {
          type: 'contentHighlightSection',
        },
        {
          type: 'whySteerOutperform',
        },
        {
          type: 'realImpactSection',
        },  
        {
          type: 'steerPowersFutureOfCare',
        },
        {
          type: 'steerPowersBenefits',
        },
        {
          type: 'clientLogos',
        },
        {
          type: 'ourTeamSection',
        },
        {
          type: 'workBuddiesSection',
        },
        {
          type: 'visionAndMission',
        },
        {
          type: 'ourValues',
        },
        {
          type: 'ourStory',
        },
        {
          type: 'joinUs',
        },
        {
          type: 'whyItMatters',
        },
        {
          type: 'whoWeServe',
        },
        {
          type: 'whatWeDo',
        },
        {
          type: 'productHeroSection',
        },
        {
          type: 'howSteerHelpscareProviders',
        },
        {
          type: 'ourHiringProcess',
        },
        {
          type: 'workingAtSteer',
        },
      ],
    },
    
  ], 
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        subtitle: 'Page',
        title,
      }
    },
  },
})