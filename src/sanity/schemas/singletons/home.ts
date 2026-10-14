import { HomeIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'



export default defineType({
  name: 'home',
  title: 'Home',
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
          type: 'homeHeroSection',
        },
        {
          type: 'homeStats',
        },
        {
          type: 'solutionsCtaSection',
        },
        // {
        //   type: 'homeContentSection',
        // },
        {
          type: 'testimonialsSection',
        },
        {
          type: 'steerHealthPartnershipOutcomes',
        },
        {
          type: 'steerEffortlessIntegration',
        },
        {
          type: 'solutionsForEverySystems',
        },
        {
          type: 'homeSteerSolutionsSection',
        },
        {
          type: 'ctaSection',
        },
        {
          type: 'clientLogosSlider',
        },
        {
          type: 'whyChooseSteerHealth',
        },
        // {
        //   type: 'laborCrisisSection',
        // }
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        subtitle: 'Home',
        title,
      }
    },
  },
})
