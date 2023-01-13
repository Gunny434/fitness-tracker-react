import React, { useState } from "react";
import { submitRoutine } from "../api/auth";


//make submit routine api func

const AddRoutine = ({token, routines, setRoutines, activities, setActivities}) => {
    const [name, setName] = useState('');
    const [createRoutineError, setCreateRoutineError] = useState('');
    const [goal, setGoal] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    
    const handleSubmit = async (event) => {
      event.preventDefault(); //Stop it from disappearing immediately
      const submittedRoutine = await submitRoutine(
        name,
        goal,
        isPublic,
        token);
      if (submittedRoutine) {
        console.log(submittedRoutine); //Show me what was typed
        setRoutines([submittedRoutine, ...routines]);
        setName(''); //clear the field after it's submitted
        setGoal(''); //clear the field after it's submitted
        setIsPublic(false); //clear the field after it's submitted
      } else {
        setCreateRoutineError('That routine name already exists. Please try again.');
      }
    };

    return (
      <div id='submit-form-container'>
        <h2>Create New Routine:</h2>
        <form className="submitForm" onSubmit={handleSubmit}>
          <label className="postLabel" htmlFor='name'>Routine Name:</label>
          <input className="input" type='text' name='name' value={name} onChange={(event) => setName(event.target.value)} />
          <label className="postLabel" htmlFor='goal'>Goal:</label>
          <input className="input" type='text' name='goal' value={goal} onChange={(event) => setGoal(event.target.value)}/>
          <label className="postLabel" htmlFor='isPublic'>Visibility:</label>
          <select onChange={e => setIsPublic(e.target.value)}>
            <option value="">Private</option>
            <option value="true">Public</option>
          </select>
          <button type='submit'>Submit</button>
          <div className="createRoutineError">{createRoutineError}</div>
        </form>
      </div>
    )
  }



  export default AddRoutine;