export default {
  name: 'fmTestimonials',
  type: 'document',
  title: 'FM Testimonials',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text'
        }
      ]
    },
    {
      name: 'quote',
      title: 'Quote',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' }
            ],
            annotations: []
          },
          lists: []
        }
      ],
      description: 'The main testimonial text (supports bold & italic)'
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      description: 'Name or title of the testimonial giver'
    },
    {
      name: 'authorTitle',
      title: 'Author Title',
      type: 'string',
      description: 'Job title or role, e.g. "Medical Director, Integrative Wellness Group"'
    },
    {
      name: 'subText',
      title: 'Sub Text',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' }
            ],
            annotations: []
          },
          lists: []
        }
      ],
      description: 'Supporting text under the testimonial (supports bold & italic)'
    }
  ]
}
