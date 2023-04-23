export default function Onboarding() {
    return (
        <div className="flex flex-wrap px-5 pt-4 h-full justify-center items-center 
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

                    <div className="pt-7 flex flex-col gap-6">
                        <button type="button" className="inline-block border-2 border-deepBlue-500 text-deepBlue-500
                        rounded-lg p-4 w-full transition font-medium
                        hover:text-charlestoneGreen hover:font-medium hover:bg-deepBlue-100 hover:scale-101
                        active:text-white active:font-bold active:bg-deepBlue-500 active:scale-95">
                            I'm Hyphonix
                        </button>

                        <button type="button" className="inline-block border-2 border-deepBlue-500 text-deepBlue-500
                        rounded-lg p-4 w-full transition font-medium
                        hover:text-charlestoneGreen hover:font-medium hover:bg-deepBlue-100 hover:scale-101
                        active:text-white active:font-bold active:bg-deepBlue-500 active:scale-95">
                            I'm a Mod
                        </button>

                        <button type="button" className="inline-block border-2 border-deepBlue-500 text-deepBlue-500
                        rounded-lg p-4 w-full transition font-medium
                        hover:text-charlestoneGreen hover:font-medium hover:bg-deepBlue-100 hover:scale-101
                        active:text-white active:font-bold active:bg-deepBlue-500 active:scale-95">
                            I'm a Community Member
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}