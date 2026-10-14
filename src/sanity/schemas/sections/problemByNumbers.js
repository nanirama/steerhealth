export default {
  name: 'problemByNumbers',
  title: 'Problem By Numbers',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Problem by the Numbers'
    },
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'text'
    },
    {
      name: 'items',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'statItem',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string'
            },
            {
              name: 'icon',
              title: 'Icon Image',
              type: 'image',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string'
                }
              ]
            },
            {
              name: 'statValue',
              title: 'Statistic Value',
              type: 'string'
            },
            {
              name: 'statLabel',
              title: 'Statistic Label',
              type: 'string'
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows:3
            }            
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'heading'
    }
  }
}
