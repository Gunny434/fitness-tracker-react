import React, { useEffect, useState } from "react";
import { getAllActivities, getMyRoutines, addActivityToRoutine, editRoutine, editActivity, deleteRoutine, deleteActivityFromRoutine } from "../api/auth";

const AllMyRoutines = ({token, activities, setActivities, routines, setRoutines, userId}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [routineId, setRoutineId] = useState(0);
    const [activityId, setActivityId] = useState(0);
    const [duration, setDuration] = useState(0);
    const [count, setCount] = useState(0);
    const [useEffectSetter, setUseEffectSetter] = useState(false);
    const [newName, setNewName] = useState("");
    const [newGoal, setNewGoal] = useState("");
    const [newDuration, setNewDuration] = useState("");
    const [newCount, setNewCount] = useState("");
    const [newIsPublic, setNewIsPublic] = useState(false);
    const [editRoutineId, setEditRoutineId] = useState(0);
    const [editActivityId, setEditActivityId] = useState(0);
    const [deleteRoutineId, setDeleteRoutineId] = useState(0);
    const [deleteActivityId, setDeleteActivityId] = useState(0);
    
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
            <h1>All My Routines:</h1>
            <input
                className="search"
                placeholder="Search for posts by Title"
                value={searchTerm}
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
            ></input>
            <div className="myRoutinesContainer">
                {filteredRoutines?.map((routine) => {
                    return (
                        <div className="singleroutine" key={routine.id}>
                            <div className="routineInfo">
                                <div className="top">
                                    <h2>Routine: {routine.name}</h2>
                                    <p>Goal: {routine.goal}</p>
                                </div>
                                <div className="bottom">
                                {/* - - - - - - - - - - - - - - ADD ACTIVITY BUTTON HERE - - - - - - - - - - - - - - */}
                                { (routine.id !== routineId) &&
                                    <form className="submitActivityForm" onSubmit={async (e) => {
                                        e.preventDefault();
                                        console.log("Selected Routine:", routine.name);
                                        setRoutineId(routine.id);
                                        setEditRoutineId(0);
                                        setDeleteRoutineId(0);
                                        setDeleteActivityId(0);
                                        setEditActivityId(0);
                                    }}>
                                        <button type="submit">Add Activity to Routine</button>
                                    </form>
                                }
                                { (routine.id === routineId) &&
                                    <form className="submitActivityForm" onSubmit={async (e) => {
                                        e.preventDefault();
                                        await addActivityToRoutine(routineId, activityId, count, duration, token);
                                        if (useEffectSetter) {
                                            setUseEffectSetter(false)
                                        } else {
                                            setUseEffectSetter(true)
                                        };
                                        setRoutineId(0);
                                        setActivityId(0);
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
                                        <label className="postLabel" htmlFor='duration'>Duration:</label>
                                        <input className="input" type='number' name='duration' value={duration} onChange={(event) => setDuration(event.target.value)} />
                                        <label className="postLabel" htmlFor='count'>Count:</label>
                                        <input className="input" type='number' name='count' value={count} onChange={(event) => setCount(event.target.value)} />
                                        <p></p>
                                        <button type="submit">Add to Routine</button>
                                    </form>
                                }
                                {/* - - - - - - - - - - - - - - EDIT ROUTINE BUTTON HERE - - - - - - - - - - - - - - */}
                                { (routine.id != editRoutineId) &&
                                    <form className="submitActivityForm" onSubmit={async (e) => {
                                        e.preventDefault();
                                        console.log("Editing Routine", routine.id, ":", routine.name);
                                        setEditRoutineId(routine.id);
                                        setRoutineId(0);
                                        setDeleteRoutineId(0);
                                        setDeleteActivityId(0);
                                        setEditActivityId(0);
                                        setNewName(routine.name);
                                        setNewGoal(routine.goal);
                                        setNewIsPublic(false);
                                    }}>
                                        <button type="submit">Edit Routine</button>
                                    </form>
                                }
                                { (routine.id === editRoutineId) &&
                                    <form className="submitActivityForm" onSubmit={async (e) => {
                                        e.preventDefault();
                                        const editedRoutine = await editRoutine(routine.id, newName, newGoal, newIsPublic, token);
                                        console.log("editedRoutine:", editedRoutine);
                                        if (useEffectSetter) {
                                            setUseEffectSetter(false)
                                        } else {
                                            setUseEffectSetter(true)
                                        };
                                        setEditRoutineId(0);
                                        setNewName(routine.name);
                                        setNewGoal(routine.goal);
                                        setNewIsPublic(false);
                                    }}>
                                        <label className="postLabel" htmlFor='newName'>New Name:</label>
                                        <input className="input" type='text' name='newName' value={newName} onChange={(event) => setNewName(event.target.value)} />
                                        <label className="postLabel" htmlFor='newGoal'>New Goal:</label>
                                        <input className="input" type='text' name='newGoal' value={newGoal} onChange={(event) => setNewGoal(event.target.value)} />
                                        <label className="postLabel" htmlFor='isPublic'>Visibility:</label>
                                        <select onChange={e => setNewIsPublic(!!e.target.value)}>
                                            <option value="">Private</option>
                                            <option value="true">Public</option>
                                        </select>
                                        <button type="submit">Submit Changes</button>
                                    </form>
                                }
                                {/* - - - - - - - - - - - - - - DELETE ROUTINE BUTTON HERE - - - - - - - - - - - - - - */}
                                { (routine.id != deleteRoutineId) &&
                                    <form onSubmit={async (e) => {
                                        e.preventDefault();
                                        console.log("Editing Routine", routine.id, ":", routine.name);
                                        setDeleteRoutineId(routine.id);
                                        setEditRoutineId(0);
                                        setRoutineId(0);
                                        setDeleteActivityId(0);
                                        setEditActivityId(0);
                                    }}>
                                        <button type="submit">Delete Routine</button>
                                    </form>
                                }
                                { (routine.id === deleteRoutineId) &&
                                    <div className="delete_checker">
                                        <p>Are you sure you would like to delete this routine?</p>
                                        <form onSubmit={async (e) => {
                                            e.preventDefault();
                                            const deletedRoutine = await deleteRoutine(routine.id, token);
                                            console.log("deletedRoutine:", deletedRoutine);
                                            if (useEffectSetter) {
                                                setUseEffectSetter(false)
                                            } else {
                                                setUseEffectSetter(true)
                                            };
                                            setDeleteRoutineId(0);
                                        }}>
                                            <button type="submit">Yes I'm Sure</button>
                                        </form>
                                        <form onSubmit={async (e) => {
                                            e.preventDefault();
                                            console.log(`Routine ${routine.name} was not deleted.`);
                                            if (useEffectSetter) {
                                                setUseEffectSetter(false)
                                            } else {
                                                setUseEffectSetter(true)
                                            };
                                            setDeleteRoutineId(0);
                                        }}>
                                            <button type="submit">No, take me back</button>
                                        </form>
                                    </div>
                                }
                                </div>
                            </div>
                            <div className="routineActivitiesHolder">
                                <h3>Activities:</h3>
                                {routine?.activities?.map((activity) => {
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
                                            {/* - - - - - - - - - - - - - - EDIT ACTIVITY BUTTON HERE - - - - - - - - - - - - - - */}
                                            { (activity.id != editActivityId) &&
                                                <form className="submitActivityForm" onSubmit={async (e) => {
                                                    e.preventDefault();
                                                    console.log(`Editing Activity ${activity.id}: ${activity.name}`);
                                                    setEditActivityId(activity.id);
                                                    setDeleteActivityId(0);
                                                    setEditRoutineId(0);
                                                    setDeleteRoutineId(0);
                                                    setRoutineId(0);
                                                }}>
                                                    <button type="submit">Edit Activity</button>
                                                </form>
                                            }
                                            { (activity.id === editActivityId) &&
                                                <form className="submitActivityForm" onSubmit={async (e) => {
                                                    e.preventDefault();
                                                    const editedActivity = await editActivity(activity.routineActivityId, newDuration, newCount, token);
                                                    console.log("editedActivity:", editedActivity);
                                                    if (useEffectSetter) {
                                                        setUseEffectSetter(false)
                                                    } else {
                                                        setUseEffectSetter(true)
                                                    };
                                                    setEditActivityId(0);
                                                    setEditRoutineId(0);
                                                    setNewDuration(0);
                                                    setNewCount(0);
                                                }}>
                                                    <label className="postLabel" htmlFor='newDuration'>New Duration/Reps:</label>
                                                    <input className="input" type='text' name='newDuration' value={newDuration} onChange={(event) => setNewDuration(event.target.value)} />
                                                    <label className="postLabel" htmlFor='newCount'>New Count:</label>
                                                    <input className="input" type='text' name='newCount' value={newCount} onChange={(event) => setNewCount(event.target.value)} />
                                                    <br/>
                                                    <button type="submit">Submit Changes</button>
                                                </form>
                                            }
                                            {/* - - - - - - - - - - - - - - DELETE ACTIVITY BUTTON HERE - - - - - - - - - - - - - - */}
                                            { (activity.id != deleteActivityId) &&
                                                <form className="submitActivityForm" onSubmit={async (e) => {
                                                    e.preventDefault();
                                                    console.log("Deleting Activity", activity.name, "from", routine.name);
                                                    setDeleteActivityId(activity.id);
                                                    setEditRoutineId(0);
                                                    setDeleteRoutineId(0);
                                                    setRoutineId(0);
                                                    setEditActivityId(0);
                                                }}>
                                                    <button type="submit">Delete Activity From Routine</button>
                                                </form>
                                            }
                                            { (activity.id === deleteActivityId) &&
                                                <div className="delete_checker">
                                                    <p>Are you sure you would like to delete this activity?</p>
                                                    <form onSubmit={async (e) => {
                                                        e.preventDefault();
                                                        console.log(`Activity ${activity.name} was deleted!`)
                                                        const deletedActivity = await deleteActivityFromRoutine(activity.routineActivityId, token);
                                                        console.log("deletedActivity:", deletedActivity);
                                                        if (useEffectSetter) {
                                                            setUseEffectSetter(false)
                                                        } else {
                                                            setUseEffectSetter(true)
                                                        };
                                                        setDeleteActivityId(0);
                                                    }}>
                                                        <button type="submit">Yes I'm Sure</button>
                                                    </form>
                                                    <form onSubmit={async (e) => {
                                                        e.preventDefault();
                                                        console.log(`Activity ${activity.name} was not deleted.`);
                                                        if (useEffectSetter) {
                                                            setUseEffectSetter(false)
                                                        } else {
                                                            setUseEffectSetter(true)
                                                        };
                                                        setDeleteActivityId(0);
                                                    }}>
                                                        <button type="submit">No, take me back</button>
                                                    </form>
                                                </div>
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