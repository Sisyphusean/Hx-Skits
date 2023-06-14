//Custom Hooks
import { useIsUserTypeSet } from "../customhooks/useOnboardingGuardHook";

//Pages
import Home from "../pages/Home";

//Framer
import { motion } from "framer-motion";

//Pages
import Onboarding from "../pages/Onboarding";

//Import React Router Hooks
import { Navigate } from "react-router-dom";

//Custom Hooks
import { useIsUserLoggedIn } from "../customhooks/useIsUserLoggedIn";

//Pages
import Admin from "../pages/Admin";


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
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, x: 50 }}
        >

            {page}

        </motion.div>
    )
}