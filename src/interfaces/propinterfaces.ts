//Types
import { UseFormRegister } from "react-hook-form/dist/types/form"
import { buttonClassTypes, buttonIcons, buttonTypes, userType } from "../types/types"

//IMport Login Form
import { loginForm } from "./forminterfaces"

//RHF type import
import { FieldValues } from "react-hook-form"

/**
 * These are props that are passed to the Input component
 */
export interface textInputProps {
    //This is the label of the input field
    label: string,
    //This is the placeholder of the input field
    placeholder: string,
    //This is the type of the input field
    type: string,
    //This is the id of the input field
    id: string,
    //This is the help text of the input field that renders on the right
    helpText: string | null,
    //This is the error message of the input field that renders below the input field
    errorMessage: string | null,
    //This is the callback to the RHF register
    register: UseFormRegister<FieldValues>
}

export interface selectInputProps {
    //This is the label of the select field
    label: string,
    //This is the id of the select field
    id: string,
    //This is the help text of the select field that renders on the right
    helpText: string | null,
    //This is the title of the select field
    title: string,
    //This is the error message of the select field that renders below the input field
    errorMessage: string | null,
    //This is the options of the select field
    options: string[],
    //This is the callback to the RHF register
    register: UseFormRegister<FieldValues>
}




/**
 * These are props that are passed to the skitName component
 */
export interface skitNameProps {
    //This is the name of the current mark
    marksCurrentName: string,
    //This is whether or not the current mark should be gaslighted
    shouldUserGaslightTheMark: boolean
}

/**
 * These are props that are passed to the activeTags component
 */
export interface activeTagsProps {
    //These are the current tags that Hyphonix is currently using
    tags: string[]
}

/**
 * This interface is passed to the gaslight indicator
 */
export interface gaslightIndicatorProps {
    //This is whether or not the current mark should be gaslighted
    shouldUserGaslightTheMark: boolean
}

/**
 * This interface is used to set the type of the props passed to the HomePageSkitComponent
 */
export interface homePageSkitComponentProps {
    //This is the name of the current name
    marksCurrentName: string,
    //These are the current tags that Hyphonix is currently using
    tags: string[]
    //This is whether or not the current mark should be gaslighted
    shouldUserGaslightTheMark: boolean,

}

/**
 * This interface is use to indicate the possible states of the radios in the AdminPageNameSkit component
 */
export interface nameSkitRadioStates {
    //This is the first possible state of the radio. It prompts the user to say a name
    sayName: string,
    //This is the second possible state of the radio. It prompts the user to gaslight the mark
    gaslightMark: string,
}

/**
 * This interface is used to indicate the props
 * used in the radio Component
 */
export interface radioProps {
    /**This is what is used to determine the htmlFor and Id of the radio component */
    id: string,
    /**This is the label of the radio component */
    label: string,
    /**This is the name that is assigned to the radio group to make them mutually exclusive */
    name: string,
    /**This is the value held by the radio */
    value: string,
    /**This is the value used to set if the radio's is active or not. If selected it will match the id of the radio */
    setActiveRadio?: React.Dispatch<React.SetStateAction<null>>,
    /** This is the active user Type that has been selected */
    selectedUserType?: string,
    /** This is the callback to the RHF register*/
    register: UseFormRegister<FieldValues>
}

/**
 * This interface is used to indicate the props
 * used in the button Component
 */
export interface buttonProps {
    //This is the class type of the button
    buttonClassType: buttonClassTypes,
    //This is the text of the button
    buttonText: string
    //This is the HTML type of the button
    buttonType: buttonTypes,
    //These are the possible icons of the button
    buttonIcon?: buttonIcons,
    //These are override classes that are used to override the default classes
    overrideClasses?: string,

}

export interface homePageLiveIndicatorProps {
    //This is whether or not Hyphonix is live on Twitch
    isHyphonixLiveOnTwitch: boolean,
    //This is the link to Hyphonix's live Twitch stream
    linkToHyphonixTwitch?: string,
    //This is whether or not Hyphonix is live on Youtube
    isHyphonixLiveOnYoutube: boolean,
    //This is the link to Hyphonix's live Youtube stream
    linkToHyphonixYoutube?: string,
}
