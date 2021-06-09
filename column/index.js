import classnames from 'classnames';
import icon from './icon';
/**
 * * Internal block libraries
 */
const { __ } = wp.i18n;
const {   registerBlockType } = wp.blocks;
const {
    InnerBlocks, InspectorControls } = wp.blockEditor;
const { PanelBody, ToggleControl } = wp.components;

/**
 * Register block
 */
export default registerBlockType(
    'holviblocks/column',
    {
        title: __( 'Column', 'holviblocks' ),
        description: __( 'Create a card module.', 'holviblocks' ),
        category: 'holvi-blocks',
        icon,
        keywords: [
            __( 'Highlight', 'holviblocks' ),
            __( 'Cards', 'holviblocks' ),
            __( 'Pricing', 'holviblocks' ),
        ],
        parent: [ 'holviblocks/columns' ],
        supports: {
            inserter: false,
            reusable: false,
            html: false,
        },
        attributes: {
            columnWidth: {
                type: "string",
                default: "col-12"
            },
            orderMdFirst: {
                type: "boolean",
            },
            orderMdLast: {
                type: "boolean",
            },
            dNone: {
                type: "boolean",
            },
            padding: {
                type: "boolean",
            }

        },
        edit: props => {
            const { className, isSelected, attributes:{ columnWidth, orderMdFirst, padding, dNone} , setAttributes } = props;
            const classes = classnames( {
                className,
                [ `${ columnWidth }` ]: columnWidth,
                ['order-first order-md-last' ]: orderMdFirst ,
                ['d-md-block d-none'] : dNone ,
            } );

            return[
                <InspectorControls>
                    <PanelBody title={ __( 'Column Settings', 'holviblocks' ) }>
                        <ToggleControl
                            label={ __( 'Show First in mobile & last in desktop', 'holviblocks'  ) }
                            checked={ orderMdFirst }
                            onChange={ () =>
                                setAttributes( {
                                    orderMdFirst: ! orderMdFirst,
                                } )
                            }
                        />
                        <ToggleControl
                            label={ __( 'Hide in mobile' , 'holviblocks' ) }
                            checked={ dNone }
                            onChange={ () =>
                                setAttributes( {
                                    dNone: ! dNone,
                                } )
                            }
                        />
                        <ToggleControl
                        label={ __( 'Add padding around the: column', 'holviblocks' ) }
                        checked={ padding }
                        onChange={ () =>
                            setAttributes( {
                                padding: ! padding,
                            } )
                        }
                    />
                    </PanelBody>
                </InspectorControls>,
                <div className={ classes }>
                { padding ?
                    <div className='p-inner'>
                        <InnerBlocks/>
                    </div> : <InnerBlocks/> }
                </div>

            ];

        },
        save: props => {
            const { columnWidth, orderMdFirst, padding, dNone } = props.attributes;
            const classes = classnames( {
                [ `${ columnWidth }` ]: columnWidth,
                ['order-first order-md-last' ]: orderMdFirst ,
                ['d-md-block d-none'] : dNone ,
            } );
            return (
              <div className={ classes }>
                  { padding ?
                  <div className='p-inner'>
                        <InnerBlocks.Content/>
                  </div> : <InnerBlocks.Content/> }
              </div>
            );
        },
    },
);