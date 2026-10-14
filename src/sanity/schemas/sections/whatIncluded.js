import { defineField, defineArrayMember  } from "sanity";
export default {
  name: 'whatIncluded',
  title: 'whatIncluded Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [{ title: 'Bold', value: 'strong' }],
            annotations: [],
          },
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    {
      name: 'results',
      title: 'Results',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'result',
          title: 'Result',
          fields: [
            {
              name: 'image',
              type: 'image',
              title: 'Icon',
              options: { hotspot: true },
            },
            {
              name: 'title',
              type: 'string',
              title: 'Title',
            },
            {
              name: 'highlight',
              type: 'string',
              title: 'Highlight Value',
              description: 'e.g. "30%", "40%", "1.8x", "95%+"',
            },
            {
              name: 'suffix',
              type: 'string',
              title: 'Suffix',
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'highlight',
              media: 'icon',
            },
          },
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title:'whatIncluded'
      }
    },
  },
}
