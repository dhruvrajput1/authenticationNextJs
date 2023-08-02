import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please prove a password"]
    },
    isVerified: {  // user is verified only if they use my link
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpirt: Date,
    verifyToken: String,
    verifyTokenExpiry: Date

});

const User = mongoose.models.User || mongoose.model("User", userSchema); // if model already created then use that otherwise create a new one

export default User;