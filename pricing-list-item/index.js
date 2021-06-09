import icon from './icon'
import classnames from 'classnames';
/**
 * * Internal block libraries
 */
const { __ } = wp.i18n;
const {   registerBlockType } = wp.blocks;
const {
    InnerBlocks,
    BlockControls,
    BlockAlignmentToolbar,
    InspectorControls,
    PanelColorSettings,
    withColors,
    RichText,
    getColorClass,
} = wp.blockEditor;

const {
    PanelBody,
    withFallbackStyles,
    PanelColor,
    ToggleControl,
    ColorPalette,
} = wp.components;

const {
    compose
} = wp.compose;

const {
    Component,
} = wp.element;


class PricingList extends Component {
    constructor() {
        super(...arguments);
    }

    render() {
        const {
            attributes,
            setAttributes,
            backgroundColor,
            setBackgroundColor,
        } = this.props;

        const {
            offerText,
            listValues,
            pricingTitle,
            pricingTag,
            pricingTagMonth,
            pricingInfo,
            showCTA,
            hasOffering,
        } = attributes;
        const buttons = [
            [ 'holviblocks/button', {} ],
        ];
        const className = classnames( "px-4 py-7 py-md-9 h-100 rounded position-relative",{
            [ `bg-${ backgroundColor.slug }` ]: backgroundColor.slug,
        } );
        const wrapper = classnames( "col-12 col-md-4 pricing-card",{
            [ `has-offer` ]: hasOffering,
        } );
        return (
            <div>
                <InspectorControls>
                    <PanelBody title={ __( 'Pricing Settings' , "holviblocks" ) } className="blocks-font-size">
                        <ToggleControl
                            label={__("Add call to action", "holviblocks")}
                            checked={showCTA}
                            onChange={showCTA => setAttributes({ showCTA })}
                        />
                        <ToggleControl
                            label={__("Add offer", "holviblocks")}
                            checked={hasOffering}
                            onChange={hasOffering => setAttributes({ hasOffering })}
                        />
                    </PanelBody>
                    <PanelColorSettings
                        title={__("Color Settings", "holviblocks")}
                        colorSettings={[
                            {

                                label: __("Background Color", "holviblocks"),
                                onChange: setBackgroundColor,
                                value: backgroundColor.color,
                                disableCustomColors: true,
                            }
                        ]}
                    />
                </InspectorControls>
                            <div className={wrapper}>

                                <div className={className}>
                                    {hasOffering &&
                                    <div className="bg-blue p-2 text-center offer rounded-top">
                                        <RichText
                                            tagName='p'
                                            value={offerText}
                                            onChange={(newOfferText) =>
                                                setAttributes({offerText: newOfferText})
                                            }
                                            placeholder={__('Hear´s is space for an offer')}
                                            className={ classnames( 'price-offer' )}
                                        />
                                    </div>
                                    }
                                <RichText
                                    tagName='h2'
                                    value={pricingTitle}
                                    onChange={(newPricingTitle) =>
                                        setAttributes({pricingTitle: newPricingTitle})
                                    }
                                    placeholder={__('Add a Title')}
                                    className={ classnames( 'm-0' )}
                                />
                                <RichText
                                    tagName='h3'
                                    value={pricingTag}
                                    onChange={(newPricingTag) =>
                                        setAttributes({pricingTag: newPricingTag})
                                    }
                                    placeholder={__('69 €')}
                                    className={ classnames( 'h1 mt-0 mb-4 d-inline-block' )}
                                />
                                <RichText
                                    tagName='span'
                                    value={pricingTagMonth}
                                    onChange={(newPricingTagMonth) =>
                                        setAttributes({pricingTagMonth: newPricingTagMonth})
                                    }
                                    placeholder={__('/ month')}
                                    className={ classnames( 'lead d-inline-block' )}
                                />
                                <RichText
                                    tagName='p'
                                    value={pricingInfo}
                                    onChange={(newPricingInfo) =>
                                        setAttributes({pricingInfo: newPricingInfo})
                                    }
                                    placeholder={__('No subscription fees – pay only for what you use')}
                                    className={ classnames('pricing-info mt-0 mb-4' )}
                                />
                                <RichText
                                    identifier="values"
                                    multiline="li"
                                    tagName="ul"
                                    className={ classnames('list-check' )}
                                    onChange={ ( nextValues ) => setAttributes( { listValues: nextValues } ) }
                                    value={ listValues }
                                    placeholder={ __( 'Write list…' ) }
                                />
                                { showCTA &&
                                    <InnerBlocks
                                        template={ buttons }
                                        templateLock="all"
                                    />
                                }
                            </div>
                        </div>
            </div>

        );
    }
}

