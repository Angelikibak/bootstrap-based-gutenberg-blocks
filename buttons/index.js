import classnames from 'classnames';
import deprecated from './deprecated';
import edit from './edit';
import save from './save';
import icon from './icon';
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
    'holviblocks/button',
    {
        title: __( 'Button', 'holviblocks' ),
        description: __( 'Create a card module.', 'holviblocks' ),
        category: 'holvi-blocks',
        icon,
        keywords: [
            __( 'Button', 'holviblocks' ),
            __( 'Call to action', 'holviblocks' ),
            __( 'Links', 'holviblocks' ),
        ],
        attributes: {
            url: {
                type: 'string',
                source: 'attribute',
                selector: 'a',
                attribute: 'href'
            },
           title: {
                type: 'string',
                source: 'attribute',
                selector: 'a',
                attribute: 'title'
            },
            text: {
                type: 'string',
                source: 'html',
                selector: 'a'
            },
            linkTarget: {
                type: 'string',
                source: 'attribute',
                selector: 'a',
                attribute: 'target'
            },
            rel: {
                type: 'string',
                source: 'attribute',
                selector: 'a',
                attribute: 'rel'
            },
            placeholder: {
                type: 'string'
            },
            id:{
                type: 'string',
            },
            btnClass: {
                type: 'string',
                default: 'btn-dark btn',
            },
            btnClassWrapper: {
                type: 'string',
                default: '',
            },
            textAlign:{
                type: 'string',
                default: '',
            }
        },
        edit,
        save,
        deprecated,
    },
);
