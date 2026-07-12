import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            minlength: [3, "Name must be at least 3 characters"]
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            validate: {
                validator: validator.isEmail,
                message: "Invalid email"
            }
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            validate: {
                validator: function (value) {
                    return validator.isStrongPassword(value, {
                        minLength: 8,
                        minLowercase: 1,
                        minUppercase: 1,
                        minNumbers: 1,
                        minSymbols: 1
                    }) && !validator.contains(value, " ");
                },
                message:
                    "Password must be at least 8 characters and contain uppercase, lowercase, number, special character, and no spaces"
            }
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

export default User;