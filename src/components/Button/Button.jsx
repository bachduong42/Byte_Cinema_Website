import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
function Button({
    children,
    className = '',
    color,
    text,
    primary,
    secondary,
    to,
    href,
    onClick,
    active,
    leftIcon,
    rightIcon,
    ...passProps
}) {
    let Comp = 'button'
    const props = {
        onClick,
        ...passProps,
    }
    if (to) {
        props.to = to
        Comp = Link
    } else if (href) {
        props.href = href
        Comp = 'a'
    }
    return (
        <Comp

            className={`cursor-pointer font-semibold nunito-text flex items-center justify-center
        ${primary ? "lg:text-xl md:text-base text-sm  bg-[#FE9051] rounded-[5px] lg:w-[140px] lg:h-[50px] md:w-[120px] md:h-[35px] w-[80px] h-[25px] text-white" : ""}
        ${secondary ? " bg-[#00B3FF] lg:text-xl md:text-base text-sm rounded-[5px] lg:h-[50px]  md:h-[35px]  h-[25px] text-white hover:bg-white hover:border hover:shadow-md hover:text-[#0DB1F6] transition-all duration-500" : ""}
        ${text ? "text-black lg:text-xl md:text-base text-sm" : ""}
        ${active ? "border-b-2 border-white pb-2" : ""}
        ${color ? `text-[${color}] hover:text-white` : "text-white"}
        ${className} 
        `}
            {...props}
        >
            {leftIcon && <span className="text-[20px]">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="">{rightIcon}</span>}</Comp>
    );
}
Button.protoTypes = {
    className: PropTypes.string,
    to: PropTypes.string,
    href: PropTypes.string,
    color: PropTypes.string,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    text: PropTypes.bool,
    active: PropTypes.bool,
}
export default Button;