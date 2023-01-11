import React, { useEffect, useState } from "react";
import { getAllActivities, getMyRoutines, addActivityToRoutine, editRoutine } from "../api/auth";

const AllMyRoutines = ({token, activities, setActivities, routines, setRoutines, userId}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [routineId, setRoutineId] = useState(0);
    const [activityId, setActivityId] = useState(0);
    const [duration, setDuration] = useState(0);
    const [count, setCount] = useState(0);
    const [editRoutine, setEditRoutine] = useState(0);
    const [useEffectSetter, setUseEffectSetter] = useState(false);
    const [newName, setNewName] = useState("");
    const [newGoal, setNewGoal] = useState("");
    const [newIsPublic, setNewIsPublic] = useState(false);
    
    try {
        useEffect(() => {
            getMyRoutines(userId, token).then(
                (result) => {setRoutines(result)},
                (error) => {console.log(error)}
            );
            getAllActivities().then(
                (result) => {setActivities(result)},
                (error) => {console.log(error)}
            );
        }, [useEffectSetter]);
    } catch (error) {
        console.error(error);
    };

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
                            { (routine.id != editRoutine) &&
                                <form onSubmit={async (e) => {
                                    e.preventDefault();
                                    console.log("Editing Routine", routine.id, ":", routine.name);
                                    setEditRoutine(routine.id);
                                    setRoutineId(0);
                                }}>
                                    <button type="submit">Edit</button>
                                </form>
                            }
                            {/* - - - - - - - - - - - - - - EDIT ROUTINE BUTTON HERE - - - - - - - - - - - - - - */}
                            { (routine.id === editRoutine) &&
                                <form onSubmit={async (e) => {
                                    e.preventDefault();
                                    await editRoutine(routine.id, newName, newGoal, newIsPublic, token);
                                    if (useEffectSetter) {
                                        setUseEffectSetter(false)
                                    } else {
                                        setUseEffectSetter(true)
                                    };
                                    setEditRoutine(0);
                                    setNewName("");
                                    setNewGoal("");
                                    setNewIsPublic(false);
                                }}>
                                    <label className="postLabel" htmlFor='newName'>New Name:</label>
                                    <input className="input" type='text' name='newName' value={newName} onChange={(event) => setNewName(event.target.value)} />
                                    <br/>
                                    <label className="postLabel" htmlFor='newGoal'>New Goal:</label>
                                    <input className="input" type='text' name='newGoal' value={newGoal} onChange={(event) => setNewGoal(event.target.value)} />
                                    <br/>
                                    <label className="postLabel" htmlFor='isPublic'>Visibility:</label>
                                    <select onChange={e => setNewIsPublic(e.target.value)}>
                                        <option value="true">Public</option>
                                        <option value="">Private</option>
                                    </select>
                                    <br/>
                                    <button type="submit">Edit Routine</button>
                                </form>
                            }
                            <p>Goal: {routine.goal}</p>
                            <div className="routineActivitiesHolder">
                                <h3>Activities:</h3>
                                {routine.activities?.map((activity) => {
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
                                {/* - - - - - - - - - - - - - - ADD ACTIVITY BUTTON HERE - - - - - - - - - - - - - - */}
                                { (routine.id !== routineId) &&
                                    <form onSubmit={async (e) => {
                                        e.preventDefault();
                                        console.log("Selected Routine:", routine.name);
                                        setRoutineId(routine.id);
                                        setEditRoutine(0);
                                    }}>
                                        <button type="submit">Add Activity</button>
                                    </form>
                                }
                                { (routine.id === routineId) &&
                                    <form onSubmit={async (e) => {
                                        e.preventDefault();
                                        await addActivityToRoutine(routineId, activityId, count, duration, token);
                                        if (useEffectSetter) {
                                            setUseEffectSetter(false)
                                        } else {
                                            setUseEffectSetter(true)
                                        };
                                        setRoutineId(-1);
                                        setActivityId(-1);
                                        setCount(0);
                                        setDuration(0);
                                    }}>
                                        <select onChange={e => setActivityId(e.target.value)} value={activityId}>
                                            <option value="">-Please Select an Activity-</option>
                                            {activities.map((activity) => {
                                                return (
                                                    <option value={activity.id} key={activity.id}>{activity.name}</option>
                                                )
                                            })}
                                        </select>
                                        <br/>
                                        <label className="postLabel" htmlFor='duration'>Duration/Repetitions:</label>
                                        <input className="input" type='text' name='duration' value={duration} onChange={(event) => setDuration(event.target.value)} />
                                        <br/>
                                        <label className="postLabel" htmlFor='count'>Count (where applicable):</label>
                                        <input className="input" type='text' name='count' value={count} onChange={(event) => setCount(event.target.value)} />
                                        <br/>
                                        <button type="submit">Add to Routine</button>
                                    </form>
                                }
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default AllMyRoutines;