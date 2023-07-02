import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {  RootStore, IParams, IBlog } from '../../utils/TypesScript';
import { getBlogsByCategoryId } from '../../redux/actions/blogAction';
import NotFound from '../../components/global/NotFound';
import CardVert from '../../components/cards/CardVert';

const BlogsByCategory = () => {

    const { categories, blogsCategory } = useSelector((state: RootStore) => state);
    const { slug }: IParams = useParams();
    const dispatch = useDispatch<any>();

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
        dispatch(getBlogsByCategoryId(categoryId))
      }else {
        const data = blogsCategory.find(item => item.id === categoryId)
        if(!data) return;

        setBlogs(data.blogs)
        setTotal(data.total)
      }
      
      
    },[categoryId,blogsCategory])

    if(!blogs) return <NotFound />
  return (
    <div className="blogs_category">
      <div className="show_blogs">
        {
          blogs.map(blog => (
            <CardVert key={blog._id} blog={blog} />
          ))
        }
      </div>
    </div>
  )
}

export default BlogsByCategory