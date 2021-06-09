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
    SelectControl,
    withFallbackStyles,
} = wp.components;
const {
    InspectorControls,
    RichText,
    URLInput,
} = wp.blockEditor;


const NEW_TAB_REL = 'noreferrer noopener';

function ButtonEdit( {
                         attributes,
                         setAttributes,
                         className,
                         instanceId,
                         isSelected,
                     } ) {
    const {
        linkTarget,
        placeholder,
        rel,
        id,
        text,
        title,
        url,
        btnClass,
        btnClassWrapper,
        textAlign,
    } = attributes;
    // Set a id if it is undefined
    if( !attributes.id ){
        setAttributes({ id: `cta-button-${ instanceId }`} );
    }
    const onSetLinkRel = useCallback(
        ( value ) => {
            setAttributes( { rel: value } );
        },
        [ setAttributes ]
    );
    const onSetId = useCallback(
        ( value ) => {
            setAttributes( { id: value } );
        },
        [ setAttributes ]
    );

    const onToggleOpenInNewTab = useCallback(
        ( value ) => {
            const newLinkTarget = value ? '_blank' : undefined;

            let updatedRel = rel;
            if ( newLinkTarget && ! rel ) {
                updatedRel = NEW_TAB_REL;
            } else if ( ! newLinkTarget && rel === NEW_TAB_REL ) {
                updatedRel = undefined;
            }

            setAttributes( {
                linkTarget: newLinkTarget,
                rel: updatedRel,
            } );
        },
        [ rel, setAttributes ]
    );

    const linkId = `wp-block-button__inline-link-${ instanceId }`;
    const wrapperClass = classnames(
        {
            [ `${ btnClassWrapper }` ]: btnClassWrapper,
            [`${ textAlign }` ]: textAlign

        });
    return (
        <div className={wrapperClass  } title={ title }>
            <RichText
                placeholder={ placeholder || __( 'Add text…' ) }
                value={ text }
                onChange={ ( value ) => setAttributes( { text: value } ) }
                withoutInteractiveFormatting
                className={ classnames(
                    btnClass,
                ) }
            />
            <BaseControl
                label={ __( 'Link' ) }
                className="wp-block-button__inline-link"
                id={ linkId }>
                <URLInput
                    className="wp-block-button__inline-link-input"
                    value={ url }
                    /* eslint-disable jsx-a11y/no-autofocus */
                    // Disable Reason: The rule is meant to prevent enabling auto-focus, not disabling it.
                    autoFocus={ false }
                    /* eslint-enable jsx-a11y/no-autofocus */
                    onChange={ ( value ) => setAttributes( { url: value } ) }
                    disableSuggestions={ ! isSelected }
                    id={ linkId }
                    isFullWidth
                    hasBorder
                />
            </BaseControl>
            <InspectorControls>
                <PanelBody title={ __( 'Link settings' ) }>
                    <ToggleControl
                        label={ __( 'Open in new tab' ) }
                        onChange={ onToggleOpenInNewTab }
                        checked={ linkTarget === '_blank' }
                    />
                    <TextControl
                        label={ __( 'Link rel' ) }
                        value={ rel || '' }
                        onChange={ onSetLinkRel }
                    />
                    <TextControl
                        label={ __( '#id' ) }
                        value={ id || '' }
                        onChange={ onSetId }
                    />
                    <strong>Button style</strong>
                    <SelectControl
                        value={ btnClass }
                        onChange={ ( buttonClass ) => setAttributes( { btnClass: buttonClass } ) }
                        options={ [
                            { value: "btn-dark btn", label: __( "Dark button" ) },
                            { value: "btn-outline-dark btn", label: __( "Outline button" ) },
                            { value: "read-more", label: __( "Arrow link" ) },
                            { value: "btn-outline-light btn", label: __( "White outline button" ) },
                        ] }
                    />
                    <SelectControl
                        label={ __( "Align Button" ) }
                        value={ textAlign }
                        onChange={ ( value ) => setAttributes( { textAlign: value } ) }
                        options={ [
                            { value: "", label: __( "Left" ) },
                            { value: "text-md-center", label: __( "Center" ) },
                            { value: "text-md-right", label: __( "Right" ) },
                        ] }
                    />
                </PanelBody>
            </InspectorControls>
        </div>
    );
}

export default compose( [
    withInstanceId,
] )( ButtonEdit );
