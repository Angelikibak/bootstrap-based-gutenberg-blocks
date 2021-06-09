import icon from './icon';
/**
 * * Internal block libraries
 */
const { __ } = wp.i18n;
const {   registerBlockType } = wp.blocks;
const {
    InnerBlocks,
} = wp.blockEditor;
/**
 * Register block
 */
export default registerBlockType(
    'holviblocks/two-button',
    {
        title: __( 'Two Button', 'holviblocks' ),
        description: __( 'Add two buttons', 'holviblocks' ),
        category: 'holvi-blocks',
        icon,
        keywords: [
            __( 'Button', 'holviblocks' ),
            __( 'Call to action', 'holviblocks' ),
            __( 'Links', 'holviblocks' ),
        ],

        edit() {

            const setTemplate = [
                [ 'holviblocks/button', { btnClassWrapper : 'col-auto' } ],
                [ 'holviblocks/button', { btnClassWrapper : 'col-auto' } ],
            ];

            return (
                <div className='row'>
                        <InnerBlocks
                            template={ setTemplate }
                            templateLock="all"
                        />
                    </div>
            );
        },


        save() {

            return (
                <div className='row '>
                    <InnerBlocks.Content/>
                </div>
            );
        },
    },
);
