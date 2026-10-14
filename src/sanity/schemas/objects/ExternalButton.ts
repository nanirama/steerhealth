
// type MdLink = any;

export default {
  name: 'externalButton',
  title: 'ExternalButton',
  type: 'object',
  fields: [
    {
      name: 'buttontext',
      title: 'Button Text',
      type: 'string',
      validation: (rule:any) => rule.required(),
    },
    {
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          { title: 'Internal Pages', value: 'internal' },
          { title: 'External Link', value: 'external' },
        ],
        layout: 'radio',
      },
      initialValue: 'internal',
    },
    {
      name: 'internalLink',
      title: 'Button Link',
      type: 'reference',
      to: [{ type: 'page' }], 
      hidden: ({ parent }:{parent:any}) => parent?.linkType !== 'internal',
    },
    {
      name: 'externalLink',
      title: 'External Link',
      type: 'string',
      hidden: ({ parent }:{parent:any}) => parent?.linkType !== 'external',
    },
  ],
  preview: {
    select: {
      title: 'buttontext',
      linkType: 'linkType',
      internalLink: 'internalLink.title',
      externalLink: 'externalLink',
    },
    prepare({ title, linkType, internalLink, externalLink }:{ title:string, linkType:string, internalLink:any, externalLink:string }) {
      return {
        title: `${title} (${linkType === 'internal' ? 'Internal' : 'External'})`,
        subtitle: linkType === 'internal' ? internalLink : externalLink,
      };
    },
  },
}
