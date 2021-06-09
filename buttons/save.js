/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const {
    RichText,
    getColorClassName,
} = wp.blockEditor;

export default function save( { attributes } ) {
    const {
        linkTarget,
        rel,
        text,
        title,
        url,
        btnClass,
        btnClassWrapper,
        textAlign,
        id
    } = attributes;


    const buttonClasses = classnames( btnClass );
    const wrapperClass = classnames( {
        [ `${ btnClassWrapper }` ]: btnClassWrapper,
        [`${ textAlign }` ]: textAlign
    } );
    return (
        <div className={wrapperClass}>
            <RichText.Content
                tagName="a"
                className={ buttonClasses }
                href={ url }
                title={ title }
                value={ text }
                target={ linkTarget }
                rel={ rel }
                id={ id }
            />
        </div>
    );
}
