import User from "../models/user.model.js";

export const addUser = async (req, res) => {
    try {

        const user = await User.create(req.body);

        res.status(201).json({
            message: "User Added Successfully",
            user
        });

    } catch (error) {

        // Validation Errors
        if (error.name === "ValidationError") {

            const errors = Object.values(error.errors).map(err => err.message);

            return res.status(400).json({
                errors
            });

        }

        // Duplicate Email
        if (error.code === 11000) {

            return res.status(400).json({
                message: "Email already exists"
            });

        }

        res.status(500).json({
            message: error.message
        });

    }
};
// Get All Users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get User By ID
export const getUserById = async (req, res) => {
    try {

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Update User
export const updateUser = async (req, res) => {

    try {

       const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
        new: true,
        runValidators: true
    }
);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User Updated",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Delete User
export const deleteUser = async (req, res) => {

    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json({
            message: "User Deleted"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

};