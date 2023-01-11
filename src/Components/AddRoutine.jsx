import React, { useState } from "react";
import { submitRoutine } from "../api/auth";


//make submit routine api func

const AddRoutine = ({token, routines, setRoutines, activities, setActivities}) => {
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    
    const handleSubmit = async (event) => {
      event.preventDefault(); //Stop it from disappearing immediately
      const submittedRoutine = await submitRoutine(
        name,
        goal,
        isPublic,
        token);
      console.log(submittedRoutine); //Show me what was typed
      setRoutines([submittedRoutine, ...routines]);
      setName(''); //clear the field after it's submitted
      setGoal(''); //clear the field after it's submitted
      setIsPublic(false); //clear the field after it's submitted
    };

    return (
      <div id='submit-form-container'>
        <form className="submitForm" onSubmit={handleSubmit}>
          <label className="postLabel" htmlFor='name'>Routine Name:</label>
          <input className="input" type='text' name='name' value={name} onChange={(event) => setName(event.target.value)} />
          <br/>
          {/* We are aware that <br/> is bad practice but due to time constraints this is the most convenient option. */}
          <label className="postLabel" htmlFor='goal'>Goal:</label>
          <input className="input" type='text' name='goal' value={goal} onChange={(event) => setGoal(event.target.value)}/>
          <br/>
          <label className="postLabel" htmlFor='isPublic'>Visibility:</label>
          <select onChange={e => setIsPublic(e.target.value)}>
            <option value="true">Public</option>
            <option value="">Private</option>
          </select>
          <br/>
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }



  export default AddRoutine;