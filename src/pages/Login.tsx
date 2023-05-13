// Components
import Input from "../components/TextInput"
import Navbar from "../components/Navbar"

export default function Login() {
    return (
        <div className="flex flex-col h-full px-4 md:pt-0 w-full ">
            <Navbar />

            <div className="flex flex-wrap lg:px-32 md:px-16 justify-center 
            content-center h-full">

                <div className="flex flex-col w-11/12 md:w-7/12 lg:w-6/12 xl:w-5/12">

                    <div className="bg-white px-8 py-14 rounded-md">
                        <h5 className="text-charlestoneGreen font-bold">
                            Login to your account
                        </h5>

                        <div className="pt-4">
                            <form action=""
                                className="text-charlestoneGreen flex flex-col flex-wrap gap-4">

                                <Input
                                    id="username"
                                    errorMessage={null}
                                    helpText={null}
                                    label="Username"
                                    type="text"
                                    placeholder="Enter your username"
                                />

                                <Input
                                    id="userPassword"
                                    errorMessage={null}
                                    helpText={null}
                                    label="Password"
                                    type="password"
                                    placeholder="Enter your password"
                                />

                                <button type="submit"
                                    className="gap-2 content-center border-2 text-white bg-deepBlue-500
                                    rounded-lg py-4 px-8 transition font-medium ml-auto mt-4	
                                    hover:font-medium hover:bg-belizeHole-500 hover:scale-105
                                    active:text-white active:font-bold active:bg-deepBlue-500 active:scale-95">
                                    Login
                                    <img title="" alt="Right arrow" className="inline-block pl-1" src="./assets/arrowRight.svg" />
                                </button>
                            </form>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}