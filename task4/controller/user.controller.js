import User from "../models/user.model.js";
import mongoose from "mongoose";   

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
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const users = await User.find()
      .skip(skip)
      .limit(limit);

    const totalUsers = await User.countDocuments();

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
      users,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get User By ID
export const getUserById = async (req, res) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid MongoDB ObjectId"
            });
        }

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);

    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};
// Update User
export const updateUser = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid MongoDB ObjectId",
      });
    }
    if (req.body.email) {
      const exists = await User.findOne({
        email: req.body.email,
        _id: { $ne: req.params.id },
      });

      if (exists) {
        return res.status(409).json({
          message: "Email already exists",
        });
      }
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User Updated",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
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

export const searchUser = async (req, res) => {
  try {
    const { email } = req.query;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};