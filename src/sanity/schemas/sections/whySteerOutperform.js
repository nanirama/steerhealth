export default {
  name: 'whySteerOutperform',
  title: 'Why Steer Outperform Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
