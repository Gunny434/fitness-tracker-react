import React from 'react';
import LogMeOut from '../Components/LogMeOut';

const Home = ({token, posts, setPosts, userId, setToken}) => {
  return (
    <>
        { token &&
            <LogMeOut
                token={ token } 
                setToken={ setToken }/>
        }
        <h1>Hello and welcome to yet another fitness tracker app!</h1>
        <h3>Please click on one of the links at the top to get started.</h3>
    </>
  );
};

export default Home;