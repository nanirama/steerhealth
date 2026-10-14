// /schemas/speakersSection.ts
import {defineType, defineField} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export default defineType({
  name: 'speakersSection',
  title: 'Speakers Section',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Event Speakers',
    }),
    defineField({
      name: 'speakers',
      title: 'Speakers',
      type: 'array',
      of: [{type: 'speaker'}],
      validation: (Rule) => Rule.min(1).required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      speakers: 'speakers',
    },
    prepare({title, speakers}) {
      return {
        title: title || 'Speakers Section',
        subtitle: speakers ? `${speakers.length} speaker(s)` : 'No speakers',
      }
    },
  },
})
