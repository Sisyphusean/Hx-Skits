//React
import { useState, useEffect } from "react";

//Custom Hooks
import { useGetAppData } from "../../customhooks/useGetAppData";
import { useSetAppData } from "../../customhooks/useSetAppData";

//Components
import Input from "../TextInput";
import RadioInput from "../Radio";

//Interfaces
import { adminPageNameSkitActivityProps } from "../../interfaces/propinterfaces";
import { appData } from "../../interfaces/datainterfaces";

//React Hook Form
import { useForm } from "react-hook-form";

//Utilities
import { toastHandler } from "../../utilities/toastHandler";

//Services
import { poster } from "../../services/apirequests";

export default function AdminPageNameSkitActivity(props: adminPageNameSkitActivityProps) {
    const { appData } = useGetAppData()
    const setAppData = useSetAppData()
    let defaultValues = { marksName: appData.skitData.nameSkitData.marksCurrentName, shouldUserBeGaslit: appData.skitData.nameSkitData.shouldTheMarkBeGaslight.toString() }
    const { register, reset, handleSubmit, formState: { errors }, setError } = useForm()

    //Reset the form on first load
    useEffect(() => {
        reset(defaultValues)
    }, [])

    const processNameSkitData = (formData: any) => {
        console.log(formData)
        if (formData.marksName && formData.shouldUserBeGaslit) {

            const pathForUpdatingNameSkitData = import.meta.env.VITE_ADMIN_UPDATE_NAMESKIT
            poster(
                pathForUpdatingNameSkitData,
                formData,
                () => { },
                appData.userData.userToken).then(
                    (response) => {
                        let newData: appData = {
                            ...appData,
                            skitData: {
                                ...appData.skitData,
                                nameSkitData: {
                                    ...appData.skitData.nameSkitData,
                                    marksCurrentName: formData.marksName,
                                    shouldTheMarkBeGaslight: formData.shouldUserBeGaslit
                                }
                            }
                        }

                        setAppData(newData)
                        toastHandler.showSuccessToast("Name skit data updated successfully", "top-right")
                    }
                ).catch(error => {
                    console.error("Failed to set nameskit data ", error)
                })

        } else {
            toastHandler.showErrorToast("Please enter the current victim's name and select if they should be Gaslit", "top-right")
        }
    }


    if (errors.marksName?.type) {
        setError("marksName", { message: "Please enter the current victim's name" })
    }

    if (errors.shouldUserBeGaslit?.type) {
        setError("shouldUserBeGaslit", { message: "Please select whether to gaslight the victim or not" })
        toastHandler.showErrorToast("Please select whether to gaslight the victim or not", "top-right")
    }

    return (
        <div
            className="flex flex-col h-auto items-start bg-white text-charlestoneGreen p-6 rounded-md 
            xxs:w-full">

            <div
                className="flex flex-row items-center justify-between w-full">
                <small>Name skit settings</small>
            </div>

            <div
                className="flex-col w-full">

                <form
                    onSubmit={handleSubmit(processNameSkitData)}
                    className="flex flex-col gap-6 mt-6 w-full">

                    <Input
                        label="What's the name of the current person?"
                        placeholder="Hyphonix is talking to..."
                        type="text"
                        id="marksName"
                        helpText=""
                        errorMessage={errors.marksName && errors.marksName.message as string}
                        register={register}
                    />

                    <fieldset
                        className="flex pt-2 gap-4
                        xxs:flex-col
                        sm:flex-row">
                        <legend>What should the current community user do?</legend>

                        <RadioInput
                            id="sayName"
                            label="Say the person's name 🗣️"
                            name="shouldUserBeGaslit"
                            value="false"
                            register={register} />

                        <RadioInput
                            id="dontSayName"
                            label="Gaslight them 😈"
                            name="shouldUserBeGaslit"
                            value="true"
                            register={register} />

                    </fieldset>

                    <div className="flex  gap-8 
                    xxs:flex-col-reverse xxs:items-start xxs:mt-4
                    sm:flex-row-reverse sm:items-center sm:mt-6">

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

                        <p
                            className="text-xs leading-4 
                            xxs:w-fulll 
                            sm:w-9/12">
                            Clicking "Update" sends a notification to all Hyphonix trollers.
                            The notification will show the current name of the person being trolled and whether to gaslight them or not.
                        </p>
                    </div>

                </form>

            </div>
        </div>
    )
}