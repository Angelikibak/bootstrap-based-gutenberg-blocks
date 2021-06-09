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
} = wp.blockEditor;

const { BlockQuotation } = wp.components;

/**
 * Register block
 */
export default registerBlockType(
    'holviblocks/blockquote',
    {
        title: __( 'Holvi Quote', 'holviblocks' ),
        description: __( 'Give quoted text visual emphasis. "In quoting others, we cite ourselves." — Julio Cortázar', 'holviblocks' ),
        category: 'holvi-blocks',
        icon:'editor-quote',
        keywords: [
            __( 'Quote', 'holviblocks' ),
            __( 'Block Quote', 'holviblocks' ),
            __( 'Cite', 'holviblocks' ),
        ],
        attributes: {
            value: {
                type: 'string',
                source: 'html',
                selector: 'blockquote',
                multiline: 'p',
                default:''
            },
            citation: {
                type: 'string',
                source: 'html',
                selector: 'cite',
                default: ''
            }
        },
        edit: props => {
            const { attributes: { value, citation }, isSelected, onReplace, className, setAttributes } = props;
            const onChangeMessage = message => { setAttributes( { message } ) };
            return (
                <div>

                    <BlockQuotation className='blockquote'>
                        <RichText
                            identifier="value"
                            multiline
                            value={ value }
                            onChange={ ( nextValue ) =>
                                setAttributes( {
                                    value: nextValue,
                                } )
                            }
                            onRemove={ ( forward ) => {
                                const hasEmptyCitation =
                                    ! citation || citation.length === 0;
                                if ( ! forward && hasEmptyCitation ) {
                                    onReplace( [] );
                                }
                            } }
                            placeholder={
                                // translators: placeholder text used for the quote
                                __( 'Write quote…' )
                            }
                            onReplace={ onReplace }
                            onSplit={ ( piece ) =>
                                createBlock( 'core/quote', {
                                    ...attributes,
                                    value: piece,
                                } )
                            }
                            __unstableOnSplitMiddle={ () =>
                                createBlock( 'core/paragraph' )
                            }
                        />
                        { ( ! RichText.isEmpty( citation ) || isSelected ) && (
                            <RichText
                                identifier="citation"
                                value={ citation }
                                onChange={ ( nextCitation ) =>
                                    setAttributes( {
                                        citation: nextCitation,
                                    } )
                                }
                                __unstableMobileNoFocusOnMount
                                placeholder={
                                    // translators: placeholder text used for the citation
                                    __( 'Write citation…' )
                                }
                                className="wp-block-quote__citation"
                            />
                        ) }
                    </BlockQuotation>
                </div>
            );
        },
        save: props => {
            const { attributes: { value, citation } } = props;
            return (
                <blockquote className='blockquote'>
                    <RichText.Content multiline value={ value } />
                    { ! RichText.isEmpty( citation ) && (
                        <RichText.Content tagName="cite" value={ citation } />
                    ) }
                </blockquote>
            );
        },
    },
);
