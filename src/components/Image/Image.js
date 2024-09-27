import PropTypes from 'prop-types';
function Image({
    src,
    alt,
    className
}

) {
    return (
        <img
            className={className}
            src={src} alt={alt}
        />
    );
}
Image.protoTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    className: PropTypes.node,
}
export default Image;