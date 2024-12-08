import PropTypes from 'prop-types';
function Image({
    src,
    alt,
    className,
    onClick
}

) {
    return (
        <img
            className={className}
            src={src} alt={alt}
            onClick={onClick}
        />
    );
}
Image.protoTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    className: PropTypes.node,
}
export default Image;