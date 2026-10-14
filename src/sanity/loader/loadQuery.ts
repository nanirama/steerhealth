import 'server-only'

import * as queryStore from '@sanity/react-loader'
import { draftMode } from 'next/headers'

import { client } from '@/sanity/lib/client'
import {
  platformsBySlugQuery,
  solutionssBySlugQuery,
  productsBySlugQuery,
  pagesBySlugQuery,
  integrationsBySlugQuery,
  postBySlugQuery,
  elevatePostBySlugQuery,
  allElevatePostsQuery,
  casestudiesQuery,
  homePageQuery,
  latestPostQuery,
  allProductsQuery,
  allCategoriesQuery,
  categoryWithPostsQuery,
  allSolutionsQuery,
  allCasestudiesQuery,
  eventBySlugQuery,
  p2pPageQuery,
  p2pContactpagesQuery,
  landingPagesQuery,
  settingsQuery,
  elevateHomePageQuery,
  elevateSolutionsBySlugQuery,
  elevateProductsBySlugQuery,
  steernotesPageQuery,
  steernotespricingPageQuery,
} from '@/sanity/lib/queries'
import { token } from '@/sanity/lib/token'
import {
  PagePayload,
  LatestPostsPayload,
  HomePagePayload
} from '@/types'

const serverClient = client.withConfig({
  token,
  // Enable stega if it's a Vercel preview deployment, as the Vercel Toolbar has controls that shows overlays
  stega: process.env.VERCEL_ENV === 'preview',
})

/**
 * Sets the server client for the query store, doing it here ensures that all data fetching in production
 * happens on the server and not on the client.
 * Live mode in `sanity/presentation` still works, as it uses the `useLiveMode` hook to update `useQuery` instances with
 * live draft content using `postMessage`.
 */
queryStore.setServerClient(serverClient)

const usingCdn = serverClient.config().useCdn
// Automatically handle draft mode
export const loadQuery = (async (query, params = {}, options = {}) => {
  const {
    perspective = (await draftMode()).isEnabled ? 'previewDrafts' : 'published',
  } = options
  // Optimize caching for faster response times
  let revalidate: NextFetchRequestConfig['revalidate'] = 60 // Default to 60s cache
  // If `next.tags` is set, and we're not using the CDN, then it's safe to cache indefinitely
  if (!usingCdn && Array.isArray(options.next?.tags)) {
    revalidate = 3600 // Cache for 1 hour for better performance
  } else if (usingCdn) {
    revalidate = 60 // Cache for 60 seconds with CDN
  }
  return queryStore.loadQuery(query, params, {
    ...options,
    next: {
      revalidate,
      ...(options.next || {}),
    },
    perspective,
    // Enable stega if in Draft Mode, to enable overlays when outside Sanity Studio
    stega: (await draftMode()).isEnabled,
  })
}) satisfies typeof queryStore.loadQuery

/**
 * Loaders that are used in more than one place are declared here, otherwise they're colocated with the component
 */
export function loadLatestPosts(limit:number) {
  return loadQuery<LatestPostsPayload | null>(
    latestPostQuery,
    {limit},
    { next: { tags: ['post'] } },
  )
}

export function loadAllProducts() {
  return loadQuery<LatestPostsPayload | null>(
    allProductsQuery,
    {},
    { next: { tags: ['products'] } },
  )
}

export function loadAllCategories() {
  return loadQuery<LatestPostsPayload | null>(
    allCategoriesQuery,
    {},
    { next: { tags: ['category'] } },
  )
}
export function loadAllSolutions() {
  return loadQuery<LatestPostsPayload | null>(
    allSolutionsQuery,
    {},
    { next: { tags: ['category'] } },
  )
}

export function loadAllCaseStudies() {
  return loadQuery<LatestPostsPayload | null>(
    allCasestudiesQuery,
    {},
    { next: { tags: ['casestudies'] } },
  )
}



export function loadHomePage() {
  return loadQuery<HomePagePayload | null>(
    homePageQuery,
    {},
    { next: { tags: ['home'] } },
  )
}
export function loadP2PPage() {
  return loadQuery<HomePagePayload | null>(
    p2pPageQuery,
    {},
    { next: { tags: ['p2p'] } },
  )
}
export function loadP2PContactPage() {
  return loadQuery<HomePagePayload | null>(
    p2pContactpagesQuery,
    {},
    { next: { tags: ['p2p Contact'] } },
  )
}


export function loadPlatformPageBySlug(slug:string, category:string) {
  return loadQuery<PagePayload | null>(
    platformsBySlugQuery,
    { slug, category },
    { next: { tags: [`platform:${slug}`] } },
  )
}

