import React, {} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getUserId } from "./api/auth";
import { useState } from "react";

import Home from "./Pages/Homepage";
import Register from "./Components/RegisterUser";
import LogMeIn from "./Components/LogMeIn";
import Navbar from "./Pages/Navbar";

function App() {
    const [routines, setRoutines] = useState([]);
    const [activities, setActivities] = useState([]);
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState('');

    if (localStorage.token && !token) {
        setToken(localStorage.token);
    };

    if (localStorage.userID && !userId) {
        setUserId(localStorage.userID);
    };

    return (
        <div className="App">
            <h1>Under Construction, Come Back Soon...</h1>
            <h1 className="FTLOGO">Fitness Trackr</h1>
            <Navbar token={ token }/>
            <Routes>
                <Route path='/' 
                element={<Home 
                token={ token } 
                routines={ routines } 
                setRoutines={ setRoutines }
                userId={ userId }
                setToken={ setToken }/>} 
                />
                {!token &&
                    <Route path='/register' element={ <Register setToken={ setToken } /> }/>
                }
                {!token &&
                    <Route path='/login' element={ <LogMeIn setToken={ setToken } setUserId={ setUserId } /> } />
                }
                <Route path='*' element={<Navigate replace to='/' />} />
                
            </Routes>
        </div>
    )
}
  
export default App;