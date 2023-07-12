import mongoose from 'mongoose';
import { IBlog } from '../config/interface';

const blogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId, 
        ref: 'User'
    },
    title: {
        type: String,
        trim: true,
        required: true,
        minLength: 10,
        maxLength: 50
    },
    content: {
        type: String,
        trim: true,
        minLength: 100,
    },
    description: {
        type: String,
        trim: true,
        required: true,
        minLength: 50,
        maxLength: 100
    },
    thumbnail: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Types.ObjectId, 
        ref: 'categories'
    },
},{
    timestamps: true
})

export default mongoose.model<IBlog>('blogs', blogSchema)