export function loadSolutionsPageBySlug(slug:string) {
  return loadQuery<PagePayload | null>(
    solutionssBySlugQuery,
    { slug },
    { next: { tags: [`solution:${slug}`] } },
  )
}

export function loadLandingPageBySlug(slug:string) {
  return loadQuery<PagePayload | null>(
    landingPagesQuery,
    { slug },
    { next: { tags: [`landingpage:${slug}`] } },
  )
}

export function loadProductsPageBySlug(slug:string) {
  return loadQuery<PagePayload | null>(
    productsBySlugQuery,
    { slug },
    { next: { tags: [`product:${slug}`] } },
  )
}

export function loadBlogCategoryBySlug(slug:string) {
  return loadQuery<PagePayload | null>(
    categoryWithPostsQuery,
    { slug },
    { next: { tags: [`category:${slug}`] } },
  )
}

export function loadEventCategoryBySlug(slug:string) {
  return loadQuery<PagePayload | null>(
    categoryWithPostsQuery,
    { slug },
    { next: { tags: [`category:${slug}`] } },
  )
}

export function loadPageBySlug(slug:string) {
  return loadQuery<PagePayload | null>(
    pagesBySlugQuery,
    { slug },
    { next: { tags: [`page:${slug}`] } },
  )
}

export function loadPost(slug:string) {
  return loadQuery<PagePayload | null>(
    postBySlugQuery,
    { slug },
    { next: { tags: [`post:${slug}`] } },
  )
}

export function loadElevatePost(slug:string) {
  return loadQuery<PagePayload | null>(
    elevatePostBySlugQuery,
    { slug },
    { next: { tags: [`elevatePost:${slug}`] } },
  )
}

export function loadAllElevatePosts() {
  return loadQuery<LatestPostsPayload[] | null>(
    allElevatePostsQuery,
    {},
    { next: { tags: ['elevatePost'] } },
  )
}

export function loadEvent(slug:string) {
  return loadQuery<PagePayload | null>(
    eventBySlugQuery,
    { slug },
    { next: { tags: [`event:${slug}`] } },
  )
}


export function loadIntegrationsPageBySlug(slug:string) {
  return loadQuery<PagePayload | null>(
    integrationsBySlugQuery,
    { slug },
    { next: { tags: [`integration:${slug}`] } },
  )
}

export function loadCasestudiesPageBySlug(slug:string) {
  return loadQuery<PagePayload | null>(
    casestudiesQuery,
    { slug },
    { next: { tags: [`casestudies:${slug}`] } },
  )
}

export async function getAllPagesSlugs() {
  return client.fetch(`*[_type == "page" && defined(slug.current)].slug.current`)
}

export async function getAllLandingPagesSlugs() {
  return client.fetch(`*[_type == "landingPages" && defined(slug.current)].slug.current`)
}

export async function getAllPostSlugs() {
  return client.fetch(`*[_type == "post" && defined(slug.current)].slug.current`)
}

export async function getAllElevatePostSlugs() {
  return client.fetch(`*[_type == "elevatePost" && !(_id in path("drafts.**")) && defined(slug.current)].slug.current`)
}

export async function getAllBlogCategorySlugs() {
  return client.fetch(`*[_type == "blogCategory" && defined(slug.current)].slug.current`)
}

export async function getAllPltformsSlugs() {
  return client.fetch(`*[_type == "platforms" && defined(slug.current)].slug.current`)
}

export function loadSettings() {
  return loadQuery(
    settingsQuery,
    {},
    { next: { tags: ['settings'] } },
  )
}

export function loadElevateHomePage() {
  return loadQuery<HomePagePayload | null>(
    elevateHomePageQuery,
    {},
    { next: { tags: ['elevateHome'] } },
  )
}

export function loadSteernotesPage() {
  return loadQuery<HomePagePayload | null>(
    steernotesPageQuery,
    {},
    { next: { tags: ['steernotes'] } },
  )
}

export function loadSteernotespricingPage() {
  return loadQuery<HomePagePayload | null>(
    steernotespricingPageQuery,
    {},
    { next: { tags: ['steernotespricing'] } },
  )
}

export function loadElevateSolutionsPageBySlug(slug:string) {
  return loadQuery<PagePayload | null>(
    elevateSolutionsBySlugQuery,
    { slug },
    { next: { tags: [`elevateSolution:${slug}`] } },
  )
}

export function loadElevateProductsPageBySlug(slug:string) {
  return loadQuery<PagePayload | null>(
    elevateProductsBySlugQuery,
    { slug },
    { next: { tags: [`elevateProduct:${slug}`] } },
  )
}