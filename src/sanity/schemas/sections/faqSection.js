export default {
  name: 'faqSection',
  title: 'FAQ Section',
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
      name: 'stillHaveQuestionHeading',
      title: 'still Have Question Heading',
      type: 'string',
    },
    {
      name: 'stillHaveQuestionSubHeading',
      title: 'still Have Question SubHeading',
      type: 'string',
    },
    {
      name: 'ctaButtonPrimary',
      title: 'Primary Button',
      type: 'button',
    },
    // {
    //   name: 'faqHeading',
    //   title: 'FAQ Heading',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'block',
    //       styles: [], // no headings
    //       lists: [], // no bullet or numbered lists
    //       marks: {
    //         decorators: [
    //           { title: 'Italic', value: 'em' }
    //         ],
    //         annotations: [] // no links
    //       }
    //     }
    //   ]
    // },
    {
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'faqs' }] }],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'FAQ Section',
      };
    },
  },
};
