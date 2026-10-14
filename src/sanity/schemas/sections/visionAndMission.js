// /schemas/visionAndMission.js
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'visionAndMission',
  title: 'Vision And Mission',
  type: 'document',
  fields: [
    defineField({
      name: 'visionTitle',
      title: 'Vision Title',
      type: 'string',
    }),
    defineField({
      name: 'visionDescription',
      title: 'Vision Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'}
            ]
          }
        }
      ]
    }),
    defineField({
      name: 'missionTitle',
      title: 'Mission Title',
      type: 'string',
    }),
    defineField({
      name: 'missionDescription',
      title: 'Mission Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'}
            ]
          }
        }
      ]
    }),
    {
      name: 'ctaButtonPrimary',
      title: 'Primary Button',
      type: 'button',
    },
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
  ],

  preview: {
    select: {
      title: 'visionTitle',
      subtitle: 'missionTitle',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Vision & Mission',
        subtitle: subtitle ? `Mission: ${subtitle}` : 'No Mission Title',
        media,
      }
    },
  },
})
