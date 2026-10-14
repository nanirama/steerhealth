export default {
  name: 'contentHighlightSection',
  title: 'Content Highlight Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'contentAlign',
      title: 'Content Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'left',
    },
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'contentAlign',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: `Align: ${subtitle}`,
      };
    },
  },
};
