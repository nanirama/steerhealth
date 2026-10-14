import { groq } from 'next-sanity'

const buttonQuery = `
  _type,
  buttontext,
  buttonStyle,
  linkType,
  externalLink,
  hubspotFormId,
  "internalLink":internalLink->{
    _type,
    title,  
    "slug": slug.current, 
    "categorySlug": category->slug.current,
  }
`
export const roiCalculatorQuery = `
      _type == "roiCalculator" => {
        _type,
        heading,
        subHeading
      }   
`
export const outcomesThatMatterQuery = `
  _type == "outcomesThatMatter" => {
    _type,
    title,
    items[]{
      _key,
      "icon": icon.asset->url,
      text
    }
  }
`
export const securityComplianceQuery = `
  _type == "securityCompliance" => {
    _type,
    heading,
    subHeading,
    image,
    image2
}
`

export const whatIncludedQuery = `
  _type == "whatIncluded" => {
    _type,
    heading,
    results[]{
      _key,
      image,
      title,
      highlight,
      suffix,
      description
    }
  }
`
export const surgeryTimelineQuery = `
  _type == "surgeryTimeline" => {
    _type,
    heading,
    subheading,
    items[]{
      _key,
      content
    }
  }
`
export const howSteerNotesWorksQuery = `
  _type == "howSteerNotesWorks" => {
    _type,
    heading,
    subheading,
    items[]{
      _key,
      tagLine,
      "icon": icon.asset->url,
      content
    }
  }
`
export const intelligentAdaptiveLayerQuery = `
  _type == "intelligentAdaptiveLayer" => {
    _type,
    heading,
    description,
    items[]{
      _key,
      icon,
      title,
      subtitle
    }
  }
`
export const whyAscsChooseSteerQuery = `
  _type == "whyAscsChooseSteer" => {
    _type,
    heading,
    description,
    items[]{
      _key,
      icon,
      title,
      subtitle
    }
  }
`
export const eventHeroSectionQuery = `
  _type == "eventHeroSection" => {
    _type,
    heading,
    subHeading,
    description,
    ctaButtonPrimary{
      ${buttonQuery}
    },
    ctaButtonSecondary{
      ${buttonQuery}
    },
    image
  }
`

