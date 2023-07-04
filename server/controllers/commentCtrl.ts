import { Request, Response } from "express";
import Comments from '../models/commentModel';
import { IReqAuth } from "../config/interface";

const commentCtrl = {
    createComment: async (req: IReqAuth, res: Response) => {
        if(!req.user)
            return res.status(400).json({msg: "Invalid Authentication"})
        try {

            const { content, blog_id, blog_user_id} = req.body;

            const newComment = new Comments({
                user: req.user._id,
                content, 
                blog_id, 
                blog_user_id
            })

            await newComment.save();
            
            res.json(newComment)
            
        } catch (err: any) {
            res.status(500).json({msg: err.message})
        }
    }
}

export default commentCtrl;