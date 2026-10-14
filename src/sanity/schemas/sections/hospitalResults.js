export default {
  name: 'hospitalResults',
  title: 'Hospital Results Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Main Heading',
    },
    {
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'stat',
          title: 'Stat',
          fields: [
            {
              name: 'value',
              type: 'string',
              title: 'Value',
              description: 'Example: "18-25", "20-30", "25"',
            },
            {
              name: 'suffix',
              type: 'string',
              title: 'Suffix (Optional)',
            },
            {
              name: 'description',
              type: 'string',
              title: 'Description',
              description: 'Short text under the value',
            },
          ],
          preview: {
            select: {
              title: 'value',
              subtitle: 'description',
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'heading',
      stats: 'stats',
    },
    prepare({ title, stats }) {
      return {
        title: title || 'Hospital Results',
        subtitle: stats ? `${stats.length} stats` : 'No stats',
      }
    },
  },
}
