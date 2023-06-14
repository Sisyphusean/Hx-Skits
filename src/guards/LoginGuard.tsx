//Framer
import { motion } from "framer-motion";

//Pages
import Login from "../pages/Login";

//Custom Hooks
import { useIsUserLoggedIn } from "../customhooks/useIsUserLoggedIn";

//Import React Router Hooks
import { Navigate } from "react-router-dom";

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
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, x: 50 }}
        >
            {page}
        </motion.div>
    )
}