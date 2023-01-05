const client = require("./client");
const {attachActivitiesToRoutines} = require('./activities');

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
    const { rows: [ routine ] } = await client.query(`
        INSERT INTO routines("creatorId", "isPublic", name, goal)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `, [creatorId, isPublic, name, goal]);

    return routine;
  } catch (error) {
    console.error(error);  
    throw error;
  }
}

async function getRoutineById(id) {
  try {
    const { rows: [ routine ] } = await client.query(`
        SELECT *
        FROM routines
        WHERE id=$1
    `, [id]);

    if (!routine) {
        throw {
            name: "RoutineNotFoundError",
            message: "Could not find a routine with that ID."
        };
    }
    return routine;
  } catch (error) {
    console.error(error);  
    throw error;
  }
}

async function getRoutinesWithoutActivities() {
  try {
    const {rows: routines} = await client.query(`
      SELECT * FROM routines;
    `);
    // console.log('this is routines in getroutineswihtoutactivities', routines);
    return routines;
  } catch (error) { 
    console.error(error);  
    throw error;
  }
}

async function getAllRoutines() {
  try {
    const { rows: routines} = await client.query(`
      SELECT routines.*, users.username AS "creatorName"
      FROM routines
      JOIN users ON routines."creatorId" = users.id;
    `);
    const {rows: activities} = await client.query(`
      SELECT activities.*, routine_activities.id AS "routineActivityId", routine_activities."routineId", routine_activities.duration, routine_activities.count
      FROM activities
      JOIN routine_activities ON routine_activities."activityId" = activities.id;
    `);

    // for each entry in routines, we want to look through th activities array and filter it where each activity.routineId matches routine.Id, and then add those activities to the routine you are looking at, then return the completed routines array with the added activities
    for (const routine of routines) {
      const activitiesToAdd = activities.filter(
        (activity) => activity.routineId === routine.id
      );

      routine.activities = activitiesToAdd;
    }
    // console.log('this is routines in getallroutines ----------->', routines);
    // console.log(routines[0].activities);
    return routines;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getAllPublicRoutines() {
  try {
    const allRoutines = await getAllRoutines();
    
    const publicRoutines = allRoutines.filter(
      (routine) => routine.isPublic
    )

    // console.log('this is all routines', publicRoutines);
    // console.log(publicRoutines[0].activities);
    return publicRoutines;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getAllRoutinesByUser({ username }) {
  
  try {
    const allRoutines = await getAllRoutines();
  
    const userRoutines = allRoutines.filter(
      (routine) => routine.creatorName === username
    );
    // console.log('this is all routines', userRoutines);
    return userRoutines;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getPublicRoutinesByUser({ username }) {
  try {
    const allRoutines = await getAllRoutines();
  
    const userRoutines = allRoutines.filter(
      (routine) => routine.creatorName === username
    );

    const publicUserRoutines = userRoutines.filter(
      (routine) => routine.isPublic
    );

    // console.log('this is all routines', publicUserRoutines[0].activities);
    return publicUserRoutines;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getPublicRoutinesByActivity({ id }) {
  // pull of the activityId from an activity object
  //maybe we want to take the activity ID, match it to the routine ID in routines_activities, and then return the routine based on the routine ID activty it is aligned to

  try {
    // select everything from routines, 
    const {rows: routines} = await client.query(`
      SELECT routines.*, users.username AS "creatorName"
      FROM routines
      JOIN users ON routines."creatorId" = users.id
      JOIN routine_activities ON routine_activities."routineId" = routines.id
      WHERE routines."isPublic" = true AND routine_activities."activityId" = $1;
    `, [id]);
    
    return attachActivitiesToRoutines(routines);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateRoutine({ id, ...fields}) {
  const keys = Object.keys(fields);

  const setString = keys.map(
    (key, index) => `"${key}"=$${index + 1}`
  ).join(', ');
  
  try { 
    if (setString.length > 0) {
      const {rows: [updatedRoutine]} = await client.query (`
        UPDATE routines
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
      `, Object.values(fields));

      return updatedRoutine;
    } else {
      return null;
    }

  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function destroyRoutine(id) {
  try {
    await client.query(`
      DELETE FROM routine_activities
      WHERE "routineId" = $1;
    `, [id]);
    
    await client.query(`
      DELETE FROM routines
      WHERE id = $1;
    `, [id]);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
