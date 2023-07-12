import React from 'react';
import { IBlog, IParams, IUser, RootStore } from '../../utils/TypesScript';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog } from '../../redux/actions/blogAction';
import { ALERT } from '../../redux/types/alertType';

interface IProps{
  blog: IBlog
}

const CardHoriz: React.FC<IProps> = ({blog}) => {

  const { slug }: IParams = useParams();
  const { auth } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch<any>()
  // console.log(slug);

  const handleDelete = () => {
      if(!auth.user || !auth.access_token) return;

      if(slug !== auth.user._id) return dispatch({
        type: ALERT,
        payload: { errors: "Invalid Authentication"}
      })
      
      if(window.confirm("Do you want to delete the post?")){
        dispatch(deleteBlog(blog, auth.access_token))
      }
  }

  return (
    <div className="card mb-3" style={{maxWidth: "540px"}} >
    <div className="row g-0">
      <div className="col-md-4">
        {
          blog.thumbnail && 
          <>
            {
              typeof(blog.thumbnail) === 'string' 
              ? <Link to={`/blog/${blog._id}`}>
                <img src={blog.thumbnail} className="img-fluid rounded-start" alt="thumbnail" />
              </Link>
              : 
              <img src={URL.createObjectURL(blog.thumbnail)} className="img-fluid rounded-start" alt="thumbnail" />           
            }
          </>
        }
        
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">{blog.title}</h5>
          <p className="card-text">{blog.description}</p>
          {
            blog.title && 
            <div className="card-text">
              {
                (slug === auth.user?._id) &&
                <div>
                  <Link to={`/update_blog/${blog._id}`}>
                    <i>Update</i>
                  </Link>
                  <i onClick={handleDelete}>Delete</i>
                </div>

                
              }
              
              <small className="text-muted">
                {new Date(blog.createdAt).toLocaleString() }
              </small>
          </div>
          }

        </div>
      </div>
    </div>
  </div>
  )
}

export default CardHoriz