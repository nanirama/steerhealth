import { HomeIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'



export default defineType({
  name: 'elevateHome',
  title: 'Elevate Home',
  type: 'document',
  icon: HomeIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your personal website.',
      title: 'Title',
      type: 'string',
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO Meta Data',
      type: 'seo', // This calls your SEO object defined elsewhere
    }),
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'steerElevateHeroSection',
        },
        {
          type: 'contentImageSection',
        },
        {
          type: 'costOfDisconnectedSystems',
        },
        {
          type: 'ehrIntegrationSection',
        },
        {
          type: 'elevateCtaSection',
        },
        {
          type: 'elevateStats',
        },
        {
          type: 'elevateTestimonialsSection',
        },
        {
          type: 'founderMessage',
        },
        {
          type: 'steerAdvantageSection',
        },
        {
          type: 'timeForFullWorkforce',
        },
        {
          type: 'faqSection',
        },
        {
          type: 'clientLogosSlider',
        },
        {
          type: 'roiCalculator',
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
        subtitle: 'Elevate Home',
        title,
      }
    },
  },
})
