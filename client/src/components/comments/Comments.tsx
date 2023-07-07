import React from 'react';
import { IComment, IUser } from '../../utils/TypesScript';
import AvatarComment from './AvatarComment';
import CommentList from './CommentList';

interface IProps {
    comment: IComment
}

const Comments: React.FC<IProps> = ({comment}) => {
  return (
    <div style={{
        opacity: comment._id ? 1 : 0.5,
        pointerEvents: comment._id ? 'initial' : 'none'
    }}>
        <AvatarComment user={comment.user as IUser}/>
        <CommentList comment= {comment}/>
    </div>
  )
}

export default Comments