# Knowledge Base Export Report

- **Source:** Sanity project `70tsvcgi`, dataset `development`, perspective `published` (drafts excluded)
- **Generated:** 2026-10-14T02:45:10.031Z
- **Script:** `scripts/export-knowledge-base.mts` (`npm run export:kb`)
- **Result:** 109 Markdown files from 109 eligible published documents (0 skipped as empty, 0 failed)

## Documents by type

| Sanity type | Directory | Published in dataset | Exported | Skipped/failed |
| --- | --- | ---: | ---: | ---: |
| `page` | `pages/` | 16 | 16 | 0 |
| `solutions` | `solutions/` | 4 | 4 | 0 |
| `products` | `products/` | 6 | 6 | 0 |
| `faqs` | `faqs/` | 83 | 83 | 0 |

## Types not exported as files

| Sanity type | Published docs | Reason |
| --- | ---: | --- |
| `home` | 1 | Out of scope (export limited to pages, solutions, products, FAQs) |
| `p2p` | 1 | Out of scope (export limited to pages, solutions, products, FAQs) |
| `steernotes` | 1 | Out of scope (export limited to pages, solutions, products, FAQs) |
| `steernotespricing` | 0 | Out of scope (export limited to pages, solutions, products, FAQs) |
| `elevateHome` | 1 | Out of scope (export limited to pages, solutions, products, FAQs) |
| `landingPages` | 6 | Out of scope (export limited to pages, solutions, products, FAQs) |
| `platforms` | 9 | Out of scope (export limited to pages, solutions, products, FAQs) |
| `elevateSolutions` | 7 | Out of scope (export limited to pages, solutions, products, FAQs) |
| `elevateProducts` | 5 | Out of scope (export limited to pages, solutions, products, FAQs) |
| `integrations` | 8 | Out of scope (export limited to pages, solutions, products, FAQs) |
| `casestudies` | 4 | Out of scope (export limited to pages, solutions, products, FAQs) |
| `post` | 21 | Out of scope (export limited to pages, solutions, products, FAQs) |
| `elevatePost` | 1 | Out of scope (export limited to pages, solutions, products, FAQs) |
| `events` | 16 | Out of scope (export limited to pages, solutions, products, FAQs) |
| `testimonials` | 10 | Out of scope (export limited to pages, solutions, products, FAQs) |
| `elevateTestimonials` | 3 | Out of scope (export limited to pages, solutions, products, FAQs) |
| `teamMember` | 27 | Out of scope (export limited to pages, solutions, products, FAQs) |
| `author` | 5 | Out of scope (export limited to pages, solutions, products, FAQs) |
| `settings` | 1 | Site configuration (top banner toggle/link), not knowledge content |
| `faqCategory` | 4 | Taxonomy; used as `categories` metadata on FAQs |
| `blogCategory` | 7 | Taxonomy (blog) |
| `eventCategory` | 3 | Taxonomy (events) |
| `platformCategory` | 3 | Taxonomy (platform pages) |
| `tags` | 3 | Taxonomy (blog) |
| `solutionPage` | 9 | Legacy type: present in dataset but not in the Studio schema or any website route |
| `solutionCategory` | 3 | Legacy type: present in dataset but not in the Studio schema or any website route |
| `solutionParent` | 1 | Legacy type: present in dataset but not in the Studio schema or any website route |
| `a4mlandingpage` | 1 | Legacy type: present in dataset but not in the Studio schema or any website route |

## Skipped / failed documents

None.

## Validation

- Every eligible type's fetched count matches an independent `count()` query: yes
- Duplicate filenames: 9 slug collision(s) resolved with an ID suffix — faqs/can-we-personalize-journeys-by-cohort.md (2 docs: 1bfb7889-9814-46ef-b7f7-64a186b1e714, 517111c7-7947-4a8c-88ca-57c6bfe9719e); faqs/can-it-manage-lab-workflows-remotely.md (2 docs: 1eaec963-6ebf-4f5b-8802-844af45f99be, b1c3b1cc-0d4f-4311-99c4-9549750bd7fd); faqs/does-it-support-multi-channel-communication.md (2 docs: 27501c80-3e2d-4a77-bf74-66c04610114b, b13f1c72-4780-4ac8-8d99-05e33729b0aa); faqs/can-it-support-ongoing-biomarker-cycles.md (2 docs: 392fc7ef-c5bf-43d1-b04e-217011b0cf85, a84fb8f7-d562-456c-bce5-8b2116dfa725); faqs/what-improves-revenue-in-telehealth.md (3 docs: 509c8144-41b4-4e58-946d-5c87f7635c9d, 62a10e1a-e719-407a-8eb4-aec81d67f793, bc9bb738-9fac-46ee-8a1d-c365604cd3c3); faqs/will-it-integrate-with-our-current-stack.md (2 docs: 81de67d7-96a3-45f2-9f19-05881435df06, d0617337-db57-4a08-8bb4-40881cf2da8c); faqs/how-do-you-prevent-patients-from-dropping-off.md (2 docs: 8d3ac62e-6771-4938-8f50-3c43486c33d9, afdfee57-2b19-4bca-84ce-74adc858d248); faqs/is-this-built-for-long-term-programs.md (2 docs: 98d387a7-9b52-4f08-a971-89f3fc8ba140, 9b2a3e19-382e-44cb-be4e-e1e84c3343bb); faqs/do-i-need-to-switch-my-ehr.md (2 docs: a7e6275d-bd8e-4325-94d4-2ba6dcb76dde, f2362f0b-bcb0-4276-b38f-3499499545bf)
- Documents without a slug (filename derived from title): none (FAQs, testimonials and team members have no slug field by design)
- Image/media assets or URLs in output: none
- Broken references (target missing or unpublished): none
- Very short files (< 15 words of body text; verify these are genuinely short in Sanity): faqs/can-it-support-ongoing-biomarker-cycles-392fc7ef.md, faqs/can-it-support-ongoing-biomarker-cycles-a84fb8f7.md, pages/events.md
- Stale files removed from previous run: none

## Fields without exportable text

Fields encountered that produced no text (counts across all documents). These are reported rather than silently dropped; most are empty objects or sections with only media.

- no text in field "images" (array): 1

## Excluded by design

- Images, files, video URLs, image filenames, logos, alt text, colors and layout options.
- Buttons/CTA link targets, HubSpot form IDs, SEO share images, JSON-LD schema blobs, display order numbers.
- Sections that render only logos or an interactive calculator: `clientLogos`, `clientLogosSlider`, `p2pHdrLogosSection`, `roiCalculator`, `testimonialsSection`, `fmTestimonials`, `elevateTestimonialsSection`, `hospitalTestimonials`, `steerNotesTestimonials`.
- FAQs referenced from pages, solutions and products are listed as linked questions rather than duplicated; each answer lives once in `faqs/`.
- Testimonial references are omitted (testimonials are out of scope). Team members and blog posts referenced from pages appear by name/title only.

## Open issues

None detected.
