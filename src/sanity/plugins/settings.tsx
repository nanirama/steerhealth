/**
 * This plugin contains all the logic for setting up the singletons
 */

import { type DocumentDefinition } from 'sanity'
import { type StructureResolver } from 'sanity/structure'
import { HomeIcon, DocumentTextIcon } from '@sanity/icons'
export const singletonPlugin = (types: string[]) => {
  return {
    name: 'singletonPlugin',
    document: {
      // Hide 'Singletons (such as Home)' from new document options
      // https://user-images.githubusercontent.com/81981/195728798-e0c6cf7e-d442-4e58-af3a-8cd99d7fcc28.png
      newDocumentOptions: (prev: any, context: any) => {
        const { creationContext } = context;
        if (creationContext.type === 'global') {
          return prev.filter(
            (templateItem:any) => !types.includes(templateItem.templateId),
          )
        }

        return prev
      },
      // Removes the "duplicate" action on the Singletons (such as Home)
      actions: (prev:any, context:any) => {
        const { schemaType } = context;
        if (types.includes(schemaType)) {
          return prev.filter(({ action }:{action:any}) => action !== 'duplicate')
        }

        return prev
      },
    },
  }
}

// The StructureResolver is how we're changing the DeskTool structure to linking to document (named Singleton)
// like how "Home" is handled.
export const pageStructure = (
  typeDefArray: DocumentDefinition[]
): StructureResolver => {
  return (S) => {
    const singletonItems = typeDefArray.map((typeDef) =>
      S.listItem()
        .title(typeDef.title!)
        .icon(typeDef.icon)
        .child(
          S.editor()
            .id(typeDef.name)
            .schemaType(typeDef.name)
            .documentId(typeDef.name),
        )
    )
    const singletonWithDividers: any[] = []
    singletonItems.forEach((item, idx) => {
      singletonWithDividers.push(item)
      if (idx < singletonItems.length - 1) {
        singletonWithDividers.push(S.divider())
      }
    })
    const steerElevateSection = S.listItem()
      .id('steer-elevate-section')
      .title('SteerElevate')
      .icon(HomeIcon)
      .child(
        S.list()
          .id('steer-elevate-list')
          .title('SteerElevate')
          .items([
            S.listItem()
              .id('elevate-home')
              .title('Home')
              .icon(HomeIcon)
              .child(
                S.editor()
                  .id('elevate-home-editor')
                  .schemaType('elevateHome')
                  .documentId('elevateHome'),
              ),
            S.documentTypeListItem('elevateSolutions')
              .id('elevate-solutions')
              .title('Who we serve')
              .icon(DocumentTextIcon),
            S.documentTypeListItem('elevateProducts')
              .id('elevate-products')
              .title('Products')
              .icon(DocumentTextIcon),
            S.documentTypeListItem('elevatePost')
              .id('elevate-post')
              .title('Blog Posts')
              .icon(DocumentTextIcon),
          ]),
      )

    const steerNotesSection = S.listItem()
      .id('steer-notes-section')
      .title('SteerNotes')
      .icon(HomeIcon)
      .child(
        S.list()
          .id('steer-notes-list')
          .title('SteerNotes')
          .items([
            S.listItem()
              .id('steernotes-landings')
              .title('Landing Page')
              .icon(HomeIcon)
              .child(
                S.editor()
                  .id('steernotes-editor')
                  .schemaType('steernotes')
                  .documentId('steernotes'),
              ),
            S.listItem()
              .id('steernotespricing-pricing')
              .title('Pricing Page')
              .icon(HomeIcon)
              .child(
                S.editor()
                  .id('steernotespricing-editor')
                  .schemaType('steernotespricing')
                  .documentId('steernotespricing'),
              ),
          ]),
      )

    return S.list()
      .title('Content')
      .items([
        ...singletonWithDividers,
        steerElevateSection,
        steerNotesSection,
        S.divider(),
        S.documentTypeListItem('landingPages').title('Landing Pages'),
        S.divider(),
        S.documentTypeListItem('page').title('Pages'),
        S.divider(),
        S.documentTypeListItem('platforms').title('Platforms'),
        S.divider(),
        S.documentTypeListItem('solutions').title('Who we serve'),
        S.divider(),
        S.documentTypeListItem('products').title('Products'),
        S.divider(),
        S.documentTypeListItem('integrations').title('Integrations'),
        S.divider(),
        S.documentTypeListItem('casestudies').title('Casestudies'),
        S.divider(),
        S.documentTypeListItem('teamMember').title('Team Members'),
        S.divider(),
        S.documentTypeListItem('faqs').title('FAQs'),
        S.divider(),
        S.documentTypeListItem('testimonials').title('Testimonials'),
        S.divider(),
        S.documentTypeListItem('post').title('Blog Posts'),
        S.divider(),
        S.documentTypeListItem('blogCategory').title('Blog Categories'),
        S.divider(),
        S.documentTypeListItem('events').title('Events'),
        S.divider(),
        S.documentTypeListItem('eventCategory').title('Event Categories'),
        S.divider(),
       
      ])
  }
}