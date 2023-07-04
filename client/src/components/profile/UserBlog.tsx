import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore,IParams, IBlog } from '../../utils/TypesScript'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getBlogsByUserId } from '../../redux/actions/blogAction'
import Loading from '../global/Loading'
import CardHoriz from '../cards/CardHoriz'
import Pagination from '../global/Pagination'

const UserBlog = () => {

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { blogsUser } = useSelector((state: RootStore) => state)
  const { slug }: IParams = useParams();
  const [blogs,setBlogs] = useState<IBlog[]>()
  const [total,setTotal] = useState(0)
    

  useEffect(() => {
    if(!slug) return;

    if(blogsUser.every(item => item.id !== slug)) {
      dispatch(getBlogsByUserId(slug))
    }else {
      const data = blogsUser.find(item => item.id === slug)

      if(!data) return;

      setBlogs(data.blogs)
      setTotal(data.total)
    }

  },[slug, blogsUser, dispatch])

  const handlePagination = (num: number) => {
    if(!slug) return;
    const search = `?page=${num}`
    dispatch(getBlogsByUserId(slug ,search))

  }

  
  if(!blogs) return <Loading />
  if(blogs.length === 0) return <div>No Blogs</div>
  return (
    <div>
      <div>
        {
          blogs.map(blog => (
            < CardHoriz key={blog._id}  blog={blog}/>
          ))
        }
      </div>

      <div>
        {
          total > 1 &&
          <Pagination total={total} callback={handlePagination}/>
        }
      </div>
    </div>
  )
}

export default UserBlog