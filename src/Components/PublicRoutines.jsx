import React, { useEffect, useState } from "react";
import { getPublicRoutines } from "../api/auth";

// const PublicRoutines = ({routines, setRoutines}) => {
//     const publicRoutines = getPublicRoutines();
//     console.log(publicRoutines);

//     return (
//         <div className="publicRoutines">
//             {/*  */}
//             {routines.map((singleRoutine) => {
          
//             <div className="singleroutine" key='singleRoutine.id'>
//                 <h3>{singleRoutine.name}</h3>
//                 <p>{singleRoutine.goal}</p>
//                 <p>{singleRoutine.creatorName}</p>
//             </div>
//           })};
//         </div>
//     );
// };

// export default PublicRoutines