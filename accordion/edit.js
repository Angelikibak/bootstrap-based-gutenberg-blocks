import classnames from "classnames";
const { __ } = wp.i18n;
const {
    InnerBlocks,
    InspectorControls,
    withColors,
    RichText,
    PanelColorSettings,
} = wp.blockEditor;
const {
    PanelBody,
    TextControl,
    withFallbackStyles,
} = wp.components

const{
    useCallback,
} = wp.element;
const {
    compose,
    withInstanceId,
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
function ParentAccordionEdit( {
                            attributes,
                            setAttributes,
                            className,
                            instanceId,
                            setBackgroundColor,
                            backgroundColor,
                        } ) {
    const {
        idAcc,
        headerText,
    } = attributes;

    const ALLOWED_BLOCKS = [ 'holviblocks/accordion-item' ];

    // Set a id if it is undefined
    if( !attributes.idAcc ){
        setAttributes({ idAcc: `accordion-${ instanceId }`} );
    }

    const onSetId = useCallback(
        ( value ) => {
            setAttributes( { idAcc: value } );
        },
        [ setAttributes ]
    );

    const setTemplate = [
        [ 'holviblocks/accordion-item', { idAcc: `${ idAcc }` }  ],
        [ 'holviblocks/accordion-item', { idAcc: `${ idAcc }` } ],
        [ 'holviblocks/accordion-item', { idAcc: `${ idAcc }` } ],
    ];


    const tag = "#";

    const sectionClass = classnames(
        'section-padding position-relative accordion',
        attributes.backgroundColor ? `bg-${backgroundColor.slug}` : '' ,
    );

    return (
        <section className={sectionClass}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className={ className }>
                        <InspectorControls>
                            <PanelBody title={ __( 'Accordion ID ' ) }>
                                <TextControl
                                    label={ __( '#id' ) }
                                    value={ idAcc || '' }
                                    onChange={ onSetId }
                                />
                            </PanelBody>
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
                        </InspectorControls>
                        <RichText
                            tagName='h2'
                            value={headerText}
                            onChange={(newHeaderText) =>
                                setAttributes({headerText: newHeaderText})
                            }
                            placeholder={__('Here you can a header / leave empty to not show on frontend')}
                            className={classnames('header text-md-center')}
                        />
                            <InnerBlocks
                                template={ setTemplate }
                                allowedBlocks={ ALLOWED_BLOCKS } />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default compose( [
    withInstanceId,
    withColors( { backgroundColor: 'backgroundColor'} ),
    FallbackStyles,
] )( ParentAccordionEdit );