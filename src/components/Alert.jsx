import React from "react";
import { motion } from "framer-motion";
import { slideUpOut } from "../Animations";

const Alert = ({ status, alertMsg }) => {
  return (
    <div>
      <motion.div {...slideUpOut} className="fixed top-24 right-12 z-10">
        {status === "Success" && (
          <div className="px-4 py-2 rounded-md bg-emerald-400 shadow-emerald-400">
            <p className="text-lg text-blue-700">{alertMsg}</p>
          </div>
        )}
        {status === "Warning" && (
          <div className="px-4 py-2 rounded-md bg-yellow-400-400 shadow-yellow-400">
            <p className="text-lg text-blue-700">{alertMsg}</p>
          </div>
        )}
        {status === "Danger" && (
          <div className="px-4 py-2 rounded-md bg-red-400 shadow-red-400">
            <p className="text-lg text-blue-700">{alertMsg}</p>
          </div>
        )}
        
      </motion.div>
    </div>
  );
};

export default Alert;
