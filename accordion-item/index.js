import classnames from 'classnames';
import edit from "../accordion-item/edit";
import save from "../accordion-item/save";
/**
 * * Internal block libraries
 */
const { __ } = wp.i18n;
const {   registerBlockType } = wp.blocks;
const {
    InnerBlocks,
    RichText
} = wp.blockEditor;
/**
 * Register block
 */
export default registerBlockType(
    'holviblocks/accordion-item',
    {
        title: __( 'Accordion item', 'holviblocks' ),
        description: __( 'Create an accordion module.', 'holviblocks' ),
        category: 'holvi-blocks',
        icon: 'minus',
        keywords: [
            __( 'Accordion', 'holviblocks' ),
            __( 'Toggle', 'holviblocks' ),
            __( 'FAQ', 'holviblocks' ),
        ],
        parent: [ 'holviblocks/accordion' ],
        supports: {
            align: [ 'wide' ],
        },
        attributes: {
            align: {
                type: "string",
                default: "wide"
            },
            columnWidth: {
                type: "string",
                default: "col-8"
            },
            id:{
                type: 'string',
            },
            accTitle: {
                type: 'string',
            },
            accBody: {
                type: 'string',
            },
            instanceId: {
                type: 'string',
            },
            ariaExpanded: {
                type: 'boolean',
                default: false,
            },
            collapsed: {
                type: 'string',
                default: 'collapsed',
            },
            collapseShow: {
                type: 'string',
                default: 'collapse',
            },
        },
        edit,
        save,
    },
);