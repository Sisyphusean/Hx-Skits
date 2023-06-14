//Custom Hooks
import { useIsUserTypeSet } from "../customhooks/useOnboardingGuardHook";

//Pages
import Home from "../pages/Home";

//Framer
import { motion } from "framer-motion";

//Import React Router Hooks
import { Navigate } from "react-router-dom";

//Custom Hooks
import { useIsUserLoggedIn } from "../customhooks/useIsUserLoggedIn";

//Pages
import Admin from "../pages/Admin";

//Animations
import { pageAnimations } from "../constants/animation";


export const HomeGuard = () => {
    const { isUserTypeSet } = useIsUserTypeSet()
    const { isUserLoggedIn } = useIsUserLoggedIn()
    let page;

    if (!isUserTypeSet) {
        page = <Navigate to={"/"} />
    }

    if (isUserTypeSet) {
        page = <Home />
    }

    return (
        <motion.div
            key="home"
            layout
            {...pageAnimations}
        >

            <div>

                {page}

            </div>

        </motion.div>
    )
}