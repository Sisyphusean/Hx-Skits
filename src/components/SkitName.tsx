//Interfaces
import { skitNameProps } from "../interfaces/interfaces";

export default function SkitName(props: skitNameProps) {
    const { marksCurrentName, shouldUserGaslightTheMark } = props

    return (
        <div className="
        xxs:flex xxs:flex-wrap xxs:gap-4 xxs:flex-col xxs:pl-0 xxs:w-11
        s:inline s:pl-2
        m-0 pl-2 inline">
            <span className={`
            font-medium text-white ${shouldUserGaslightTheMark ? 'bg-pomegranate-500' : 'bg-nephritis-500'} 
            px-2 py-1 border rounded-md`}>
                {shouldUserGaslightTheMark ? 'Gaslight them!' : marksCurrentName}
            </span>
        </div>
    )
}