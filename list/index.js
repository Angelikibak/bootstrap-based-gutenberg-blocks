/**
 * Block dependencies
 */
import classnames from 'classnames';
/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
    RichText,
    BlockControls,
    RichTextShortcut,
    InspectorControls,
    FontSizePicker,
    withFontSizes,
} = wp.blockEditor;
const {
    Dashicon,
    Toolbar,
    Button,
    Tooltip,
    PanelBody,
    SelectControl,
} = wp.components;

const {
    Component,
} = wp.element;
const {
    compose
} = wp.compose;


class ListStyle extends Component {
    constructor() {
        super(...arguments);
    }

    render() {
        const {
            attributes,
            setAttributes,
            setFontSize,
            fontSize,
            fallbackFontSize,
        } = this.props;

        const {
            listStyle,
            values
        } = attributes;

        const className = classnames( {
            [ `${ listStyle }` ]: listStyle,
            [ `${fontSize.slug}` ] : fontSize.slug,
        } );
        return (
            <div>
                <InspectorControls>
                    <PanelBody title={ __( 'List Settings' , "holviblocks" ) } className="blocks-font-size">
                        <FontSizePicker
                            value={ fontSize.size }
                            onChange={ setFontSize }
                        />
                        <SelectControl
                            label={ __( "List Type" ) }
                            value={ listStyle }
                            onChange={ ( value ) => setAttributes( { listStyle: value } ) }
                            options={ [
                                { value: "list-check", label: __( "Normal" ) },
                                { value: "list-flex list-check", label: __( "Horizontal" ) },
                                { value: "", label: __( "Bullet" ) },
                                { value: "list-unstyled", label: __( "Unstyled" ) },
                            ] }
                        />
                    </PanelBody>
                </InspectorControls>
                <RichText
                    identifier="values"
                    multiline="li"
                    tagName="ul"
                    className={className}
                    onChange={ ( nextValues ) => setAttributes( { values: nextValues } ) }
                    value={ values }
                    placeholder={ __( 'Write list…' ) }
                />
            </div>

        );
        }
}
export default registerBlockType(
    'holviblocks/list',
    {
        title: __( 'Holvi List', 'holviblocks' ),
        description: __( 'Create a bullet or numered list', 'holviblocks'),
        category: 'holvi-blocks',
        icon: 'editor-ul',
        keywords: [
            __( 'bullet list', 'holviblocks' ),
            __( 'ordered list', 'holviblocks' ),
            __( 'numbered list', 'holviblocks' ),
        ],
        attributes: {
            values: {
                type: 'string',
                source: 'html',
                selector: 'ul',
                multiline: 'li',
                default: ''
            },
            listStyle: {
                type: 'string',
                default: 'list-check',
            },
            fontSize: {
                type: 'string',
            }

        },
        edit:compose([
            withFontSizes( 'fontSize'),
        ])(ListStyle),
        save: props => {
            const { listStyle,fontSize, values } = props.attributes;
            const classes = classnames(
                {
                    [ `${listStyle}` ]: listStyle,
                    [ `${fontSize}` ] : fontSize,
                },

            );
            return (
                <RichText.Content
                    value= {values}
                    className={classes}
                    tagName="ul"
                    multiline="li"
                />

            );
        },
    },
);
