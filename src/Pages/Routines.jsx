
import PublicRoutines from "../Components/PublicRoutines";
import React from "react";

const Routines = ({token, routines, setRoutines}) => {
    return (
      <div className="routines_page">
        <h1>All Public Routines:</h1>
        <PublicRoutines token={ token } routines={ routines } setRoutines={ setRoutines } />
      </div>
    );
  };

export default Routines;