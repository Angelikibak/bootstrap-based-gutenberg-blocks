
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
    TextControl
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

class pressquotedeck extends Component {
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
            id,
        } = attributes;
        const {
            className } = attributes;
        const ALLOWED_BLOCKS = [ 'holviblocks/press-quote-item' ];
        const setTemplate = [
            [ 'holviblocks/press-quote-item', { } ],
            [ 'holviblocks/press-quote-item', { } ],
            [ 'holviblocks/press-quote-item', { } ],
        ];


        return ([
            <InspectorControls>
                <PanelBody title={ __( "Column Settings" ) } initialOpen={ false }>
                    <TextControl
                        label={ __( '#id' ) }
                        value={ id || '' }
                        onChange={id => setAttributes({ id })}
                    />
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
                </PanelBody>
            </InspectorControls>,
            <section
                id={id ? `${id}` : ''}
                className={ classnames(
                    className,
                    'reduced-section-padding position-relative',
                    attributes.backgroundColor ? `bg-${backgroundColor.slug}` : '' ,
                ) }>
                <div className="container">
                    <div className="col-quotes-deck">
                        <InnerBlocks
                            template={ setTemplate }
                            allowedBlocks={ ALLOWED_BLOCKS }
                            templateLock="all"
                            />
                    </div>
                </div>
            </section>
        ]);
    }
}



/**
 * Register block
 */
export default registerBlockType(
    'holviblocks/press-quote-deck',
    {
        title: __( 'Press quote', 'holviblocks' ),
        description: __( 'Create a 3 column press quote deck layout', 'holviblocks' ),
        category: 'holvi-section',
        icon,
        supports: {
            align: [ 'full' ],
        },
        keywords: [
            __( 'quote', 'holviblocks' ),
            __( 'logo', 'holviblocks' ),
            __( 'deck', 'holviblocks' ),
        ],
        attributes: {
            align: {
                type: "string",
                default: "full"
            },
            backgroundColor: {
                type: "string",
            },
            id: {
                type: "string",
            },
        },

        edit: compose([
            withColors( { backgroundColor: 'backgroundColor'} ),
            FallbackStyles,
        ])( pressquotedeck ),

        save: ( { attributes } ) => {
            const {
                backgroundColor,
                id,
            } = attributes;

            const {
                className } = attributes;

            return (
                <section
                    id={id ? `${id}` : ''}
                    className={ classnames(
                        className,
                        backgroundColor ? ` bg-${backgroundColor}` : '' ,
                        'reduced-section-padding position-relative',
                    ) }
                >

                    <div className="container">
                        <div className="row"
                        >
                            <InnerBlocks.Content/>
                        </div>
                    </div>
                </section>

            );
        },
    },
);
