//Interfaces
import { inputProps } from "../interfaces/propinterfaces";

export default function Input(props: inputProps) {
    const { label, placeholder, type, id, helpText, errorMessage } = props
    return (
        <div className="m-0 w-full h-full">

            <label htmlFor={id} className="flex  flex-wrap justify-between   
            xxs:flex-col xxs:gap-2 xxs:items-start xxs:pb-2
            sm:flex-row sm:gap-0 sm:items-center sm:pb-0.5
            md:gap-2 md:pb-3
            lg:pb-0.5">
                {label}
                {helpText && <span className="leading-none text-xs text-gray-500 md:text-s">{helpText}</span>}
            </label>

            <input
                id={id}
                className={`border-2 rounded-md ${errorMessage ? "border-pomegranate-500" : "border-silver"} h-13 p-4 m-0 w-full
                    active:border active:border-belizeHole-500 
                    focus:border focus:border-belizeHole-500}`}
                type={type} placeholder={placeholder}
            />


            {errorMessage && <span className="text-pomegranate-500 font-medium text-xs md:text-s">{errorMessage} </span>}

        </div>
    )
}