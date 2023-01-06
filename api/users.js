/* eslint-disable no-useless-catch */
const express = require("express");
const usersRouter = express.Router();
const { createUser, getUserByUsername, getUser } = require('../db/users');
const {requireUser} = require('./utils');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const bcrypt = require('bcrypt');

// POST /api/users/register
usersRouter.post('/register', async (req, res, next) => {
    const { username, password } = req.body;

    // see if user exists first, if they do, or dont, then check password

    try {
        const _user = await getUserByUsername(username);
console.log('this is _user--------------->', _user);
        if (_user) {
            res.status(401);
            next({
                error: 'error',
                name: 'UserExistsError',
                message: `User ${username} is already taken.`
            });
        } else if (password.length < 8) {
            res.status(401);
            next({
                error: 'error',
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
    // console.log('this is req.body----------->',req.body);
    // console.log('this is req.user----------->',req.user);
    const {username} = req.body;

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



// usersRouter.use((error, req, res, next) => {
//     res.send({
//         error: error.error,
//         name: error.name,
//         message: error.message
//     })
// })

module.exports = usersRouter;
