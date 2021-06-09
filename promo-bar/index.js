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
} = wp.blockEditor;

const {
    PanelBody,
    withFallbackStyles,
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

class promoBlock extends Component {
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
            className } = attributes;

        const MY_TEMPLATE = [
            [ 'holviblocks/paragraph', {} ],
        ];


        return ([
            <InspectorControls>
                <PanelBody title={ __( "Promo bar" ) } initialOpen={ false }>
                    <PanelColorSettings
                        title={__("Promo bar Settings", "holviblocks")}
                        colorSettings={[
                            {
                                label: __("Background Color", "holviblocks"),
                                onChange: setBackgroundColor,
                                value: backgroundColor.color ,
                                disableCustomColors: true,
                            }
                        ]}
                    />
                </PanelBody>
            </InspectorControls>,
            <div id ="promo-bar" className = { classnames(
                attributes.backgroundColor ? `bg-${backgroundColor.slug}` : '' ,
                "py-4" ) } >
                <div className="container" >
                    <InnerBlocks
                        template={ MY_TEMPLATE }
                        templateLock="all"
                    />
                </div>
            </div>

        ]);
    }
}



/**
 * Register block
 */
export default registerBlockType(
    'holviblocks/promo-bar',
    {
        title: 'Promo Bar',
        icon,
        description: 'Add a promo bar to your page',
        category: 'holvi-section',
        supports: {
            align: [ 'full' ],
        },
        attributes: {
            backgroundColor: {
                type: 'string'
            },
            align: {
                type: "string",
                default: "full"
            },

        },

        edit: compose([
            withColors( { backgroundColor: 'backgroundColor'} ),
            FallbackStyles,
        ])( promoBlock ),

        save: ( { attributes } ) => {
            const {
                backgroundColor,
            } = attributes;

            return (
                <div id ="promo-bar" className = { classnames(
                    backgroundColor ? ` bg-${backgroundColor}` : '' ,
                    "py-4" ) } >
                    <div className="container" >
                        <InnerBlocks.Content/>
                    </div>
                </div>

            );
        },
    },
);
