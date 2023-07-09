import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IComment, RootStore } from '../../utils/TypesScript';
import Input from './Input';
import { replyComments } from '../../redux/actions/commentAction';

interface IProps {
    comment: IComment,
    showReply: IComment[]
    setShowReply: (showReply: IComment[]) => void
}

const CommentList: React.FC<IProps> = ({comment,showReply,setShowReply}) => {
    const [onReply, setOnReply] = useState(false);
    const { auth } = useSelector((state: RootStore) => state)
    const dispatch = useDispatch<any>()

    const handleReply =  (body: string) => {
       if(!auth.user || !auth.access_token) return;

       const data = {
        user: auth.user,
        blog_id: comment.blog_id,
        blog_user_id:comment.blog_user_id,
        content : body,
        reply_user: comment.user,
        comment_root: comment.comment_root || comment._id,
        createdAt: new Date().toISOString()
       }

       console.log(data);
       setShowReply([...showReply,data])

        dispatch(replyComments(data, auth.access_token))
       setOnReply(false)
        
    }    

  return (
    <div className="comment_list">
        <div dangerouslySetInnerHTML={{
            __html: comment.content
        }}/>

        <div>
            <small onClick={() => setOnReply(!onReply)}>
                { onReply ?  " - Cancel -" : " - Reply -"}
            </small>
            <small>
                {new Date(comment.createdAt).toLocaleString()} 
            </small>
        </div>

        {
            onReply && <Input callback={handleReply}/>
        }
    </div>
  )
}

export default CommentList