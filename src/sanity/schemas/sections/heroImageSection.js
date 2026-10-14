export default {
  name: 'heroImageSection',
  title: 'Hero Image Section',
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
              { title: 'Bold', value: 'strong' }, // ✅ Added Bold
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
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'ctaButtonPrimary',
      title: 'Primary Button',
      type: 'button',
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
      name: 'mobileimage',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    },
    

  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare() {
      return {
        title: 'Hero Image Section',
      };
    },
  },
};
