
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
    'holviblocks/press-quote-item',
    {
        title: __( 'Press quote item', 'holviblocks' ),
        description: __( 'Create press module in vertical axis.', 'holviblocks' ),
        category: 'holvi-blocks',
        icon,
        parent: [ 'holviblocks/press-quote-deck' ],
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
                [ 'core/image', { className : 'press-quote-img' } ],
                [ 'holviblocks/paragraph', { className : 'press-quote-body', placeholder: 'Add quote copy here'} ],

            ];

            return ([

                <div className={ classnames(
                    className, 'col-12 col-md-4'
                ) } >
                    <InnerBlocks
                        template={setTemplate}
                        templateLock="all"
                    />
                </div>
            ]);
        },
        save: props => {
            const { backgroundColor , className } = props.attributes;
            return (
                <div className={ classnames(
                    className, 'col-12 col-md-4'
                ) }>
                    <InnerBlocks.Content/>
                </div>
            );
        },
    },
);
