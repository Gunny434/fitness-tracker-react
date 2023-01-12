import React, {useEffect} from 'react';

const LogOut = ({setToken}) => {
    useEffect(() => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('userID');
            setToken(null);
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