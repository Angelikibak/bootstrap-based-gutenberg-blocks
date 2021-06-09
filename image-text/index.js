import icons from "./icons";

const {
    registerBlockType,
} = wp.blocks;

const { __ } = wp.i18n;

const {
    InnerBlocks,
    RichText,
    MediaUpload
} = wp.blockEditor;

const { Dashicon, PanelBody, Button, } = wp.components;

import classnames from "classnames";


registerBlockType('holviblocks/image-text', {
    title: 'Image Text',
    icon: 'align-pull-left',
    description: 'A block with an image a headline and copy',
    category: 'holvi-blocks',

    attributes: {
        bodyContent: {
            type: 'string'
        },
        headerContent: {
            type: 'string'
        },
        imageUrl: {
            type: 'string',
        },

    },


    edit(props) {
        const { className, setAttributes } = props;
        const {  attributes, isSelected, bodyContent,headerContent } = props;

        const getImageButton = (openEvent) => {
            if(attributes.imageUrl) {
                return (
                    <img
                        src={ attributes.imageUrl }
                        onClick={ openEvent }
                    />
                );
            }
            else {
                return (
                    <div className="button-container">
                        <Button
                            onClick={ openEvent }
                            className="button button-large"
                        >
                            Add an image
                        </Button>
                    </div>
                );
            }
        };

        const onRemoveImage = () => {
            setAttributes({
                imageUrl: null,
            });
        }
        const ALLOWED_BLOCKS = [ 'holviblocks/heading', 'holviblocks/paragraph','holviblocks/button', 'holviblocks/list' ];
        const setTemplate = [
            [ 'holviblocks/heading', {} ],
        ];
        return [

            <div className={ classnames( className, "row" ) } >
                    { ! attributes.imageUrl ? (

                    <MediaUpload
                        onSelect={ media => { setAttributes({imageUrl: media.sizes.thumbnail.url}); } }
                        type="image"
                        value={ attributes.imageUrl }
                        render={ ({ open }) => getImageButton(open) }

                    />
                    ) : (

                    <div className="col-4 p-0">
                        <img
                            className='img-fluid lazyloaded'
                            src={ attributes.imageUrl }
                        />

                        { isSelected ? (

                            <Button
                                className="remove-image"
                                onClick={ onRemoveImage }
                            >
                                { icons.remove }
                            </Button>

                        ) : null }</div>
                    )}


                <div className="col-8">
                    <InnerBlocks
                        template={ setTemplate }
                        allowedBlocks={ ALLOWED_BLOCKS } />
                </div>
            </div>,
        ];
    },


    save(props) {
        const {  attributes } = props;
        const { className, } = props;

        const image = (src, alt) => {
            if(!src) return null;

            if(alt) {
                return (
                    <img
                        src={ src }
                    />
                );
            }

            return (
                <img
                    className='img-fluid lazyloaded'
                    src={ src }
                    aria-hidden="true"


                />
            );
        };


        return (
            <div className={ classnames( className, "row" ) }>
                <div className= "col-4 p-0">
                    { image(attributes.imageUrl) }
                </div>
                <div className="col-8">
                    <InnerBlocks.Content/>
                </div>
            </div>
        );
    },
});