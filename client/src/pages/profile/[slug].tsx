import React from 'react';
import { useParams } from 'react-router-dom';
import { IParams, RootStore } from '../../utils/TypesScript';
import { useSelector } from 'react-redux';
import OtherInfo  from '../../components/profile/OtherInfo';
import UserInfo  from '../../components/profile/UserInfo';
import UserBlog  from '../../components/profile/UserBlog';


const Profile = () => {

  const { slug } : IParams = useParams();
  const { auth } = useSelector((state: RootStore) => state);
  console.log(typeof slug, typeof auth.user?._id);
  

  return (
    <div className="profile">
      <div className="">
        {
          auth.user?._id === slug ?
          <UserInfo /> :
          <OtherInfo />
        }
      </div>
      <div className="">
        <UserBlog />
      </div>

    </div>
  )
}

export default Profile