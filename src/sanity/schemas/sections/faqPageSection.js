export default {
  name: 'faqPageSection',
  title: 'FAQ Page Section',
  type: 'object',
  fields: [

    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
    },
    {
      name: 'subheading',
      title: 'Sub Heading',
      type: 'string',
    },
    {
      name: 'reachOutUsLabel',
      title: 'Reach Out Us Label',
      type: 'string',
    },
    {
      name: 'ctaButtonPrimary',
      title: 'Primary Button',
      type: 'button',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'FAQ Page Section',
      };
    },
  },
};
