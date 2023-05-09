//React
import { useState } from "react";

//Components
import Input from "../Input";

//Interfaces
import { nameSkitRadioStates } from "../../interfaces/propinterfaces";

export default function AdminPageNameSkitActivity() {
    let possibleRadioStates: nameSkitRadioStates = { sayName: "sayName", gaslightMark: "gaslightThem" }

    let radioStyle = `transition p-4 text-deepBlue-500 border border-deepBlue-500 rounded-lg\
    hover:text-black hover:bg-deepBlue-100 hover:font-medium hover:scale-105\
    active:text-black active:bg-deepBlue-200 active:font-medium active:scale-95\
    sm:text-left
    xxs:text-center`

    return (
        <div
            className="flex flex-col h-auto items-start bg-white text-charlestoneGreen p-6 rounded-md 
            xxs:w-full
            s:w-11/12
            md:w-8/12
            lg:w-6/12
            2xl:w-3/12">

            <div
                className="flex flex-row items-center justify-between w-full">
                <small>Name skit settings</small>

                <a
                    href=""
                    className="decoration-underline text-xs text-deepBlue-500 underline">
                    Change the skit
                </a>

            </div>

            <div
                className="flex-col w-full">

                <form className="flex flex-col gap-6 mt-8 w-full" action="">

                    <Input
                        label="What's the name of the current person?"
                        placeholder="Hyphonix is talking to..."
                        type="text"
                        id="currentPersonsName"
                        helpText=""
                        errorMessage=""
                    />

                    <fieldset
                        className="flex pt-2 gap-4
                        xxs:flex-col
                        sm:flex-row">
                        <legend>What should the current community user do?</legend>

                        <label
                            className={radioStyle}
                            htmlFor="sayName">Say the person's name 🗣️
                            <input  type="radio" id="sayName" name="gaslightOption" value="sayName" />
                        </label>


                        <label
                            className={radioStyle}
                            htmlFor="gaslightThem">Gaslight them 😈
                            <input  type="radio" id="gaslightThem" name="gaslightOption" value="gaslightThem" />
                        </label>

                    </fieldset>

                    <div className="flex  gap-8 
                    xxs:flex-col-reverse xxs:items-start xxs:mt-4
                    sm:flex-row sm:items-center sm:mt-6">
                        <p
                            className="text-xs leading-4 
                            xxs:w-fulll 
                            sm:w-9/12">
                            Clicking "Update" sends a notification to all Hyphonix trollers.
                            The notification will show the current name of the person being trolled and whether to gaslight them or not.
                        </p>

                        <button
                            className="flex justify-center items-center gap-2 bg-deepBlue-500 rounded-lg text-white p-4 
                            xxs:w-full
                            sm:w-3/12">
                            Update
                            <img
                                title="Arrow Right"
                                src="/assets/arrowRight.svg"
                                alt="Arrow Right"
                            />
                        </button>
                    </div>

                </form>

            </div>
        </div>
    )
}