//Import React Hook Form
import { useForm } from "react-hook-form";

//Import components
import Button from "../components/Button";
import RadioInput from "../components/Radio";

//Import React hooks
import { useContext } from "react";

//Import App data context
import { AppDataContext } from "../contexts/appdatacontext";
import { appData } from "../interfaces/datainterfaces";
import { userType } from "../types/types";

//Import custom hooks
import { useSetAppData } from "../customhooks/useSetAppData";

//Import ToastHandler
import { toastHandler } from "../utilities/toastHandler";

export default function Onboarding() {
    const { register, watch, handleSubmit, formState: { errors, isDirty } } = useForm()
    const selectedUserType = watch("rawUserType")

    const { appData } = useContext(AppDataContext)
    const customSetAppData = useSetAppData()

    const setUserTypeOnOnboardingFormSubmit = (rawFormData: any) => {
        let newUserType = rawFormData.rawUserType === "admin" || rawFormData.rawUserType === "mod" ? "admin" : "limited"

        //Make API call and then when the call is successful, update the app data
        let newData: appData = {
            ...appData,
            userData: {
                ...appData.userData,
                userType: newUserType as userType
            }
        }

        customSetAppData(newData)

    }
    
    //Error Handling for the form
    if (errors.rawUserType && !isDirty) {
        toastHandler.showErrorToast("Please select an option before continuing", "top-right")
    }

    return (
        <div className="flex flex-wrap px-5 pt-4 h-full w-full justify-center items-center 
        lg:px-32 
        md:px-16">
            <div className="flex flex-col w-11/12 md:w-7/12 lg:w-6/12 xl:w-5/12">

                <img src="/assets/hyphonixLogo.png" className="w-24 sm:w-32 self-center"
                    alt="Hyphonix Logo" />

                <div className="bg-white px-8 py-12 rounded-md mt-6">
                    <h5 className="text-charlestoneGreen font-bold">
                        Welcome! <br /><br /> I’m the Hyphonix Skit Assistant. Which
                        option describes you best?
                    </h5>


                    <form
                        className="flex flex-col gap-6"
                        onSubmit={handleSubmit(setUserTypeOnOnboardingFormSubmit)}
                    >
                        <div className="pt-7 flex flex-col gap-4">

                            <RadioInput
                                id="limited"
                                label="I'm a Community Member"
                                name="rawUserType"
                                value="limited"
                                selectedUserType={selectedUserType}
                                register={register} />

                            <RadioInput
                                id="admin"
                                label="I'm Hyphonix"
                                name="rawUserType"
                                value="admin"
                                selectedUserType={selectedUserType}
                                register={register} />

                            <RadioInput
                                id="mod"
                                label="I'm a Mod"
                                name="rawUserType"
                                value="mod"
                                selectedUserType={selectedUserType}
                                register={register} />
                        </div>

                        <Button
                            buttonType="submit"
                            buttonClassType="filled"
                            buttonText="Continue"
                            buttonIcon="arrowRight"
                            overrideClasses="
                            ml-auto
                            xxs:w-full
                            s:w-5/12
                            sm:w-4/12"/>
                    </form>

                </div>

            </div>
        </div>
    )
}