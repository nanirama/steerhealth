export default {
  name: 'operationalResults',
  title: 'Operational Results Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Main Heading',
    },
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
    select: {
      title: 'heading',
      results: 'results',
    },
    prepare({ title, results }) {
      return {
        title: title || 'Operational Results',
        subtitle: results ? `${results.length} results` : 'No results',
      }
    },
  },
}
