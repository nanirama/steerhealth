import { defineType } from 'sanity'

export default defineType({
  name: 'elevateTestimonialsSection',
  title: 'Elevate Testimonials Section',
  type: 'object',
  fields: [
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'elevateTestimonials' }],
          options: {
            disableNew: false, // 👈 This disables creating new testimonials inline
          },
        },
      ],
    },
  ],
  preview: {
    select: {},
    prepare() {
      return {
        title: 'Elevate Testimonials Section',
      };
    },
  },
})