export const implementationQuery = `
  _type == "implementation" => {
    _type,
    heading
  }
`
export const fmTestimonialsQuery = `
      _type == "fmTestimonials" => {
        _type,
        image,
        quote,
        author,
        authorTitle,
        subText
      }
`
export const heroVideoSectionQuery = `
  _type == "heroVideoSection" => {
    heading,   
    icon,
    iconLabel, 
    description,
    ctaButtonPrimary{
            ${buttonQuery}
        },
    ctaButtonSecondary{
            ${buttonQuery}
        },
    bookingsPercentage,
    bookingsLabel,
    videoUrl,
    mobileHeroImage,
  }
`
export const hospitalsHeroSectionQuery = `
  _type == "hospitalsHeroSection" => {
    heading,   
    "icon": icon.asset->url,
    iconLabel, 
    description,
    ctaButtonPrimary{
            ${buttonQuery}
        },
    ctaButtonSecondary{
            ${buttonQuery}
        },
    bookingsPercentage,
    bookingsLabel,
    videoUrl,
    image,
    mobileimage,
    imageUrl
  }
`
export const fmStatsQuery = `
      _type == "fmStats" => {
        _type,
        imageUrl,
        "stats": stats[]{
          trend,
          percentage,
          title,
          description
        }  
      }   
`
export const ctaSectionQuery = `
      _type == "ctaSection" => {
        _type,
        heading,
        kickerText,
        subheading,
        description,
        ctaButtonPrimary{
            ${buttonQuery}
        },
        ctaButtonSecondary{
            ${buttonQuery}
        },  
        imageUrl,
        image,
        "stats": stats[]{
          label,
          value,
          suffix
        }  
      }   
`
export const elevateCtaSectionQuery = `
      _type == "elevateCtaSection" => {
        _type,
        ctaButtonPrimary{
            ${buttonQuery}
        },
        ctaButtonSecondary{
            ${buttonQuery}
        },  
        imageUrl,
        image
      }   
`
export const costOfDisconnectedSystemsQuery = `
      _type == "costOfDisconnectedSystems" => {
        _type,
        heading,
        "items": items[]{
          heading,
          description
        }
      }   
`
export const timeForFullWorkforceQuery = `
      _type == "timeForFullWorkforce" => {
        _type,
        heading,
        subHeading,
        description,
        "videoUrl": video.asset->url,
        videoPoster
      }   
`
export const steerElevateHeroSectionQuery = `
      _type == "steerElevateHeroSection" => {
        _type,
        heading,
        subHeading,
        description,
        ctaButtonPrimary{
            ${buttonQuery}
        },
        ctaButtonSecondary{
            ${buttonQuery}
        },
        image
      }   
`
export const steerNotesHeroSectionQuery = `
      _type == "steerNotesHeroSection" => {
        _type,
        heading,
        "icon": icon.asset->url,
        iconLabel,
        description,
        ctaButtonPrimary{
            ${buttonQuery}
        },
        ctaButtonSecondary{
            ${buttonQuery}
        },
        image,
        "securityBadges": securityBadges[]{
          "icon": icon.asset->url,
          text
        },
        trustedByText,
        "clientLogos": clientLogos[]{
          link,
          image,
          "imageExtension": image.asset->extension,
          "imageUrl": select(
            image.asset->extension == "svg" => image.asset->url,
            image.asset->url + "?w=600&h=100&fit=max&auto=format"
          )
        }
      }   
`
export const contentImageSectionQuery = `
      _type == "contentImageSection" => {
        _type,
        title,
        description,
        ctaButtonPrimary{
          ${buttonQuery}
        },
        image,
        imagePosition
      }   
`
export const elevateStatsQuery = `
      _type == "elevateStats" => {
        _type,
        heading,
        "stats": stats[]{
          value,
          suffix,
          label,
          imageUrl
        }
      }   
`
export const steerNotesStatsQuery = `
      _type == "steerNotesStats" => {
        _type,
        heading,
        "stats": stats[]{
          value,
          suffix,
          label,
          imageUrl
        }
      }   
`
export const modernHealthCareQuery = `
      _type == "modernHealthCare" => {
        _type,
        headline,
        subtitle,
        image,
        "features": features[]{
          icon,
          title,
          description
        }
      }   
`
export const dataIntegrityQuery = `
      _type == "dataIntegrity" => {
        _type,
        title,
        subtitle,
        image,
        "features": features[]{
         icon,
          title,
          description
        }
      }   
`
export const steerNotesWhoWeServeQuery = `
      _type == "steerNotesWhoWeServe" => {
        _type,
        title,
        "tabs": tabs[]{
          tabLabel,
          "features": features[]{
            icon,
            title,
            description
          }
        }
      }   
`
export const steerNotesTestimonialsQuery = `
      _type == "steerNotesTestimonials" => {
        _type,
        heading,
        testimonials[]{
          clientname,
          jobTitle,
          image,
          testimonials
        }
      }   
`
export const ehrIntegrationSectionQuery = `
   _type == "ehrIntegrationSection" => {
    _id,
    heading,
    description,
    "clientLogos":clientLogos[]{     
      link,
      image,
      "imageExtension": image.asset->extension,
      "imageUrl": select(
        image.asset->extension == "svg" => image.asset->url,
        image.asset->url + "?w=350&h=35&fit=max&auto=format"
      )
    }
  }
`
export const elevateTestimonialsSectionQuery = `
     _type == "elevateTestimonialsSection" => {
        _type,
        "testimonials": testimonials[]->{
          _id,
          clientname,
          jobtitle,
          image,
          testimonial
        }
      }
`
export const heroImageSectionQuery = `
   _type == "heroImageSection" => {
    _id,
    heading,
    icon,
    iconLabel,
    description,
    ctaButtonPrimary{
            ${buttonQuery}
        },
    ctaButtonSecondary{
            ${buttonQuery}
        },
    bookingsPercentage,
    bookingsLabel,
    image,
    mobileimage,
  }
`
export const productHeroSectionQuery = `
   _type == "productHeroSection" => {
    _id,
    heading,
    description,
    videoLink,
    ctaButtonPrimary{
            ${buttonQuery}
        },
    image
  }
`
export const productDetailsSectionQuery = `
   _type == "productDetailsSection" => {
    _id,
    "row1":row1[]{
      image,
      title,
      description
    },
    "row2":row2[]{
      image,
      title,
      description
    },
    "row3":row3{
      image,
      title,
      description
    },
  }
`
export const solutionsheroImageSectionQuery = `
   _type == "solutionsheroImageSection" => {
    _id,
    heading,
    icon,
    iconLabel,
    description,
    ctaButtonPrimary{
            ${buttonQuery}
        },
    ctaButtonSecondary{
            ${buttonQuery}
        },
    bookingsPercentage,
    bookingsLabel,
    image,
    mobileImage
  }
`
export const steerAdvantageSectionQuery = `
   _type == "steerAdvantageSection" => {
    _id,
    heading,
    subheading,
    "features":features[]{
      "icon": icon.asset->url,
      title,
      description
    }
  }
`
export const howSteerHelpscareProvidersQuery = `
   _type == "howSteerHelpscareProviders" => {
    _id,
    heading,
    subheading,
    "careItems":careItems[]{
      title,
      description,
      image
    }
  }
`
export const clientsSectionQuery = `
   _type == "clientsSection" => {
    _id,
    heading,
    clientLogos,
    "clientlogos":clientlogos[]{     
      link,
      image
    }
  }
`
export const clientLogosQuery = `
   _type == "clientLogos" => {
    _id,
    heading,
    clientLogos
  }
`
export const clientLogosSliderQuery = `
   _type == "clientLogosSlider" => {
    _id,
    heading,
    "clientLogos":clientLogos[]{     
      link,
      image,
      "imageExtension": image.asset->extension,
      "imageUrl": select(
        image.asset->extension == "svg" => image.asset->url,
        image.asset->url + "?w=600&h=100&fit=max&auto=format"
      )
    }
  }
`
export const steerHealthPartnershipOutcomesQuery = `
   _type == "steerHealthPartnershipOutcomes" => {
    _id,
    heading,
    kickerText,
    subheading,
    description,
    ctaButtonPrimary{
        ${buttonQuery}
    },
    "outcomes":outcomes[]{
      icon,
      text
    }
  }
`
export const steerHealthBenefitsQuery = `
   _type == "steerHealthBenefits" => {
  title,
  subtitle,
  "benefitCards":benefitCards[]{
    title,
    description,
    statNote,
    "image":image.asset->url
  },
    "comparisonTable":comparisonTable[]{
      item,
      discount,
      othersAvailable,
      steerAvailable
    }
  }
`
export const workWithYourEcoSystemQuery = `
   _type == "workWithYourEcoSystem" => {
    _id,
    title,
    subtitle,
  }
`
export const acquireCapabilitiesBeingBeginningQuery = `
   _type == "acquireCapabilitiesBeingBeginning" => {
    _id,
    title,
    subtitle,
  }
`
export const automateCapabilitiesBeingBeginningQuery = `
   _type == "automateCapabilitiesBeingBeginning" => {
    _id,
    title,
    subtitle,
  }
`
export const navigateCapabilitiesBeingBeginningQuery = `
   _type == "navigateCapabilitiesBeingBeginning" => {
    _id,
    title,
    subtitle,
  }
`
export const solutionsForEverySystemsQuery = `
   _type == "solutionsForEverySystems" => {
    _id,
    heading,
    subheading,
    description,
    tagLine,
    "items":items[]{
      title,
      description,
      ctaButtonPrimary{
            ${buttonQuery}
        },
      image,
      secondImage
    }
  }
`
export const customerStoriesQuery = `
   _type == "customerStories" => {
    _id,
    heading,
    "stories":stories[]{
      title,
      description,
      logo,
      ctaButtonPrimary{
            ${buttonQuery}
        },
      image
    }
  }
`
export const steerEffortlessIntegrationQuery = `
   _type == "steerEffortlessIntegration" => {
    _id,
    heading,
    kickerText,
    subheading,
    description,
    ctaButtonPrimary{
        ${buttonQuery}
    },
    image,
    mobileimage,
    "clientLogos":clientLogos[]{     
      link,
      image,
      "imageExtension": image.asset->extension,
      "imageUrl": select(
        image.asset->extension == "svg" => image.asset->url,
        image.asset->url + "?w=350&h=35&fit=max&auto=format"
      )
    }
  }
`
export const patientAcquisitionBenefitsQuery = `
   _type == "patientAcquisitionBenefits" => {
    _id,
    heading,
    subHeading,
    imageUrl,
    imageUrlMobile,
    ctaButtonPrimary{
            ${buttonQuery}
        },
        ctaButtonSecondary{
            ${buttonQuery}
        },
  }
`
export const moreThingsToExploreQuery = `
   _type == "moreThingsToExplore" => {
    _id,
    title,
    "cards":cards[]{
      title,
      description,
      "icon": icon.asset->url,
      imageUrl,
      "link":link->{
          title,  
          "slug": slug.current, 
          "categorySlug": category->slug.current,
      }
    }
  }
`
export const testimonialsSectionQuery = `
     _type == "testimonialsSection" => {
        _type,
        "testimonials": *[_type == "testimonials" && !(_id in path("drafts.**"))] | order(orderBy asc){
          clientname,
          jobtitle,
          imageUrl,
          "videoTestimonialsUrl": videoTestimonials.asset->url,
          parnetLogoUrl,
          testimonial,
          ...
        }  
      }
`
export const hospitalTestimonialsQuery = `
     _type == "hospitalTestimonials" => {
        _type,
        "testimonials": *[_type == "testimonials" && !(_id in path("drafts.**"))] | order(orderBy asc){
          clientname,
          jobtitle,
          imageUrl,
          parnetLogoUrl,
          testimonial
        },
        "clients":clients[]{
          name,
          role,
          image
        }
      }
`
export const solutionsStatsQuery = `
     _type == "solutionsStats" => {
        _type,
        title,
        description,
        "stats": stats[]{
          label,
          value,
          prefix,
          suffix
        }
      }
`
export const whyEveryOneLovesQuery = `
     _type == "whyEveryOneLoves" => {
        _type,
        title,
        subtitle,
        compareFeature,
        steerLabel,
        otherLabel,
        "benefitCards": benefitCards[]{
          title,
          description,
          image
        },
        "comparisonTable":comparisonTable[]{
          item,
          othersAvailable,
          steerAvailable
        }
      }
`
export const solutionsSteamlineQuery = `
     _type == "solutionsSteamline" => {
        _type,
        heading,
        description,
        ctaButtonPrimary{
            ${buttonQuery}
        },
        "items": items[]{
          title,
          description,
          icon
        }
      }
`
export const solutionsCtaSectionQuery = `
      _type == "solutionsCtaSection" => {
        _type,
        heading,
        subheading,
        ctaButtonPrimary 
      }   
`
export const howSteerProductsHelpsQuery = `
     _type == "howSteerProductsHelps" => {
        _type,
        title,
        description,
        "items": items[]{
          title,
          description,
          icon,
          "productLink": productLink->{
            _type,
            "slug":slug.current,
            title
          }
        }
      }
`
export const beforeAndAfterSectionQuery = `
     _type == "beforeAndAfterSection" => {
        _type,
        title,
        description,
        ImageUrl,
        "beforeAfterItems": beforeAfterItems[]{
          ImageUrl,          
          beforeTitle,
          afterTitle,
          beforeDescription,
          afterDescription
        }
      }
`
export const howSteerHelpsQuery = `
      _type == "howSteerHelps" => {
        _type,
        heading,
        subheading,
        imageUrl,
        description
      }   
`
export const howSteerSolvesQuery = `
      _type == "howSteerSolves" => {
        _type,
        heading,
        subheading,
        content,
      }   
`
export const solutionsBeingAtBeginningQuery = `
     _type == "solutionsBeingAtBeginning" => {
        _type,
        heading,
        subheading,
        "items": items[]{
          title,
          image,
          imageUrl,
          "productLink": productLink->{
            _type,
            "slug":slug.current,
            title
          }
        }
      }
`
export const faqSectionQuery = `
    _type == "faqSection" => {
      _type,
      heading,
      subheading,
      stillHaveQuestionHeading,
      stillHaveQuestionSubHeading,
      ctaButtonPrimary{
            ${buttonQuery}
        },
      faqHeading,
      "faqsData": faqs[]->{
          _id,
          question,
          answer
      },         
    }
`
export const howSteerSolutionsHelpsQuery = `
     _type == "howSteerSolutionsHelps" => {
        _type,
        title,
        subtitle,
        "items": items[]{
          title,
          description,
          ctaButtonPrimary{
            ${buttonQuery}
        },
          videoUrl,
          videoPosition
        }
      }
`
export const aboutHeroSectionQuery = `
     _type == "aboutHeroSection" => {
        _type,
        heading,
        ctaButtonPrimary{
            ${buttonQuery}
        },
        imageUrl
      }
`
export const companyTimelineSectionQuery = `
     _type == "companyTimelineSection" => {
        _type,
        "timeline": timeline[]{
          title,
          description,
          year
        }
      }
`
export const whatWeSolveSectionQuery = `
     _type == "whatWeSolveSection" => {
         _type,
        title,
        "items": items[]{
          title,
          description,
          image,         
        }
      }
`
export const workingAtSteerQuery = `
     _type == "workingAtSteer" => {
         _type,
        heading,
        subheading,
        "items": items[]{
          title,
          description,
          image,         
        }
      }
`
export const ourHiringProcessQuery = `
     _type == "ourHiringProcess" => {
         _type,
        heading,
        subheading,
        "items": items[]{
          title,
          description   
        }
      }
`
export const whyChooseSteerHealthQuery = `
     _type == "whyChooseSteerHealth" => {
         _type,
        heading,
        "items": items[]{
          challengeText,
          advantageText
        }
      }
`
export const leadershipSectionQuery = `
 _type == "leadershipSection" => {
      _type,
        title,
        subtitle,
        ctaButtonPrimary{
            ${buttonQuery}
        },
        "teamMembers": teamMembers[]->{
          name,
          jobTitle,
          linkedinUrl,
          xUrl,
          profileImage,
          bioDetails,
          "skillBadge":skillBadge{
            "icon":icon.asset->url,
            "hoverIcon":hoverIcon.asset->url
          }
        }
      }
`
export const faqPageSectionQuery = `
    _type == "faqPageSection" => {
      _type,
      heading,
      subheading,
      reachOutUsLabel,
      ctaButtonPrimary{
            ${buttonQuery}
        },
      "faqCategories": *[_type == "faqCategory"]{
      title,
      slug,
      "faqs": *[_type == "faqs" && references(^._id)]{
        question,
        answer
      }
    }
    }
`
export const blogPageSectionQuery = `
    _type == "blogPageSection" => {
      _type,
      heading,
      subheading,
      "allPosts": *[_type == "post" && !(_id in path("drafts.**"))] | order(_createdAt desc){
          title,
          "slug": slug.current,
          expert,
          mainImage,
          publishedAt,
          "categories":categories[]->{
            _id,
            title,
            "slug": slug.current
          }
        },
      "blogCategories": *[_type == "blogCategory"]{
        title,
        "slug": slug.current,
        "posts": *[_type == "post" && references(^._id)]{
          title,
          "slug": slug.current,
          expert,
          mainImage,
        }
      }
    }
`
export const eventPageSectionQuery = `
    _type == "eventPageSection" => {
      _type,
      heading,
      subheading,
      "allPosts": *[_type == "post" && !(_id in path("drafts.**"))] | order(_createdAt desc){
          title,
          "slug": slug.current,
          expert,
          mainImage,
          publishedAt,
          "categories":categories[]->{
            _id,
            title,
            "slug": slug.current
          }
        },
      "allEvents": *[_type == "events" && !(_id in path("drafts.**"))] | order(_createdAt desc){
          "title":name,
          "slug": slug.current,
          "expert":shortDescription,
          "mainImage":image,
          startDate,
          endDate,
          address,
          publishedAt,
          "categories":categories[]->{
            _id,
            title,
            "slug": slug.current
          },
          showHeaderForm
        },
      "eventCategories": *[_type == "eventCategory"]{
        title,
        "slug": slug.current,
        "events": *[_type == "events" && references(^._id)]{
          "title":name,
          "slug": slug.current,
          "expert":shortDescription,
          "mainImage":image,
          startDate,
          endDate,
          address,
          publishedAt,
          "categories":categories[]->{
            _id,
            title,
            "slug": slug.current
          }
        }
      }
    }
`
export const latestPostQuery = groq`
  *[_type == "post"] | order(publishedAt desc)[0...$limit]{
    _id,
      title,
      publishedAt,
      "slug": slug.current,
      "image": mainImage,
      "mainImage": mainImage.asset->url,
      "categories":categories[]->{
        _id,
        title,
        "slug": slug.current
      }
  }
`
export const allElevatePostsQuery = groq`
  *[_type == "elevatePost" && !(_id in path("drafts.**"))] | order(publishedAt desc){
    _id,
    title,
    publishedAt,
    "slug": slug.current,
    mainImage,
    "categories":categories[]->{
      _id,
      title,
      "slug": slug.current
    }
  }
`
export const allCasestudiesQuery = groq`
  *[_type == "casestudies"] | order(publishedAt desc)[0...3]{
    _id,
    title,
    "slug": slug.current,
  }
`
export const allProductsQuery = groq`
  *[_type == "products"] | order(orderBy asc) {
    _id,
    title,
    "slug": slug.current,
    orderBy,
  }
`
export const allCategoriesQuery = groq`
  *[_type == "blogCategory"] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
  }
`
export const allSolutionsQuery = groq`
  *[_type == "solutions"] | order(orderBy asc){
    _id,
    title,
    "slug": slug.current,
    orderBy,
  }
`
export const blogSectionQuery = `
      _type == "blogSection" => {
        _type,
        heading,
        subheading,
        ctaButtonPrimary{
            ${buttonQuery}
        },
        "blogPosts": blogPosts[]->{
          title,
          "slug": slug.current,
          expert,
          mainImage,
          publishedAt
        },
      }
`
export const securityFeaturesQuery = `
      _type == "securityFeatures" => {
        _type,        
        "features": features[]{
          tabline,
          title,
          description,
          videoUrl,
          videoPosition
        },
      }
`
export const contactSectionQuery = `
      _type == "contactSection" => {
        _type,
        heading,
        description,
        preferToTalk,
        phoneNumber,
        hubspotFormId,
        generalEnquiryHeading,
        "items":items[]{
          title,
          description,
          icon
        },
        "stats":stats[]{
          value,
          prefix,
          suffix,
          label
        }
      }
`
export const contentHighlightSectionQuery = `
      _type == "contentHighlightSection" => {
        _type,
        heading,
        description,
        contentAlign
}
`
export const founderMessageQuery = `
      _type == "founderMessage" => {
        _type,
        name,
        role,
        company,
        quote,
        image
}
`
export const credibilityShowcaseQuery = `
      _type == "credibilityShowcase" => {
        _type,
        headline,
        subtext,
        badge
}
`
export const checkoutOurIntegrationsQuery = `
     _type == "checkoutOurIntegrations" => {
         _type,
        heading,
        subheading,
        "allIntegrations": *[_type == "integrations" && !(_id in path("drafts.**"))] | order(_createdAt asc) {
  title,
  "slug": slug.current,
  shortdescription,
  image,
}
      }
`
export const howItWorksQuery = `
      _type == "howItWorks" => {
        _type,
        heading,
        content,
        image
}
`
export const problemByNumbersQuery = `
      _type == "problemByNumbers" => {
        _type,
        heading,
        subheading,
        "items":items[]{
          title,
          description,
          icon,
          statValue,
          statLabel
        },
      }
`
export const whySteerOutperformQuery = `
      _type == "whySteerOutperform" => {
        _type,
        heading,
        tagline
}
`
export const legalPagesHeaderSectionQuery = `
      _type == "legalPagesHeaderSection" => {
        _type,
        title,
        lastRevised
}
`
export const contentSectionQuery = `
      _type == "contentSection" => {
        _type,
        content
}
`
export const realImpactSectionQuery = `
      _type == "realImpactSection" => {
        _type,
        heading,
        "metrics":metrics[]{
          value,
          suffix,
          description
        }
      }
`
export const homeHeroSectionQuery = `
      _type == "homeHeroSection" => {
        _type,
        heading,
        subheading,
        description,
        ctaButtonPrimary{
            ${buttonQuery}
        },
        ctaButtonSecondary{
            ${buttonQuery}
        },
        image,
        mobileImage,
        heroImage,
        heroMobileImage
}
`
export const homeSteerSolutionsSectionQuery = `
      _type == "homeSteerSolutionsSection" => {
        _type,
        heading,
        subheading,
        description,
        tagline,
        "platforms":platforms[] {
          title,
          description,
          image,
          secondimage,
          subtitle,
          "icon": icon.asset->url,
          iconLabel,
          ctaButtonPrimary{
            ${buttonQuery}
        },
          "stats":stats[] {
            value,
            label
          }
        }
}
`
export const workBuddiesSectionQuery = `
      _type == "workBuddiesSection" => {
        _type,
        heading,
        subheading,        
        "images": images[]{
          ...
        },
      }
`
export const ourTeamSectionQuery = `
      _type == "ourTeamSection" => {
        _type,
        heading,
        subheading,   
        "teamMembers": *[_type == "teamMember" && !(_id in path("drafts.**"))] | order(name asc){
          name,
          jobTitle,
          linkedinUrl,
          xUrl,
          profileImage,
          bioDetails,
          Order,
          "skillBadge":skillBadge{
            "icon":icon.asset->url,
            "hoverIcon":hoverIcon.asset->url
          }
        }
      }
`
export const fmFeaturesQuery = `
      _type == "fmFeatures" => {
        _type,
        heading,
        subHeading,
        "features": features[]{ 
          title,
          description,
          image
        }
      }
`
export const howWeCreateValueQuery = `
      _type == "howWeCreateValue" => {
        _type,
        heading,
        subHeading,
        "features": features[]{ 
          title,
          description,
          image,
          "imageWidth": image.asset -> metadata.dimensions.width,
          "imageHeight": image.asset -> metadata.dimensions.height,
          ctaButtonPrimary{
            ${buttonQuery}
        },
        }
      }
`
export const homeStatsQuery = `
      _type == "homeStats" => {
        _type,
        quote,
        clientname,
        clientJobTitle,
        "stats":stats[]{
          value,
          "suffix":suffice,
          label,
          imageUrl
        }
      }
`
export const visionAndMissionQuery = `
   _type == "visionAndMission" => {
      _id,
      _type,
      visionTitle,
      visionDescription,
      missionTitle,
      missionDescription,
      ctaButtonPrimary{
        ${buttonQuery}
      },
      image
    }
`
export const whoWeServeQuery = `
   _type == "whoWeServe" => {
      _id,
      _type,
      title,
      description,
      image,
    }
`
export const ourValuesQuery = `
   _type == "ourValues" => {
      _id,
      _type,
      title,
      description,
      items[]{
        title,
        subtitle,
        icon
      }
    }
`
export const whatWeDoQuery = `
   _type == "whatWeDo" => {
      _id,
      _type,
        heading,
        subheading,
        items[]{
          title,
          description,
          image
        }
    }
`
export const operationalResultsQuery = `
   _type == "operationalResults" => {
      _id,
      _type,
        heading,
        subheading,
        "results":results[]{
          title,
          description,
          highlight,
          suffix,
          image
        }
    }
`

