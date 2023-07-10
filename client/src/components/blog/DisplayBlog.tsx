import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IBlog, IUser, RootStore, IComment } from '../../utils/TypesScript';
import Input from '../comments/Input';
import { Link, useLocation } from 'react-router-dom';
import Comments from '../comments/Comments';
import { createComment, getComments } from '../../redux/actions/commentAction';
import Loading from '../global/Loading';
import Pagination from '../global/Pagination';

interface IProps{
    blog: IBlog
}


const DisplayBlog: React.FC<IProps> = ({blog}) => {

    const { auth, comments} = useSelector((state: RootStore) => state);

    const dispatch = useDispatch<any>()

    const location = useLocation();
    const [showComments, setShowComments] = useState<IComment[]>([])
    const [loading,setLoading] = useState(false)

    const handleComment = (body: string) => {
        if(!auth.user || !auth.access_token) return;

        const data = {
            content: body,
            user: auth.user ,
            blog_id: (blog._id as string),
            blog_user_id: (blog.user as IUser)._id,
            createdAt: new Date().toISOString()
        }
        
        setShowComments([...showComments, data])
         dispatch(createComment(data, auth.access_token))
    }

    const fetchComments = useCallback(async (blog_id: string, num=1) => {
        setLoading(true)
        await dispatch(getComments(blog_id,num))
        setLoading(false)
    },[dispatch])

    useEffect(() => {
        if(comments.data.length === 0 && !blog._id) return;

        setShowComments(comments.data)
    }, [comments.data])
    
    useEffect(() => {
        if(!blog._id) return;
        const num = Number(location.search.slice(6)) || 1
        fetchComments(blog._id,num)

    },[blog._id,fetchComments])
    
    const handlePagination = (num: number) => {
        if(!blog._id) return;

        fetchComments(blog._id,num)
    }
    
    
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

            <hr />
            <div>
            <h3> Comments </h3>
            {
                auth.user
                ? <Input callback={handleComment}/>
                : <h5>
                    Please <Link to={`/login?blog/${blog._id}`}> Login </Link> to comments.
                </h5>
            }

            {
                loading 
                ? <Loading />
                : showComments.map((comment,index) => (
                    <Comments key={index} comment={comment}/>
                ))
            }

            {
                comments.total > 1 &&
                <Pagination total= {comments.total} callback={handlePagination}/>

            }

            </div>
        </div>
        }
    </div>

    
  )
}

export default DisplayBlog