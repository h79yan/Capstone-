import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom"; // For navigation after login
import Home from "../Home/Home";

function Login() {
    // Define variables to store username and password 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Toggle visibility of the password 
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate(); // For navigation
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Function to handle form submission (i.e., login request)
    const handleLogin = async (e) => {
        // Prevent refreshing the page when submitting the form 
        e.preventDefault();

        console.log(`${username} ${password}`);

        // Check if both username and password are provided
        if (username && password) {
            try {
                // Call the backend API for login
                const response = await fetch("http://127.0.0.1:8000/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, password }), // Send username and password
                });

                // Handle server response
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("Error response from server:", errorText);
                    alert("Login failed. Please check your credentials.");
                    return; 
                }

                const data = await response.json(); // Parse the JSON response
                // Store the JWT in local storage
                localStorage.setItem("token", data.access_token); // Store the JWT token
                setIsLoggedIn(true);
                sessionStorage.setItem("isLoggedIn", "true");
                console.log("Login successful!");
                navigate("/home"); // Redirect to home page after successful login

                window.location.reload();
            } catch (error) {
                console.error("Network error during login:", error);
                alert("There was a network error. Please try again later.");
            }
        } else {
            alert("Please enter both username and password."); // Alert if fields are empty
        }
    };
    // component testing purpose 
    // if (isLoggedIn) {
    //     return <Home />;
    // }

    // Render user interface for merchant login page 
    return (
        <div className="login-container">
            <div className="login-left">
                <h1>WELCOME</h1>
                <p>TO</p>
                <h2>QUE</h2>
                <p>FOODHALL</p>
            </div>

            <div className="login-right">
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="username"> Enter Username: </label>
                        <input 
                            type="text" 
                            id="username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            placeholder="Phone Number / Email"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password"> Enter Password: </label>
                        <div className="password-container">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                id="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="Password"
                            />
                            <button 
                                type="button" 
                                className="toggle-password" 
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="login-button"> Log In </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
