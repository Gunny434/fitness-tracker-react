import React, { useEffect, useState } from "react";
import { getMyRoutines } from "../api/auth";

const AllMyRoutines = ({token, activities, setActivities, routines, setRoutines, userId}) => {
    const [searchTerm, setSearchTerm] = useState('');
    
    try {
        useEffect(() => {
            getMyRoutines(userId, token).then(
                (result) => {setRoutines(result)},
                (error) => {console.log(error)}
            )
        }, []);

    } catch (error) {
        console.error(error);
    };

    console.log(routines);

    const filteredRoutines = routines?.filter(routine => routine.name.toLowerCase()
        .includes(searchTerm.toLowerCase()));

    return (
        <div className="portside">
            <input
                className="search"
                placeholder="Search for posts by Title"
                value={searchTerm}
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
            ></input>
            <div className="publicRountinesContainer">
                {filteredRoutines?.map((routine) => {
                    return (
                        <div className="singleroutine" key={routine.id}>
                            <h2>Routine: {routine.name}</h2>
                            <p>Goal: {routine.goal}</p>
                            <p>Creator: {routine.creatorName}</p>
                            <div className="routineActivitiesHolder">
                                <h3>Activities:</h3>
                                {routine.activities.map((activity) => {
                                    return (
                                        <div className="singleActivityInRoutine" key={activity.id}>
                                            <h4>{activity.name}</h4>
                                            <p>Description: {activity.description}</p>
                                            { activity.duration &&
                                            <p>Duration: {activity.duration}</p>
                                            }
                                            { activity.count &&
                                            <p>Count: {activity.count}</p>
                                            }
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default AllMyRoutines;