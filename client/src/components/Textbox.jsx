import clsx from "clsx";


const Textbox = ({ 
    type = "text", placeholder, label, className, register, name, error 
}) => {

    return (
        <div className="w-full flex flex-col gap-1">
            {label && <label htmlFor={name} className="text-gray-600">{label}</label>}
            <div>
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    {...(register ? register(name) : {})} 
                    aria-invalid={error ? "true" : "false"}
                    className={clsx(
                        `bg-transparent px-3 py-2.5 border border-gray-300 placeholder-gray-400 
                        text-gray-900 outline-none text-base focus:ring-2 ring-blue-300`, 
                        className
                    )}
                />
            </div>
            {error && <span className="text-xs text-red-500 mt-0.5">{error}</span>}
        </div>
    );
};

export default Textbox;
