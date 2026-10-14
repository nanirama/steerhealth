// schemas/sections/ehrIntegrationSection.js
export default {
  name: 'ehrIntegrationSection',
  title: 'EHR Integration Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Main Heading',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
    },
    {
      name: 'clientLogos',
      title: 'Client Logos',
      type: 'array',
      of: [
          {
              type: 'object',
              name: 'clientLogoItem',
              title: 'Client Logo',
              fields: [
                  {
                      name: 'image',
                      title: 'Image',
                      type: 'image',
                      options: {
                          hotspot: true,
                      },
                  },
                  {
                      name: 'link',
                      title: 'Link',
                      type: 'url',
                      description: 'Enter the URL to the client website',
                  },
              ],
          },
      ],
  },
  ],
};
