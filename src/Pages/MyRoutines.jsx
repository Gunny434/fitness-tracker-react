import React from "react";
import AllMyRoutines from "../Components/AllMyRoutines";
import AddRoutine from "../Components/AddRoutine";

const MyRoutines = ({token, activities, setActivities, routines, setRoutines, userId}) => {
    return (
      <div className="myRoutines_page">
        <h2>Create New Routine:</h2>
          <AddRoutine token={ token } routines={ routines } setRoutines={ setRoutines } />
        
        <h1>All My Routines:</h1>
          <AllMyRoutines token={ token } routines={ routines } setRoutines={ setRoutines } activities={ activities } setActivities={ setActivities } userId={ userId }/>

      </div>
    );
  };
  
export default MyRoutines;