import classnames from "classnames";

export default function save( { attributes } ) {
    const {
        images,
    } = attributes;

    return (
        <div id="slideshow-controls" className="carousel slide" data-ride="carousel">
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
    );
}