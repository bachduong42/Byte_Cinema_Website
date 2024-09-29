import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
function Button({
    children,
    className,
    color,
    text,
    primary,
    secondary,
    to,
    href,
    onClick,
    active,
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

            className={`lg:text-xl md:text-base text-sm cursor-pointer font-semibold nunito-text
        ${primary ? " bg-[#FE9051] rounded-[5px] lg:w-[140px] lg:h-[50px] md:w-[120px] md:h-[35px] w-[80px] h-[25px] text-white" : ""}
        ${secondary ? " bg-[#00B3FF] rounded-[5px] lg:w-[140px] lg:h-[50px] md:w-[120px] md:h-[35px] w-[80px] h-[25px] text-white hover:bg-white hover:text-[#0DB1F6] transition-all duration-500" : ""}
        ${text ? "text-black" : ""}
         ${active ? "border-b-2 border-white pb-2" : ""}
          ${color ? `text-[${color}] hover:text-white` : "text-white"} 
        `}
            {...props}
        >{children}</Comp>
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