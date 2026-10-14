export default {
  name: 'checkoutOurIntegrations',
  title: 'Check Out Our Integrations',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string'
    },
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows:2
    }    
  ],
  preview: {
    select: {
      title: 'heading'
    }
  }
}
