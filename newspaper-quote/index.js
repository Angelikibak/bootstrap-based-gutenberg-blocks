import icon from './icon';
import classnames from 'classnames';

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
    RichText
} = wp.blockEditor;

const {
    PanelBody,
    SelectControl,
    PanelRow,
    withFallbackStyles,
    TextControl
} = wp.components;

const {
    Component,
    Fragment,
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

class newspaperQuote extends Component {
    constructor() {
        super(...arguments);
    }

    render() {
        const {
            attributes,
            setAttributes,
            setBackgroundColor,
            backgroundColor,
            horizontalAlignment,
            verticalAlignment,
        } = this.props;
        const {
            id,
        } = attributes;
        const {
            className } = attributes;
        const setTemplate = [
            [ 'core/image', {} ],
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
                    <PanelRow>
                        <strong>Horizontal Alignment</strong>
                        <SelectControl
                            value={ horizontalAlignment }
                            onChange={ ( alignment ) => setAttributes( { horizontalAlignment: alignment } ) }
                            options={ [
                                { value: "start", label: __( "Left" ) },
                                { value: "center", label: __( "Center" ) },
                                { value: "end", label: __( "Right" ) },
                                { value: "between", label: __( "Between" ) },
                            ] }
                        />
                    </PanelRow>
                    <PanelRow>
                        <strong>Vertical Alignment</strong>
                        <SelectControl
                            value={ verticalAlignment }
                            onChange={ ( alignment ) => setAttributes( { verticalAlignment: alignment } ) }
                            options={ [
                                { value: "start", label: __( "Top" ) },
                                { value: "center", label: __( "Center" ) },
                                { value: "end", label: __( "Bottom" ) },
                                { value: "stretch", label: __( "Stretch" ) },
                            ] }
                        />
                    </PanelRow>
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
                    <div className= { classnames(
                        className,
                        'col-12 col-md-12',
                    ) }>
                        <div className= { classnames(
                            className,
                            'row',
                            'press-quote',
                            horizontalAlignment ? ` justify-content-${horizontalAlignment}` : '',
                            verticalAlignment ? ` align-items-${verticalAlignment}` : ''
                        ) }>
                            <div className= { classnames(
                                className,
                                'col-12 col-md-3',
                                'align-self-center',
                            ) }>
                            <InnerBlocks
                                template={ setTemplate }
                                templateLock="all"
                            />
                            </div>
                            <div className='col-12 col-md-9'>
                                <RichText
                                    tagName="p"
                                    value={ attributes.content }
                                    onChange={ ( content ) => setAttributes( { content } ) }
                                    placeholder = 'Add some text here'
                                    className = 'lead'
                                />
                            </div>
                        </div>
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
    'holviblocks/newspaper-quote',
    {
        title: __( 'Newspaper quote', 'holviblocks' ),
        description: __( 'Create press module in vertical axis. Logo - Text.', 'holviblocks' ),
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
            verticalAlignment: {
                type: 'string',
            },
            horizontalAlignment: {
                type: 'string',
            },
            content: {
                source: 'html',
                selector: 'p',
            },
        },

        edit: compose([
            withColors( { backgroundColor: 'backgroundColor'} ),
            FallbackStyles,
        ])( newspaperQuote ),

        save: ( { attributes } ) => {
            const {
                backgroundColor,
                id,
                horizontalAlignment,
                verticalAlignment,
                content
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
                        <div className= { classnames(
                            className,
                            'col-12 col-md-12',
                        ) }>
                            <div className= { classnames(
                                className,
                                'row',
                                horizontalAlignment ? ` justify-content-${horizontalAlignment}` : '',
                                verticalAlignment ? ` align-items-${verticalAlignment}` : ''
                            ) }>
                                <div className= { classnames(
                                    className,
                                    'col-12 col-md-3',
                                    'align-self-center',
                                ) }>
                                    <InnerBlocks.Content/>
                                </div>
                                <div className='col-12 col-md-9'>
                                    <RichText.Content
                                        tagName='p'
                                        value={content}
                                        className = 'lead'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            );
        },
    },
);