export const hospitalResultsQuery = `
     _type == "hospitalResults" => {
        _type,
        heading,
        description,
        "stats": stats[]{
          description,
          value,
          prefix,
          suffix
        }
      }
`
export const whyItMattersQuery = `
   _type == "whyItMatters" => {
      _id,
      _type,
        heading,
        subheading,
        features[]{
          title,
          description,
          icon
        }
    }
`
export const joinUsQuery = `
   _type == "joinUs" => {
      _id,
      _type,
      title,
      subtitle,
      ctaButtonPrimary{
            ${buttonQuery}
          },
      cards[]{
        title,
        description,
        linkText,
        linkUrl,
        icon,
      },
    }
`
export const ourStoryQuery = `
   _type == "ourStory" => {
      _id,
      _type,
      title,
      items[]{
        year,
        headline,
        description
      }
    }
`
export const p2pHdrLogosSectionQuery = `
   _type == "p2pHdrLogosSection" => {
      _id,
      _type,
      "logos":logos[]{
          image,
          link,
          "imageWidth": image.asset -> metadata.dimensions.width,
          "imageHeight": image.asset -> metadata.dimensions.height

      }
     
    }
`
export const p2pPageQuery = groq`
  *[_type == "p2p"][0]{
    _id,
    title,
    seo{
      "metaImage": shareImage.asset->url + "?w=1200&h=650&fm=png&fit=crop",
      metaTitle,
      metaDescription,
      _type
    },
    "sections": sections[]{
      _type,
      ${solutionsheroImageSectionQuery},
      ${clientLogosQuery},
      ${fmFeaturesQuery},
      ${solutionsCtaSectionQuery},
      ${whyChooseSteerHealthQuery},
      ${howSteerHelpscareProvidersQuery},
      ${fmStatsQuery},
      ${fmTestimonialsQuery}, 
      ${ctaSectionQuery},
      ${p2pHdrLogosSectionQuery},      
    } 
  }
`
export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    title,
    seo{
      "metaImage": shareImage.asset->url + "?w=1200&h=650&fm=png&fit=crop",
      metaTitle,
      metaDescription,
      _type
    },
    "sections": sections[]{
      _type,
      ${homeHeroSectionQuery},
      ${homeStatsQuery},
      ${homeSteerSolutionsSectionQuery},
      ${ctaSectionQuery},
      ${testimonialsSectionQuery},
      ${steerHealthPartnershipOutcomesQuery},
      ${steerEffortlessIntegrationQuery},
      ${solutionsForEverySystemsQuery},
      ${clientLogosSliderQuery},
    }
  }
