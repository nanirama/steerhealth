export default {
  name: 'homeHeroSection',
  title: 'Home Hero Section',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Main Heading',
      type: 'string', // e.g., "acquire & retain patients"
    },
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'string', // e.g., "The leading AI suite for modern healthcare."
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text', // e.g., "The leading AI suite for modern healthcare."
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
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'mobileImage',
      title: 'Hero Mobile Image',
      type: 'image',
      options: { hotspot: true },
    }    
  ],
}
