// schemas/objects/steerAdvantageSection.js
export default {
    name: 'steerPowersBenefits',
    title: 'Steer Powers Benefits Section',
    type: 'object',
    fields: [
        {
            name: 'heading',
            type: 'string',
            title: 'Main Heading',
        },
        {
            name: 'subheading',
            type: 'string',
            title: 'Sub Heading',
        },
        {
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'Heading 3', value: 'h3' },
                        { title: 'Heading 4', value: 'h4' },
                    ],
                    lists: [], // disables bullet/numbered lists
                },
            ],
        },
        {
            name: 'heroImage',
            title: 'Main Hero  Image',
            type: 'image',
            options: { hotspot: true },
        },
    ],
};
