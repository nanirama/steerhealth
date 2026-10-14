// schemas/surgeryTimeline.ts
import { defineType, defineArrayMember } from 'sanity'

export default defineType({
  name: 'surgeryTimeline',
  title: 'Surgery Timeline',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    },
    {
      name: 'items',
      title: 'Timeline Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'timelineItem',
          title: 'Timeline Item',
          fields: [
            {
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'H3', value: 'h3' },
                  ],
                  lists: [
                    { title: 'Bullet', value: 'bullet' },
                  ],
                  marks: {
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' },
                    ],
                  },
                }),
              ],
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'subtitle',
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subheading',
    },
  },
})