/**
 * External dependencies
 */
import classnames from 'classnames';


/**
 * Internal dependencies
 */
import HeadingToolbar from './heading-toolbar';


/**
 * WordPress dependencies
 */


const { __ } = wp.i18n;
const { registerBlockType} = wp.blocks;

const { Dashicon,
        PanelBody,
        withFallbackStyles} = wp.components;

const { AlignmentToolbar,
        BlockControls,
        InspectorControls,
        RichText,
        getColorObjectByColorValue,
        ColorPalette,
        withColors,
        PanelColorSettings,
        FontSizePicker,
        withFontSizes,} = wp.blockEditor;

const { Platform,
    Component } = wp.element;

const { createBlock } = wp.blocks;

const { find } = lodash;

const {
    compose
} = wp.compose;


const {getComputedStyle} = window;

const FallbackStyles = withFallbackStyles((node, ownProps) => {
    const {textColor} = ownProps.attributes;
    const editableNode = node.querySelector('[contenteditable="true"]');
    //verify if editableNode is available, before using getComputedStyle.
    const computedStyles = editableNode ? getComputedStyle(editableNode) : null;
    return {
        fallbackTextColor: textColor || !computedStyles ? undefined : computedStyles.color,
    };
});

class OneColumnBlock extends Component {
    constructor() {
        super(...arguments);
    }

    render() {
        const {
            attributes,
            setAttributes,
            mergeBlocks,
            textColor,
            setTextColor,
            onReplace,
            fontSize,
            setFontSize,
        } = this.props;

        const {
            align,
            content,
            level,
            placeholder} = attributes;
        const tagName = 'h' + level;

        // Get slug names depenency of HOC withColors and withFontSizes to work.
        // NEEDS Theme font and colors setup prio
        const className = classnames( {
            [ `text-${ align }` ]: align,
            [ `text-${ textColor.slug }` ]: textColor.slug,
            [ `${fontSize.slug}` ] : fontSize.slug,
        } );

        return ([
            <BlockControls>
                <HeadingToolbar
                    minLevel={ 1 }
                    maxLevel={ 6 }
                    selectedLevel={ level }
                    onChange={ ( newLevel ) =>
                        setAttributes( { level: newLevel } )
                    }
                />

                <AlignmentToolbar
                    value={ align }
                    onChange={ ( newAlign ) => {
                        setAttributes( { align: newAlign } );
                    } }
                />

            </BlockControls>,

            <InspectorControls>
                <PanelBody title={ __( 'Heading settings' ) }>

                    <HeadingToolbar
                        isCollapsed={ false }
                        minLevel={ 1 }
                        maxLevel={ 6 }
                        selectedLevel={ level }
                        onChange={ ( newLevel ) =>
                            setAttributes( { level: newLevel } )
                        }
                    />
                    <p><strong>Select a font size:</strong></p>
                    <PanelBody title={ __( 'Text Settings' , "holviblocks" ) } className="blocks-font-size">
                        <FontSizePicker
                            value={ fontSize.size }
                            onChange={ setFontSize }
                        />
                    </PanelBody>
                    <p><strong>Select a header color:</strong></p>
                    <PanelColorSettings
                        title={__("Color Settings", "holviblocks")}
                        colorSettings={[
                            {

                                label: __("Text Color", "holviblocks"),
                                onChange: setTextColor,
                                value: textColor.color,
                                disableCustomColors: true,
                            }
                        ]}
                    />
                </PanelBody>
            </InspectorControls>,

            <RichText
                identifier="content"
                tagName={ tagName }
                value={ content }
                onChange={ ( value ) => setAttributes( { content: value } ) }
                onMerge={ mergeBlocks }
                onSplit={ ( value ) => {
                    if ( ! value ) {
                        return createBlock( 'holviblocks/paragraph' );
                    }


                    return createBlock( 'holviblocks/heading', {
                        ...attributes,
                        content: value,
                    } );
                } }
                onReplace={ onReplace }
                onRemove={ () => onReplace( [] ) }
                className={ className }
                placeholder={ placeholder || __( 'Write heading…' ) }
                textAlign={ align }

            />

        ]);
    }
}


registerBlockType (
    'holviblocks/heading',
    {
        title: __('Holvi Heading', 'holviblocks'),
        description: __('This is a custom heading block'),
        icon: 'heading',
        category:'holvi-blocks',
        keywords: [ __( 'heading', 'header', 'headline') ],
        attributes: {
            align: {
                type: "string", 
                default: ""
            },
            content: {
                type: "string",
                source: "html",
                selector: "h1,h2,h3,h4,h5,h6",
                default: ""
            },
            level: {
                type: "number",
                default: 2
            },
            placeholder: {
                type: "string"
            },
            color: {
                type: "string",
                default: "black"
            },
            textColor: {
                type: 'string',
            },
            fontSize: {
                type: 'string',
            }
        },

        edit: compose([
            withColors( { textColor: 'color'} ),
            withFontSizes( 'fontSize'),
            FallbackStyles,
        ])(OneColumnBlock),

        save ({attributes }) {
            const { align, content, level, textColor, fontSize } = attributes;
            const tagName = 'h' + level;

            const className = classnames( {
                [ `text-${ align }` ]: align,
                [ `text-${ textColor }` ]: textColor,
                [ `${fontSize}` ] : fontSize,

            } );

            return (
                <RichText.Content
                    className={ className ? className : undefined }
                    tagName={ tagName }
                    value={ content }
                />
            );
        }

    }


)