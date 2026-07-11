const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async(req, res, next) => {

    try {
        const { name, email, password } = req.body;

        const existingUser = await userModel.findOne({email: email});

        if(existingUser){
            return res.status(400).json({message: "User Already Exist"})
        }
        const salt = await bcrypt.genSalt(12);
        const hashed = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashed
        })

        await newUser.save();

        return res.status(201).json({
            message: "User created Successfully"
        })
    } catch (error) {
        console.error(error)
        next(error)
    }
}

const loginUser = async(req, res, next) => {
    try {
        const {email, password} = req.body;

        const user = await userModel.findOne({email: email})

        if(!user) {
            return res.status(404).json("User does not exist")
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({message: "Invalid Credentials"
            });
}
        const token = jwt.sign(
            {userId: user._id, name: user.name}, //payload
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        )

        const resUser = {
            _id : user._id,
            email: user.email,
            name: user.name
        }

        return res.status(200).json({
            message: "Logged in",
            user: resUser,
            token
        })
    } catch (error) {
        console.error(error);
        next(error)
    }
}

module.exports = {
    registerUser,
    loginUser
}