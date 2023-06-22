//Custom Components
import Input from "../TextInput";

//Import RHF 
import { useForm } from "react-hook-form";

//Import Custom hooks
import { useSetAppData } from "../../customhooks/useSetAppData";
import { useGetAppData } from "../../customhooks/useGetAppData";

//Import ToastHandler
import { toastHandler } from "../../utilities/toastHandler";

//Import Interfaces
import { appData } from "../../interfaces/datainterfaces";

export default function AdminPageSetTags() {
    const { register, handleSubmit, formState: { errors }, reset, setError } = useForm()
    const { appData } = useGetAppData()
    const setAppData = useSetAppData()
    let omegleTags = appData.liveData.currentOmegleTags

    const clearPreviousTags = () => {
        let newData = {
            ...appData,
            liveData: {
                ...appData.liveData,
                currentOmegleTags: []
            }
        }

        setAppData(newData)
        toastHandler.showSuccessToast("Previous tags cleared", "bottom-center")
    }

    const setOmegleTags = (formData: any) => {
        let { tags } = formData;
        let trimmedTags = tags.trim();

        if (trimmedTags && trimmedTags !== "") {
            let splitTags: string[] = trimmedTags.split(",");

            let tagsArrayWithoutUndefined: string[] = []

            for(let i = 0; i < splitTags.length; i++) {
                if(splitTags[i] !== undefined) {
                    tagsArrayWithoutUndefined.push(splitTags[i].trim())
                }
            }

            let newData: appData= {
                ...appData,
                liveData: {
                    ...appData.liveData,
                    currentOmegleTags: tagsArrayWithoutUndefined
                }
            };

            setAppData(newData);
            toastHandler.showSuccessToast("New tags set successfully", "bottom-center");
            reset();
        } else {
            setError("tags", { message: "Please enter at least one tag" });
        }
    }


    if (errors.tags?.type === "required") {
        setError("tags", { message: "Please enter at least one tag" })
    }

    return (
        <div className="bg-white h-auto text-charlestoneGreen p-6 rounded-lg
            xxs:w-full">

            <div
                className="flex flex-row items-center justify-between w-full mb-4">
                <small>Omegle Tag settings</small>

                {
                    omegleTags.length > 0
                        ? <small
                            onClick={clearPreviousTags}
                            className="underline text-deepBlue-500 cursor-pointer"
                        >
                            Clear previously set tags
                        </small>
                        : ""
                }
            </div>

            <form
                onSubmit={handleSubmit(setOmegleTags)}
                className="flex gap-4 items-end
            xxs:flex-col
                sm:flex-row">

                <Input
                    label="What's Hyphonix's current Omegle tags?"
                    placeholder="e.g Youtube, Twitch"
                    type="text"
                    id="tags"
                    helpText="Separate each tag with commas."
                    errorMessage={errors.tags && errors.tags.message as string}
                    register={register}
                />
            
                <button
                    className="bg-deepBlue-500 text-white rounded-md 
                h-14 flex flex-row justify-center items-center px-4 gap-4
                xxs:w-full
                sm:w-3/12
                md:w-4/12"
                    type="submit">
                    Set tags
                    <img src="/assets/arrowRight.svg" alt="arrow-right" />
                </button>

            </form>
        </div>
    )
}