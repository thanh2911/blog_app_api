import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IComment, RootStore } from '../../utils/TypesScript';
import Input from './Input';
import { deleteComment, replyComments, updateComment } from '../../redux/actions/commentAction';

interface IProps {
    comment: IComment,
    showReply: IComment[]
    setShowReply: (showReply: IComment[]) => void
}

const CommentList: React.FC<IProps> = ({comment,showReply,setShowReply}) => {
    const [onReply, setOnReply] = useState(false);
    const { auth } = useSelector((state: RootStore) => state)
    const dispatch = useDispatch<any>()

    const [edit,setEdit] = useState<IComment>()

    const handleReply =  (body: string) => {
       if(!auth.user || !auth.access_token) return;

       const data = {
        user: auth.user,
        blog_id: comment.blog_id,
        blog_user_id:comment.blog_user_id,
        content : body,
        replyCM: [],
        reply_user: comment.user,
        comment_root: comment.comment_root || comment._id,
        createdAt: new Date().toISOString()
       }

    //    console.log(data);
       setShowReply([...showReply,data])

        dispatch(replyComments(data, auth.access_token))
       setOnReply(false)
        
    }   

    const handleDelete = (comment: IComment) => {
        if(!auth.user || !auth.access_token) return;

        dispatch(deleteComment(comment, auth.access_token))
    }
    
    const NavEditDelete = (comment: IComment) => {
        return (
            <div>
                <i onClick={() => handleDelete(comment)}> Delete</i> 
                <i onClick={() => setEdit(comment)}>Edit</i>

            </div>
        )
    }

    const handleEdit = (body: string) => {
        if(!auth.user || !auth.access_token || !edit) return;

        if(body === edit.content) return setEdit(undefined)

        const newComment = {...edit, content:body}

        dispatch(updateComment(newComment, auth.access_token))
        setEdit(undefined)
        
    }

  return (
    <div className="comment_list">
        {
            edit 
            ? <Input callback={handleEdit} edit={edit} setEdit={setEdit}/>
            :
            <>
             <div dangerouslySetInnerHTML={{
                __html: comment.content
            }}/>

            <div>
                <small onClick={() => setOnReply(!onReply)}>
                    { onReply ?  " - Cancel -" : " - Reply -"}
                </small>

                <small>
                    <div>
                        {
                            comment.blog_user_id === auth.user?._id
                            ? comment.user._id === auth.user._id
                                ? NavEditDelete(comment)
                                : <i  onClick={() => handleDelete(comment)}>Delete</i>
                            : comment.user._id === auth.user?._id && NavEditDelete(comment)
                        }
                    </div>
                </small>

                <small>
                    {new Date(comment.createdAt).toLocaleString()} 
                </small>
            </div>

            {
                onReply && <Input callback={handleReply}/>
            }
            </>
        }
       
    </div>
  )
}

export default CommentList