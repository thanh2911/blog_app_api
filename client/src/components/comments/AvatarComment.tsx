import React from 'react'
import { IUser } from '../../utils/TypesScript'
import { Link } from 'react-router-dom'

interface IProps {
    user: IUser
}

const AvatarComment: React.FC<IProps> = ({ user }) => {
    
  return (
    <div className="avatar_comment">
        <img src={user.avatar} alt="" style={{width:'50px'}}/>

        <small>
            <Link to={`/profile/${user._id}`}>
                {user.name}
            </Link>
        </small>
    </div>
  )
}

export default AvatarComment