`
export const productsBySlugQuery = groq`
*[_type == "products" && slug.current == $slug][0] {
  _id,
  title,
  seo{
    "metaImage": shareImage.asset->url + "?w=1200&h=650&fm=png&fit=crop",
    metaTitle,
    metaDescription,
    _type
  },
  "slug": slug.current,
  "categorySlug": category->slug.current,
  "sections": sections[]{
    _type,
    ${ctaSectionQuery},
    ${faqSectionQuery},
    ${testimonialsSectionQuery},
    ${steerAdvantageSectionQuery},
    ${whyEveryOneLovesQuery},
    ${productHeroSectionQuery},
    ${productDetailsSectionQuery},
    ${solutionsStatsQuery},
    ${fmFeaturesQuery},
  }
}
`
export const integrationsBySlugQuery = groq`
*[_type == "integrations" && slug.current == $slug][0] {
  _id,
  title,
  seo{
    "metaImage": shareImage.asset->url + "?w=1200&h=650&fm=png&fit=crop",
    metaTitle,
    metaDescription,
    _type
  },
  "slug": slug.current,
  "categorySlug": category->slug.current,
  "sections": sections[]{
    _type,
    ${solutionsheroImageSectionQuery},   
    ${contentHighlightSectionQuery}, 
    ${ctaSectionQuery},
    ${faqSectionQuery},
    ${howItWorksQuery},
    ${checkoutOurIntegrationsQuery},
  }
}
`
export const casestudiesQuery = groq`
  *[_type == "casestudies" && !(_id in path("drafts.**")) && slug.current == $slug][0] {
  title,
  shortDescription,
  mainImage,
  logo,
  about,
  industry,
  companySize,
  headquarters,
  keyFeatures,
  "slug": slug.current,
  challenge,
  solution,
  results,
  whyItMatters,
  lookingAhead,
  "authorData": author->{
      _id,
      name,
      jotTitle,
      "slug": slug.current, 
      image,
      "imageUrl": image.asset -> url,
      "imageWidth": image.asset -> metadata.dimensions.width,
      "imageHeight": image.asset -> metadata.dimensions.height,
    }, 
  seo{
      "metaImage": shareImage.asset->url + "?w=1200&h=650&fm=png&fit=crop",
      metaTitle,
      metaDescription,
      _type
    },
   
    "sections": sections[]{
      _type,
      ${clientsSectionQuery},
      ${ctaSectionQuery},
      ${solutionsSteamlineQuery},
      ${testimonialsSectionQuery},
    } 
  }
