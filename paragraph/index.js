import classnames from 'classnames';

const { __ } = wp.i18n;
const {
    registerBlockType,
    createBlock,
} = wp.blocks;
const {
    AlignmentToolbar,
    BlockControls,
    InspectorControls,
    InnerBlocks,
    withColors,
    FontSizePicker,
    withFontSizes,
    RichText,
    getColorClass,
    PanelColorSettings
} = wp.blockEditor;
const {
    PanelBody,
    withFallbackStyles,
    PanelColor,
    ColorPalette,
} = wp.components;

const {
    Component,
} = wp.element;
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
            fallbackTextColor,
            fallbackFontSize,
        } = this.props;

        const {
            align,
            content,
            placeholder
        } = attributes;

        // Get slug names depenency of HOC withColors and withFontSizes to work.
        // NEEDS Theme font and colors setup prio
        const className = classnames( {
            [ `text-${ align }` ]: align,
            [ `text-${ textColor.slug }` ]: textColor.slug,
            [ `${fontSize.slug}` ] : fontSize.slug,
        } );

        return ([
            <BlockControls>
                <AlignmentToolbar
                    value={ align }
                    onChange={ ( newAlign ) =>
                        setAttributes( { align: newAlign } )
                    }
                />
            </BlockControls>,
            <InspectorControls>
                <PanelBody title={ __( 'Text Settings' , "holviblocks" ) } className="blocks-font-size">
                    <FontSizePicker
                        value={ fontSize.size }
                        onChange={ setFontSize }
                    />
                </PanelBody>
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
            </InspectorControls>,
            <div className='custom-paragraph-block'>
                <RichText key='editable'
                          tagName='p'
                          value={content}
                          className={className}
                          onChange={(newContent) =>
                              setAttributes({content: newContent})
                          }
                          onSplit={ ( value ) => {
                              if ( ! value ) {
                                  return createBlock( 'holviblocks/paragraph' );
                              }

                              return createBlock( 'holviblocks/paragraph', {
                                  ...attributes,
                                  content: value,
                              } );
                          } }
                          onMerge={ mergeBlocks }
                          onReplace={ onReplace }
                          onRemove={ onReplace ? () => onReplace( [] ) : undefined }
                          placeholder={ placeholder || __( 'Write some text…' ) }
                />
            </div>

        ]);
    }
}

export default registerBlockType('holviblocks/paragraph', {
    title:__('Holvi Paragraph', 'holviblocks'),
    description: __( 'A custom made paragraph for holvi blocks', 'holviblocks'),
    icon: 'editor-paragraph',
    category: 'holvi-blocks',
    keywords: [ __( 'text', 'paragraph', 'copy') ],
    attributes: {
        backgroundColor: {
            type: 'string',
        },
        textColor: {
            type: 'string',
        },
        align: {
            type: 'string',
        },
        content: {
            type: 'string',
            source: 'html',
            selector: 'p',
            default: ''
        },
        placeholder: {
            type: 'string'
        },
        color: {
            type: 'string',
        },
        fontSize: {
            type: 'string',
        }
    },
    edit: compose([
        withColors('backgroundColor', {textColor: 'color'}),
        withFontSizes( 'fontSize'),
        FallbackStyles,
    ])(OneColumnBlock),
    save: props => {
        const {
            textColor,
            align,
            content,
            fontSize,
        } = props.attributes;

        // Get Bootstrap class name
        const className = classnames( {
            [ `text-${ align }` ]: align,
            [ `text-${ textColor }` ]: textColor,
            [ `${fontSize}` ] : fontSize,
        } );


        return (
            <RichText.Content
                tagName='p'
                className={ className ? className : undefined }
                value={ content }
            />
        );
    },
});