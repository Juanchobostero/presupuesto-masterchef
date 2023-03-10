import User from "../models/userModel.js";
import asyncHandler from 'express-async-handler';
import generateToken from "../utils/generateToken.js";

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error('Datos incorrectos !');
    }
});

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if(userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });  
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc Get all users
// @route GET /api/users
// @access Private
const getUsers = asyncHandler( async (req, res) => {
    const users = await User.find({});

    res.json(users);
});


// @desc Get user by ID users
// @route GET /api/users/:id
// @access Private
const getUserById = asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if(user) {
        res.json(user);
    } else {
        res.json(404);
        throw new Error('User not found !');
    }
});



export { 
    authUser, 
    registerUser, 
    getUsers,
    getUserById
};