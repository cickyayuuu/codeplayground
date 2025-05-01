import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
const UserAuthinput = ({
  label,
  placeHolder,
  isPass,
  setStateFunction,

  Icon,
  setEmailValidationStatus
}) => {
  const [value, setValue] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleTextChange = (e) => {
    setValue(e.target.value);
    setStateFunction(e.target.value);
    if (placeHolder === "Email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const status = emailRegex.test(value);
      setIsEmailValid(status);
      setEmailValidationStatus(status);
    }
  };
  return (
    <div className="flex flex-col items-start justify-start gap-1">
      <label className="text-sm text-gray-300">{label}</label>
      <div
        className={`flex items-center justify-center gap-3 w- full md:w-96 rounded-md px-4 py-1 bg-gray-200 ${
          !isEmailValid &&
          placeHolder === "Email" &&
          value.length > 0 &&
          "border-2 border-red-500"
        }`}
      >
        <Icon className="text-text555 text-2xl" />
        <input
          type={isPass && showPass ? "password" : "text"}
          placeholder={placeHolder}
          className="flex-1 w-full py-2 outline-none bg-transparent text-text555 text-lg "
          value={value}
          onChange={handleTextChange}
        />

        {isPass && (
          <motion.div
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowPass(!showPass)}
            className="cursor-pointer"
          >
            {showPass ? (
              <FaEyeSlash className="text-text555 lext-lg" />
            ) : (
              <FaEye className="text-text555 text-lg cursor-pointer" />
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserAuthinput;
