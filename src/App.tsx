import React from "react";
import "./App.css";
import Login from "./pages/Login";
import Panel from "./pages/Panel";
import { Navigate, Route, Routes } from "react-router-dom";
import Comments from "./pages/Comments";
import Topics from "./pages/Topics";

const PrivateRoute = ({ component: Component }: any) => {
  const authLogin = sessionStorage.getItem("token") !== null;

  return authLogin ? <Component /> : <Navigate to="/login" replace={true} />;
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/panel" element={<PrivateRoute component={Panel} />} />
        <Route
          path="/comment"
          element={<PrivateRoute component={Comments} />}
        />
        <Route path="/topic" element={<PrivateRoute component={Topics} />} />
        <Route path="/" element={<Navigate replace to="/panel" />}/>
      </Routes>
    </div>
  );
}

export default App;
