import React, {useState, useEffect} from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {  RootStore, IParams, IBlog } from '../../utils/TypesScript';
import { getBlogsByCategoryId } from '../../redux/actions/blogAction';
import CardVert from '../../components/cards/CardVert';
import Loading from '../../components/global/Loading';
import Pagination from '../../components/global/Pagination';

const BlogsByCategory = () => {

    const { categories, blogsCategory } = useSelector((state: RootStore) => state);
    const { slug }: IParams = useParams();
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const { search } = useLocation();

    const [categoryId, setCategoryId] = useState('');
    const [blogs, setBlogs] = useState<IBlog[]>();
    const [total,setTotal] = useState(0);

    useEffect(() => {
        const category = categories.find(item => item.name === slug)

        if(category) setCategoryId(category._id)
        
    },[slug,categories])
    
    useEffect(() => {
      if(!categoryId) return;
    
      // blogsCategory.every(item => item.id !== categoryId  => false 
      // => dispatch, ko thi ko can dispatch 
      if(blogsCategory.every(item => item.id !== categoryId)){
        dispatch(getBlogsByCategoryId(categoryId,search))
      }else {
        const data = blogsCategory.find(item => item.id === categoryId)
        if(!data) return;

        setBlogs(data.blogs)
        setTotal(data.total)
      }
      
      
    },[categoryId,blogsCategory, dispatch,search])

    const handlePagination = (num: number) => {
      const search = `?page=${num}`
      dispatch(getBlogsByCategoryId(categoryId,search))
      
    }
    

    if(!blogs) return <Loading />
  return (
    <div className="blogs_category">
      <div className="show_blogs">
        {
          blogs.map(blog => (
            <CardVert key={blog._id} blog={blog} />
          ))
        }
      </div>

      {
        total > 1 &&
        <Pagination total={total} callback={handlePagination}/>
      }

    </div>
  )
}

export default BlogsByCategory