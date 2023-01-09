import React from 'react';
// import Posts from '../Components/Posts';
import LogMeOut from '../Components/LogMeOut';
// import PostForm from '../Components/PostForm';

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
    {/* <div className="post-and-form">
        { token &&
            <PostForm 
                token={ token } 
                posts={ posts } 
                setPosts={ setPosts }
            />
        }
            <Posts 
                token={ token } 
                posts={ posts } 
                setPosts={ setPosts }
                userId={ userId }
            />
    </div> */}
    </>
  );
};

export default Home;