/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const{
    useCallback,
} = wp.element;
const {
    compose,
    withInstanceId,
} = wp.compose;
const {
    BaseControl,
    PanelBody,
    RangeControl,
    TextControl,
    ToggleControl,
    withFallbackStyles,
} = wp.components;
const {
    InspectorControls,
    RichText,
    InnerBlocks
} = wp.blockEditor;



function AccordionEdit( {
                         attributes,
                         setAttributes,
                         className,
                         instanceId,
                         accTitle,
                     } ) {
    const {
        placeholder,
        id,
    } = attributes;
    // Set a id if it is undefined

    if( !attributes.id ){
        setAttributes({ id: `acc-${ instanceId }`} );
    }

    const onSetId = useCallback(
        ( value ) => {
            setAttributes( { id: value } );
        },
        [ setAttributes ]
    );

    const tag = "#";
    if( instanceId === 0  ){
        setAttributes ( { collapsed: '' }  );
        setAttributes ( { ariaExpanded: true } );
        setAttributes ( { collapseShow: 'collapse show' }  );
    }


    const ALLOWED_BLOCKS = [ 'holviblocks/heading', 'holviblocks/paragraph', 'core/image', 'holviblocks/list' ];

    return (
            <div className={ className }>
                <div className='card'>
                    <div className = { classnames(
                        'card-header',
                        'bg-dark',
                        'text-white' ) }
                         id= { `${ id }` } >
                        <button
                            className={ classnames(
                                        "btn btn-block text-white font-weight-bold btn-link ",
                                        )
                            }
                            type="button"
                            data-toggle="collapse"
                            data-target= { tag + `collapse-${ id }`}
                            aria-controls={ `collapse-${ id }` }>
                            <RichText
                                placeholder={ placeholder || __( 'Add a Title' ) }
                                value={ attributes.accTitle }
                                onChange={ ( value ) => setAttributes( { accTitle: value } ) }
                            />
                        </button>
                    </div>
                    <div
                        id={  `collapse-${ id }` }
                        aria-labelledby={ `${ id }` }

                    >
                        <div className = { classnames(

                            'card-body ',
                            'text-md-center',
                            ) } >
                            <InnerBlocks
                                allowedBlocks={ ALLOWED_BLOCKS } />
                        </div>

                    </div>
                </div>
            <InspectorControls>
                <PanelBody title={ __( 'Accordion ID ' ) }>
                    <TextControl
                        label={ __( '#id' ) }
                        value={ id || '' }
                        onChange={ onSetId }
                    />
                </PanelBody>
            </InspectorControls>
            </div>
    );
}

export default compose( [
    withInstanceId,
] )( AccordionEdit );
