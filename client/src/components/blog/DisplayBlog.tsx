import React from 'react';
import { IBlog } from '../../utils/TypesScript';

interface IProps{
    blog: IBlog
}


const DisplayBlog: React.FC<IProps> = ({blog}) => {

    console.log(blog);
    
  return (
        <div>
        {
            blog && 
            <div className="display_blog">
            <h5>{blog.title}</h5>

            <div>
                <small>
                    {
                        typeof(blog.user) !== 'string' &&
                        `By: ${blog.user.name}`
                    }
                </small>

                <small>{new Date(blog.createdAt).toLocaleString()}</small>

                <div dangerouslySetInnerHTML={{
                    __html: blog.content
                }} />
            </div>
        </div>
        }
    </div>

    
  )
}

export default DisplayBlog