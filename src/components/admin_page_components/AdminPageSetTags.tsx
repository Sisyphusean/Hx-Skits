import Input from "../TextInput";

export default function AdminPageSetTags() {
    return (
        <div className="bg-white h-auto text-charlestoneGreen p-6 rounded-lg
            xxs:w-full
            s:w-11/12
            md:w-8/12
            lg:w-6/12
            2xl:w-3/12">

            <div
                className="flex flex-row items-center justify-between w-full mb-4">
                <small>Omegle Tag settings</small>
            </div>

            <form action="" className="flex gap-4 items-end
            xxs:flex-col
                sm:flex-row">

                <Input
                    label="What's Hyphonix's current Omegle tags?"
                    placeholder="e.g Youtube, Twitch"
                    type="text"
                    id="tags"
                    helpText="Separate each tag with commas."
                    errorMessage=""
                />

                <button
                    className="bg-deepBlue-500 text-white rounded-md 
                h-14 flex flex-row justify-center items-center px-4 gap-4
                xxs:w-5/12
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