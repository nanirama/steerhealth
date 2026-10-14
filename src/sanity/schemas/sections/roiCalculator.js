import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'roiCalculator',
  title: 'ROI Calculator Section',
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
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
    },
    prepare({ heading }) {
      return {
        title: heading || 'ROI Calculator Section',
        subtitle: 'ROI Calculator Section',
      }
    },
  },
})
