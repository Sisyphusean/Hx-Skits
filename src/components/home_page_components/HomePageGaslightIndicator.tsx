//Interaces
import { gaslightIndicatorProps } from "../../interfaces/propinterfaces";

export default function GaslightIndicator(props: gaslightIndicatorProps) {
    const { shouldUserGaslightTheMark } = props

    return (
        <div
            title={`${shouldUserGaslightTheMark ? 'Gaslight the user!' : 'Say their name!'}`}
            className="flex flex-col flex-wrap items-center 
            xxs: pb-8
            md: pb-0">
            <img
                className="w-28"
                src={`${shouldUserGaslightTheMark ? './assets/gaslight.svg' : './assets/sayName.svg'}`}
                title=''
                alt={`${shouldUserGaslightTheMark ? 'gaslight_image' : 'say_name_image'}`}
            />
            {
                <div className="text-medium text-s text-center">
                    {
                        shouldUserGaslightTheMark
                            ? <p className="text-pomegranate-500 pt-2">Don’t say their name.<br /> Gaslight them!</p>
                            : <p className="text-nephritis-500 pt-2">Say their name!</p>
                    }
                </div>
            }
        </div>
    )
}