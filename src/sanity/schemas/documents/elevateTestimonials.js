import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'elevateTestimonials',
  title: 'Elevate Testimonials',
  type: 'document',
  fields: [
    defineField({
      name: 'clientname',
      title: 'Client Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'jobtitle',
      title: 'Job Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
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
  ],
  preview: {
    select: {
      title: 'clientname',
      subtitle: 'jobtitle',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled Testimonial',
        subtitle: subtitle || 'Testimonials',
      }
    },
  },
})
