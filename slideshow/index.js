/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;


import edit from './edit';
import save from './save';


registerBlockType( 'holviblocks/slideshow', {
    title: 'Slideshow',
    description: __( 'Create a slideshow gallery', 'holviblocks' ),
    icon: 'format-gallery',
    category: 'holvi-blocks',
    keywords: [ __( 'Carousel' ), __( 'Image' ), __( 'Layout' ) ],
    supports: {
        html: false,
        align: [ 'full' ],
    },
    attributes: {
        images: {
            type: 'array',
            default: [],
        },
        image: {
            type: 'string',
        },
    },

    edit,
    save
} );