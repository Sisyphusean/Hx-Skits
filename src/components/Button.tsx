import { buttonProps } from "../interfaces/propinterfaces";

export const buttonTailwindStyles = {
    filled: "transition flex flex-row items-center text-white p-4 gap-2 border border-deepBlue-300\
    rounded-md bg-deepBlue-500 visible\
    xxs:w-full xxs:justify-center \
    s:flex s:w-full s:justify-center\
    sm:justify-start\
    hover:text-white hover:font-bold hover:bg-deepBlue-400 hover:scale-105\
    active:text-white active:font-bold active:bg-deepBlue-500 active:scale-100",


    outlined: "flex flex-row gap-1 justify-items-center items-center border-2 border-deepBlue-500 text-deepBlue-500 \
    rounded-lg p-4 w-full transition font-medium \
    hover:text-charlestoneGreen hover:font-medium hover:bg-deepBlue-100 hover:scale-101 \
    active:text-white active:font-bold active:bg-deepBlue-500 active:scale-95",


    text: " transition-all rounded-md font-medium text-charlestoneGreen py-2 px-4 border-2 border-deepBlue-500 \
    active:scale-95 active:font-bold active:bg-clouds",

    disabled: "bg-neutral-200 text-gray-400 font-bold p-4 rounded cursor-not-allowed rounded-md \
    xxs:w-full xxs:justify-center\
    s:flex s:w-full s:justify-start"
}



export default function Button(props: buttonProps) {

    const { buttonClassType, buttonType, buttonText, overrideClasses, buttonIcon, onClick } = props

    const buttonIcons = {
        arrowRight: "/assets/arrowRight.svg"
    }

    const activeButtonStyle = buttonTailwindStyles[buttonClassType]


    return (
        <button
            disabled={buttonClassType === "disabled"}
            onClick={onClick ? onClick : () => { }}
            className={activeButtonStyle + " " + overrideClasses}
            type={buttonType}
        >
            {buttonText}

            {buttonIcon && buttonClassType !== "disabled"
                && buttonIcons[buttonIcon] ?
                <img className="fill-black" src={buttonIcons[buttonIcon]} alt={props.buttonIcon} />
                : null}
        </button>
    )
}