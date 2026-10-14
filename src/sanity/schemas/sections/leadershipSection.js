// schemas/sections/leadershipSection.ts
import { defineField } from 'sanity'

export default {
  name: 'leadershipSection',
  title: 'Leadership Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Meet Our Leadership',
      validation: (Rule) => Rule.required(),
    }),
    {
      name: 'ctaButtonPrimary',
      title: 'Primary Button',
      type: 'button',
    },
    {
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'teamMember' }],
        },
      ],
    },
  ]
}
