const {
    registerBlockType,
} = wp.blocks;

const { __ } = wp.i18n;

const {
    InnerBlocks,
    RichText,
    MediaUpload
} = wp.blockEditor;

const { Dashicon, PanelBody, Button, } = wp.components;

import classnames from "classnames";

registerBlockType('holviblocks/gated-content', {
    title: 'Gated wrapper',
    icon: 'unlock',
    description: 'Add content that will be gated and will be revealed only when the customer adds an email',
    category: 'holvi-section',
    supports: {
        align: [ 'full' ],
    },
    attributes: {
        align: {
            type: "string",
            default: "full"
        },
    },

    edit(props) {
        const { className } = props;

        const ALLOWED_BLOCKS = [ 'holviblocks/columns-1', 'holviblocks/columns-2','holviblocks/columns-3','holviblocks/columns-4','holviblocks/columns-3-plus-1', 'holviblocks/accordion','holviblocks/card-deck',
            'holviblocks/image-text','holviblocks/pricing-list','holviblocks/pricing-list-features','holviblocks/promo-bar','holviblocks/press-logos','holviblocks/press-quote-deck','holviblocks/newspaper-quote',];
        return [
            <div  className={ 'gated-content-block' } >
                <InnerBlocks
                    allowedBlocks={ ALLOWED_BLOCKS } />
            </div>
        ];
    },


    save(props) {
        const {  attributes } = props;
        const { className, } = props;


        return (
            <div id='hidden-content' className={ classnames( className, "gated-content" ) } >
                <InnerBlocks.Content/>
            </div>
        );
    },
});