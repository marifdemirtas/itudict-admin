import React, { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Panel from "./pages/Panel";
import { Route, Routes } from "react-router-dom";
import Comments from "./pages/Comments";
import Topics from "./pages/Topics";
import Signup from "./pages/Signup";
import { CommonContext } from "./contexts/CommonContext";

function App() {
  const [token, setToken] = useState("");
  return (
    <CommonContext.Provider value={{ token, setToken }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/panel" element={<Panel />} />
          <Route path="/comment" element={<Comments />} />
          <Route path="/topic" element={<Topics />} />
        </Routes>
      </div>
    </CommonContext.Provider>
  );
}

export default App;