`

export const blogContentQuery = `
      _type == "blogContent" => {
        _type,
        content
      }
`
export const blogImageSectionQuery = `
      _type == "blogImageSection" => {
        _type,
        image,
        caption
      }
`
export const categoryWithPostsQuery = groq`
*[_type == "blogCategory" && slug.current == $slug][0]{
  title,
  slug,
  seo{
      "metaImage": shareImage.asset->url + "?w=1200&h=650&fm=png&fit=crop",
      metaTitle,
      metaDescription,
      _type
    },
    "blogCategories": *[_type == "blogCategory"]{
        title,
        "slug": slug.current,
        "posts": *[_type == "post" && references(^._id)]{
          title,
          "slug": slug.current,
          expert,
          mainImage,
          publishedAt
        }
      },
  "allPosts": *[_type == "post" && references(^._id)]{
    title,
    "slug": slug.current,
    expert,
    mainImage,
    publishedAt,
    categories[]->{
      title,
      slug
    }
  }
}
`;
export const eventBySlugQuery = groq`
  *[_type == "events" && !(_id in path("drafts.**")) && slug.current == $slug][0] {
  name,
  "expert":shortDescription,
  address,
  isLandingPage,
  "slug": slug.current,
  startDate,
  endDate,
  ctaButtonPrimary{
    ${buttonQuery}
  },
  showHeaderForm,
  formContent,
  formblowContent,
  hubspotFormId,
  registrationLink,
  registrationLinkText,
  eventCta{
    ctaHeading,
    ctaSubHeading,
    button{
      text,
      "link":link->{
        _id,
        _type,
        title,
        "slug": slug.current
      }
    }
  },
  "body":content,
  "sections": sections[]{
    _type,
    ${eventHeroSectionQuery},
    ${whyAscsChooseSteerQuery},
    ${intelligentAdaptiveLayerQuery},
    ${surgeryTimelineQuery},
    ${whatIncludedQuery},
    ${securityComplianceQuery},
    ${outcomesThatMatterQuery},
    ${customerStoriesQuery},
    ${implementationQuery},
    ${faqSectionQuery},
    ${ctaSectionQuery},
    ${p2pHdrLogosSectionQuery},
  },
  seo{
      "metaImage": shareImage.asset->url + "?w=1200&h=650&fm=png&fit=crop",
      metaTitle,
      metaDescription,
      _type
    },
   "mainImage":image,
   "categories":categories[]->{
      _id,
      title,
      "slug": slug.current
    },  
  }
