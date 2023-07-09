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
  const [next,setNext] = useState(2)

  useEffect(() => {
    if(!comment.replyCM) return;

    setShowReply(comment.replyCM)
  },[comment.replyCM])

  

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
          showReply.slice(0,next).map((comment,index) => (
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

        {
          <div>
            {
              showReply.length - next > 0 
              ? <small onClick={() => setNext(next + 5)}>
                  see more comments...
              </small>
              : showReply.length > 2 &&
              <small onClick={() => setNext(2)}>
                Hide comments...
              </small>
            }
          </div>
        }
    </div>
  )
}

export default Comments