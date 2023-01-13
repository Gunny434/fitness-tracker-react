import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const LogOut = ({setToken}) => {
    const navigate = useNavigate();
    useEffect(() => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('userID');
            setToken(null);
            setTimeout(() => {navigate("/")}, 3000);
        } catch (error) {
            console.error(error);
        }
    }, [])

  return (
    <>
        <h1>You are now logged out.</h1>
    </>
  );
};

export default LogOut;