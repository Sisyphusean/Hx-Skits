//Framer
import { motion } from "framer-motion";

//Pages
import Login from "../pages/Login";

//Custom Hooks
import { useIsUserLoggedIn } from "../customhooks/useIsUserLoggedIn";

//Import React Router Hooks
import { Navigate } from "react-router-dom";

//Import Page Animations
import { pageAnimations } from "../constants/animation";

export const LoginGuard = () => {

    const { isUserLoggedIn } = useIsUserLoggedIn()

    let page;

    if (isUserLoggedIn) {
        page = <Navigate to={"/admin"} />
    }

    if (!isUserLoggedIn) {
        page = <Login />
    }

    return (
        <motion.div
            {...pageAnimations}
        >
            {page}
        </motion.div>
    )
}