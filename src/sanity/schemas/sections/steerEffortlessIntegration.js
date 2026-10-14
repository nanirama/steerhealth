// schemas/objects/steerAdvantageSection.js
export default {
  name: 'steerEffortlessIntegration',
  title: 'Steer Effortless Integration Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Main Heading',
    },
    {
      name: 'kickerText',
      type: 'string',
      title: 'Kicker Text',
    },
    {
      name: 'subheading',
      type: 'string',
      title: 'Subheading',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
    },
    {
      name: 'ctaButtonPrimary',
      title: 'Primary Button',
      type: 'button',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Upload Image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'mobileimage',
      type: 'image',
      title: 'Upload Mobile Image',
      options: {
        hotspot: true,
      },
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
