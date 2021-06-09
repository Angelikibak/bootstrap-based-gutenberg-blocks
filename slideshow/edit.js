/**
 * External dependencies
 */
import pick from 'lodash/pick';
import classnames from "classnames";


/**
 * WordPress dependencies
 */
const { withSelect } = wp.data;
const { Component, Fragment } = wp.element;
const { __ } = wp.i18n;
const { IconButton, FormFileUpload, Toolbar } = wp.components;
const {
    BlockControls,
    MediaUpload,
    MediaPlaceholder,
} = wp.blockEditor;


class Edit extends Component {
    constructor() {
        super( ...arguments );

        this.onSelectImages = this.onSelectImages.bind( this );
    }

    onSelectImages( images ) {
        this.props.setAttributes( {
            images: images.map( image => pick( image, [ 'alt', 'id', 'url' ] ) ),
        } );
        console.log(images.map);
    }


    render() {
        const { attributes } = this.props;
        const { images } = attributes;

        const controls = (
            <BlockControls>
                { !! images.length && (
                    <Toolbar>
                        <MediaUpload
                            onSelect={ this.onSelectImages }
                            type="image"
                            multiple
                            gallery
                            value={ images.map( image => image.id ) }
                            render={ ( { open } ) => (
                                <IconButton
                                    className="components-toolbar__control"
                                    label={ __( 'Edit Carousel' ) }
                                    icon="edit"
                                    onClick={ open }
                                />
                            ) }
                        />
                    </Toolbar>
                ) }
            </BlockControls>
        );


        if ( images.length === 0 ) {
            return (
                <Fragment>
                    { controls }
                    <MediaPlaceholder
                        labels={ {
                            title: __( 'Slideshow gallery' ),
                            name: __( 'images' ),
                        } }
                        icon="format-gallery"
                        onSelect={ this.onSelectImages }
                        allowedTypes = { [ 'image' ] }
                        multiple
                        gallery
                        value={ images.map( image => image.id ) }
                    />
                </Fragment>
            );
        }

        return (
            <Fragment>
                { controls }
                <div id="slideshow-controls" className="carousel slide" data-ride="carousel">
                        <Fragment>
                            <div className="carousel-inner">
                                { images.map( ( img, index ) => (
                                    <div className={ classnames( index === 0 ?  ` carousel-item active` : 'carousel-item' ) } key={ img.id || img.url }>
                                        <figure>
                                            <img
                                                src={ img.url }
                                                alt={ img.alt }
                                                data-id={ img.id }
                                            />
                                        </figure>
                                    </div>
                                ) ) }
                            </div>
                        </Fragment>
                    <a className="carousel-control-prev" href="#slideshow-controls" role="button"
                       data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#slideshow-controls" role="button"
                       data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </Fragment>
        );
    }
}
export default ( Edit );