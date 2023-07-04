import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOtherInfo } from '../../redux/actions/profileAction';
import { IUser, RootStore } from '../../utils/TypesScript';
import Loading from '../global/Loading';

interface IProps {  
  id: string | undefined
}

const OtherInfo: React.FC<IProps> = ({id}) => {

  const [other,setOther] = useState<IUser>();

  const { otherInfo } = useSelector((state: RootStore) => state)

  const dispatch = useDispatch<any>();


  useEffect(() => {
    if(!id) return;
    
    if(otherInfo.every(user => user._id !== id)){
      dispatch(getOtherInfo(id))
    }else {
      const newUser = otherInfo.find(user => user._id === id)
      if(newUser) setOther(newUser)
    }
    
  },[id,otherInfo,dispatch])
  
  if(!other) return <Loading />
  return (
    <div className="profile_info">
      <div className="info_avatar">
        <img src={other.avatar} alt="" />
      </div>

      <h5>{other.role}</h5>
      <div>Name: <span>{other.name}</span></div>
      <div>Email/Number: <span>{other.account}</span></div>
      <div>Join Date: <span>{new Date(other.createdAt).toLocaleString()}</span></div>
    </div>
  )
}

export default OtherInfo