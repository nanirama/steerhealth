import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'founderMessage',
  title: 'Founder Message Section',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      description: 'E.g. John Doe',
    }),
    defineField({
      name: 'role',
      type: 'string',
      title: 'Role',
      description: 'E.g. CEO',
    }),
    defineField({
      name: 'company',
      type: 'string',
      title: 'Company',
      description: 'E.g. SteerHealth',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
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
            annotations: [
              {
                type: 'textColor',
              },
            ],
          },
        },
      ],
    }),    
    defineField({
      name: 'image',
      type: 'image',
      title: 'Profile Image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Founder Message',
        subtitle: subtitle || '',
        media,
      }
    },
  },
})
