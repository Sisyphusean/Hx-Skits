//React Hook Forms
import { useForm } from "react-hook-form";

//Types
import { skitTypes } from "../../types/types";

//Select Component
import Select from "../SelectInput";

export default function AdminPageSkitSelector() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const skitTypes: skitTypes[] = ['none', 'nameSkit']

    return (
        <div
            className="flex flex-col h-auto items-start bg-white text-charlestoneGreen p-8 rounded-md
            xxs:w-full
            s:w-9/12
            md:w-8/12
            lg:w-5/12
            2xl:w-3/12">
            <small>Set the current skit</small>

            <div className="mt-4 w-full">

                <Select
                    id="skitType"
                    label="What community skit is Hyphonix currently running?"
                    helpText="Test"
                    title="Skit selector"
                    errorMessage=""
                    options={skitTypes}
                    register={register}
                />

                <div
                    className="w-full flex flex-row justify-end mt-8">

                    <button
                        type="button"
                        className={`transition flex flex-row items-center text-white p-4 border  xxs:p-3
                            border-deepBlue-300 rounded-md bg-deepBlue-500 gap-4
                            xxs:w-full xxs:justify-center
                            sm:w-auto
                            hover:text-white hover:font-bold hover:bg-deepBlue-400 hover:scale-105
                            active:text-white active:font-bold active:bg-deepBlue-500 active:scale-95`}>

                        Set the skit

                        <img
                            title="arrow-s"
                            src="/assets/arrowRight.svg"
                            alt="Arrow Right" />

                    </button>

                </div>
            </div>
        </div>
    )
}