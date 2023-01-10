// import PostView from "../Components/PostView";
// import MessageView from "../Components/MessageView";
import React from "react";
import LogMeOut from "../Components/LogMeOut";
import AddActivity from "../Components/AddActivity";
import AllActivities from "../Components/AllActivities";
import AllMyRoutines from "../Components/AllMyRoutines";
import AddRoutine from "../Components/AddRoutine";

const MyRoutines = ({token, setToken, activities, setActivities, routines, setRoutines, userId}) => {
    return (
      <div className="myRoutines_page">
        { token &&
          <LogMeOut
            token={ token } 
            setToken={ setToken }/>
        }
        
        
        <h2>Create New Routine:</h2>
          <AddRoutine token={ token } routines={ routines } setRoutines={ setRoutines } />
        
        <h1>All My Routines:</h1>
          <AllMyRoutines token={ token } routines={ routines } setRoutines={ setRoutines } activities={ activities } setActivities={ setActivities } userId={ userId }/>

      </div>
    );
  };
  
export default MyRoutines;