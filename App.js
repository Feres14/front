import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home"; // Vérifie que ce chemin est correct
import Register from "./pages/Registration";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} /> {/* Route Home */}
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}
export default App;