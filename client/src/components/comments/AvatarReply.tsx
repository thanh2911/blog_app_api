import React from 'react'
import { IUser } from '../../utils/TypesScript'
import { Link } from 'react-router-dom'

interface IProps{
    user: IUser
    reply?: IUser
}

const AvatarReply: React.FC<IProps> = ({user,reply}) => {

    // console.log({user,reply});
    
  return (
    <div className="avatar_reply">
    <img src={user.avatar} alt="" style={{width:'50px'}}/>

    <small>
        <Link to={`/profile/${user._id}`}>
            {user.name}
        </Link>
    </small>
    <small>
       {reply && <>Reply to<Link to={`/profile/${reply?._id}`}>
            {reply?.name}
        </Link>
       </>
       } 
    </small>
</div>
  )
}

export default AvatarReply