import classnames from 'classnames';
import icon from './icon';
/**
 * * Internal block libraries
 */
const { __ } = wp.i18n;
const {   registerBlockType } = wp.blocks;
const {
    InnerBlocks,
} = wp.blockEditor;

/**
 * Register block
 */
export default registerBlockType(
    'holviblocks/press-logo-item',
    {
        title: __( 'Press logo item', 'holviblocks' ),
        description: __( 'Create press module in vertical axis.', 'holviblocks' ),
        category: 'holvi-blocks',
        icon,
        parent: [ 'holviblocks/press-logos' ],
        keywords: [
            __( 'Logos', 'holviblocks' ),
            __( 'Press', 'holviblocks' ),
            __( 'Vertical', 'holviblocks' ),
        ],
        attributes: {
            backgroundColor: {
                type: "string",
            },
            imageUrl: {
                type: 'string',
            },
        },
        edit:  props => {
            const {
                className,
            } = props.attributes;

            const setTemplate = [
                [ 'core/image', { className : 'press-logo-img' } ],

            ];

            return ([

                <div className={ classnames(
                    className, 'col-6 col-md-3'
                ) } >
                    <InnerBlocks
                        template={setTemplate}
                        templateLock="all"
                    />
                </div>
            ]);
        },
        save: props => {
            const {  className } = props.attributes;
            return (
                <div className={ classnames(
                    className, 'col-6 col-md-3'
                ) }>
                    <InnerBlocks.Content/>
                </div>
            );
        },
    },
);
