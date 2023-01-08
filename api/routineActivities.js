const express = require('express');
const routineActivitiesRouter = express.Router();

const { requireUser } = require('./utils');
const { 
    canEditRoutineActivity, 
    getRoutineById, 
    getRoutineActivityById, 
    updateRoutineActivity, 
    destroyRoutineActivity
} = require('../db');

routineActivitiesRouter.use((req, res, next) => {
    console.log("A request is being made to /routineActivities.");

    next();
});

// PATCH /api/routine_activities/:routineActivityId
routineActivitiesRouter.patch("/:routineActivityId", requireUser, async (req, res, next) => {
    const {routineActivityId} = req.params;
    const userId = req.user.id;

    const canEdit = await canEditRoutineActivity(routineActivityId, userId);
    
    const routineActivityDetails = await getRoutineActivityById(routineActivityId);

    const routineId = routineActivityDetails.routineId;
    const routineInQuestion = await getRoutineById(routineId);

    const updateFields = {id:routineActivityId, ...req.body};

    try {
        if (canEdit) {
            const updatedRoutineActivity = await updateRoutineActivity(updateFields);
            res.send(updatedRoutineActivity);
        } else {
            res.status(403);
            next({ 
                name: "UnauthorizedUpdateError", 
                message: `User ${req.user.username} is not allowed to update ${routineInQuestion.name}`
            });
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
});

// DELETE /api/routine_activities/:routineActivityId
routineActivitiesRouter.delete("/:routineActivityId", requireUser, async (req, res, next) => {
    const {routineActivityId} = req.params;
    const userId = req.user.id;

    const canEdit = await canEditRoutineActivity(routineActivityId, userId);
    
    const routineActivityDetails = await getRoutineActivityById(routineActivityId);

    const routineId = routineActivityDetails.routineId;
    const routineInQuestion = await getRoutineById(routineId);

    try {
        if (canEdit) {
            const deletedRoutineActivity = await destroyRoutineActivity(routineActivityId);
            res.send(deletedRoutineActivity);
        } else {
            res.status(403);
            next({ 
                name: "UnauthorizedUpdateError", 
                message: `User ${req.user.username} is not allowed to delete ${routineInQuestion.name}`
            });
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
})

routineActivitiesRouter.use((req, res, next) => {
    console.log("Now leaving /routineActivities.");

    next();
});

module.exports = routineActivitiesRouter;
