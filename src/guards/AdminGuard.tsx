//Framer
import { motion } from "framer-motion";

//Pages
import Admin from "../pages/Admin";

//Import React Router Hooks
import { Navigate } from "react-router-dom";

//Custom Hooks
import { useIsUserTypeSet } from "../customhooks/useOnboardingGuardHook";

export const AdminGuard = () => {
    const { isUserTypeSet, userType } = useIsUserTypeSet()

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, x: 50 }}
        >
            {isUserTypeSet && userType === "admin" ? <Admin /> : <Navigate to={"/home"} />}
        </motion.div>
    )
}