`
export const postBySlugQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**")) && slug.current == $slug][0] {
  title,
  expert,
  publishedAt,
  leftBannerSection,
  blogCta{
    ctaHeading,
    button{
      text,
      "link":link->{
        _id,
        _type,
        title,
        "slug": slug.current
      }
    }
  },
  body,
  seo{
      "metaImage": shareImage.asset->url + "?w=1200&h=650&fm=png&fit=crop",
      metaTitle,
      metaDescription,
      _type
    },
   mainImage,
   "categories":categories[]->{
      _id,
      title,
      "slug": slug.current
    },  
  "tagsData":tags[]->{
      _id,
      tag
    },  
  "authorData": author->{
      _id,
      name,
      jotTitle,
      "slug": slug.current, 
      image,
      "imageUrl": image.asset -> url,
      "imageWidth": image.asset -> metadata.dimensions.width,
      "imageHeight": image.asset -> metadata.dimensions.height,
    }, 
    "sections": sections[]{
      _type,
      ${blogSectionQuery},
      ${ctaSectionQuery},
    } 
  }
`
export const elevatePostBySlugQuery = groq`
  *[_type == "elevatePost" && !(_id in path("drafts.**")) && slug.current == $slug][0] {
  title,
  expert,
  publishedAt,
  blogCta{
    ctaHeading,
    ctaSubHeading,
    button{
      text,
      "link":link->{
        _id,
        _type,
        title,
        "slug": slug.current
      }
    }
  },
  body,
  seo{
      "metaImage": shareImage.asset->url + "?w=1200&h=650&fm=png&fit=crop",
      metaTitle,
      metaDescription,
      _type
    },
   mainImage,
   "categories":categories[]->{
      _id,
      title,
      "slug": slug.current
    },  
  "tagsData":tags[]->{
      _id,
      tag
    },  
  "authorData": author->{
      _id,
      name,
      jotTitle,
      "slug": slug.current, 
      image,
      "imageUrl": image.asset -> url,
      "imageWidth": image.asset -> metadata.dimensions.width,
      "imageHeight": image.asset -> metadata.dimensions.height,
    }, 
    "sections": sections[]{
      _type,
      ${blogSectionQuery},
      ${ctaSectionQuery},
    } 
  }
`
export const p2pContactpagesQuery = groq`
  *[_type == "page" && slug.current == "p2p-contact-us"][0] {
_id,
  title,
  seo{
    "metaImage": shareImage.asset->url + "?w=1200&h=650&fm=png&fit=crop",
    metaTitle,
    metaDescription,
    _type
  },
  "slug": slug.current,
  "sections": sections[]{
    _type,
    ${companyTimelineSectionQuery},
    ${solutionsheroImageSectionQuery},    
    ${aboutHeroSectionQuery},
    ${leadershipSectionQuery},    
    ${ctaSectionQuery},
    ${clientLogosQuery},
    ${testimonialsSectionQuery},
    ${faqSectionQuery},   
    ${solutionsStatsQuery},
    ${whatWeSolveSectionQuery},
    ${steerAdvantageSectionQuery},
    ${faqPageSectionQuery},
    ${blogPageSectionQuery},
    ${eventPageSectionQuery},
    ${blogSectionQuery},
    ${securityFeaturesQuery},    
    ${contactSectionQuery},
    ${contentHighlightSectionQuery},
    ${checkoutOurIntegrationsQuery},
    ${problemByNumbersQuery},
    ${howSteerSolvesQuery},
    ${whySteerOutperformQuery},
    ${legalPagesHeaderSectionQuery},
    ${contentSectionQuery},
    ${realImpactSectionQuery},
    ${workBuddiesSectionQuery},
    ${ourTeamSectionQuery},
    ${visionAndMissionQuery},
     ${howSteerHelpscareProvidersQuery},
    ${whoWeServeQuery},
    ${ourValuesQuery},
    ${whatWeDoQuery},
    ${whyItMattersQuery},
    ${ourStoryQuery},
    ${joinUsQuery}, 
    ${productHeroSectionQuery},  
    ${ourHiringProcessQuery}, 
    ${workingAtSteerQuery},
  }
  }
`
export const landingPagesQuery = groq`
  *[_type == "landingPages" && !(_id in path("drafts.**")) && slug.current == $slug][0] {
    _id,
    title,
    seo{
      "metaImage": shareImage.asset->url + "?w=1200&h=650&fm=png&fit=crop",
      metaTitle,
      metaDescription,
      _type
    },
    "sections": sections[]{
      _type,
      ${homeHeroSectionQuery},
      ${homeStatsQuery},
      ${homeSteerSolutionsSectionQuery},
      ${testimonialsSectionQuery},
      ${steerHealthPartnershipOutcomesQuery},
      ${steerEffortlessIntegrationQuery},
      ${solutionsForEverySystemsQuery},      
      ${solutionsheroImageSectionQuery},
      ${clientLogosQuery},
      ${fmFeaturesQuery},
      ${solutionsCtaSectionQuery},
      ${whyChooseSteerHealthQuery},
      ${howSteerHelpscareProvidersQuery},
      ${fmStatsQuery},
      ${fmTestimonialsQuery}, 
      ${ctaSectionQuery},
      ${p2pHdrLogosSectionQuery},      
    } 
  }
`
export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug && $slug != "p2p-contact-us"][0] {
_id,
  title,
  seo{
    "metaImage": shareImage.asset->url + "?w=1200&h=650&fm=png&fit=crop",
    metaTitle,
    metaDescription,
    _type
  },
  "slug": slug.current,
  "sections": sections[]{
    _type,
    ${companyTimelineSectionQuery},
    ${solutionsheroImageSectionQuery},    
    ${aboutHeroSectionQuery},
    ${leadershipSectionQuery},    
    ${ctaSectionQuery},
    ${clientLogosQuery},
    ${testimonialsSectionQuery},
    ${faqSectionQuery},   
    ${solutionsStatsQuery},
    ${whatWeSolveSectionQuery},
    ${steerAdvantageSectionQuery},
    ${faqPageSectionQuery},
    ${blogPageSectionQuery},
    ${eventPageSectionQuery},
    ${blogSectionQuery},
    ${securityFeaturesQuery},    
    ${contactSectionQuery},
    ${contentHighlightSectionQuery},
    ${checkoutOurIntegrationsQuery},
    ${problemByNumbersQuery},
    ${howSteerSolvesQuery},
    ${whySteerOutperformQuery},
    ${legalPagesHeaderSectionQuery},
    ${contentSectionQuery},
    ${realImpactSectionQuery},
    ${workBuddiesSectionQuery},
    ${ourTeamSectionQuery},
    ${visionAndMissionQuery},
     ${howSteerHelpscareProvidersQuery},
    ${whoWeServeQuery},
    ${ourValuesQuery},
    ${whatWeDoQuery},
    ${whyItMattersQuery},
    ${ourStoryQuery},
    ${joinUsQuery}, 
    ${productHeroSectionQuery},  
    ${ourHiringProcessQuery}, 
    ${workingAtSteerQuery},
  }
  }
