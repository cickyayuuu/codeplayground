import React, { useState } from "react";
import { HiChevronDoubleLeft } from "react-icons/hi2";
import { FaHome } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, Route, Routes } from "react-router-dom"; // npm install framer-motion
import { IoSearch } from "react-icons/io5";
import { useSelector } from "react-redux";
import UserProfile from "../components/UserProfile";
import SignUp from "./SignUp";
import NewProject from "./NewProject";
import RoomId from "./RoomId";





const Home = () => {
  const [isSideMenu, setIsSideMenu] = useState(false);
  const user = useSelector((state) => state.user?.user);

  return (
    <div className="flex min-h-screen max-h-screen">
      Sidebar
      {/* <div
        className={`relative bg-gray-800 px-3 py-6 flex flex-col items-center justify-start gap-4 transition-all duration-300 ease-in-out ${
          isSideMenu ? "w-2" : "w-2/5 xl:w-1/5"
        }`}
      >
        {/* Toggle Button */}
        {/* <motion.div
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSideMenu(!isSideMenu)}
          className="w-8 h-8 bg-gray-500 rounded-tr-lg rounded-br-lg absolute -right-6 flex items-center justify-center cursor-pointer"
        >
          <HiChevronDoubleLeft className="text-white text-xl" />
        </motion.div>

        {/* Logo */}
        {/* <div className="overflow-hidden w-full flex flex-col gap-4">
          <Link to={"/home"}>
            <h1 className="text-4xl text-white mt-1.5">
              C<span>ⓞ</span>deD<span>ⓔ</span>v
            </h1> */}
          {/* </Link> */}

          {/* Start Coding Button */}
          {/* <Link to={"/newProject"}>
            <div className="px-6 py-3 flex items-center justify-center rounded-xl border border-gray-400 cursor-pointer group hover:border-gray-200">
              <p className="text-gray-400 group-hover:text-gray-200">
                Start Coding
              </p>
            </div>
          </Link> */}

          {/* Home Navigation */}
          {/* {user && (
            <Link
              to={"/home/projects"}
              className="flex items-center justify-center gap-3"
            >
              <FaHome className="text-gray-300 text-xl" />
              <p className="text-lg text-gray-300">Home</p>
            </Link>
          )}
        </div> */} 
      {/* </div> */}

      {/* Main Content */}
      <div className="flex-1 min-h-screen max-h-screen overflow-y-scroll h-full flex flex-col px-4 md:px-12 py-4 md:py-12">
        {/* Top Section */}
        <div className="w-full flex items-center justify-evenly gap-10">
          {/* Search Bar */}
          <div
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1) " }}
            className="flex items-center gap-2 border rounded-lg px-3 py-2 w-full "
          >
            <IoSearch className="text-2xl text-gray-300" />
            <input
              type="text"
              className="focus: flex-1 bg-transparent outline-none border-none text-gray-300 placeholder:text-gray-300"
              placeholder="Search here..."
            />
          </div>

          {/* Placeholder for Profile Section */}
          {!user && (
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center gap-3 w-30"
            >
              <Link
                to={"/home/auth"}
                className="bg-gradient-to-r from-red-400 to-red-500 px-5 py-2 rounded-md"
              >
                <motion.span
                  whileTap={{ scale: 0.9 }}
                  className="text-white text-lg"
                >
                  Sign up
                </motion.span>
              </Link>
            </motion.div>
          )}

          {user && <UserProfile />}
        </div>

        {/* bottom section  */}
        <Routes>
          <Route path="/*" element={<RoomId />} />
          <Route path="/auth" element={<SignUp />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
