import { imagesOptions } from '../data/utils';
export default {
  name: 'homeStats',
  title: 'Home Stats Section',
  type: 'object',
  fields: [
    {
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Stat Value',
              type: 'string', // e.g., "24%"
              validation: Rule => Rule.required()
            },
            {
              name: 'suffice',
              title: 'Stat Suffix',
              type: 'string', // e.g., "%"
            },
            {
              name: 'label',
              title: 'Stat Label',
              type: 'string', // e.g., "Revenue gains"
              validation: Rule => Rule.required()
            },
            {
              name: 'imageUrl',
              title: 'Image URL',
              type: 'string',
              options: {
                list: imagesOptions,
              },
              validation: (Rule) => Rule.required(),
            }  
          ]
        }
      ],
      validation: Rule => Rule.max(3)
    },
    {
      name: 'quote',
      title: 'Quote Text',
      type: 'text',
      rows: 3
    },
    {
      name: 'clientname',
      title: 'Client Name',
      type: 'string'
    },
    {
      name: 'clientJobTitle',
      title: 'Client Job Title',
      type: 'string'
    }
  ]
}
