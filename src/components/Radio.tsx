

//Import Radio's prop interface
import { radioProps } from "../interfaces/propinterfaces";

//Import Styling
import { buttonTailwindStyles } from "./Button";

//Import svg
import { TwitchSVG } from "./svgs/TwitchSvg";
import { YoutubeSvg } from "./svgs/YoutubeSvg";

export default function RadioInput({ register, ...props }: radioProps) {
    let platform;
    let svg;
    let textColor;

    if (props.additionalVariables?.platform === 'youtube') {
        platform = "youtube"
        svg = <YoutubeSvg className="fill-pomegranate-500" />
        textColor = "text-pomegranate-500"
    }

    if (props.additionalVariables?.platform === 'twitch') {
        platform = "twitch"
        svg = <TwitchSVG className="fill-twitch-500" />
        textColor = "text-twitch-500"
    }

    if (!props.additionalVariables?.platform) {
        platform = "none"
        svg = null
        textColor = "text-charlestoneGreen"
    }

    return (
        <label htmlFor={props.id}
            className={
                    buttonTailwindStyles.outlined + " " + props.overrideClasses
            }>
            <input
                id={props.id}
                type="radio"
                placeholder={props.value}
                value={props.value}
                {...register(props.name, { required: true })}
                className={textColor}
            />
            <span className={textColor} >
                {props.label}
            </span>
            {svg}
        </label>
    )
}