function Button({
    name,
    text,
    primary
}) {
    return (
        <button className={`text-xl
        ${primary ? "" : ""}`}
        >{name}</button>
    );
}

export default Button;