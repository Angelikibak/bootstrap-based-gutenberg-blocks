/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const {
    RichText,
    InnerBlocks
} = wp.blockEditor;
const {
    withInstanceId,
} = wp.compose;
const{
    useCallback,
} = wp.element;

export default function save( { attributes, setAttributes } ) {
    const {
        text,
        title,
        instanceId,
        id,
        accTitle,
        accBody,
        ariaExpanded,
        collapsed,
        collapseShow,
    } = attributes;
    const tag = "#";




    return (

        <div className='card'>
            <div className = { classnames(
                'card-header',
                'bg-dark',
                'text-white' ) } id= { `${ id }`} >
                <button className={classnames(
                    "btn btn-block text-white font-weight-bold btn-link ",
                            {collapsed} )
                        }
                        type="button"
                        data-toggle="collapse"
                        data-target= { tag + `collapse-${ id }`}
                        aria-expanded={ ariaExpanded } aria-controls={ `collapse-${ id }` }>
                    <RichText.Content
                        tagName="h3"
                        className= "h5"
                        value={ accTitle }
                    />
                </button>
            </div>
            <div id=  { `collapse-${ id }` }  aria-labelledby= { `${ id }` } className= { collapseShow } >
                <div className = { classnames(
                    "card-body",
                ) } >
                    <InnerBlocks.Content/>
                </div>

            </div>
        </div>
    );
}
