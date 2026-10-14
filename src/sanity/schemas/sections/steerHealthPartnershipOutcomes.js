// ./schemas/steerHealthPartnershipOutcomes.js
export default {
  name: 'steerHealthPartnershipOutcomes',
  title: 'SteerHealth Partnership Outcomes',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'Partner with SteerHealth to get the right care',
      validation: Rule => Rule.required(),
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
      name: 'outcomes',
      title: 'Outcome Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon (Emoji or small image URL)',
              type: 'string',
            },
            {
              name: 'text',
              title: 'Outcome Text',
              type: 'string',
              validation: Rule => Rule.required(),
            },
          ]
        }
      ],
      validation: Rule => Rule.min(1),
    }
  ],
  preview: {
    select: {
      title: 'heading'
    }
  }
}