const express = require('express');
const routinesRouter = express.Router();

const { requireUser } = require('./utils');
const { 
    getAllPublicRoutines, 
    createRoutine, 
    updateRoutine, 
    getRoutineById,
    destroyRoutine,
    attachActivitiesToRoutines,
    getRoutineActivitiesByRoutine,
    addActivityToRoutine
} = require('../db');

routinesRouter.use((req, res, next) => {
    console.log("A request is being made to /routines.");

    next();
});

// GET /api/routines
routinesRouter.get("/", async (req, res, next) => {
    try {
        const publicRoutines = await getAllPublicRoutines();
        res.send(publicRoutines);
    } catch ({ name, message }) {
        next({ name, message });
    }
})

// POST /api/routines
routinesRouter.post("/", requireUser, async (req, res, next) => {
    const routineFields = req.body;
    const routineDetails = {creatorId: req.user.id, ...routineFields};
    
    try {
        const newRoutine = await createRoutine(routineDetails);
        res.send(newRoutine);
    } catch ({ name, message }) {
        next({ name, message });
    }
})

// PATCH /api/routines/:routineId
routinesRouter.patch("/:routineId", requireUser, async (req, res, next) => {
    const updateFields = {id:req.params.routineId, ...req.body};
    const activeUser = {...req.user};

    try {
        const routineToUpdate = await getRoutineById(updateFields.id);
        if (routineToUpdate.creatorId === activeUser.id) {
            const updatedRoutine = await updateRoutine(updateFields);
            res.send(updatedRoutine);
        } else {
            res.status(403);
            next({
                error: "403",
                name: "UnauthorizedUserError",
                message: `User ${activeUser.username} is not allowed to update ${routineToUpdate.name}`
            });
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
})

// DELETE /api/routines/:routineId
routinesRouter.delete("/:routineId", requireUser, async (req, res, next) => {
    
    // take routineID and user off the request 
    const { routineId } = req.params;
    const activeUser = {...req.user};
    //take the routineID and go grab it from the DB based on that
    const routineToDelete = await getRoutineById(routineId);

    try {
        // with the routine we grabbed, see if it matches the userID from the request MEANING if true they are the owner of the routine and have permissions to delete it 
        if (routineToDelete && routineToDelete.creatorId === activeUser.id) {
            const deletedRoutine = await destroyRoutine(routineId);
            // console.log("/:routineId routineToDelete:", routineToDelete)
            res.send(deletedRoutine) 
        } else {
            res.status(403);
            next({
                error: "403",
                name: "UnauthorizedUserError",
                message: `User ${activeUser.username} is not allowed to delete ${routineToDelete.name}`
            });
        }

    } catch ({ name, message }) {
        next({ name, message });
    }
})

// POST /api/routines/:routineId/activities
// want to get the routine to add activity by ID, then take the activity info provided in the request and attach it to that routine, then send back 
routinesRouter.post("/:routineId/activities", async (req, res, next) => {
    const activityFields = {...req.body};

    try {
        const newActivity = await addActivityToRoutine(activityFields);
        if (newActivity) {
            res.send(newActivity);
        } else {
            next({
                name: "DuplicateActivityError",
                message: `Activity ID ${activityFields.activityId} already exists in Routine ID ${activityFields.routineId}`
            })
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
}); 

routinesRouter.use((req, res, next) => {
    console.log("Now leaving /routines.");

    next();
});

module.exports = routinesRouter;
