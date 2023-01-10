import LogMeOut from "../Components/LogMeOut";
import PublicRoutines from "../Components/PublicRoutines";
import React from "react";

const Routines = ({token, setToken, routines, setRoutines}) => {
    return (
      <div className="routines_page">
        { token &&
          <LogMeOut
            token={ token } 
            setToken={ setToken }/>
        }
        <h1>All Public Routines:</h1>
        <PublicRoutines token={ token } routines={ routines } setRoutines={ setRoutines } />
      </div>
    );
  };
  
export default Routines;