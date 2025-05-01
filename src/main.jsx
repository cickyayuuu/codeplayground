import React from "react"; // Importing React

import { createRoot } from "react-dom/client"; // Importing createRoot for React 18

import "./index.css"; // Importing global CSS styles

import App from "./App.jsx"; // Importing the main App component

import { BrowserRouter as Router } from "react-router-dom"; // Importing Router for navigation

import { Provider } from "react-redux"; // Importing Provider to connect Redux with React

import Store from "./context/store.jsx"; // Importing the Redux store

createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    {/* Making Redux store available to the whole app */}
    
    <Router>
      {/* Wrapping App inside Router to enable navigation */}
      
      <App />
      {/* Rendering the main App component */}
      
    </Router>
  </Provider>
);
