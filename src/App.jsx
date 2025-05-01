import { Navigate, useNavigate } from "react-router-dom";
// Used for moving between pages.

import "./App.css";
// Importing styles.
import { SET_USER } from "./context/actions/userAction";

import React, { useState, useEffect } from "react";
// Using React features.

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
// Setting up different pages (routes).
import Home from "./container/Home";
// Importing Home page.

// import Projects from "./container/Projects";
// Importing Projects page.

import { getAuth, onAuthStateChanged } from "firebase/auth";
// Getting Firebase login system.

import { collection, doc, onSnapshot, orderBy, setDoc } from "firebase/firestore";
// For saving user data in Firebase.

import { db } from "./config/firebase.config";
// Getting Firebase database.

import Spinner from "./components/Spinner";
// Loading animation.

import { useDispatch } from "react-redux";
import NewProject from "./container/NewProject";
import { query } from "firebase/firestore";

import { SET_PROJECTS } from "./context/actions/projectActions";
// To update app-wide data.

const auth = getAuth();
// Setting up login system.

function App() {
  const navigate = useNavigate();
  // To move between pages.

  const [isloading, setIsLoading] = useState(true);
  // Shows loading animation at first.

  const dispatch = useDispatch();
  // To update user info.

  useEffect(() => {
    // Runs once when the page loads.

    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      // Checks if user is logged in.

      if (userCred) {
        // If user is logged in:

        console.log(userCred?.providerData[0]);
        // Show user info in console.

        setDoc(doc(db, "users", userCred.uid), userCred?.providerData[0]).then(
          () => {
            // Save user info in Firebase.

            dispatch(SET_USER(userCred?.providerData[0]));
            navigate("/home/room-id", { replace: true });
            // Save user info in Redux.
          }
        );
      } else {
        // If no user is logged in:

        navigate("/home/auth", { replace: true });
        // Move user to login page.
      }

      setTimeout(() => {
        setIsLoading(false);
        // Stop loading after 6 seconds.
      }, 6000);
    });

    return () => unsubscribe();
    // Stop checking when leaving the page.
  }, []);

  useEffect(()=>{
const projectsQuery = query(
  collection(db,"Projects"),
  orderBy("id","desc")
)

const unsubscribe=onSnapshot(projectsQuery,(querySnaps=>{
  const projectsList = querySnaps.docs.map(doc=>doc.data())
  dispatch(SET_PROJECTS(projectsList))
}))

return unsubscribe;
  },[])

  return (
    <>
      {isloading ? (
        // If loading, show spinner.
        <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
          <Spinner />
        </div>
      ) : (
        // If not loading, show pages.
        <div>
           <div>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        success: {
                            theme: {
                                primary: '#4aed88',
                            },
                        },
                    }}
                ></Toaster>
            </div>
           
            
          <Routes>
            {/* Home page  */}
            <Route path="/home*" element={<Home />} />

            {/* Newprojectpage  */}

            <Route path="/newProject/:roomId" element={<NewProject />} />

            {/* Redirect unknown pages to Home */}
            <Route path="*" element={<Navigate to={"/home"} />} />

            {/* <Route path="" element={<Projects />} /> */}
            {/* This line is commented out */}
          </Routes>
         
        </div>
      )}
    </>
  );
}

export default App;
// Make this file usable in other files.
