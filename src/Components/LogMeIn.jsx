import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LogMeIn.css";

import { getUserId, login } from "../api/auth";

const LogMeIn = ({setToken, setUserId}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const getMeOuttaHere = useNavigate("/myroutines");

    return (
        <div className="login-bar">
            <h2>If you are an existing user, please login below!</h2>
            <form
               className="login-form"
               onSubmit={async (e) => {
                try {
                    e.preventDefault();
                    console.log(password, username);
                    const token = await login(username, password);
                    if (!token) {
                        setPasswordError("Username/Password do not match. Please check your spelling and try again.");
                    } else {
                    setToken(token);
                    const userId = await getUserId(token);
                    setUserId(userId);
                    localStorage.setItem("token", token);
                    localStorage.setItem("userID", userId);
                    setUsername("");
                    setPassword("");
                    getMeOuttaHere("/myroutines");
                    };
                }   catch(error)   {
                    console.error()
                }
               }}
            >
                <label htmlFor="username">Username: </label>
                <input 
                  value={username}
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                ></input>

                <label htmlFor="password">Password: </label>
                <input 
                  value={password}
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>

                <button type="submit">Log In</button>
                <div className="passwordError">{passwordError}</div>
            </form>
        </div>
    );
};

export default LogMeIn