import React from 'react'
import { IComment } from '../../utils/TypesScript'

interface IProps {
    comment: IComment
}

const CommentList: React.FC<IProps> = ({comment}) => {
  return (
    <div className="comment_list">
        <div dangerouslySetInnerHTML={{
            __html: comment.content
        }}/>

        <div>
            <small>
                _Reply_
            </small>
            <small>
                { new Date(comment.createAt as string).toLocaleString()}
            </small>
        </div>
    </div>
  )
}

export default CommentList