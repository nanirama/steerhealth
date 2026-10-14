import { defineField, defineType, defineArrayMember } from 'sanity'

export default {
  name: 'steerNotesTestimonials',
  title: 'Steer Notes Testimonials Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'testimonialItem',
          title: 'Testimonial Item',
          fields: [
            defineField({
              name: 'clientname',
              title: 'Client Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'jobTitle',
              title: 'Job Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
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
              name: 'testimonials',
              title: 'Testimonials',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'block',
                  styles: [
                    { title: 'Paragraph', value: 'normal' },
                  ],
                  marks: {
                    decorators: [
                      { title: 'Bold', value: 'strong' },
                      { title: 'Italic', value: 'em' },
                    ],
                    annotations: [],
                  },
                  lists: [],
                }),
              ],
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'clientname',
              subtitle: 'jobTitle',
              media: 'image',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Steer Notes Testimonials Section',
      };
    },
  },
};
