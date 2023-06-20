//Import Interfaces
import { selectInputProps } from "../interfaces/propinterfaces";

export default function Select({ register, ...props }: selectInputProps) {
    const { label, id, helpText, errorMessage, title, options, placeholder } = props

    const getSkitTypes = () => {
        return options.map((skitType, index) => {

            let displayedSkitName = ""

            if (skitType === "nameSkit") displayedSkitName = "Name Skit"
            if (skitType === "none") displayedSkitName = "None (John is just livestreaming)"

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
                title={title}
                className={`transition border-2 ${(errorMessage !== undefined && errorMessage !== null) ? "border-pomegranate-500" : "border-silver"}
                cursor-pointer rounded-lg px-4 py-3 mt-2 w-full
                hover:border-deepBlue-500 hover:font-medium hover:bg-gray-100`}
                id={id}
                {...register(id, { required: true })}
            >
                <option
                    disabled
                    value="default"
                >
                    {placeholder}
                </option>
                {getSkitTypes()}

            </select>

            {(errorMessage !== undefined && errorMessage !== null)
                ? <span className="text-pomegranate-500 font-medium text-xs md:text-s">
                    {errorMessage}
                </span> : ""}
        </div>
    )
}