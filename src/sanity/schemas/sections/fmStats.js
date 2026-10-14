export default {
  name: 'fmStats',
  type: 'document',
  title: 'FM Stats',
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
              name: 'trend',
              title: 'Trend',
              type: 'string',
              options: {
                list: [
                  { title: 'Increase', value: 'up' },
                  { title: 'Decrease', value: 'down' },
                  { title: 'Neutral', value: 'neutral' }
                ],
                layout: 'radio'
              },
              description: 'Direction indicator (up arrow, down arrow, or none)'
            },
            {
              name: 'percentage',
              title: 'Percentage',
              type: 'string',
              description: 'Example: "25%"'
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'Example: "New Patient Volume"'
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              description: 'Small descriptive text under the title'
            }
          ]
        }
      ]
    }
  ]
}
