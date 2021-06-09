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
    ToggleControl,
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


class pricinngBlock extends Component {
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
            header,
            subHeader,
            headerText,
            subHeaderText,
            leadHeader,
            leadHeaderText,
            id
        } = attributes;

        const ALLOWED_BLOCKS = [ 'holviblocks/pricing-list-item' ];
        const setTemplate = [
            [ 'holviblocks/pricing-list-item' ],
        ];

        return ([
            <InspectorControls>
                <PanelBody title={ __( "Section Settings" ) } initialOpen={ false }>
                    <PanelRow>
                        <TextControl
                            label={ __( 'Section #ID' ) }
                            value={ id || '' }
                            onChange={id => setAttributes({ id })}
                        />
                    </PanelRow>
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
                        <strong>Add an h1 header</strong>
                        <ToggleControl
                            checked={leadHeader}
                            onChange={leadHeader => setAttributes({ leadHeader })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <strong>Add an h2 Header</strong>
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

            <section className={ classnames(
                 "section-padding position-relative",
                attributes.backgroundColor ? `bg-${backgroundColor.slug}` : '' ) } >
                <div className="container">
                    { header || subHeader || leadHeader ?
                        <div className= 'row'>
                            <div className= 'col-12'>
                                { leadHeader &&
                                <RichText
                                    tagName='h1'
                                    value={leadHeaderText}
                                    onChange={(newLeadHeaderText) =>
                                        setAttributes({leadHeaderText: newLeadHeaderText})
                                    }
                                    placeholder={__('Here you can an h1 header')}
                                    className={classnames('subheader')}
                                />
                                }
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
                    <div className="row justify-content-md-center pricing-list">
                        <InnerBlocks
                            template={ setTemplate }
                            allowedBlocks={ ALLOWED_BLOCKS } />
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
    'holviblocks/pricing-list',
    {
        title: __( 'Pricing List', 'holviblocks' ),
        description: __( 'Create a pricing list', 'holviblocks' ),
        category: 'holvi-section',
        icon,
        supports: {
            align: [ 'full' ],
        },
        keywords: [
            __( 'Pricing List', 'holviblocks' ),
            __( 'Pricing', 'holviblocks' ),
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
            header: {
                type: "boolean",
            },
            subHeader: {
                type: "boolean",
            },
            leadHeader: {
                type: "boolean",
            },
            headerText: {
                type: "string",
            },
            subHeaderText: {
                type: "string",
            },
            leadHeaderText: {
                type: "string",
            },
            id: {
                type: "string",
            },
        },
        edit: compose([
            withColors( { backgroundColor: 'backgroundColor'} ),
            FallbackStyles,
        ])( pricinngBlock ),


        save: ( { attributes } ) => {
            const {
                backgroundColor,
                header,
                subHeader,
                headerText,
                subHeaderText,
                leadHeader,
                leadHeaderText,
                id
            } = attributes;

            return (
                <section
                    id={id ? `${id}` : ''}
                    className={ classnames(
                    "section-padding position-relative",
                    backgroundColor ? `bg-${backgroundColor}` : '' ) } >
                    <div className="container">
                        { header || subHeader || leadHeader ?
                            <div className={'row '}>
                                <div className= 'col-12'>
                                    { leadHeader &&
                                    <RichText.Content
                                        tagName='h1'
                                        value={leadHeaderText}
                                        className={classnames('header')}
                                    />
                                    }
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
                        <div className="row justify-content-md-center  pricing-list">
                            <InnerBlocks.Content
                            />
                        </div>
                    </div>
                </section>

            );
        },
    },
);




