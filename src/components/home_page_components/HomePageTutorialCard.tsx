export default function HomePageTutorialCard() {
    return (
        <div
            className="flex flex-col justify-between items-center bg-white text-charlestoneGreen px-8 py-8 rounded-md
            xxs:flex-col-reverse xxs:m-0 xxs:w-full
            sm:gap-12
            lg:gap-8
            md:flex-row">
            <div
                className="flex flex-col w-6/12
                xxs:w-full">
                <h4 className="text-lg font-bold xxs:mt-4">Want to learn how to troll properly?</h4>
                <p className="pt-1 
                xxs:w-full
                sm:w-11/12
                xl:w-8/12">
                    Learn how to start conversations, make jokes, and see successful
                    joke examples from past live streams.</p>

                <button
                    type="button"
                    className='transition flex flex-row items-center justify-center bg-silver p-4 border border-silver 
                        rounded-md mt-4 cursor-not-allowed
                        xxs:w-full
                        sm:w-4/12
                        md:w-6/12'
                >
                    Coming soon!
                </button>
            </div>

            <div
                className="flex flex-row min-h-full
                xxs:w-full xxs:justify-center
                sm:w-6/12">

                <img
                    className="inline rounded-lg w-full"
                    src="/assets/hyphonixStaring.png"
                    title=""
                    alt="Hyphonix staring with a mark"
                />
            </div>
        </div>
    )
}