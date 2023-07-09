import React, { useState, useEffect } from 'react';
import { IComment, IUser } from '../../utils/TypesScript';
import AvatarComment from './AvatarComment';
import CommentList from './CommentList';
import AvatarReply from './AvatarReply';

interface IProps {
    comment: IComment
}

const Comments: React.FC<IProps> = ({comment}) => {

  const [showReply, setShowReply] = useState<IComment[]>([])

  useEffect(() => {
    if(!comment.replyCM) return;

    setShowReply(comment.replyCM)
  },[comment.replyCM])

  console.log({showReply});
  

  return (
    <div style={{
        opacity: comment._id ? 1 : 0.5,
        pointerEvents: comment._id ? 'initial' : 'none'
    }}>
        <AvatarComment user={comment.user}/>
        <CommentList 
          comment= {comment}
          showReply= {showReply}
          setShowReply={setShowReply}
        />

        {
          showReply.map((comment,index) => (
            <div key= {index} style={{
              opacity: comment._id ? 1 : 0.5,
              pointerEvents: comment._id ? 'initial' : 'none',
              marginLeft: "50px"
            }}>
              <AvatarReply 
                user={comment.user} 
                reply={comment.reply_user} 
              />
              <CommentList 
                comment= {comment}
                showReply= {showReply}
                setShowReply={setShowReply}
              />
            </div>
          ))
        }
    </div>
  )
}

export default Comments