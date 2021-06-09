import icon from './icon';
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


class TwoColumnsBlock extends Component {
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
            horizontalAlignment,
            verticalAlignment,
            backgroundImage,
            backgroundImageMob,
            header,
            subHeader,
            headerText,
            subHeaderText,
            dividerTop,
            dividerBottom,
            hideBg,
            id,
            reducedPadding,
        } = attributes;
        const {
            className } = attributes;
        const ALLOWED_BLOCKS = [ 'holviblocks/column' ];
        const setTemplate = [
            [ 'holviblocks/column', { columnWidth : 'col-12 col-md-6', padding: true } ],
            [ 'holviblocks/column', { columnWidth : 'col-12 col-md-6', padding: true } ],
        ];

        const classes = classnames([
            `row`,
            horizontalAlignment ? ` justify-content-${horizontalAlignment}` : '',
            verticalAlignment ? ` align-items-${verticalAlignment}` : '' ]);

        const onRemoveImage = () => {
            setAttributes({
                backgroundImage: null
            });
        }
        const onRemoveMobImage = () => {
            setAttributes({
                backgroundImageMob: null
            });
        }


        return ([
            <InspectorControls>
                <PanelBody title={ __( 'Section ID ', 'holviblocks' ) }>
                    <TextControl
                        label={ __( '#id', 'holviblocks' ) }
                        value={ id || '' }
                        onChange={id => setAttributes({ id })}
                    />
                </PanelBody>
                <PanelBody title={ __( "Column Settings" ) } initialOpen={ false }>
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
                            label={ __( "Desktop background image" ) }>
                            <MediaUpload
                                title={ __( "Select Background Image"  ) }
                                onSelect={ ( newImage ) => setAttributes( { backgroundImage:  newImage.sizes.full.url } ) }
                                type="image"
                                value={ backgroundImage }
                                render={ ( { open } ) => (
                                    <Button isDefault onClick={ open }>
                                        { ! backgroundImage ? __( "Select Background Image" ) : __( "Replace image" ) }
                                    </Button>
                                ) }
                            />
                            <PanelRow>
                            <Button className=" rm-btn" onClick={ onRemoveImage } isLink isDestructive>
                                { __( "Remove Image" ) }
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
                                onSelect={ ( newBgImage ) => setAttributes( { backgroundImageMob:  newBgImage.sizes.full.url } ) }
                                type="image"
                                value={ backgroundImageMob }
                                render={ ( { open } ) => (
                                    <Button isDefault onClick={ open }>
                                        { ! backgroundImageMob ? __( "Select Background Image" , 'holviblocks') : __( "Replace image", 'holviblocks' ) }
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
                        <strong>Hide background image in mobile</strong>
                        <ToggleControl
                            checked={ hideBg }
                            onChange={hideBg => setAttributes({ hideBg })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <strong>Add a top wave divider</strong>
                        <ToggleControl
                            checked={ dividerTop }
                            onChange={dividerTop => setAttributes({ dividerTop })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <strong>Add a bottom wave divider</strong>
                        <ToggleControl
                            checked={ dividerBottom }
                            onChange={dividerBottom => setAttributes({ dividerBottom })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <strong>Add A Header</strong>
                        <ToggleControl
                            checked={header}
                            onChange={header => setAttributes({ header })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <strong>Add A Subheader</strong>
                        <ToggleControl
                            checked={subHeader}
                            onChange={subHeader => setAttributes({ subHeader })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <strong>Reduced section padding</strong>
                        <ToggleControl
                            checked={reducedPadding}
                            onChange={reducedPadding => setAttributes({ reducedPadding })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <strong>Horizontal Alignment</strong>
                        <SelectControl
                            value={ horizontalAlignment }
                            onChange={ ( alignment ) => setAttributes( { horizontalAlignment: alignment } ) }
                            options={ [
                                { value: "start", label:  "Left"  },
                                { value: "center", label:  "Center"  },
                                { value: "end", label:  "Right"  },
                                { value: "between", label:  "Between" },
                            ] }
                        />
                    </PanelRow>
                    <PanelRow>
                        <strong>Vertical Alignment</strong>
                        <SelectControl
                            value={ verticalAlignment }
                            onChange={ ( alignment ) => setAttributes( { verticalAlignment: alignment } ) }
                            options={ [
                                { value: "start", label:  "Top"  },
                                { value: "center", label:  "Center"  },
                                { value: "end", label:  "Bottom"  },
                                { value: "stretch", label:  "Stretch" },
                            ] }
                        />
                    </PanelRow>
                </PanelBody>
            </InspectorControls>,
            <section
                id={id ? `${id}` : ''}
                className={ classnames(
                    className,
                    'section-padding position-relative',
                    attributes.backgroundColor ? `bg-${backgroundColor.slug}` : '' ,
                    { 'wave-top': dividerTop },
                    { 'wave-bottom': dividerBottom },
                    { 'reduced-section-padding': reducedPadding },
                ) }>
                {  backgroundImage ?
                    <div className={ classnames( "bg-img", { 'd-none d-md-block': hideBg }) } data-url= { backgroundImage } >
                        <img src={ backgroundImage }
                             alt=""
                             aria-hidden="true"
                             width="100%"
                             height="100%"
                             display="none"
                             className="img-fluid lazyloaded"/>
                    </div> : null   }
                {  backgroundImageMob ?
                    <div className={ classnames( "bg-img-mobile" ) } data-url= { backgroundImageMob } >
                        <img src={ backgroundImageMob }
                             alt=""
                             aria-hidden="true"
                             width="100%"
                             height="100%"
                             display="none"
                             className="img-fluid lazyloaded"/>
                    </div> : null   }
                <div className="container">
                    { header || subHeader ?
                        <div className= 'row'>
                            <div className= 'col-12'>
                                { header &&
                                <RichText
                                    tagName='h2'
                                    value={headerText}
                                    onChange={(newHeaderText) =>
                                        setAttributes({headerText: newHeaderText})
                                    }
                                    placeholder={ __('Here you can a header' , 'holviblocks' ) }
                                    className={classnames('header text-md-center')}
                                />
                                }
                                { subHeader &&
                                <RichText
                                    tagName='p'
                                    value={subHeaderText}
                                    onChange={(newSubHeaderText) =>
                                        setAttributes({subHeaderText: newSubHeaderText})
                                    }
                                    placeholder={  __('Here you can a subheader' , 'holviblocks' ) }
                                    className={classnames('subheader text-md-center')}
                                />
                                }
                            </div>
                        </div>: ''
                    }
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
    'holviblocks/columns-2',
    {
        title: __( 'Columns 2', 'holviblocks' ),
        description: __( 'Create a two columns layout', 'holviblocks' ),
        category: 'holvi-columns',
        icon,
        supports: {
            align: [ 'full' ],
        },
        keywords: [
            __( 'Column 2', 'holviblocks' ),
            __( 'Layout', 'holviblocks' ),
            __( 'col row', 'holviblocks' ),
        ],
        attributes: {
            align: {
                type: "string",
                default: "full"
            },
            backgroundImage: {
                type: "string",
            },
            backgroundImageMob: {
                type: "string",
            },
            backgroundColor: {
                type: "string",
            },
            color: {
                type: "string",
            },
            verticalAlignment: {
                type: 'string',
            },
            horizontalAlignment: {
                type: 'string',
            },
            header: {
                type: 'boolean'
            },
            subHeader: {
                type: 'boolean'
            },
            headerText: {
                type: "string",
            },
            subHeaderText: {
                type: "string",
            },
            dividerTop: {
                type: "boolean",
            },
            dividerBottom: {
                type: "boolean",
            },
            hideBg: {
                type: "boolean",
                default: false
            },
            id: {
                type: "string",
            },
            reducedPadding: {
                type: "boolean",
            },
        },
        edit: compose([
            withColors( { backgroundColor: 'backgroundColor'} ),
            FallbackStyles,
        ])( TwoColumnsBlock ),


        save: ( { attributes } ) => {
            const {
                backgroundImage,
                backgroundImageMob,
                backgroundColor,
                horizontalAlignment,
                verticalAlignment,
                header,
                subHeader,
                headerText,
                subHeaderText,
                dividerTop,
                dividerBottom,
                hideBg,
                id,
                reducedPadding
            } = attributes;

            const {
                className } = attributes;

            return (
                <section
                    id={id ? `${id}` : ''}
                    className={ classnames(
                        className,
                        backgroundColor ? ` bg-${backgroundColor}` : '' ,
                        backgroundImage ? ` has-bg` : '' ,
                        backgroundImageMob ? `has-m-bg` : '' ,
                        'section-padding position-relative',
                        { 'wave-top': dividerTop },
                        { 'wave-bottom': dividerBottom },
                        { 'reduced-section-padding': reducedPadding },

                    ) }
                >
                    { backgroundImage ?
                        <div className={ classnames( "bg-img", { 'd-none d-md-block': hideBg }) }>
                            <img src={ backgroundImage }
                                 alt=""
                                 aria-hidden="true"
                                 width="100%" height="auto"
                                 className="img-fluid lazyloaded"/>
                        </div>  : null   }
                    {  backgroundImageMob ?
                        <div className={ classnames( "bg-img-mobile" ) } >
                            <img src={ backgroundImageMob }
                                 alt=""
                                 aria-hidden="true"
                                 width="100%"
                                 height="100%"
                                 display="none"
                                 className="img-fluid lazyloaded"/>
                        </div> : null   }
                    <div className="container">
                        { header || subHeader ?
                            <div className={'row'}>
                                <div className= 'col-12'>
                                    { header &&
                                    <RichText.Content
                                        tagName='h2'
                                        value={headerText}
                                        className={classnames('header text-md-center')}
                                    /> }
                                    { subHeader &&
                                    <RichText.Content
                                        tagName='p'
                                        value={subHeaderText}
                                        className={classnames('subheader text-md-center')}
                                    />
                                    }
                                </div>
                            </div>: ''
                        }
                        <div className={ classnames(
                            "row",
                            horizontalAlignment ? ` justify-content-${horizontalAlignment}` : '',
                            verticalAlignment ? ` align-items-${verticalAlignment}` : '') }
                        >

                            <InnerBlocks.Content/>
                        </div>
                    </div>
                </section>

            );
        },
    },
);
