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
    MediaUpload,
    PanelColorSettings,
    withColors,
    RichText
} = wp.blockEditor;

const {
    PanelBody,
    SelectControl,
    Button,
    BaseControl,
    withNotices,
    PanelRow,
    withFallbackStyles,
    ToggleControl,
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

class OneColumnsBlock extends Component {
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
            horizontalAlignment,
            verticalAlignment,
            backgroundImage,
            header,
            subHeader,
            headerText,
            subHeaderText,
            dividerTop,
            dividerBottom,
            hideBg,
            id,
            desktopWidth
        } = attributes;
        const {
            className } = attributes;
        const ALLOWED_BLOCKS = [ 'holviblocks/cards' ];
        const setTemplate = [
            [ 'holviblocks/cards', { } ],
            [ 'holviblocks/cards', { } ],
            [ 'holviblocks/cards', { } ],
        ];


        const classes = classnames([
            `card-deck`,]);

        const onRemoveImage = () => {
            setAttributes({
                backgroundImage: null
            });
        }

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
                        <strong>Add a top wave divider</strong>
                        <ToggleControl
                            checked={ dividerTop }
                            onChange={dividerTop => setAttributes({ dividerTop })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <strong>Add a bottom wave divider</strong>
                        <ToggleControl
                            checked={ dividerBottom }
                            onChange={dividerBottom => setAttributes({ dividerBottom })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <strong>Add A Header</strong>
                        <ToggleControl
                            checked={header}
                            onChange={header => setAttributes({ header })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <strong>Add A Subheader</strong>
                        <ToggleControl
                            checked={subHeader}
                            onChange={subHeader => setAttributes({ subHeader })}
                        />
                    </PanelRow>
                </PanelBody>
            </InspectorControls>,
            <section
                id={id ? `${id}` : ''}
                className={ classnames(
                    className,
                    'section-padding position-relative',
                    attributes.backgroundColor ? `bg-${backgroundColor.slug}` : '' ,
                    { 'wave-top': dividerTop },
                    { 'wave-bottom': dividerBottom },
                ) }>
                <div className="container">
                    { header || subHeader ?
                        <div className= 'row'>
                            <div className= 'col-12'>
                                { header &&
                                <RichText
                                    tagName='h2'
                                    value={headerText}
                                    onChange={(newHeaderText) =>
                                        setAttributes({headerText: newHeaderText})
                                    }
                                    placeholder={__('Here you can a header')}
                                    className={classnames('header text-md-center')}
                                />
                                }
                                { subHeader &&
                                <RichText
                                    tagName='p'
                                    value={subHeaderText}
                                    onChange={(newSubHeaderText) =>
                                        setAttributes({subHeaderText: newSubHeaderText})
                                    }
                                    placeholder={__('Here you can a subheader')}
                                    className={classnames('subheader text-md-center')}
                                />
                                }
                            </div>
                        </div>: ''
                    }
                    <div className={classes}>
                        <InnerBlocks
                            template={ setTemplate }
                            allowedBlocks={ ALLOWED_BLOCKS }
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
    'holviblocks/card-deck',
    {
        title: __( 'Card deck', 'holviblocks' ),
        description: __( 'Create a card deck layout', 'holviblocks' ),
        category: 'holvi-section',
        icon,
        supports: {
            align: [ 'full' ],
        },
        keywords: [
            __( 'Card deck', 'holviblocks' ),
            __( 'Multiple Cards', 'holviblocks' ),
            __( 'Cards', 'holviblocks' ),
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
            verticalAlignment: {
                type: 'string',
            },
            horizontalAlignment: {
                type: 'string',
                default: 'center',
            },
            header: {
                type: 'boolean'
            },
            subHeader: {
                type: 'boolean'
            },
            headerText: {
                type: "string",
            },
            subHeaderText: {
                type: "string",
            },
            dividerTop: {
                type: "boolean",
            },
            dividerBottom: {
                type: "boolean",
            },
            id: {
                type: "string",
            },
        },

        edit: compose([
            withColors( { backgroundColor: 'backgroundColor'} ),
            FallbackStyles,
        ])( OneColumnsBlock ),

        save: ( { attributes } ) => {
            const {
                backgroundColor,
                header,
                subHeader,
                headerText,
                subHeaderText,
                dividerTop,
                dividerBottom,
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
                        'section-padding position-relative',
                        { 'wave-top': dividerTop },
                        { 'wave-bottom': dividerBottom },

                    ) }
                >

                    <div className="container">
                        { header || subHeader ?
                            <div className={'row'}>
                                <div className= 'col-12'>
                                    { header &&
                                    <RichText.Content
                                        tagName='h2'
                                        value={headerText}
                                        className={classnames('header text-md-center')}
                                    />
                                    }
                                    { subHeader &&
                                    <RichText.Content
                                        tagName='p'
                                        value={subHeaderText}
                                        className={classnames('subheader text-md-center')}
                                    /> }
                                </div>
                            </div>: ''
                        }
                        <div className={ classnames(
                            "card-deck",) }
                        >
                            <InnerBlocks.Content/>
                        </div>
                    </div>
                </section>

            );
        },
    },
);
