import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'credibilityShowcase',
  title: 'Credibility Showcase Section',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      type: 'string',
      title: 'Headline',
      description: 'E.g. Trusted by 54 hospitals and 336 care facilities',
    }),
    defineField({
      name: 'subtext',
      type: 'text',
      rows: 2,
      title: 'Supporting Text',
      description: 'Short supporting statement about trust, safety, reliability.',
    }),
    defineField({
      name: 'badge',
      type: 'image',
      title: 'Award Badge',
      options: { hotspot: true },
    }),

  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'rating',
      media: 'badge',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Credibility Showcase',
        subtitle: subtitle ? `Rating: ${subtitle}` : '',
        media,
      }
    },
  },
})
