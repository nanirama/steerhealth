// schemas/casestudies.js

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'casestudies',
  title: 'Case Studies',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO Meta Data',
      type: 'seo', // This calls your SEO object defined elsewhere
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
    }),
    defineField({
      name: 'mainImage',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'about',
      title: 'About',
      type: 'text',
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
    }),
    defineField({
      name: 'companySize',
      title: 'Company Size',
      type: 'string',
    }),
    defineField({
      name: 'headquarters',
      title: 'Headquarters',
      type: 'string',
    }),
    defineField({
      name: 'keyFeatures',
      title: 'Key Features',
      type: 'array',
      of: [
        {
          type: 'block',
          lists: [{ title: 'Bullet', value: 'bullet' }],
          styles: [], // No paragraph or headings
          marks: {
            decorators: [],
            annotations: [],
          },
        },
      ],
    }),
    defineField({
      name: 'challenge',
      title: 'Challenge',
      type: 'array',
      of: [
        {
          type: 'block',
          lists: [{ title: 'Bullet', value: 'bullet' }, { title: 'Number', value: 'number' },],
          styles: [ { title: 'Paragraph', value: 'normal' }],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [],
          },
        },
      ],
    }),
    defineField({
      name: 'solution',
      title: 'Solution',
      type: 'array',
      of: [
        {
          type: 'block',
          lists: [{ title: 'Bullet', value: 'bullet' }, { title: 'Number', value: 'number' },],
          styles: [ { title: 'Paragraph', value: 'normal' }],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [],
          },
        },
      ],
    }),
    defineField({
      name: 'results',
      title: 'Results',
      type: 'array',
      of: [
        {
          type: 'block',
          lists: [{ title: 'Bullet', value: 'bullet' }, { title: 'Number', value: 'number' },],
          styles: [ { title: 'Paragraph', value: 'normal' }],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [],
          },
        },
      ],
    }),
    defineField({
      name: 'whyItMatters',
      title: 'Why It Matters',
      type: 'array',
      of: [
        {
          type: 'block',
          lists: [{ title: 'Bullet', value: 'bullet' }, { title: 'Number', value: 'number' },],
          styles: [ { title: 'Paragraph', value: 'normal' }],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [],
          },
        },
      ],
    }),
    defineField({
      name: 'lookingAhead',
      title: 'Looking Ahead',
      type: 'array',
      of: [
        {
          type: 'block',
          lists: [{ title: 'Bullet', value: 'bullet' }, { title: 'Number', value: 'number' },],
          styles: [ { title: 'Paragraph', value: 'normal' }],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [],
          },
        },
      ],
    }),
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'solutionsSteamline',
        },
        {
          type: 'testimonialsSection',
        },
        {
          type: 'clientsSection',
        },
        {
          type: 'ctaSection',
        }
      ],
    },
  ],
})
