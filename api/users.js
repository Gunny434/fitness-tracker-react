/* eslint-disable no-useless-catch */
const express = require("express");
const usersRouter = express.Router();
const { createUser, getUserByUsername, getUser } = require('../db/users');
const {requireUser} = require('./utils');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const bcrypt = require('bcrypt');
const { getAllRoutinesByUser, getPublicRoutinesByUser } = require("../db");

// POST /api/users/register
usersRouter.post('/register', async (req, res, next) => {
    const { username, password } = req.body;

    // see if user exists first, if they do, or dont, then check password

    try {
        const _user = await getUserByUsername(username);
        if (_user) {
            res.status(401);
            next({
                name: 'UserExistsError',
                message: `User ${username} is already taken.`
            });
        } else if (password.length < 8) {
            res.status(401);
            next({
                name: "PasswordLengthError",
                message: "Password Too Short!"
            });
        } else {
            // if that user exists then send creation error
            const user = await createUser({
                username,
                password,
            });
            if (!user) {
                next({
                    name: "UserCreationError",
                    message: "There was a problem registering you. Please retry."
                });
            } else {
                const token = jwt.sign({
                    id: user.id,
                    username
                }, process.env.JWT_SECRET, {
                    expiresIn: '1w'
                });

                res.send({
                    message: "Thank you for signing up!",
                    token,
                    user
                });
            }
        }
    
    } catch ({ name, message }) {
        next({ name, message });
    }
})

// POST /api/users/login
usersRouter.post('/login', async (req, res, next) => {
    const {username, password} = req.body;
    
    // if no username or password provided, send error
    if (!username || !password) {
        next({
          name: "MissingCredentialsError",
          message: "Please supply both a username and password"
        });
      }

      try {
        const user = await getUserByUsername(username);
        // if we get a user object, and the password on it = the password provided, then create token and return to user 
        
        const hashedPassword = user.password;

        // create variable that runs function to compare the password provided on user to the passwrod in the database, then compare them using bcrypt. then pass into if user and password match are both TRUE all good
        let passwordsMatch = await bcrypt.compare(password, hashedPassword) 
        
        if (user && passwordsMatch) {
            // create token & return to user
            const token = jwt.sign({id: user.id, username}, JWT_SECRET, {expiresIn: '1h'});

            res.send({ message: "you're logged in!" , token, user});

        } else {
          next({ 
            name: 'IncorrectCredentialsError', 
            message: 'Username or password is incorrect',
          });
        }
      } catch (error) {
        console.log(error);
        next(error);
      }
})

// GET /api/users/me
usersRouter.get('/me', requireUser, async (req, res, next) => {
    const { username } = req.body;

    try {
        const user = await getUserByUsername(username);
        // console.log('this is user----------->', user)
        res.send(req.user);

    } catch (error) {
        console.log(error);
            next(error);
    }
})

// GET /api/users/:username/routines
usersRouter.get('/:username/routines', requireUser, async (req, res, next) => {
    console.log("/:username/routines request params/user:", req.params, req.user);
    console.log("/:username/routines conditional check:", req.user.username === req.params.username);
    try {
        // const userRoutines = await getAllRoutinesByUser(req.params);
        // console.log("/:username/routines userRoutines:", userRoutines);
        // const publicUserRoutines = userRoutines.filter(
        //     (routine) => routine.isPublic
        // );
        // console.log("/:username/routines publicUserRoutines:", publicUserRoutines);
        // res.send(publicUserRoutines);

        if (req.user && (req.user.username === req.params.username)) {
            const userRoutines = await getAllRoutinesByUser(req.params);
            res.send(userRoutines);
        } else if (req.params.username) {
            const userRoutines = await getAllRoutinesByUser(req.params);
            const publicUserRoutines = userRoutines.filter(
                (routine) => routine.isPublic
            );
            res.send(publicUserRoutines);
        } else {
            next({
                name: "UserNotFoundError",
                message: "Could not find that username. Check spelling and try again."
            });
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
    
})

module.exports = usersRouter;
