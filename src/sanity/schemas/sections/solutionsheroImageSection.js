export default {
  name: 'solutionsheroImageSection',
  title: 'Inner Pages Hero Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Paragraph', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
            ],
            annotations: [
              {
                type: 'textColor',
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'icon',
      type: 'image', // or 'string' if using emoji
      title: 'Icon',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'iconLabel',
      type: 'string', // or 'string' if using emoji
      title: 'Icon Label'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'ctaButtonPrimary',
      title: 'Primary Button',
      type: 'button',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'ctaButtonSecondary',
      title: 'Secondary Button',
      type: 'button',
    },
    {
      name: 'bookingsPercentage',
      title: 'Bookings increase percentage',
      type: 'number',
    },
    {
      name: 'bookingsLabel',
      title: 'Bookings Label',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'mobileImage',
      title: 'Mobile Image',
      type: 'image',
      options: { hotspot: true },
    },    
    {
      name: 'showAtTop',
      title: 'Content Show at Top on mobile',
      type: 'boolean',
      initialValue: false,
      description: 'Enable if this section should appear at the top of the Section on Mobile.',
    }

  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare() {
      return {
        title: 'Inner Pages Hero Section',
      };
    },
  },
};
