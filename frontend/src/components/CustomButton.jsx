import { Link } from "react-router-dom";

const ButtonCustom = ({
    href = "",
    label = "Click Me",
    imgsrc = null,
    large = true,
    textCenter = false,
    bold = false,
    roundedFull = true,
    disable = false,
    Ricon = null,
    ClassName = ""
}) => {
    const commonClasses = `inline-flex items-center gap-2 px-2 py-1 bg-[#9614e6] border-2 border-[#9614e6] text-white 
        ${roundedFull ? "rounded-full" : "rounded"} 
        ${textCenter ? "justify-center" : ""} 
        ${disable ? "opacity-50 cursor-not-allowed" : "hover:bg-[#7612bd] Prim_Button"} 
    ` + ClassName;

    const content = (
        <>
            <span className={`${large ? "text-xl" : "text-md"} ${bold ? "font-semibold" : ""} z-10`} >
                {label}
            </span>
            {imgsrc && <img src={imgsrc} alt="icon" className="z-20 w-5 h-5 border-2 rounded-full border-[#9614e6]" />}
            {Ricon && <Ricon/>}
        </>
    );

    return href ? (
        <Link to={href} className={commonClasses}>
            {content}
        </Link>
    ) : (
        <button disabled={disable} className={commonClasses}>
            {content}
        </button>
    );
};

export default ButtonCustom;
