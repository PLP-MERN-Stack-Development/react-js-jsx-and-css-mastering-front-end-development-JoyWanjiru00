import { motion } from "framer-motion";
import clsx from "clsx";

export default function Card({ children, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={clsx(
        "bg-white dark:bg-gray-800 shadow-md rounded-2xl p-4 hover:shadow-lg transition-shadow",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
