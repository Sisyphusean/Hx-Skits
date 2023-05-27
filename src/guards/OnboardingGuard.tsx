//Custom Hooks
import { useIsUserTypeSet } from "../customhooks/useOnboardingGuardHook";

//Pages
import Home from "../pages/Home";
import Onboarding from "../pages/Onboarding";

//Framer
import { motion } from "framer-motion";

//Import React Router Hooks
import { Navigate } from "react-router-dom";

export const OnboardingGuard = () => {
    const { isUserTypeSet } = useIsUserTypeSet()

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, x: 50 }}
        >
            {isUserTypeSet ? <Navigate to={"/home"} /> : <Onboarding />}
        </motion.div>
    )
}