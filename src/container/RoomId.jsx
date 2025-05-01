import React, { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../App.css";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
const RoomId = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [enterRoom, setEnterRoom] = useState(false);
  const [filtered, setFiltered]=useState(null)
// useeffect for search
  useEffect(()=>{
    

  })
  //

  // project preview ke liye

  const projects = useSelector((state) => state.projects?.projects);

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast.success("Created a new room");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("ROOM ID & username is required");
      return;
    }

    // Store username in localStorage
    localStorage.setItem("username", username);

    // Redirect
    navigate(`/newProject/${roomId}`, {
      state: {
        username,
      },
    });
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <div
      className="homePageWrapper"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "800px",
        gap: "20px",
        width: "100%",
      }}
    >
      {/* Left Section - Form Wrapper (30% Width) */}
      <h1 className="absolute top-[155px] left-[30px] text-white">{enterRoom ? "close room" :"open room"}</h1>
      <motion.div
        className="absolute top-[115px] left-[67px] text-white px-4 py-2 rounded-md shadow-md cursor-pointer
       " onClick={()=>setEnterRoom(!enterRoom)}
      >
        <TbLayoutSidebarLeftExpand   />
      </motion.div>
      {enterRoom && (
        <div
          className="formWrapper"
          style={{
            flex: 3, // 3 parts out of 10
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            padding: "20px",
            backgroundColor: "#222", // Optional background color for contrast
            borderRadius: "10px",
          }}
        >
          <Link to={"/home"}>
            <h1 className="text-4xl text-white mt-1.5">
              C<span>ⓞ</span>deS<span>ketch</span>
            </h1>
          </Link>
          <h4 className="mainLabel" style={{ color: "white" }}>
            Paste invitation ROOM ID
          </h4>
          <div className="inputGroup">
            <input
              type="text"
              className="inputBox"
              placeholder="ROOM ID"
              onChange={(e) => setRoomId(e.target.value)}
              value={roomId}
              onKeyUp={handleInputEnter}
            />
            <input
              type="text"
              className="inputBox"
              placeholder="USERNAME"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              onKeyUp={handleInputEnter}
            />
            <button className="btn joinBtn " onClick={joinRoom}>
              Join
            </button>
            <span className="createInfo" style={{ color: "white" }}>
              If you don't have an invite then create &nbsp;
              <a onClick={createNewRoom} href="#" className="createNewBtn">
                new room
              </a>
            </span>
          </div>
        </div>
      )}

      {/* Right Section - Projects (70% Width) */}

      {/* projectsPreview  */}

      <div
        className="projects"
        style={{
          flex: 7, // 7 parts out of 10
          backgroundColor: "rgb(34, 34, 34)",
          height: "100%",
          display: "flex",
          width: "100px",
          justifyContent: "center",
          padding: "20px",
          borderRadius: "10px",
          gap: 8,
        }}
      >
        {projects &&
          projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
      </div>
    </div>
  );
};

export default RoomId;
