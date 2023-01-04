const client = require("./client");



async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {
  console.log('calling addActivityToRoutine');
  try {
    await client.query(`
    INSERT INTO routineactivities("routineId", "activityId", count, duration)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT ("routineId", "activityId") DO NOTHING;
    `, [routineId, activityId, count, duration]);
  } catch (error) {
    console.error(error);
    throw error;
  }
  
}

async function getRoutineActivityById(id) {}

async function getRoutineActivitiesByRoutine({ id }) {}

async function updateRoutineActivity({ id, ...fields }) {}

async function destroyRoutineActivity(id) {}

async function canEditRoutineActivity(routineActivityId, userId) {}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
