import { Request, Response } from "express";
import Blogs from '../models/blogModel';
import { IReqAuth } from "../config/interface";

const blogCtrl = {
    createBlog: async (req: IReqAuth, res: Response) => {
        if(!req.user) return res.status(400).json('Invalid Authentication');
        
        try {
            const { title, content, description, thumbnail, category } = req.body;

            const newBlog = new Blogs({
                user: req.user._id,
                title,
                content,
                description,
                thumbnail,
                category,

            })

            await newBlog.save();

            res.json({
                msg: "Create success !",
                newBlog
            })
        } catch (err: any) {
            res.status(500).json({msg: err.message})
        }
    }
}

export default blogCtrl;