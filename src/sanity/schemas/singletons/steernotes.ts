import { HomeIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'



export default defineType({
  name: 'steernotes',
  title: 'Steer Notes',
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
          type: 'steerNotesHeroSection',
        },
        {
          type: 'contentImageSection',
        },
        {
          type: 'steerNotesStats',
        },
        {
          type: 'modernHealthCare',
        },
        {
          type: 'dataIntegrity',
        },
        {
          type: 'steerNotesWhoWeServe',
        },
        {
          type: 'steerNotesTestimonials',
        },
        {
          type: 'howSteerNotesWorks',
        },
        {
          type: 'ctaSection',
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
        subtitle: 'Steer Notes',
        title,
      }
    },
  },
})
