const express = require('express');
const activitiesRouter = express.Router();

const {
    getAllActivities, 
    createActivity, 
    getActivityById, 
    updateActivity, 
    getActivityByName,
    getPublicRoutinesByActivity
} = require('../db');
const { requireUser } = require('./utils');

activitiesRouter.use((req, res, next) => {
    console.log("A request is being made to /activities.");

    next();
});

// GET /api/activities/:activityId/routines
activitiesRouter.get("/:activityId/routines", async (req, res, next) => {
    const activityToSearch = {};
    activityToSearch.id = req.params.activityId;
    // console.log("/:activityId/routines:", activityToSearch);
    try {
        const activityExists = await getActivityById(activityToSearch.id);
        if (activityExists) {
            const publicRoutines = await getPublicRoutinesByActivity(activityToSearch);
            res.send(publicRoutines);
        } else {
            next({
                name: "ActivityNotFoundError",
                message: `Activity ${activityToSearch.id} not found`
            })
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
})

// GET /api/activities
activitiesRouter.get("/", async (req, res, next) => {
    try {
        const activities = await getAllActivities();
        console.log("/activities GET:", activities);
        res.send(activities);
    } catch ({ name, message }) {
        next({ name, message });
    }
})

// POST /api/activities
activitiesRouter.post("/", requireUser, async (req, res, next) => {
    const activityDetails = req.body;
    try {
        const newActivity = await createActivity(activityDetails);
        if (!newActivity) {
            next({
                name: "ExistingActivityError",
                message: `An activity with name ${activityDetails.name} already exists`
            });
        } else {
            res.send(newActivity);
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
})

// PATCH /api/activities/:activityId
activitiesRouter.patch("/:activityId", requireUser, async (req, res, next) => {
    const activityUpdate = req.body;
    const activityId = req.params.activityId;
    const activityDetails = {id:activityId, ...activityUpdate};
    const newActivityName = activityUpdate.name;

    // console.log("/:activityId:", activityUpdate.name);
    
    try {
        const activityExists = await getActivityById(activityId);
        const activityNameExists = await getActivityByName(newActivityName);
        if (!activityExists) {
            next({
                name: "ActivityDoesNotExistError",
                message: `Activity ${activityId} not found`
            });
        } else if (activityNameExists) {
            next({
                name: "ActivityNameExistsError",
                message: `An activity with name ${newActivityName} already exists`
            })
        } else {
            const updatedActivity = await updateActivity(activityDetails);
            res.send(updatedActivity);
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
})


activitiesRouter.use((req, res, next) => {
    console.log("Now leaving /activities.");

    next();
});

module.exports = activitiesRouter;
