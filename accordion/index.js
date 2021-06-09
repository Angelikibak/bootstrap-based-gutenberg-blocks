
import classnames from 'classnames';
import edit from "../accordion/edit";
/**
 * * Internal block libraries
 */
const { __ } = wp.i18n;
const {   registerBlockType } = wp.blocks;
const {
    InnerBlocks,
    BlockControls,
    BlockAlignmentToolbar,
    ColorPalette,
    InspectorControls,
    MediaUpload,
    PanelColorSettings,
    RichText,    
} = wp.blockEditor;
const{
    useCallback,
} = wp.element;
const {
    compose,
    withInstanceId,
} = wp.compose;
const {
    PanelBody,
    TextControl,
    RangeControl,
    Button,
    BaseControl,
    withNotices,
    ToggleControl,
    PanelRow,
} = wp.components

const {
    Fragment,
} = wp.element



/**
 * Register block
 */
export default registerBlockType(
    'holviblocks/accordion',
    {
        title: __( 'Accordion', 'holviblocks' ),
        description: __( 'Create an accordion', 'holviblocks' ),
        category: 'holvi-section',
        icon: 'menu-alt',
        supports: {
            align: [ 'full' ],
        },
        keywords: [
            __( 'Accordion', 'holviblocks' ),
            __( 'Toggle', 'holviblocks' ),
            __( 'FAQ', 'holviblocks' ),
        ],
        attributes: {
            align: {
                type: "string",
                default: "full"
            },
            columnWidth: {
                type: "string",
                default: "col-8"
            },
            idAcc:{
                type: 'string',
            },
            instanceId: {
                type: 'string',
            },
            ariaExpanded: {
                type: 'string',
            },
            collapsed: {
                type: 'string',
            },
            collapseShow: {
                type: 'string',
            },
            headerText: {
                type: "string",
            },
            backgroundColor: {
                type: "string",
            }

        },
        edit,

        save: ( { attributes, setAttributes } ) => {

            const { className, instanceId, idAcc,  headerText, backgroundColor } = attributes;
            const sectionClass = classnames(
                    className,
                    'section-padding position-relative accordion',
                    backgroundColor ? ` bg-${backgroundColor}` : '' ,
            );
            return (
                <section className={sectionClass}>
                    <div className="container">
                        { headerText ?
                            <div className={'row'}>
                                <div className= 'col-12'>
                                    <RichText.Content
                                        tagName='h2'
                                        value={headerText}
                                        className={classnames('header text-md-center')}
                                    />
                                </div>
                            </div>
                            : ''
                        }
                        <div className="row justify-content-center">
                            <div className={ classnames( 'col-12 col-md-8') } id={ `${ idAcc }` }>
                                <InnerBlocks.Content
                                />
                            </div>
                        </div>
                    </div>
                </section>

            );
        },
    },
);
