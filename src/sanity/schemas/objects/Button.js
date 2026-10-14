import ButtonStyleSelector from './ButtonStyleSelector'
export default {
  name: 'button',
  title: 'Button',
  type: 'object',
  initialValue: {
    linkType: 'internal',
  },
  fields: [
    {
      name: 'buttontext',
      title: 'Button Text',
      type: 'string',
      //validation: (Rule) => Rule.required(),
    },
    {
      name: 'buttonStyle',
      title: 'Button Style',
      type: 'string',
      //validation: (Rule) => Rule.required(),
      components: {
        input: ButtonStyleSelector,
      },
      initialValue: 'primary',
    },
    {
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      //validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Internal Pages', value: 'internal' },
          { title: 'External Link', value: 'external' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'internal',
    },
    {
      name: 'internalLink',
      title: 'Button Link',
      type: 'reference',
      to: [{ type: 'page' }, { type: 'platforms' }, { type: 'solutions' }, { type: 'integrations' }, { type: 'casestudies' }],
      hidden: ({ parent }) => parent?.linkType !== 'internal',
    },
    {
      name: 'externalLink',
      title: 'External Link',
      type: 'string',
      hidden: ({ parent }) => parent?.linkType !== 'external',
    },
    {
      name: 'hubspotFormId',
      title: 'Hubspot Form Id',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'buttontext',
      linkType: 'linkType',
      internalLinkTitle: 'internalLink.title',
      externalLink: 'externalLink',
    },
    prepare(selection) {
      const { title, linkType, internalLinkTitle, externalLink } = selection;
      const linkDisplay =
        linkType === 'internal' ? internalLinkTitle || 'No internal link' : externalLink || 'No external link';
      return {
        title: `${title} (${linkType})`,
        subtitle: linkDisplay,
      };
    },
  },
};
