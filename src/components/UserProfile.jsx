import React from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { Menus } from "../utils/helper";
import { Link } from "react-router-dom";
import { signOutAction } from "../utils/helper";
import { useState } from "react";
import { slideUpOut } from "../Animations";

const UserProfile = () => {
  // forOnclick display button 
  const [isMenu , setIsMenu]= useState(false);

  const user = useSelector((state) => state.user?.user);
  return (
    <div className="flex items-center justify-center gap-4 relative">
      <div className="w-14 h-12 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer bg-emerald-500 ">
        {user?.photoURL ? (
          <>
            <motion.img
              whileHover={{ scale: 1.2 }}
              src={user?.photoURL}
              alt={user?.displayName}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </>
        ) : (
          <p className="text-xl text-white font-semibold capitalize">
            {user?.email[0]}
          </p>
        )}
      </div>

      <motion.div onClick={()=>setIsMenu(!isMenu)}
        whileTap={{ scale: 0.9 }}
        className="px-4 py-4 items-center justify-center rounded-md flex cursor-pointer "
        style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
      >
        <FaChevronDown className="text-purple-600" />
      </motion.div>
    <AnimatePresence>
      {
        isMenu && (
          <motion.div {...slideUpOut}
        className="absolute top-16 right-0 px-4 py-3 shadow-md  rounded-xl z-10 flex-col flex items-start justify-start gap-4 min-w-[225px]"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
      >
        {Menus &&
          Menus.map((menu) => (
            <Link
              to={menu.uri}
              key={menu.id}
              className="text-white text-lg hover:bg-[rgba(256,256,256,0.05)] px-2 py-1 w-full rounded-md"
            >
              {menu.name}
            </Link>
          ))}
        <motion.p onClick={signOutAction} whileTap={{scale:0.9}}className="text-white text-lg hover:bg-[rgba(256,256,256,0.05)] px-2 py-1 w-full rounded-md cursor-pointer">
          Sign out
        </motion.p>
      </motion.div>
        )
      }
    </AnimatePresence>
      
    </div>
  );
};

export default UserProfile;
