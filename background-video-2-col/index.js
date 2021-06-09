
import classnames from 'classnames';
/**
 * * Internal block libraries
 */
const { __ } = wp.i18n;
const {   registerBlockType } = wp.blocks;
const {
    InnerBlocks,
    InspectorControls,
    MediaUpload,
    PanelColorSettings,
    withColors,
    RichText
} = wp.blockEditor;

const {
    PanelBody,
    SelectControl,
    Button,
    BaseControl,
    ToggleControl,
    PanelRow,
    withFallbackStyles,
    TextControl,
} = wp.components;

const {
    Component,
    Fragment,
} = wp.element;

const {
    compose
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


class TwoColumnsBlockVideoBg extends Component {
    constructor() {
        super(...arguments);
    }

    render() {
        const {
            attributes,
            setAttributes,
            setBackgroundColor,
            backgroundColor,
        } = this.props;
        const {
            backgroundImageMobile,
            hideBg,
            id,
            backgroundVideo,
            autoplay,
            loop,
            backgroundImageMobileBehind
        } = attributes;
        const {
            className } = attributes;
        const ALLOWED_MEDIA_TYPES = [ 'video' ];


        const ALLOWED_BLOCKS = [ 'holviblocks/column' ];
        const setTemplate = [
            [ 'holviblocks/column', { columnWidth : 'col-12 col-md-6', padding: true } ],
            [ 'holviblocks/column', { columnWidth : 'col-12 col-md-6', padding: true } ],
        ];

        const classes = classnames([
            `row`]);

        const onRemoveVideo = () => {
            setAttributes({
                backgroundVideo: null
            });
        };
        const onRemoveMobImage = () => {
            setAttributes({
                backgroundImageMobile: null
            });
        };
        const toggleAttribute = ( attribute ) => {
            return ( newValue ) => {
                setAttributes( { [ attribute ]: newValue } );
            };
        };

        return ([
            <InspectorControls>
                <PanelBody title={ __( 'Section ID ', 'holviblocks' ) }>
                    <TextControl
                        label={ __( '#id', 'holviblocks' ) }
                        value={ id || '' }
                        onChange={id => setAttributes({ id })}
                    />
                </PanelBody>
                <PanelBody title={ __( "Background Settings" ) } initialOpen={ false }>
                    <PanelColorSettings
                        title={ __("Color Settings", "holviblocks")}
                        colorSettings={[
                            {
                                label: __("Background Color", "holviblocks"),
                                onChange: setBackgroundColor,
                                value: backgroundColor.color ,
                                disableCustomColors: true,
                            }
                        ]}
                    />
                    <Fragment>
                        <BaseControl
                            className="editor-bg-image-control"
                            label={ __( "Desktop background Video" ) }>
                            <MediaUpload
                                title={ __( "Select Background Video"  ) }
                                onSelect={ ( newVideo ) => setAttributes( { backgroundVideo:  newVideo.url } ) }
                                type="video"
                                allowedTypes={ ALLOWED_MEDIA_TYPES }
                                value={ backgroundVideo }
                                render={ ( { open } ) => (
                                    <Button isDefault onClick={ open }>
                                        { ! backgroundVideo ? __( "Select Background Video" ) : __( "Replace Video" ) }
                                    </Button>
                                ) }
                            />
                            <PanelRow>
                                <Button className=" rm-btn" onClick={ onRemoveVideo } isLink isDestructive>
                                    { __( "Remove Video" ) }
                                </Button>
                            </PanelRow>
                        </BaseControl>
                    </Fragment>
                    <Fragment>
                        <BaseControl
                            className="editor-bg-image-control"
                            label={ __( "Mobile background Image", 'holviblocks' ) }>
                            <MediaUpload
                                title={ __( "Select Background Image for Mobile", 'holviblocks' ) }
                                onSelect={ ( newBgImage ) => setAttributes( { backgroundImageMobile:  newBgImage.sizes.full.url } ) }
                                type="image"
                                allowedTypes='image'
                                value={ backgroundImageMobile }
                                render={ ( { open } ) => (
                                    <Button isDefault onClick={ open }>
                                        { ! backgroundImageMobile ? __( "Select Background Image" , 'holviblocks') : __( "Replace image", 'holviblocks' ) }
                                    </Button>
                                ) }
                            />
                            <PanelRow>
                                <Button className=" rm-btn" onClick={ onRemoveMobImage } isLink isDestructive>
                                    { __( "Remove Image" , 'holviblocks' ) }
                                </Button>
                            </PanelRow>
                        </BaseControl>
                    </Fragment>
                    <PanelRow>
                        <strong>Hide background video in mobile</strong>
                        <ToggleControl
                            checked={ hideBg }
                            onChange={hideBg => setAttributes({ hideBg })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <strong>Move mobile background image behind text</strong>
                        <ToggleControl
                            checked={ backgroundImageMobileBehind }
                            onChange={backgroundImageMobileBehind => setAttributes({ backgroundImageMobileBehind })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <strong>Autoplay</strong>
                        <ToggleControl
                            onChange={ toggleAttribute( 'autoplay' ) }
                            checked={ autoplay }
                        />
                    </PanelRow>
                    <PanelRow>
                        <strong>Loop</strong>
                        <ToggleControl
                            onChange={ toggleAttribute( 'loop' ) }
                            checked={ loop }
                        />
                    </PanelRow>
                </PanelBody>
            </InspectorControls>,
            <section
                id={id ? `${id}` : ''}
                className={ classnames(
                    className,
                    'video-section-padding position-relative',
                    attributes.backgroundColor ? `bg-${backgroundColor.slug}` : '' ,
                ) }>
                { backgroundVideo ?
                    <div className={ classnames( "bg-video", { 'd-none d-md-block': hideBg } ) }  data-url= { backgroundVideo } >
                        <video  src={ backgroundVideo }
                                alt=""
                                id="section-video"
                                display="none"
                                autoPlay={ autoplay }
                                muted
                                loop={ loop } />
                    </div>  : null   }
                {  backgroundImageMobile ?
                    <div className={ classnames( "bg-img-mobile" ) } data-url= { backgroundImageMobile } >
                        <img src={ backgroundImageMobile }
                             alt=""
                             aria-hidden="true"
                             width="100%"
                             height="100%"
                             display="none"
                             className="img-fluid lazyloaded"/>
                    </div> : null   }
                <div className="container">
                    <div className={classes}>
                        <InnerBlocks
                            template={ setTemplate }
                            allowedBlocks={ ALLOWED_BLOCKS } />
                    </div>
                </div>
            </section>

        ]);
    }
}


/**
 * Register block
 */
export default registerBlockType(
    'holviblocks/background-video-2-col',
    {
        title: __( 'Background video with 2 columns', 'holviblocks' ),
        description: __( 'Add a background video in your section.', 'holviblocks' ),
        category: 'holvi-section',
        icon: 'video-alt3',
        keywords: [
            __( 'Video', 'holviblocks' ),
            __( 'Background video', 'holviblocks' ),
            __( 'movie', 'holviblocks' ),
        ],
        supports: {
            align: [ 'full' ],
        },
        attributes: {
            align: {
                type: "string",
                default: "full"
            },
            backgroundImageMobile: {
                type: "string",
            },
            backgroundColor: {
                type: "string",
            },
            color: {
                type: "string",
            },
            hideBg: {
                type: "boolean",
                default: false
            },
            backgroundImageMobileBehind: {
                type: "boolean",
                default: false
            },
            id: {
                type: "string",
            },
            backgroundVideo: {
                type: "string",
            },
            autoplay: {
                type: "boolean",
                source: "attribute",
                selector: "video",
                attribute: "autoplay",
                default: true
            },
            loop: {
                type: "boolean",
                source: "attribute",
                selector: "video",
                attribute: "loop"
            },
        },
        edit: compose([
            withColors( { backgroundColor: 'backgroundColor'} ),
            FallbackStyles,
        ])( TwoColumnsBlockVideoBg ),


        save: ( { attributes } ) => {
            const {
                backgroundImageMobile,
                backgroundColor,
                hideBg,
                id,
                backgroundVideo,
                autoplay,
                loop,
                backgroundImageMobileBehind
            } = attributes;

            const {
                className } = attributes;

            return (
                <section
                    id={id ? `${id}` : ''}
                    className={ classnames(
                        className,
                        backgroundColor ? ` bg-${backgroundColor}` : '' ,
                        backgroundVideo ? ` has-video-bg` : '' ,
                        backgroundImageMobile ? `has-m-bg` : '' ,
                        'video-section-padding position-relative',
                    ) }
                >
                    { backgroundVideo ?
                        <div className={ classnames( "bg-video", { 'd-none d-md-block': hideBg } ) } >
                            <video  src={ backgroundVideo }
                                    alt=""
                                    id="section-video"
                                    display="none"
                                    autoPlay={ autoplay }
                                    muted
                                    loop={ loop } />
                        </div>  : null   }
                    {  backgroundImageMobile ?
                        <div className={ classnames( "bg-img-mobile", { 'behind-text': backgroundImageMobileBehind }) } >
                            <img src={ backgroundImageMobile }
                                 alt=""
                                 aria-hidden="true"
                                 width="100%"
                                 height="100%"
                                 display="none"
                                 className="img-fluid lazyloaded"/>
                        </div> : null   }
                    <div className={ classnames( "container" ) } >
                        <div className={ classnames(
                            "row",
                        ) }
                        >

                            <InnerBlocks.Content/>
                        </div>
                    </div>
                </section>

            );
        },
    },
);
