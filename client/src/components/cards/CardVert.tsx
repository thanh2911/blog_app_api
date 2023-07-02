import React from 'react';
import { IBlog } from '../../utils/TypesScript';
import { Link } from 'react-router-dom';

interface IProps{
    blog: IBlog
}

const CardVert: React.FC<IProps> = ({blog}) => {
  return (
    <div className="card" style={{width: "18rem"}}>
        {
            typeof(blog.thumbnail) === "string" && 
            <img src={blog.thumbnail} className="card-img-top" alt="..." 
            
            />

        }
        <div className="card-body">
            <h5 className="card-title">
                <Link to={`/blog/${blog._id}`}>{blog.title.slice(0,50)}</Link>
            </h5>
            <p className="card-text">{blog.description.slice(0,100)}</p>

            <small>
                {
                    typeof(blog.user) !== "string"  &&
                    <Link to={`profile/${blog.user._id}`}>
                        By: {blog.user.name}
                    </Link>
                }
            </small>
            <small>
                {
                    new Date(blog.createdAt).toLocaleString()
                }
            </small>
        </div>
    </div>
  )
}

export default CardVert