`
export const solutionssBySlugQuery = groq`
*[_type == "solutions" && slug.current == $slug][0] {
  _id,
  title,
  seo{
    "metaImage": shareImage.asset->url + "?w=1200&h=650&fm=png&fit=crop",
    metaTitle,
    metaDescription,
    _type
  },
  "slug": slug.current,
  "categorySlug": category->slug.current,
  "sections": sections[]{
    _type,
    ${heroVideoSectionQuery},
    ${heroImageSectionQuery},
    ${solutionsheroImageSectionQuery},
    ${ctaSectionQuery},
    ${testimonialsSectionQuery},
    ${faqSectionQuery},
    ${solutionsStatsQuery},
    ${solutionsSteamlineQuery},
    ${solutionsCtaSectionQuery},
    ${howSteerProductsHelpsQuery},
    ${beforeAndAfterSectionQuery},
    ${howSteerHelpsQuery},
    ${solutionsBeingAtBeginningQuery},
    ${howSteerHelpscareProvidersQuery},
    ${fmStatsQuery},
    ${clientLogosQuery},
    ${fmFeaturesQuery},
    ${whyChooseSteerHealthQuery},
    ${fmTestimonialsQuery},
    ${hospitalsHeroSectionQuery},
    ${hospitalTestimonialsQuery}, 
    ${operationalResultsQuery},
    ${hospitalResultsQuery},
    ${customerStoriesQuery},
    ${howWeCreateValueQuery},
    ${clientsSectionQuery},
    ${founderMessageQuery},
    ${credibilityShowcaseQuery}
  }
}
`
export const platformsBySlugQuery = groq`
*[_type == "platforms" && slug.current == $slug && category->slug.current == $category][0] {
  _id,
  title,
  seo{
      "metaImage": shareImage.asset->url + "?w=1200&h=650&fm=png&fit=crop",
      metaTitle,
      metaDescription,
      _type
    },
  "slug": slug.current,
  "categorySlug": category->slug.current,
  "categoryTitle": category->displayTitle,
  "sections": sections[]{
      _type,  
        ${heroVideoSectionQuery},
        ${steerHealthBenefitsQuery},
        ${heroImageSectionQuery},
        ${steerAdvantageSectionQuery},
        ${howSteerSolutionsHelpsQuery},
        ${clientsSectionQuery},
        ${workWithYourEcoSystemQuery},
        ${acquireCapabilitiesBeingBeginningQuery},
        ${automateCapabilitiesBeingBeginningQuery},
        ${navigateCapabilitiesBeingBeginningQuery},
        ${solutionsForEverySystemsQuery},
        ${steerEffortlessIntegrationQuery},
        ${patientAcquisitionBenefitsQuery},
        ${moreThingsToExploreQuery},
        ${steerHealthPartnershipOutcomesQuery},
        ${ctaSectionQuery},
        ${testimonialsSectionQuery},
        ${faqSectionQuery},   
        ${solutionsBeingAtBeginningQuery},
    } 
}
`
export const settingsQuery = groq`
  *[_type == "settings"][0] {
    _id,
    enableTopbanner,
    bannerText,
    buttonText,
    buttonLink
  }
