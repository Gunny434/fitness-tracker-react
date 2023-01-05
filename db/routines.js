const client = require("./client");

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
    `)
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

    for (const routine of routines) {
      const activitiesToAdd = activities.filter(
        (activity) => activity.routineId === routine.id
      );

      routine.activities = activitiesToAdd;
    }

    return routines;
  } catch (error) {
    // console.error(error);
    throw error;
  }
}

async function getAllPublicRoutines() {}

async function getAllRoutinesByUser({ username }) {}

async function getPublicRoutinesByUser({ username }) {}

async function getPublicRoutinesByActivity({ id }) {}

async function updateRoutine( id, fields = {} ) {
  const keys = Object.keys(fields);
  console.log(keys)
  console.log(Object.values(fields));

  const setString = keys.map(
    (key, index) => `${key}=$${index + 1}`
  ).join(', ');
  
  console.log(setString)
  try { 
    if (setString.length > 0) {
      const {rows: [updatedRoutine]} = await client.query (`
      UPDATE routines
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
      `, Object.values(fields));

      return updatedRoutine;
    }

  }  catch (error) {
  console.error(error)
  throw error
 }}

async function destroyRoutine(id) {}

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
