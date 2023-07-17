//Intefaces
import { activeTagsProps } from "../../interfaces/propinterfaces";

//Utilities
import { toastHandler } from "../../utilities/toastHandler";

export default function ActiveTags(props: activeTagsProps) {
    const { tags } = props
    const maxTags = 2
    const remainingTags = tags.slice(maxTags)

    //This function returns the number of tags that exceed the count of maxTags as a string
    function showRemainingTags() {
        if (tags.length > maxTags) {

            return (
                <span
                    title={`Additional tags are ${remainingTags.map((tag, index, mappedArray) => {
                        if (tag !== "") {
                            if (index < mappedArray.length - 1) {
                                return tag[0].toUpperCase() + tag.slice(1) + ", "
                            }
                            if (index === mappedArray.length - 1) {
                                return tag[0].toUpperCase() + tag.slice(1)
                            }
                        }
                    }).join('')}`}

                    className="
                    sm:pl-1 sm:inline-block sm:cursor-pointer">
                    + {tags.length - maxTags} tag{tags.length - maxTags > 1 ? 's' : ''}
                </span>
            )

        }


        if (tags.length === maxTags || tags.length === 0) {
            return <div className="m-0 p-0"></div>
        }
    }

    //This function is used to copy all the tags to the clipboard
    async function copyTags() {
        let formattedTags = tags.map((tag, index, tagArray) => {
            if (tag !== "") {
                if (index !== tagArray.length - 2) {
                    return (tag[0].toUpperCase() + tag.slice(1) + ", ")
                }

                if (index !== tagArray.length - 1) {
                    return (tag[0].toUpperCase() + tag.slice(1) + ", ")
                }
            }
        }).join("")

        try {
            await navigator.clipboard.writeText(formattedTags)
            toastHandler.showSuccessToast("Tags copied to clipboard!", "bottom-center")
        } catch (err) {
            toastHandler.showErrorToast("Failed to copy tags", "bottom-center")
            console.error("Failed to copy because ", err)
        }
    }

    return (
        <div className="flex flex-row flex-wrap m-0 p-0 align-middle">
            <h5 className="inline-block self-center
            xxs: pr-2
            sm: p-0">
                Tags in use:
            </h5>
            <br className="sm:hidden" />

            {tags.length > 0

                ? <span className="text-left pt-2 md:text-center">

                    <div className="xxs:block s:inline">
                        {tags.map((tag, index, tagArray) => {
                            if (index === 0 && tagArray.length > 0 && index < maxTags) {
                                return (
                                    <span key={index} className="pr-1 font-medium
                        bg-deepBlue-100 p-1 border rounded-md">
                                        {tag[0].toUpperCase() + tag.slice(1)}
                                    </span>
                                )
                            }

                            if (index <= tagArray.length - 1 && tagArray.length > 0 && index < maxTags && index !== 0) {
                                return (
                                    <span key={index} className="pr-1 font-medium
                        bg-deepBlue-100 ml-1 p-1 border rounded-md">
                                        {tag[0].toUpperCase() + tag.slice(1)}
                                    </span>
                                )
                            }
                        })}
                    </div>

                    <div className="m-0 p-0 xxs:block s:inline">
                        {showRemainingTags()}

                        <button
                            onClick={copyTags}
                            type="button"
                        >
                            <img
                                className="bg-deepBlue-500 p-1 rounded inline ml-2 xxs:mt-1 s:mt-0"
                                src="./assets/copy.svg"
                                title="Click here to copy all the tags"
                                alt="Copy icon"
                            />
                        </button>
                    </div>

                </span>

                : " - Not available"}
        </div>
    )
}