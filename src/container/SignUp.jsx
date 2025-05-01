import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserAuthinput from "../components/UserAuthinput";
import { MdPassword, MdEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "../config/firebase.config";
import { fadeInOut } from "../Animations"; 
import '../App.css'

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidationStatus, setEmailValidationStatus] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  // Create New User
  const createNewUser = async () => {

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created successfully:", userCred);
    } catch (err) {
      console.error("Firebase Error:", err.message);
    }
  };

  // Login Existing User
  const loginWithEmailPassword = async () => {
    if (!getEmailValidationStatus) return;

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCred);
    } catch (error) {
      console.error(error.message);
      setAlert(true);
      setAlertMsg(error.message.includes("invalid-credential")
        ? "Invalid credentials. User not found."
        : "Temporarily disabled due to many failed attempts."
      );

      setTimeout(() => setAlert(false), 1000);
    }
  };

  // Google Sign-In
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // GitHub Sign-In
  const signInWithGithub = async () => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  };

  

  return (
    <div className="w-full py-6 h-[70vh] flex flex-col items-center justify-center">
      {/* Logo */}
      <Link to={"/home"}>
        <h1 className="text-3xl text-white font-bold">
          C<span>ⓞ</span>deD<span>ⓔ</span>v
        </h1>
      </Link>

      {/* Form Container */}
      <div className="w-[90%] md:w-[40%] py-4 mx-auto flex flex-col items-center justify-center">
        {/* Animated Heading */}
        <p className="py-10 text-2xl font-semibold text-transparent bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 bg-clip-text animate-gradientText shadow-textGlow">
          Join with us ❤️
        </p>

        <div className="animated-border px-20 py-10 w-full md:w-auto rounded-xl shadow-md flex flex-col items-center justify-center gap-6 bg-white/10 backdrop-blur-md border border-white/20">
          {/* Email Input */}
         

          {/* Password Input */}
         
          {/* Alert Message */}
          <AnimatePresence>
            {alert && (
              <motion.p
                key={"AlertMessage"}
                {...fadeInOut}
                className="text-red-500 px-4 py-2 bg-red-200 rounded-md flex items-center justify-between"
              >
                {alertMsg}
                <span className="ml-4 cursor-pointer text-black font-bold" onClick={() => setAlert(false)}>
                  ✖
                </span>
              </motion.p>
            )}
          </AnimatePresence>

          {/* Signup/Login Button */}
          {/* <motion.div
            onClick={isLogin ? loginWithEmailPassword : createNewUser}
            whileTap={{ scale: 0.9 }}
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 cursor-pointer flex items-center justify-center"
          >
            
          </motion.div> */}

          {/* Toggle Login/Signup */}
          <p className="text-sm text-gray-300 flex items-center justify-center gap-3">
            {isLogin ? "Don't have an account?" : "Already have an account?"} 
            {/* <motion.span
              onClick={() => setIsLogin(!isLogin)}
              className="text-emerald-500 cursor-pointer text-lg"
            >
              {isLogin ? "Create Here" : "Login Here"}
            </motion.span> */}
          </p>

          {/* Social Login */}
          <div className="flex flex-col gap-4 w-full">
            {/* Google Login */}
            <motion.div
              onClick={signInWithGoogle}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md w-full py-3 rounded-xl cursor-pointer hover:bg-white/20"
            >
              <FcGoogle className="text-2xl" />
              <p className="text-white text-lg">Sign in with Google</p>
            </motion.div>

            {/* GitHub Login */}
            <motion.div
              onClick={signInWithGithub}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md w-full py-3 rounded-xl cursor-pointer hover:bg-white/20"
            >
              <FaGithub className="text-2xl text-white" />
              <p className="text-white text-lg">Sign in with GitHub</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
