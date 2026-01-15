import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";

function App() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true"; // Check for login status

    return (
        <Router>
            <Routes>
                <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />
                <Route 
                    path="/home" 
                    element={isLoggedIn ? <Home /> : <Navigate to="/login" />} 
                />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
