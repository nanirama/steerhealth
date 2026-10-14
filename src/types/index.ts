import type { PortableTextBlock } from 'next-sanity'
import type { Image } from 'sanity'



export type SectionId = 'pre-visit' | 'visit' | 'post-visit';

export interface Question {
  id: string;
  section: SectionId;
  text: string;
  weight: number;
  reverseScore?: boolean; // If true, "No" is the better answer (e.g. for "Do you do manual entry?")
  priority: number; // 1 = Highest priority for the "One Big Thing" fix (Waterfall logic)
  failureInsight: string; // The specific "Why" text if they get this wrong
  fixText: string; // The specific "Action" text if this is their highest priority bottleneck
}

export interface AssessmentAnswers {
  [key: string]: boolean;
}

export interface Diagnosis {
  status: string; // e.g. "Critical Leakage"
  headline: string; // e.g. "Your clinic is actively repelling revenue."
  description: string; // Detailed diagnosis text
  color: string; // Hex code for UI
}

export enum AppState {
  LANDING = 'LANDING',
  QUIZ = 'QUIZ',
  RESULTS = 'RESULTS'
}


export interface MenuItem {
  _type: string
  slug?: string
  title?: string
}

export interface MilestoneItem {
  description?: string
  duration?: {
    start?: string
    end?: string
  }
  image?: Image
  tags?: string[]
  title?: string
}

export interface ShowcaseProject {
  _type: string
  coverImage?: Image
  overview?: PortableTextBlock[]
  slug?: string
  tags?: string[]
  title?: string
}

export interface LatestPostsPayload {
  _type: string
  coverImage?: Image
  slug?: string
  title?: string
}

export interface TestimonialsPayload {
  _type: string
  title?: string
  clientname?: string
  testimonial?: string
}
export interface FaqPayload {
  _type: string
  question?: string
  category?: string
  answer?: any
  icon?: Image
}

// Page payloads

export interface HomePagePayload {
  footer?: PortableTextBlock[]
  overview?: PortableTextBlock[]
  showcaseProjects?: ShowcaseProject[]
  title?: string
  seo?:any
}

export interface PagePayload {
  body?: PortableTextBlock[]
  name?: string
  overview?: PortableTextBlock[]
  title?: string
  slug?: string
  parent?: string
  seo?:any
  expert?: string
  mainImage?:any
  imageWidth?:any
  imageHeight?:any
  publishedAt?:any
  authorData?:any
  image1?:any
  image2?:any
  image3?:any
  image1Width?:any
  image1Height?:any
  image2Width?:any
  image2Height?:any
  image3Width?:any
  image3Height?:any
}
export interface ServicePayload {
  title?: string
  slug?: string
  seo?:any
}

export interface ProductPayload {
  title?: string
  slug?: string
  image?: Image
  imageWidth?: number
  imageHeight?: number
  seo?:any
  howitworks?: any
}
export interface ProductCategoriesPayload {
  title?: string
  slug?: string
  description?:string
  image?: Image
  imageWidth?: number
  imageHeight?: number
  seo?:any
  banner?: any
}

export interface ProjectPayload {
  client?: string
  coverImage?: Image
  description?: PortableTextBlock[]
  duration?: {
    start?: string
    end?: string
  }
  overview?: PortableTextBlock[]
  site?: string
  slug: string
  tags?: string[]
  title?: string
}

export interface SettingsPayload {
  footer?: PortableTextBlock[]
  menuItems?: MenuItem[]
  ogImage?: Image
}
