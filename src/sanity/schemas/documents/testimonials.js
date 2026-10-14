import { defineField, defineType } from 'sanity'
import { MdOutlineReviews } from "react-icons/md";



export default defineType({
  name: 'testimonials',
  title: 'Testimonials',
  type: 'document',
  icon: MdOutlineReviews,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'clientname',
      title: 'Client Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'jobtitle',
      title: 'Client Job Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    {
      name: 'imageUrl',
      title: 'image URL',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    },
    {
      name: 'videoTestimonials',
      title: 'Video Testimonials',
      type: 'file',
      options: {
        accept: 'video/*',
      },
    },
    {
      name: 'parnetLogoUrl',
      title: 'Partner Logo URL',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    },
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
    defineField({
      name: 'orderBy',
      title: 'Order By',
      type: 'number',
      description: 'Controls manual ordering of testimonials',
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'clientname',
    },
    prepare({ title }) {
      return {
        subtitle: 'Testimonials',
        title,
      }
    },
  },
})