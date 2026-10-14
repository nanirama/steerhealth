export default {
  name: 'customerStories',
  title: 'Customer Stories Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Main Heading',
    },
    {
      name: 'stories',
      title: 'Stories',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'story',
          title: 'Story',
          fields: [
            {
              name: 'image',
              type: 'image',
              title: 'Background Image',
              options: { hotspot: true },
            },
            {
              name: 'title',
              type: 'string',
              title: 'Title',
              description: 'e.g. "ASC\'s", "Imaging Department"',
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
              rows: 2,
            },
            {
              name: 'logo',
              type: 'image',
              title: 'Customer Logo',
              options: { hotspot: true },
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'image',
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'heading',
      stories: 'stories',
    },
    prepare({ title, stories }) {
      return {
        title: title || 'Customer Stories',
        subtitle: stories ? `${stories.length} stories` : 'No stories',
      }
    },
  },
}
