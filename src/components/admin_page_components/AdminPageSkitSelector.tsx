//React Hook Forms
import { useForm } from "react-hook-form";

//Interfaces
import { appData } from "../../interfaces/datainterfaces";

//Types
import { skitTypes } from "../../types/types";

//Select Component
import Select from "../SelectInput";

//Custom hooks
import { useSetAppData } from "../../customhooks/useSetAppData";
import { useGetAppData } from "../../customhooks/useGetAppData";

/**
 * This allows the admin to set what activity John is currently doing
 * @returns {JSX.Element} 
 */
export default function AdminPageSkitSelector() {
    const { register, handleSubmit, watch, setError, formState: { errors, isDirty } } = useForm()
    const skitTypes: skitTypes[] = ['none', 'nameSkit', 'raid']
    const setAppData = useSetAppData()
    const { appData } = useGetAppData()

    const setSkit = (formData: any) => {
        let skitType: skitTypes = formData['skitType']
        console.log(formData)
        if (skitTypes.includes(skitType)) {
            let newData: appData = {
                ...appData,
                skitData: {
                    ...appData.skitData,
                    currentSkit: skitType
                }
            }
            setAppData(newData)
        } else {
            setError("skitType", {message: "Please select a skit before continuing"})
        }
    }

    if(errors.skitType && isDirty) {
        console.log("Error")
    }

    return (
        <div
            className="flex flex-col h-auto items-start bg-white text-charlestoneGreen p-8 rounded-md
            xxs:w-full">
            <small>Hx's stream activity</small>

            <div className="mt-4 w-full">

                <form
                    onSubmit={handleSubmit(setSkit)}
                >
                    <Select
                        id="skitType"
                        label="What is Hyphonix currently doing?"
                        helpText={null}
                        title="Skit selector"
                        errorMessage={errors.skitType && errors.skitType.message as string}
                        placeholder="Select a skit"
                        options={skitTypes}
                        register={register}
                    />

                    <div
                        className="w-full flex flex-row justify-end mt-8">

                        <button
                            type="submit"
                            className={`transition flex flex-row items-center text-white p-4 border  xxs:p-3
                            border-deepBlue-300 rounded-md bg-deepBlue-500 gap-4
                            xxs:w-full xxs:justify-center
                            sm:w-auto
                            hover:text-white hover:font-bold hover:bg-deepBlue-400 hover:scale-105
                            active:text-white active:font-bold active:bg-deepBlue-500 active:scale-95`}>

                            Save activity

                            <img
                                title="arrow-s"
                                src="/assets/arrowRight.svg"
                                alt="Arrow Right" />

                        </button>

                    </div>
                </form>
            </div>
        </div>
    )
}