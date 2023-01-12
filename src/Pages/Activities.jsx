import React from "react";
import AllActivities from "../Components/AllActivities";
import AddActivity from "../Components/AddActivity";

const Activities = ({token, activities, setActivities}) => {
    return (
      <div className="activities_page">
        { token &&
        <h2>Add Activity:</h2>
        }
        { token &&
        <AddActivity token={ token } activities={ activities } setActivities={ setActivities } />
        }
        <h1>All Activities:</h1>
        <AllActivities token={ token } activities={ activities } setActivities={ setActivities } />
      </div>
    );
  };
  
export default Activities;