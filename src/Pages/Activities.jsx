import React from "react";
import AllActivities from "../Components/AllActivities";
import AddActivity from "../Components/AddActivity";
import "./Activities.css"

const Activities = ({token, activities, setActivities}) => {
    return (
      <div className="activities_page">
        
        <div className="addActivity">
          { token &&
          <h2>Add Activity:</h2>
          }
          { token &&
          <AddActivity token={ token } activities={ activities } setActivities={ setActivities } />
          }
        </div>
        <div className="allActivities">
          <h1>All Workout Activities</h1>
          <p>Here is a list of all workout activities submitted by our users. If you would to add to this list, please make sure you are logged in and use the add activity form located to the right.</p>
          <AllActivities token={ token } activities={ activities } setActivities={ setActivities } />
        </div>
      </div>
    );
  };
  
export default Activities;