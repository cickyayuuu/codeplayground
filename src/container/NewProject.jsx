import React, { useEffect, useRef, useState } from "react";
import { FaCss3, FaHtml5, FaJs } from "react-icons/fa";
import { MdCheck } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import SplitPane from "react-split-pane";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html as htmld } from "@codemirror/lang-html";
import { css as cssd } from "@codemirror/lang-css";
import { autocompletion } from "@codemirror/autocomplete";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import { initSocket } from "../socket";
import toast from "react-hot-toast";
import ACTIONS from "../../actions";
import Client from "../comp/Client";
import "../App.css";
import { AnimatePresence, motion } from "framer-motion";
import UserProfile from "../components/UserProfile";
import { db } from "../config/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import Alert from "../components/Alert";

const NewProject = () => {
  const socketRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();
  const [html, SetHtml] = useState("");
  const [css, SetCss] = useState("");
  const [js, SetJs] = useState("");
  const [output, SetOutput] = useState("");
  const [clients, setClients] = useState([]);
  const [title, setTitle] = useState("untiled");
  const [isTitle, setIsTitle] = useState("");
  const [alert,setAlert] =useState(false)
  const user = useSelector((state) => state.user?.user);

  // Copy Room ID function
  async function copyRoomId() {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID copied!");
    } catch (err) {
      toast.error("Could not copy Room ID.");
      console.error(err);
    }
  }

  // Leave room function
  const leaveRoom = () => {
    if (socketRef.current) {
      socketRef.current.emit(ACTIONS.LEAVE_ROOM, { roomId });
      socketRef.current.disconnect();
    }
    reactNavigator("/");
  };

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.error("Socket Error:", e);
        toast.error("Socket connection failed, try again later.");
        reactNavigator("/");
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room.`);
          }
          setClients(clients);

          // Send the existing code to the new user
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: { html, css, js },
            socketId,
          });
        }
      );

      // Receive the synced code when a new user joins
      socketRef.current.on(ACTIONS.SYNC_CODE, ({ code }) => {
        SetHtml(code.html);
        SetCss(code.css);
        SetJs(code.js);
      });

      // Listen for a user disconnecting
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room.`);
        setClients((prev) =>
          prev.filter((client) => client.socketId !== socketId)
        );
      });

      // Listen for real-time code updates
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ language, code }) => {
        if (language === "html") SetHtml(code);
        else if (language === "css") SetCss(code);
        else if (language === "js") SetJs(code);
      });
    };

    init();

    return () => {
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
      socketRef.current.off(ACTIONS.CODE_CHANGE);
      socketRef.current.off(ACTIONS.SYNC_CODE);
    };
  }, []);

  if (!location.state) {
    return <Navigate to="/" />;
  }

  const handleCodeChange = (language, value) => {
    if (socketRef.current) {
      socketRef.current.emit(ACTIONS.CODE_CHANGE, {
        roomId,
        language,
        code: value,
      });
    }
    if (language === "html") SetHtml(value);
    else if (language === "css") SetCss(value);
    else if (language === "js") SetJs(value);
  };

  // function to save the program
  const saveProgram= async()=>{
    const id = `${Date.now()}`
    const _doc ={
      id: id,
      title: title,
      html: html,
      css: css,
      js: js,
      output: output,
      user: user,

    }
    await setDoc(doc(db, "Projects",id), _doc).then((res)=>{setAlert(true)}).catch((err)=>console.log(err))
    setInterval(()=>{
      setAlert(false)
    },2000)
  }

  useEffect(() => {
    updateOutput();
  }, [html, css, js]);

  const updateOutput = () => {
    const combineOutput = `
      <html>
      <head>
      <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
      </html>
    `;
    SetOutput(combineOutput);
  };

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <Link to={"/home"}>
              <h1 className="text-4xl text-white mt-1.5">CodeSketch</h1>
            </Link>
          </div>
          <h3>Connected Users</h3>
          <div className="clientList">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <button className="btn leaveBtn" onClick={copyRoomId}>
          Copy Room ID
        </button>
        <button className="btn leaveBtn" onClick={leaveRoom}>
          Leave
        </button>
      </div>

      <div className="codeMirror">
        {/* alert section  */}
    {alert && <Alert status={"Success"} alertMsg={"Project saved..."} />}

        {/* header section  */}
        <header className="w-full flex items-center justify-between px-12 py-4">
  {/* Left Side: Logo and Title */}
  <div className="flex items-center gap-6">
    <Link to={"/home"}>
      <h1 className="text-4xl text-white">CodeSketch</h1>
    </Link>

    {/* Title Section */}
    <div className="flex items-center gap-3">
      <AnimatePresence>
        {isTitle ? (
          <motion.input
            key="TitleInput"
            type="text"
            placeholder="Your title"
            value={title}
            className="px-3 py-2 rounded-md bg-transparent text-white border border-gray-500 outline-none"
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <motion.p key="titleLabel" className="px-3 py-2 text-white text-lg">
            {title}
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isTitle ? (
          <motion.div key="MdCheck" whileTap={{ scale: 0.9 }} className="cursor-pointer" onClick={() => setIsTitle(false)}>
            <MdCheck className="text-2xl text-blue-700" />
          </motion.div>
        ) : (
          <motion.div key="MdEdit" whileTap={{ scale: 0.9 }} className="cursor-pointer" onClick={() => setIsTitle(true)}>
            <MdEdit className="text-2xl text-blue-700" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>

  {/* Right Side: User and Save Button */}
  {user && (
    <div className="flex items-center gap-4">
      <motion.button
        onClick={saveProgram}
        className="px-6 py-2 bg-blue-400 cursor-pointer text-white text-base font-semibold rounded-md hover:bg-blue-500 transition"
      >
        Save
      </motion.button>
      <UserProfile />
    </div>
  )}
</header>

        <div className="h-screen w-screen overflow-hidden w-auto">
  <SplitPane split="horizontal" minSize={100} defaultSize="55%">
    {/* Top Section - Code Editors */}
    <SplitPane split="vertical" minSize={300} defaultSize="33%">
      {/* HTML Editor */}
      <div className="flex flex-col h-full">
        <div className="editor-header html-header">
          <FaHtml5 /> HTML
        </div>
        <CodeMirror
          value={html}
          className="flex-1 overflow-auto"
          extensions={[htmld(), autocompletion()]}
          onChange={(value) => handleCodeChange("html", value)}
        />
      </div>

      {/* CSS & JS Editors Side-by-Side */}
      <SplitPane split="vertical" minSize={300} defaultSize="50%">
        {/* CSS Editor */}
        <div className="flex flex-col h-full">
          <div className="editor-header css-header">
            <FaCss3 /> CSS
          </div>
          <CodeMirror
            value={css}
            className="flex-1 overflow-auto"
            extensions={[cssd(), autocompletion()]}
            onChange={(value) => handleCodeChange("css", value)}
          />
        </div>

        {/* JavaScript Editor */}
        <div className="flex flex-col h-full">
          <div className="editor-header js-header">
            <FaJs /> JavaScript
          </div>
          <CodeMirror
            value={js}
            className="flex-1 overflow-auto"
            extensions={[javascript(), autocompletion()]}
            onChange={(value) => handleCodeChange("js", value)}
          />
        </div>
      </SplitPane>
    </SplitPane>

    {/* Bottom Section - Output */}
    <div className="output h-full">
      <iframe
        title="Result"
        srcDoc={output}
        className="w-full h-full border-none bg-white"
      />
    </div>
  </SplitPane>
</div>

      </div>
    </div>
  );
};
// rgb(34, 34, 34)
export default NewProject;
