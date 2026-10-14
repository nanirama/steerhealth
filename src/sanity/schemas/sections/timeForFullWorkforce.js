import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'timeForFullWorkforce',
  title: 'Time for Full Workforce Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subHeading',
      title: 'Sub Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
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
      validation: (rule) => rule.required(),
    }),
    {
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      validation: (rule) => rule.required(),
    },
    {
      name: 'videoPoster',
      title: 'Video Poster Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    },
  ],
  preview: {
    select: {
      heading: 'heading',
    },
    prepare({ heading }) {
      return {
        title: heading || 'Time for Full Workforce Section',
        subtitle: 'Time for Full Workforce Section',
      }
    },
  },
})
