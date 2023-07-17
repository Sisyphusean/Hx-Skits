//Interfaces
import { homePageSkitComponentProps } from "../../interfaces/propinterfaces";

//Components
import ActiveTags from "./HomePageActiveTags";
import GaslightIndicator from "./HomePageGaslightIndicator";
import SkitName from "./HomePageSkitName";


export default function HomepageSkitComponent(props: homePageSkitComponentProps) {

    let { marksCurrentName, tags, shouldUserGaslightTheMark } = props

    return (
        <div className="w-full">
            <div className="flex flex-col-reverse justify-between items-center bg-white text-charlestoneGreen px-8 py-12 rounded-md mt-6
                md:flex-row">

                <div className='flex flex-col gap-4'>

                    <h5>Current Skit: <span className='font-medium'>Community Name Skit</span></h5>

                    <h5>Name being trolled:
                        {props.marksCurrentName === "" ? " - Not available"
                            : <SkitName marksCurrentName={marksCurrentName} shouldUserGaslightTheMark={shouldUserGaslightTheMark} />}
                    </h5>

                    <ActiveTags tags={tags} />

                    <div
                        className='pt-4 flex flex-col gap-2'>

                        <a
                            href="https://www.omegle.com/" target='_blank' rel='noopener noreferrer' >

                            <button
                                type="button"
                                className='transition flex flex-row items-center text-deepBlue-500 p-4 border border-deepBlue-500 rounded-md
                            hover:text-charlestoneGreen hover:font-medium hover:bg-deepBlue-100 hover:scale-105
                            active:text-white active:font-bold active:bg-deepBlue-500 active:scale-95'>
                                Visit Omegle and enter the tags
                                <img
                                    className='pl-2'
                                    src="./assets/visit.svg"
                                />
                            </button>

                        </a>

                        <small className='text-deepBlue-400 text-xs'>*Remember to copy the tags first!</small>
                    </div>

                </div>

                <GaslightIndicator shouldUserGaslightTheMark={shouldUserGaslightTheMark} />

            </div>
        </div>
    )
}