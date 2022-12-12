import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Panel from "./pages/Panel";
import { Route, Routes } from "react-router-dom";
import Comments from "./pages/Comments";
import Topics from "./pages/Topics";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/comment" element={<Comments />} />
        <Route path="/topic" element={<Topics />} />
      </Routes>
    </div>
  );
}

export default App;
