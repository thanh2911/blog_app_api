import mongoose from "mongoose";
import { IUser } from "../config/interface";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add your name."],
        trim: true,
        maxLength: [20, "Your name is up to 20 chars long."]
    },
    account: {
        type: String,
        required: [true, "Please add your email or phone."],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add your password."],
        trim: true,
    },
    avatar: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5NWV4HIz5cimRlDHWgvFoc1uzSIBhVwQuxQ&usqp=CAU'
    },
    role: {
        type: String,
        default: 'user' // admin
    },

    type: {
        type: String,
        default: 'register', // login
    }
}, {
    timestamps: true
})

export default mongoose.model<IUser>('User',userSchema);