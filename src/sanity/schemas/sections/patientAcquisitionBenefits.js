import { imagesOptions } from '../data/utils';
// schemas/objects/steerAdvantageSection.js
export default {
    name: 'patientAcquisitionBenefits',
    title: 'Patient Acquisition Benefits Section',
    type: 'object',
    fields: [
        {
            name: 'heading',
            type: 'string',
            title: 'Main Heading',
        },
        {
            name: 'subHeading',
            type: 'string',
            title: 'Sub Heading',
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
            name: 'imageUrl',
            title: 'Image URL',
            type: 'string',
            options: {
                list: imagesOptions,
            }
        },
        {
            name: 'imageUrlMobile',
            title: 'Mobile Image URL',
            type: 'string',
            options: {
                list: imagesOptions,
            }
        }
    ],
};
