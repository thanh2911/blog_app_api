import React from 'react';
import { IBlog } from '../../utils/TypesScript';
import { Link } from 'react-router-dom';

interface IProps{
  blog: IBlog
}

const CardHoriz: React.FC<IProps> = ({blog}) => {
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
          <p className="card-text">
            <small className="text-muted">
              {new Date(blog.createdAt).toLocaleString() }
            </small>
            </p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CardHoriz