import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

import { dataset, projectId } from './api'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: Image | undefined) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined
  }

  return imageBuilder?.image(source).auto('format').fit('max')
}

export function urlForOpenGraphImage(image: Image | undefined) {
  return urlForImage(image)?.width(1200).height(627).fit('crop').url()
}

export function resolveHref(
  documentType?: string,
  slug?: string,
): string | undefined {
  switch (documentType) {
    case 'home':
      return '/'
    case 'page':
      return slug ? `/${slug}` : undefined
    case 'services':
      return slug ? `/service/${slug}` : undefined
    case 'treatments':
      return slug ? `/treatment/${slug}` : undefined
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}


export function slugify(text:string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove non-word characters
    .replace(/\-\-+/g, "-"); // Remove multiple dashes
}

export function getSlugUrl(type:string, slug: string, categorySlug?: string) {
  let slugPath = '/'

  if (type === "platforms"){
    if(slug==='overview'){
      slugPath = `/${categorySlug}`
    }
    else{
      slugPath = `/${categorySlug}/${slug}`
    }    
  }
  if (type === "page") slugPath = `/${slug}`
  if (type === "solutions") slugPath = `/who-we-serve/${slug}`
  return slugPath;
}