const client = require('./client');

// database functions
async function createActivity({ name, description }) {
  // return the new activity
  // const modName = name.toLowerCase();

  try {
    const { rows: [ activity ] } = await client.query(`
      INSERT INTO activities(name, description)
      VALUES ($1, $2)
      ON CONFLICT (name) DO NOTHING
      RETURNING *;
    `, [name, description]);

    // console.log(activity);

    return activity;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getAllActivities() {
  // select and return an array of all activities
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM activities;
    `);

    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getActivityById(id) {
  try {
    const { rows: [activity] } = await client.query(`
        SELECT *
        FROM activities
        WHERE id=${id};
    `);

    if (!activity) {
        return null;
    }
    
    return activity;
  } catch (error) {
    console.error(error);  
    throw error;
  }
}

async function getActivityByName(name) {
  try {
    const { rows: [activity] } = await client.query(`
        SELECT *
        FROM activities
        WHERE name=$1;
    `, [name]);

    if (!activity) {
        return null;
    }
    
    return activity;
  } catch (error) {
    console.error(error);  
    throw error;
  }
}

async function attachActivitiesToRoutines(routines) {
  const newRoutinesToReturn = [...routines]
  // select and return an array of all activities
  const {rows: activities} = await client.query(`
      SELECT activities.*, routine_activities.id AS "routineActivityId", routine_activities."routineId", routine_activities.duration, routine_activities.count
      FROM activities
      JOIN routine_activities ON routine_activities."activityId" = activities.id;
    `);

    // for each entry in routines, we want to look through th activities array and filter it where each activity.routineId matches routine.Id, and then add those activities to the routine you are looking at, then return the completed routines array with the added activities
    for (const routine of newRoutinesToReturn) {
      const activitiesToAdd = activities.filter(
        (activity) => activity.routineId === routine.id
      );

      routine.activities = activitiesToAdd;
    }
// console.log('this is routines in getallroutines ----------->', routines);
// console.log(routines[0].activities);
    return newRoutinesToReturn;
}

async function updateActivity({ id, ...fields }) {
  // don't try to update the id
  // do update the name and description
  // return the updated activity

  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');

  // return early if this is called without fields
  if (setString.length === 0) {
      return;
  }

  try {
      const { rows: [ activity ] } = await client.query(`
      UPDATE activities
      SET ${ setString }
      WHERE id=${ id }
      RETURNING *;
      `, Object.values(fields));

      return activity;
  } catch (error) {
    console.error(error);  
    throw error;
  }
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
