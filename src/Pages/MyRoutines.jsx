import React from "react";
import AllMyRoutines from "../Components/AllMyRoutines";
import AddRoutine from "../Components/AddRoutine";
import "./MyRoutines.css";

const MyRoutines = ({token, activities, setActivities, routines, setRoutines, userId}) => {
    return (
      <div className="myRoutines_page">
        <AddRoutine token={ token } routines={ routines } setRoutines={ setRoutines } />
        <AllMyRoutines token={ token } routines={ routines } setRoutines={ setRoutines } activities={ activities } setActivities={ setActivities } userId={ userId }/>
      </div>
    );
  };
  
export default MyRoutines;