/**
 * Register block
 */
export default registerBlockType(
    'holviblocks/pricing-list-item',
    {
        title: __( 'Pricing List', 'holviblocks' ),
        description: __( 'Create a pricing list', 'holviblocks' ),
        category: 'holvi-blocks',
        icon,
        parent: [ 'holviblocks/pricing-list' ],
        keywords: [
            __( 'Pricing List', 'holviblocks' ),
            __( 'Pricing', 'holviblocks' ),
        ],
        attributes: {
            offerText: {
                type: "string",
                source: "html",
                selector: ".price-offer",
                default: ""
            },
            pricingTitle: {
                type: "string",
                source: "html",
                selector: "h2",
                default: ""
            },
            pricingTag: {
                type: "string",
                selector: "h3",
                default: ""
            },
            pricingTagMonth: {
                type : "string",
                selector: "span",
                default: "/month"
            },
            pricingInfo: {
                type: "string",
                source: "html",
                selector: ".pricing-info",
                default: ""
            },
            listValues: {
                type: 'string',
                source: 'html',
                selector: 'ul',
                multiline: 'li',
                default: ''
            },
            backgroundColor:{
                type: 'string',
                default: 'light'
            },
            showCTA: {
                type: "boolean",
                default: false
            },
            hasOffering:{
                type: "boolean",
                default: false
            }
        },
        edit: compose([
                    withColors('backgroundColor', {backgroundColor: 'color'}),
        ])(PricingList),
        save: props => {
            const {
                offerText,
                listValues,
                pricingTitle,
                pricingTag,
                pricingTagMonth,
                pricingInfo,
                backgroundColor,
                showCTA,
                hasOffering,
            } = props.attributes;
            const className = classnames( "px-4 py-7 py-md-9 h-100 rounded position-relative",{
                [ `bg-${ backgroundColor }` ]: backgroundColor,
            } );
            const wrapper = classnames( "col-12 col-md-4 pricing-card",{
                [ `has-offer` ]: hasOffering,
            } );
            return (
                        <div className={wrapper}>
                            <div className={className}>
                                { hasOffering &&
                                <div className="bg-blue p-2 text-center offer rounded-top">
                                    <RichText.Content
                                        value={offerText}
                                        tagName="p"
                                        className={ classnames( 'price-offer' )}
                                    />
                                </div>
                                }
                                <RichText.Content
                                    value= {pricingTitle}
                                    tagName="h2"
                                    className={ classnames( 'mb-0' )}
                                />
                                <h3 className="h1 mb-4">{ pricingTag }<span className="lead">{ pricingTagMonth }</span></h3>
                                <RichText.Content
                                    value= {pricingInfo}
                                    tagName="p"
                                    className={ classnames( 'pricing-info mt-0 mb-4' )}
                                />
                                <RichText.Content
                                    value= {listValues}
                                    tagName="ul"
                                    multiline="li"
                                    className={ classnames('list-check' )}
                                />
                                { showCTA &&
                                    <InnerBlocks.Content
                                    />
                                }
                            </div>
                        </div>

            );
        },
    },
);