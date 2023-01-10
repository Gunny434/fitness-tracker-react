import React from "react";
import AllActivities from "../Components/AllActivities";
import AddActivity from "../Components/AddActivity";
import LogMeOut from "../Components/LogMeOut";

const Activities = ({token, setToken, activities, setActivities}) => {
    return (
      <div className="activities_page">
        { token &&
          <LogMeOut
            token={ token } 
            setToken={ setToken }/>
        }
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