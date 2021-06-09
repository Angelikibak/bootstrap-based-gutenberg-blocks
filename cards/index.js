
import classnames from 'classnames';
import icon from './icon';
/**
 * * Internal block libraries
 */
const { __ } = wp.i18n;
const {   registerBlockType } = wp.blocks;
const {
    InnerBlocks,
    InspectorControls,
    PanelColorSettings,
    withColors,
    RichText,
    MediaUpload
} = wp.blockEditor;
const {
    PanelBody,
    withNotices,
    PanelRow,
    withFallbackStyles,
    ToggleControl,
    Button,
} = wp.components;
const {
    Component,
} = wp.element;

const {
    compose
} = wp.compose;



const {getComputedStyle} = window;

const FallbackStyles = withFallbackStyles((node, ownProps) => {
    const {backgroundColor } = ownProps.attributes;
    const editableNode = node.querySelector('[contenteditable="true"]');
    //verify if editableNode is available, before using getComputedStyle.
    const computedStyles = editableNode ? getComputedStyle(editableNode) : null;
    return {
        fallbackTextColor: backgroundColor || !computedStyles ? undefined : computedStyles.color,
    };
});
class CardsColor extends Component {
    constructor() {
        super(...arguments);
    }

    render() {
        const {
            attributes,
            setAttributes,
            setBackgroundColor,
            backgroundColor,
        } = this.props;
        const {
            showButton,
            className } = attributes;
        const ALLOWED_BLOCKS = ['holviblocks/button', { className : 'card-footer' } ];
        const setTemplate = [
            [ 'core/image', { className : 'card-img-top' } ],
            [ 'holviblocks/heading', { className : 'card-header', level : 3 , fontSize: 'h4'} ],
            [ 'holviblocks/paragraph', { className : 'card-body' } ],
            [ 'holviblocks/button', { className : 'card-footer' } ],
        ];

        return ([
            <InspectorControls>
                <PanelBody title={ __( 'Card background color ' ) }>
                    <PanelColorSettings
                        title={__("Color Settings", "holviblocks")}
                        colorSettings={[
                            {
                                label: __("Background Color", "holviblocks"),
                                onChange: setBackgroundColor,
                                value: backgroundColor.color ,
                                disableCustomColors: true,
                            }
                        ]}
                    />
                    <PanelRow>
                        <strong>Remove button</strong>
                        <ToggleControl
                            checked={showButton}
                            onChange={showButton => setAttributes({ showButton })}
                        />
                    </PanelRow>
                </PanelBody>
            </InspectorControls>,
            <div className={ classnames(
                className,
                'card',
                attributes.backgroundColor ? `bg-${backgroundColor.slug}` : '' ,
            ) } >
                <InnerBlocks
                    template={setTemplate}
                    allowedBlocks={ ALLOWED_BLOCKS }
                    templateLock="all"
                />
            </div>
        ]);
    }
}
/**
 * Register block
 */
export default registerBlockType(
    'holviblocks/cards',
    {
        title: __( 'Cards', 'holviblocks' ),
        description: __( 'Create a card module.', 'holviblocks' ),
        category: 'holvi-blocks',
        icon,
        keywords: [
            __( 'Single Card', 'holviblocks' ),
            __( 'Cards', 'holviblocks' ),
            __( 'Card', 'holviblocks' ),
        ],
        attributes: {

            showButton: {
                type: "boolean",
                default: false
            },
            backgroundColor: {
                type: "string",
            },
            imageUrl: {
                type: 'string',
            },
        },
        edit: compose([
            withColors( { backgroundColor: 'backgroundColor'} ),
            FallbackStyles,
        ])( CardsColor ),
        save: props => {
            const { backgroundColor , className } = props.attributes;
            return (
                <div className={ classnames(
                    className,
                    backgroundColor ? ` bg-${backgroundColor}` : '' ,
                    'card',
                ) }>
                    <InnerBlocks.Content/>
                </div>
            );
        },
    },
);
