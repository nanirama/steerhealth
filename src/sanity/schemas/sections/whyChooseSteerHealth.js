export default {
  name: 'whyChooseSteerHealth',
  type: 'document',
  title: 'Why Choose SteerHealth',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Heading 2', value: 'h2' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' }
            ],
            annotations: []
          },
          lists: []
        }
      ]
    },
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [    
            {
              name: 'challengeText',
              title: 'Challenge Text',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' }
                  ],
                  marks: {
                    decorators: [],
                    annotations: [],
                  },
                  lists: []
                }
              ],
              description: 'Highlighted text (supports bold and italic)'
            },
            {
              name: 'advantageText',
              title: 'Highlight',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' }
                  ],
                  marks: {
                    decorators: [
                      { title: 'Strong', value: 'strong' }
                    ],
                    annotations: [],
                  },
                  lists: []
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