`
export const elevateHomePageQuery = groq`
  *[_type == "elevateHome"][0]{
    _id,
    title,
    seo{
      "metaImage": shareImage.asset->url + "?w=1200&h=650&fm=png&fit=crop",
      metaTitle,
      metaDescription,
      _type
    },
    "sections": sections[]{
      _type,
      ${steerNotesHeroSectionQuery},
      ${steerElevateHeroSectionQuery},
      ${contentImageSectionQuery},
      ${costOfDisconnectedSystemsQuery},
      ${ehrIntegrationSectionQuery},
      ${elevateCtaSectionQuery},
      ${elevateStatsQuery},
      ${elevateTestimonialsSectionQuery},
      ${founderMessageQuery},
      ${steerAdvantageSectionQuery},
      ${timeForFullWorkforceQuery},
      ${faqSectionQuery},
      ${clientLogosSliderQuery},
      ${roiCalculatorQuery}
    } 
  }
`
export const steernotesPageQuery = groq`
  *[_type == "steernotes"][0]{
    _id,
    title,
    seo{
      "metaImage": shareImage.asset->url + "?w=1200&h=650&fm=png&fit=crop",
      metaTitle,
      metaDescription,
      _type
    },
    "sections": sections[]{
      _type,
      ${steerNotesHeroSectionQuery},
      ${contentImageSectionQuery},
      ${steerNotesStatsQuery},
      ${modernHealthCareQuery},
      ${dataIntegrityQuery},
      ${steerNotesWhoWeServeQuery},
      ${steerNotesTestimonialsQuery},
      ${howSteerNotesWorksQuery},
      ${ctaSectionQuery},
      ${surgeryTimelineQuery},
    } 
  }
`
export const steernotespricingPageQuery = groq`
  *[_type == "steernotespricing"][0]{
    _id,
    title,
    seo{
      "metaImage": shareImage.asset->url + "?w=1200&h=650&fm=png&fit=crop",
      metaTitle,
      metaDescription,
      _type
    },
    "sections": sections[]{
      _type,
      ${steerNotesHeroSectionQuery},
      ${steerElevateHeroSectionQuery},
      ${contentImageSectionQuery},
      ${costOfDisconnectedSystemsQuery},
      ${ehrIntegrationSectionQuery},
      ${elevateCtaSectionQuery},
      ${elevateStatsQuery},
      ${elevateTestimonialsSectionQuery},
      ${founderMessageQuery},
      ${steerAdvantageSectionQuery},
      ${timeForFullWorkforceQuery},
      ${faqSectionQuery},
      ${clientLogosSliderQuery},
      ${roiCalculatorQuery}
    } 
  }
`
export const elevateSolutionsBySlugQuery = groq`
*[_type == "elevateSolutions" && slug.current == $slug][0] {
  _id,
  title,
  seo{
    "metaImage": shareImage.asset->url + "?w=1200&h=650&fm=png&fit=crop",
    metaTitle,
    metaDescription,
    _type
  },
  "slug": slug.current,
  "sections": sections[]{
    _type,
    ${solutionsheroImageSectionQuery},
    ${contentImageSectionQuery},
    ${ehrIntegrationSectionQuery},
    ${elevateCtaSectionQuery},
    ${elevateStatsQuery},
    ${elevateTestimonialsSectionQuery},
    ${founderMessageQuery},
    ${steerAdvantageSectionQuery},
    ${timeForFullWorkforceQuery},
    ${faqSectionQuery}
  }
}
`
export const elevateProductsBySlugQuery = groq`
*[_type == "elevateProducts" && slug.current == $slug][0] {
  _id,
  title,
  seo{
    "metaImage": shareImage.asset->url + "?w=1200&h=650&fm=png&fit=crop",
    metaTitle,
    metaDescription,
    _type
  },
  "slug": slug.current,
  shortDescription,
  UseCases,
  "sections": sections[]{
    _type,
    ${solutionsheroImageSectionQuery},
    ${contentImageSectionQuery},
    ${ehrIntegrationSectionQuery},
    ${elevateCtaSectionQuery},
    ${elevateStatsQuery},
    ${elevateTestimonialsSectionQuery},
    ${founderMessageQuery},
    ${steerAdvantageSectionQuery},
    ${timeForFullWorkforceQuery},
    ${faqSectionQuery}
  }
}
`