import { defineType, defineField } from 'sanity'


export default defineType({
  name: 'elevateSolutions',
  title: 'Elevate Solutions',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Page Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    defineField({
      name: 'seo',
      title: 'SEO Meta Data',
      type: 'seo',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "orderBy",
      title: "Order By",
      type: "number",
      description: "Use this field to manually control the order of solutions",
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
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
          type: 'contentImageSection',
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
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current'
    },
    prepare({ title, slug }) {
      return {
        title: `${title}`,
        subtitle: `/elevate/${slug}`,
      }
    },
  },  
})
