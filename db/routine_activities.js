const client = require("./client");



async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {
  // console.log('calling addActivityToRoutine');
  try {
    const { rows: [ routine_activity ] } = await client.query(`
    INSERT INTO routine_activities("routineId", "activityId", count, duration)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT ("routineId", "activityId") DO NOTHING
    RETURNING *;
    `, [routineId, activityId, count, duration]);

    return routine_activity;
  } catch (error) {
    console.error(error);
    throw error;
  }
  
}

async function getRoutineActivityById(id) {
  try {
    const { rows: [routineActivity] } = await client.query(`
      SELECT *
      FROM routine_activities
      WHERE id=$1
    `, [id]);

    return routineActivity;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getRoutineActivitiesByRoutine({ id }) {
  try {
    const { rows: routineActivities } = await client.query(`
      SELECT *
      FROM routine_activities
      WHERE "routineId"=$1;
    `, [id]);

    return routineActivities;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateRoutineActivity({ id, ...fields }) {
  const keys = Object.keys(fields);

  const setString = keys.map(
    (key, index) => `"${key}"=$${index + 1}`
  ).join(', ');
  
  try { 
    if (setString.length > 0) {
      const {rows: [updatedRoutineActivity]} = await client.query (`
        UPDATE routine_activities
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
      `, Object.values(fields));

      return updatedRoutineActivity;
    } else {
      return null;
    }

  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function destroyRoutineActivity(id) {
  try {
    const {rows: [deletedRoutineActivity]} = await client.query(`
      DELETE FROM routine_activities
      WHERE id = $1
      RETURNING *;
    `, [id]);

    return deletedRoutineActivity;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function canEditRoutineActivity(routineActivityId, userId) {
  try {
    const { rows: [editRoutineActivity] } = await client.query(`
      SELECT routine_activities."routineId", routines."creatorId"
      FROM routine_activities
      JOIN routines ON routine_activities."routineId" = routines.id
      WHERE routine_activities.id=$1
    `, [routineActivityId]);
    if (editRoutineActivity.creatorId === userId) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
