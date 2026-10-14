export default {
  name: 'hospitalTestimonials',
  title: 'Hospital Testimonials Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Main Heading',
    },
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'testimonial',
          title: 'Testimonial',
          fields: [
            {
              name: 'quote',
              type: 'text',
              title: 'Quote',
              description: 'Testimonial text or highlighted statement',
              rows: 3,
            },
            {
              name: 'highlight',
              type: 'string',
              title: 'Highlight Value',
              description: 'Optional — e.g. "25%", "1000’s"',
            },
            {
              name: 'role',
              type: 'string',
              title: 'Role',
              description: 'e.g. Director, VP, Leader',
            },
            {
              name: 'department',
              type: 'string',
              title: 'Department',
              description: 'e.g. Patient Access, Revenue Cycle, Ambulatory Ops',
            },
          ],
          preview: {
            select: {
              title: 'role',
              subtitle: 'department',
            },
          },
        },
      ],
    },
    {
      name: 'clients',
      title: 'Clients',
      type: 'array',
      validation: (Rule) => Rule.max(5).error('You can only add up to 5 clients'),
      of: [
        {
          type: 'object',
          name: 'client',
          title: 'Client',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Name',
            },
            {
              name: 'role',
              type: 'string',
              title: 'Role',
              description: 'E.g. Patient, Doctor, Staff',
              initialValue: 'Patient',
            },
            {
              name: 'image',
              type: 'image',
              title: 'Profile Image',
              options: { hotspot: true },
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
              media: 'image',
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'heading',
      testimonials: 'testimonials',
    },
    prepare({ title, testimonials }) {
      return {
        title: title || 'Hospital Testimonials',
        subtitle: testimonials ? `${testimonials.length} testimonials` : 'No testimonials',
      }
    },
  },
}
