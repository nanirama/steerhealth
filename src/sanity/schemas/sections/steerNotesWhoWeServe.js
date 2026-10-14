import { defineField, defineType } from 'sanity'

export default {
  name: 'steerNotesWhoWeServe',
  title: 'Steer Notes Who We Serve',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tabs',
      title: 'Tabs',
      type: 'array',
      validation: (Rule) => Rule.min(1).max(2),
      of: [
        {
          type: 'object',
          name: 'tab',
          title: 'Tab',
          fields: [
            defineField({
              name: 'tabLabel',
              title: 'Tab Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'feature',
                  title: 'Feature',
                  fields: [
                    defineField({
                      name: 'icon',
                      title: 'Icon',
                      type: 'image',
                      options: {
                        hotspot: true,
                      },
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'title',
                      title: 'Title',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'description',
                      title: 'Description',
                      type: 'text',
                      rows: 2,
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'title',
                      media: 'icon',
                    },
                  },
                },
              ],
              validation: (Rule) => Rule.min(1),
            }),
          ],
          preview: {
            select: {
              title: 'tabLabel',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Who We Serve Section',
      };
    },
  },
};
