import React, { useState, useEffect } from 'react'
import { getAPI } from '../../utils/FetchData';
import { IBlog } from '../../utils/TypesScript';
import CardHoriz from '../cards/CardHoriz';
import { useLocation } from 'react-router-dom';

const Search = () => {

    const [search,setSearch] = useState('');
    const [blogs,setBlogs] = useState<IBlog[]>([]);
    const { pathname } = useLocation()

    useEffect(() => {
      const delayDebounce = setTimeout(async () => {
        if(search.length < 2) return setBlogs([]);

        try {
          const res  = await getAPI(`search/blogs?title=${search}`);
          setBlogs(res.data)
          
        } catch (err) {
          console.log(err);
          
        }
      },400)

      return () => clearTimeout(delayDebounce)
    
    },[search]) 
    
    useEffect(() => {
      setSearch('')
      setBlogs([])
    },[pathname])

  return (
    <div className="search">
        <input 
            type="text" 
            value={search}
            placeholder='Enter your search...'
            onChange={e => setSearch(e.target.value)}
        />

        {
          search.length > 2 &&
          <div className='position-absolute pt-2 px-1'
            style={{
              background: '#eee', zIndex: 10,
              maxHeight: 'calc(100vh - 100px)',
              overflow: 'auto'
            }}
          >
            {
              blogs.length 
              ? blogs.map(blog => (
                <CardHoriz key={blog._id} blog={blog} />
              ))
              : <h3>No Blogs</h3>
            }
          </div>
        }
    </div>
  )
}

export default Search