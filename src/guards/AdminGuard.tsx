//Pages
import Admin from "../pages/Admin";

//Import React Router Hooks
import { Navigate } from "react-router-dom";

//Custom Hooks
import { useIsUserTypeSet } from "../customhooks/useOnboardingGuardHook";
import { useIsUserLoggedIn } from "../customhooks/useIsUserLoggedIn";

//Framer
import { motion } from "framer-motion";

//Animations
import { pageAnimations } from "../constants/animation";

export const AdminGuard = () => {
    const { isUserTypeSet, userType } = useIsUserTypeSet()
    const { isUserLoggedIn } = useIsUserLoggedIn()

    return (
        <motion.div
            key="admin"
            layout
            {...pageAnimations}
        >
            <div>
                {
                    (
                        (isUserTypeSet && userType === "admin")
                        && isUserLoggedIn
                    )
                        ? <Admin /> : <Navigate to={"/home"} />
                }
            </div>

        </motion.div>
    )
}