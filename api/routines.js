const express = require('express');
const routinesRouter = express.Router();

const { requireUser } = require('./utils');
const { 
    getAllPublicRoutines, 
    createRoutine, 
    updateRoutine, 
    getRoutineById,
    destroyRoutine
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
    const { routineId } = req.params;
    const activeUser = {...req.user};

    try {
        const routineToDelete = await getRoutineById(routineId);
        const deletedRoutine = {...routineToDelete};
        if (routineToDelete.creatorId === activeUser.id) {
            const deletedRoutine = await destroyRoutine(routineId);
            console.log("/:routineId routineToDelete:", routineToDelete)
            res.send(deletedRoutine);
        } else {
            res.status(403);
            next({
                error: "403",
                name: "UnauthorizedUserError",
                message: `User ${activeUser.username} is not allowed to update ${routineToDelete.name}`
            });
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
})

// POST /api/routines/:routineId/activities

routinesRouter.use((req, res, next) => {
    console.log("Now leaving /routines.");

    next();
});

module.exports = routinesRouter;
