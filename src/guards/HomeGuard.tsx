//Custom Hooks
import { useIsUserTypeSet } from "../customhooks/useOnboardingGuardHook";

//Pages
import Home from "../pages/Home";

//Framer
import { motion } from "framer-motion";

//React Hooks
import { useCallback } from "react";


export const HomeGuard = () => {

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, x: 50 }}
        >
            <Home />
        </motion.div>
    )
}