import { defineType, defineField } from 'sanity'
export default defineType({
  name: 'solutionsForEverySystems',
  title: 'Solutions For Every System',
  type: 'object',
  fields: [
    defineField({
      name: 'tagLine',
      title: 'Tagline',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Solutions For Every System',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
      initialValue: 'Enhance access, automate care, and improve engagement.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'items',
      title: 'System Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string'
            },
            {
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'Heading 3', value: 'h3' },
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
              description: 'Description content (supports h3, paragraph, bold & italic)',
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'secondImage',
              title: 'Second Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'ctaButtonPrimary',
              title: 'Primary Button',
              type: 'button',
            },
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image'
            }
          }
        }
      ],
      validation: Rule => Rule.min(1)
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'Solutions For Every System Section'
      }
    }
  }
})
