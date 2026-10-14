import { defineField } from "sanity";
export default {
    name: 'steerElevateHeroSection',
    title: 'Steer Elevate Hero Section',
    type: 'object',
    fields: [
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'subHeading',
            title: 'Sub Heading',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [{ title: 'Normal', value: 'normal' }],
                    lists: [],
                    marks: {
                        decorators: [{ title: 'Bold', value: 'strong' }],
                        annotations: [],
                    },
                },
            ],
        }),
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
            name: 'image',
            type: 'image',
            title: 'Upload Image',
            options: {
                hotspot: true,
            },
        },

    ],
    preview: {
        select: {
            title: 'heading',
        },
        prepare() {
            return {
                title: 'Steer Elevate Hero Section',
            };
        },
    },
};
