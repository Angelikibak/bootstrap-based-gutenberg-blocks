/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { RichText } = wp.blockEditor;

const blockAttributes = {
    url: {
        type: 'string',
        source: 'attribute',
        selector: 'a',
        attribute: 'href'
    },
    title: {
        type: 'string',
        source: 'attribute',
        selector: 'a',
        attribute: 'title'
    },
    text: {
        type: 'string',
        source: 'html',
        selector: 'a'
    },
    linkTarget: {
        type: 'string',
        source: 'attribute',
        selector: 'a',
        attribute: 'target'
    },
    rel: {
        type: 'string',
        source: 'attribute',
        selector: 'a',
        attribute: 'rel'
    },
    placeholder: {
        type: 'string'
    },
    id:{
        type: 'string',
    },
    btnClass: {
        type: 'string',
        default: 'btn-dark btn',
    },
    btnClassWrapper: {
        type: 'string',
        default: '',
    },
    textAlign:{
        type: 'string',
        default: '',
    }
};

const deprecated = [
    {
        attributes: {
            ...blockAttributes,
        },
        save( { attributes } ) {
            const {  linkTarget,
                rel,
                text,
                title,
                url,
                btnClass,
                btnClassWrapper,
                textAlign,
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
                    />
                </div>
            );
        },
    },
];

export default deprecated;
