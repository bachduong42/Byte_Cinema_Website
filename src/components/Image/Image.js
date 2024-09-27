import PropTypes from 'prop-types';
function Image({
    src,
    alt,
    width,
    height
}

) {
    return (
        <img
            src={src} alt={alt}
            width={width}
            height={height} />
    );
}
Image.protoTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
export default Image;