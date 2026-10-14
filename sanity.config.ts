'use client'
/**
 * This config is used to set up Sanity Studio that's mounted on the `app/studio/[[...index]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision'

import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { simplerColorInput } from 'sanity-plugin-simpler-color-input';
import { table } from '@sanity/table'
import { TableInput } from '@/sanity/schemas/objects/TableInput'

import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api'
import * as resolve from '@/sanity/plugins/resolve'
import { pageStructure, singletonPlugin } from '@/sanity/plugins/settings'
import page from '@/sanity/schemas/documents/page'
import faqs from  '@/sanity/schemas/documents/faqs'
import faqCategory from  '@/sanity/schemas/documents/faqCategory'
import home from '@/sanity/schemas/singletons/home'
import settings from '@/sanity/schemas/singletons/settings'
import p2p from '@/sanity/schemas/singletons/p2p'
import post from '@/sanity/schemas/documents/post'
import elevatePost from '@/sanity/schemas/documents/elevatePost'
import events from '@/sanity/schemas/documents/events'
import landingPages from '@/sanity/schemas/documents/landingPages'
import eventCategory from '@/sanity/schemas/documents/eventCategory'
import author from '@/sanity/schemas/documents/author'
import tags from '@/sanity/schemas/documents/tags'
import blogCategory from '@/sanity/schemas/documents/blogCategory'
import platformCategory from '@/sanity/schemas/documents/platformCategory'
import platforms from '@/sanity/schemas/documents/platforms'
import solutions from '@/sanity/schemas/documents/solutions'
import products from '@/sanity/schemas/documents/products'
import integrations from '@/sanity/schemas/documents/integrations'
import testimonials from '@/sanity/schemas/documents/testimonials'
import casestudies from '@/sanity/schemas/documents/casestudies'
import teamMember from '@/sanity/schemas/documents/teamMember'


import blogSection from '@/sanity/schemas/sections/blogSection'
import ctaSection from '@/sanity/schemas/sections/ctaSection'

import blockContent from '@/sanity/schemas/objects/blockContent'

import seo from '@/sanity/schemas/objects/seo'
import button from '@/sanity/schemas/objects/Button'
import divider from '@/sanity/schemas/objects/Divider'
import speaker from '@/sanity/schemas/objects/Speaker'
import speakersSection from '@/sanity/schemas/objects/speakersSection'
import textColor from '@/sanity/schemas/objects/textColor'
import heroSection from '@/sanity/schemas/sections/heroSection'
import heroImageSection from '@/sanity/schemas/sections/heroImageSection'
import heroVideoSection from '@/sanity/schemas/sections/heroVideoSection'
import faqSection from '@/sanity/schemas/sections/faqSection'
import testimonialsSection from '@/sanity/schemas/sections/testimonialsSection'
import clientsSection from '@/sanity/schemas/sections/clientsSection'
import steerAdvantageSection  from '@/sanity/schemas/sections/steerAdvantageSection'

import acquireCapabilitiesBeingBeginning from '@/sanity/schemas/sections/acquireCapabilitiesBeingBeginning'
import automateCapabilitiesBeingBeginning from '@/sanity/schemas/sections/automateCapabilitiesBeingBeginning'
import howSteerSolutionsHelps from '@/sanity/schemas/sections/howSteerSolutionsHelps'
import navigateCapabilitiesBeingBeginning from '@/sanity/schemas/sections/navigateCapabilitiesBeingBeginning'
import solutionsForEverySystems from '@/sanity/schemas/sections/solutionsForEverySystems'
import steerEffortlessIntegration from '@/sanity/schemas/sections/steerEffortlessIntegration'
import steerHealthBenefits from '@/sanity/schemas/sections/steerHealthBenefits'
import workWithYourEcoSystem from '@/sanity/schemas/sections/workWithYourEcoSystem'
import patientAcquisitionBenefits from '@/sanity/schemas/sections/patientAcquisitionBenefits'
import moreThingsToExplore from '@/sanity/schemas/sections/moreThingsToExplore'
import steerHealthPartnershipOutcomes from '@/sanity/schemas/sections/steerHealthPartnershipOutcomes'
import seamlessIntakes from  '@/sanity/schemas/sections/seamlessIntakes'

// Solutions Sections
import solutionsStats from '@/sanity/schemas/sections/solutionsStats'
import solutionsSteamline from '@/sanity/schemas/sections/solutionsSteamline'
import solutionsCtaSection from '@/sanity/schemas/sections/solutionsCtaSection'
import howSteerProductsHelps from '@/sanity/schemas/sections/howSteerProductsHelps'
import beforeAndAfterSection from '@/sanity/schemas/sections/beforeAndAfterSection'
import howSteerHelps from '@/sanity/schemas/sections/howSteerHelps'
import solutionsBeingAtBeginning from '@/sanity/schemas/sections/solutionsBeingAtBeginning'
import solutionsheroImageSection from '@/sanity/schemas/sections/solutionsheroImageSection'

// Products Sections
import productHeroSection from '@/sanity/schemas/sections/productHeroSection'
import productDetailsSection from '@/sanity/schemas/sections/productDetailsSection'
import whyEveryOneLoves from '@/sanity/schemas/sections/whyEveryOneLoves'


// Pages Sections
import aboutHeroSection from '@/sanity/schemas/sections/aboutHeroSection'
import companyTimelineSection from '@/sanity/schemas/sections/companyTimelineSection'
import modernHealthCare from '@/sanity/schemas/sections/modernHealthCare'
import dataIntegrity from '@/sanity/schemas/sections/dataIntegrity'
import steerNotesWhoWeServe from '@/sanity/schemas/sections/steerNotesWhoWeServe'
import steerNotesTestimonials from '@/sanity/schemas/sections/steerNotesTestimonials'
import whatWeSolveSection from '@/sanity/schemas/sections/whatWeSolveSection'
import howWeSolveSection from '@/sanity/schemas/sections/howWeSolveSection'
import leadershipSection from '@/sanity/schemas/sections/leadershipSection'
import problemByNumbers from '@/sanity/schemas/sections/problemByNumbers'
import howSteerSolves from '@/sanity/schemas/sections/howSteerSolves'
import checkoutOurIntegrations from '@/sanity/schemas/sections/checkoutOurIntegrations'
import legalPagesHeaderSection from '@/sanity/schemas/sections/legalPagesHeaderSection'
import contentSection from '@/sanity/schemas/sections/contentSection'
import faqPageSection from '@/sanity/schemas/sections/faqPageSection'
import blogPageSection from '@/sanity/schemas/sections/blogPageSection'
import contactSection from '@/sanity/schemas/sections/contactSection'
import securityFeatures from '@/sanity/schemas/sections/securityFeatures'
import contentHighlightSection from '@/sanity/schemas/sections/contentHighlightSection'
import howItWorks from '@/sanity/schemas/sections/howItWorks'
import whySteerOutperform from '@/sanity/schemas/sections/whySteerOutperform'
import realImpactSection from '@/sanity/schemas/sections/realImpactSection'
import steerPowersFutureOfCare from '@/sanity/schemas/sections/steerPowersFutureOfCare'
import steerPowersBenefits from '@/sanity/schemas/sections/steerPowersBenefits'
import clientLogos from '@/sanity/schemas/sections/clientLogos'
import homeStats from '@/sanity/schemas/sections/homeStats'
import howSteerHelpscareProviders from '@/sanity/schemas/sections/howSteerHelpscareProviders'
import ourTeamSection from '@/sanity/schemas/sections/ourTeamSection'
import workBuddiesSection from '@/sanity/schemas/sections/workBuddiesSection'
import fmFeatures from '@/sanity/schemas/sections/fmFeatures'
import whyChooseSteerHealth from '@/sanity/schemas/sections/whyChooseSteerHealth'
import fmStats from '@/sanity/schemas/sections/fmStats'
import fmTestimonials from '@/sanity/schemas/sections/fmTestimonials'

// Home Sections
import homeHeroSection from '@/sanity/schemas/sections/homeHeroSection'
import homeSteerSolutionsSection from '@/sanity/schemas/sections/homeSteerSolutionsSection'

// Blog Sections
import blogContent from '@/sanity/schemas/sections/blogContent'
import blogImageSection from '@/sanity/schemas/sections/blogImageSection'

// About Page Sections
import visionAndMission from '@/sanity/schemas/sections/visionAndMission'
import ourValues from '@/sanity/schemas/sections/ourValues'
import ourStory from '@/sanity/schemas/sections/ourStory'
import joinUs from '@/sanity/schemas/sections/joinUs'
import whyItMatters from '@/sanity/schemas/sections/whyItMatters'
import whoWeServe from '@/sanity/schemas/sections/whoWeServe'
import whatWeDo from '@/sanity/schemas/sections/whatWeDo'

import ourHiringProcess from '@/sanity/schemas/sections/ourHiringProcess'
import workingAtSteer from '@/sanity/schemas/sections/workingAtSteer'

import hospitalsHeroSection from  '@/sanity/schemas/sections/hospitalsHeroSection'
import steerNotesHeroSection from '@/sanity/schemas/sections/steerNotesHeroSection'
import operationalResults from '@/sanity/schemas/sections/operationalResults'
import hospitalResults from '@/sanity/schemas/sections/hospitalResults'
import customerStories from '@/sanity/schemas/sections/customerStories'
import hospitalTestimonials from '@/sanity/schemas/sections/hospitalTestimonials'
import howWeCreateValue from '@/sanity/schemas/sections/howWeCreateValue'
import eventPageSection  from '@/sanity/schemas/sections/eventPageSection'
import founderMessage from '@/sanity/schemas/sections/founderMessage'
import credibilityShowcase from '@/sanity/schemas/sections/credibilityShowcase'
import p2pHdrLogosSection from '@/sanity/schemas/sections/p2pHdrLogosSection'

import eventHeroSection from '@/sanity/schemas/sections/eventsHeroSection'

import outcomesThatMatter from '@/sanity/schemas/sections/outcomesThatMatter'
import securityCompliance from '@/sanity/schemas/sections/securityCompliance'
import whyAscsChooseSteer from '@/sanity/schemas/sections/whyAscsChooseSteer'
import intelligentAdaptiveLayer from '@/sanity/schemas/sections/intelligentAdaptiveLayer'
import surgeryTimeline from '@/sanity/schemas/sections/surgeryTimeline'
import howSteerNotesWorks from '@/sanity/schemas/sections/howSteerNotesWorks'
import implementation from '@/sanity/schemas/sections/implementation'
import whatIncluded from '@/sanity/schemas/sections/whatIncluded'
import clientLogosSlider from '@/sanity/schemas/sections/clientLogosSlider'

// Elevate Schemas and components
import elevateHome from '@/sanity/schemas/singletons/elevateHome'
import steernotes from '@/sanity/schemas/singletons/steernotes'
import steernotespricing from '@/sanity/schemas/singletons/steernotespricing'
import elevateTestimonials from '@/sanity/schemas/documents/elevateTestimonials'
import steerElevateHeroSection from '@/sanity/schemas/sections/steerElevateHeroSection'
import elevateCtaSection from '@/sanity/schemas/sections/elevateCtaSection'
import costOfDisconnectedSystems from '@/sanity/schemas/sections/costOfDisconnectedSystems'
import timeForFullWorkforce from '@/sanity/schemas/sections/timeForFullWorkforce'
import elevateProducts from '@/sanity/schemas/documents/elevateProducts'
import elevateSolutions from '@/sanity/schemas/documents/elevateSolutions'
import ehrIntegrationSection from '@/sanity/schemas/sections/ehrIntegrationSection'
import contentImageSection from '@/sanity/schemas/sections/contentImageSection'
import elevateStats from '@/sanity/schemas/sections/elevateStats'
import steerNotesStats from '@/sanity/schemas/sections/steerNotesStats'
import elevateTestimonialsSection from '@/sanity/schemas/sections/elevateTestimonialsSection'
import roiCalculator from '@/sanity/schemas/sections/roiCalculator'


const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE ||
  'Next.js Personal Website with Sanity.io'

export default defineConfig({
  basePath: studioUrl,
  projectId: projectId || '',
  dataset: dataset || '',
  title,
  schema: {
    
    // If you want more content types, you can add them to this array
    types: [
      // Singletons
      home,
      elevateHome,
      steernotes,
      steernotespricing,
      settings,
      p2p,
      // Documents
      
      
      
      //
      landingPages, 
      page,
      platformCategory,
      platforms,
      solutions,
      elevateSolutions,
      products,
      elevateProducts,
      elevateTestimonials,
      integrations,
      post,
      elevatePost,
      events,
      eventCategory,
      author,
      tags,
      blogCategory,
      faqs,
      faqCategory,
      testimonials,
      casestudies,
      teamMember,
      // Objects
      
      seo,
      button,
      heroSection,
      blockContent,
      whatIncluded,
      intelligentAdaptiveLayer,
      surgeryTimeline,
      howSteerNotesWorks,
      implementation,
      whyAscsChooseSteer,
      eventHeroSection,
      outcomesThatMatter,
      securityCompliance,
      divider,
      speaker,
      speakersSection,
      ctaSection,
      heroImageSection,
      heroVideoSection,
      solutionsheroImageSection,
      clientsSection,
      steerAdvantageSection,
      faqSection,
      testimonialsSection,
      acquireCapabilitiesBeingBeginning,
      automateCapabilitiesBeingBeginning,
      howSteerSolutionsHelps,
      navigateCapabilitiesBeingBeginning,
      solutionsForEverySystems,
      steerEffortlessIntegration,
      steerHealthBenefits,
      workWithYourEcoSystem,
      patientAcquisitionBenefits,
      moreThingsToExplore,
      steerHealthPartnershipOutcomes,
      seamlessIntakes,
      solutionsStats,
      solutionsSteamline,
      solutionsCtaSection,
      howSteerProductsHelps,
      beforeAndAfterSection,
      howSteerHelps,
      solutionsBeingAtBeginning,
      aboutHeroSection,
      companyTimelineSection,
      modernHealthCare,
      dataIntegrity,
      steerNotesWhoWeServe,
      steerNotesTestimonials,
      whatWeSolveSection,
      howWeSolveSection,
      leadershipSection,
      problemByNumbers,
      howSteerSolves,
      checkoutOurIntegrations,
      blogSection,
      legalPagesHeaderSection,
      contentSection,
      faqPageSection,
      blogPageSection,
      contactSection,
      securityFeatures,
      contentHighlightSection,
      howItWorks,
      whySteerOutperform,
      realImpactSection,
      homeHeroSection,
      homeSteerSolutionsSection,
      steerPowersFutureOfCare,
      steerPowersBenefits,
      clientLogos,
      homeStats,
      howSteerHelpscareProviders,
      ourTeamSection,
      workBuddiesSection,
      fmFeatures,
      whyChooseSteerHealth,
      fmStats,
      fmTestimonials,
      productDetailsSection,
      productHeroSection,
      whyEveryOneLoves,
      blogContent,
      blogImageSection,
      visionAndMission,
      ourValues,
      ourStory,
      joinUs,
      whyItMatters,
      whoWeServe,
      whatWeDo,
      workingAtSteer,
      ourHiringProcess,
      hospitalsHeroSection,
      steerNotesHeroSection,
      operationalResults,
      hospitalResults,
      customerStories,
      hospitalTestimonials,
      howWeCreateValue,
      eventPageSection,
      founderMessage,
      credibilityShowcase,
      p2pHdrLogosSection,
      clientLogosSlider,
      steerElevateHeroSection,
      elevateCtaSection,
      costOfDisconnectedSystems,
      timeForFullWorkforce,
      ehrIntegrationSection,
      contentImageSection,
      elevateStats,
      steerNotesStats,
      elevateTestimonialsSection,
      roiCalculator
    ]
  },
  plugins: [
    structureTool({
      structure: pageStructure([home, settings]),
    }),
    presentationTool({
      resolve,
      previewUrl: {
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    table({
      components: {
        input: TableInput,
      },
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([home.name, settings.name, 'steernotes', 'steernotespricing']),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    simplerColorInput({
      // Note: These are all optional
      defaultColorFormat: 'rgba',
      defaultColorList: [
        { label: 'Black', value: '#1d1718' },
        { label: 'White', value: '#ffffff' },
        { label: 'Blue Gradient Color', value: '#0030A6' },
        { label: 'Royal Blue', value: '#0030A6' },
        { label: 'Blue 600', value: '#2563EB' },
        { label: 'Sapphire', value: '#344EAD' },
        { label: 'Accent', value: '#626754' },
        { label: 'Custom...', value: 'custom' },
      ],
      enableSearch: true,
    }),
  ],
})
