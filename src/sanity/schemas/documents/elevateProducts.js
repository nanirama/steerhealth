import { defineType, defineField } from 'sanity'


export default defineType({
  name: 'elevateProducts',
  title: 'Elevate Products',
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
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Paragraph', value: 'normal' }
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [],
          },
          lists: [],
        },
      ],
    }),
    defineField({
      name: 'UseCases',
      title: 'Use Cases',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Paragraph', value: 'normal' }
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [],
          },
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
        },
      ],
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
