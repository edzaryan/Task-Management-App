import clsx from "clsx";


const Button = ({ icon, className, label, type = "button", onClick = () => {} }) => {
    return (
        <button
            onClick={onClick}
            className={clsx("px-3 py-2 outline-none", className)}
            type={type}
            aria-label={label}
        >
            <span>{label}</span>
            {icon && icon}
        </button>
    )
}

export default Button;