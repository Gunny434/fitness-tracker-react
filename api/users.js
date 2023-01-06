/* eslint-disable no-useless-catch */
const express = require("express");
const usersRouter = express.Router();
const { createUser, getUserByUsername } = require('../db/users');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

// POST /api/users/register
usersRouter.post('/register', async (req, res, next) => {
    const { username, password } = req.body;

    if (password.length < 8) {
        next({
            name: "PasswordLengthError",
            message: "Password Too Short!"
        });
    }

    try {
        const _user = await getUserByUsername(username);

        if (_user) {
            next({
                name: 'UserExistsError',
                message: `User ${username} is already taken.`
            });
        }

        const user = await createUser({
            username,
            password,
        });

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
    } catch ({ name, message }) {
        next({ name, message });
    }
})

// POST /api/users/login

// GET /api/users/me

// GET /api/users/:username/routines

usersRouter.use((error, req, res, next) => {
    res.send({
        error: "Password",
        name: error.name,
        message: error.message
    })
})

module.exports = usersRouter;
