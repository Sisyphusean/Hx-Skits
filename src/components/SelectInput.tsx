//Import Interfaces
import { selectInputProps } from "../interfaces/propinterfaces";

export default function Select({ register, ...props }: selectInputProps) {
    const { label, id, helpText, errorMessage, title, options } = props

    const getSkitTypes = () => {
        return options.map((skitType, index) => {

            let displayedSkitName = ""

            if (skitType === "nameSkit") displayedSkitName = "Name Skit"
            if (skitType === "none") displayedSkitName = "Select a skit"

            return (
                <option
                    key={index}
                    className="inline"
                    value={skitType}
                >
                    {displayedSkitName}
                </option>
            )
        })
    }


    return (
        <div className=" w-full">

            <label
            >
                <span
                    className="flex sm:flex-row xxs:flex-col sm:items-center xxs:items-start gap-2">
                    <span
                        className="sm:w-full xxs:w-auto"
                    >
                        {label}
                    </span>
                    {helpText && <span className="leading-none text-xs text-gray-500 md:text-s">{helpText}</span>}
                </span>
            </label>

            <select
                defaultValue={options[1]}
                title={title}
                className="transition border-silver border-2 cursor-pointer rounded-lg px-4 py-3 mt-2 w-full
        hover:border-deepBlue-500 hover:font-medium hover:bg-gray-100"
                id={id}
                {...register(id, { required: true })}
            >

                {getSkitTypes()}

            </select>

            {errorMessage && <span className="text-pomegranate-500 font-medium text-xs md:text-s">{errorMessage} </span>}
        </div>
    )
}