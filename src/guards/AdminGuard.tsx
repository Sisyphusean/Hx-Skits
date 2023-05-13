//Framer
import { motion } from "framer-motion";

//Pages
import Admin from "../pages/Admin";

export const AdminGuard = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, x: 50 }}
        >
            <Admin />
        </motion.div>
    )
}