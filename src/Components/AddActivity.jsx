import React, { useState } from "react";
import { submitActivity } from "../api/auth";


const AddActivity = ({token, activities, setActivities}) => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    
    const handleSubmit = async (event) => {
      event.preventDefault(); //Stop it from disappearing immediately
      const submittedActivity = await submitActivity(
        name,
        desc,
        token);
      console.log(submittedActivity); //Show me what was typed
      setActivities([submittedActivity, ...activities]);
      setName(''); //clear the field after it's submitted
      setDesc(''); //clear the field after it's submitted
    };

    return (
      <div id='submit-form-container'>
        <form className="submitForm" onSubmit={handleSubmit}>
          <label className="postLabel" htmlFor='name'>Activity Name:</label>
          <input className="input" type='text' name='name' value={name} onChange={(event) => setName(event.target.value)} />
          <label className="postLabel" htmlFor='desc'>Description:</label>
          <textarea className="input" type='text' name='description' value={desc} onChange={(event) => setDesc(event.target.value)}/>
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }



  export default AddActivity;