

//Import Radio's prop interface
import { radioProps } from "../interfaces/propinterfaces";

//Import Styling
import { buttonTailwindStyles } from "./Button";

export default function RadioInput({register, ...props}: radioProps) {
    return (
        <label htmlFor={props.id}
            className={
                props.selectedUserType === props.value ?
                    buttonTailwindStyles.filled + "justify-start":
                    buttonTailwindStyles.outlined 
            }>
            <input
                id={props.id}
                type="radio"
                placeholder={props.value}
                value={props.value} 
                {...register(props.name, {required: true})}/>
            {props.label}
        </label>
    )
}