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

const{
} = wp.element;

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

class press extends Component {
    constructor() {
        super(...arguments);
    }

    render() {
        const {
            attributes,
            setAttributes,
            setBackgroundColor,
            backgroundColor,
            isSelected
        } = this.props;
        const {
            id,
        } = attributes;
        const {
            className } = attributes;
        const ALLOWED_BLOCKS = [ 'holviblocks/press-logo-item' ];
        const setTemplate = [
            [ 'holviblocks/press-logo-item' ],
            [ 'holviblocks/press-logo-item' ],
            [ 'holviblocks/press-logo-item' ],
            [ 'holviblocks/press-logo-item' ],

        ];
        return ([
            <InspectorControls>
                <PanelBody title={ __( 'Section ID ' ) }>
                    <TextControl
                        label={ __( '#id' ) }
                        value={ id || '' }
                        onChange={id => setAttributes({ id })}
                    />
                </PanelBody>
                <PanelBody title={ __( "Column Settings" ) } initialOpen={ false }>
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
                    attributes.backgroundColor ? `bg-${backgroundColor.slug}` : '' ,
                    'press-section-padding position-relative',
                ) }>
                <div className='container'>
                    <div className='logos-horizontal align-items-center'>
                        <InnerBlocks
                            template={ setTemplate }
                            allowedBlocks={ ALLOWED_BLOCKS }
                            templateLock="all"/>
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
    'holviblocks/press-logos',
    {
        title: __( 'Press logos', 'holviblocks' ),
        description: __( 'Create press modules', 'holviblocks' ),
        category: 'holvi-section',
        icon,
        supports: {
            align: [ 'full' ],
        },
        keywords: [
            __( 'press', 'holviblocks' ),
            __( 'newspapaper', 'holviblocks' ),
            __( 'logos', 'holviblocks' ),
        ],
        attributes: {
            align: {
                type: "string",
                default: "full"
            },
            backgroundColor: {
                type: "string",
            },
            color: {
                type: "string",
            },
            id: {
                type: "string",
            }
        },

        edit: compose([
            withColors( { backgroundColor: 'backgroundColor'} ),
            FallbackStyles,
        ])( press ),

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
                        'press-section-padding position-relative',
                    ) }
                >
                    <div className='container'>
                        <div className={ classnames( "row align-items-center" ) }>
                            <InnerBlocks.Content/>
                        </div>
                    </div>
                </section>

            );
        },
    },
);
