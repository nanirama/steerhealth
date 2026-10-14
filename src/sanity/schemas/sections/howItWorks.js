export default {
    name: 'howItWorks',
    title: 'How It Works',
    type: 'object',
    fields: [
        {
            name: 'heading',
            title: 'Heading',
            type: 'string',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (rule) => rule.required(),
        },
        {
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' }
                    ],
                    lists: [
                        { title: 'Bullet', value: 'bullet' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Strong', value: 'strong' } // ✅ Enables <strong>
                        ],
                        annotations: [] // disables links or custom annotations
                    }
                }
            ]
        }
    ],
    preview: {
        select: {
            title: 'heading'
        }
    }
}
