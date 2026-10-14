export default {
  name: 'implementation',
  title: 'Implementation Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Main Heading',
    },
    
    
  ],
  preview: {
    prepare() {
      return {
        title: 'implementation',
      }
    },
  },
}
