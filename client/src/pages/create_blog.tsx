import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore, IBlog } from '../utils/TypesScript';
import NotFound from '../components/global/NotFound';
import CreateForm from '../components/cards/CreateForm';
import CardHoriz from '../components/cards/CardHoriz';
import ReactQuill from '../components/editor/ReactQuill';

const CreateBlog = () => {
    const initState = {
        user: '',
        title: '',
        content: '',
        description: '',
        thumbnail: '',
        category: '',
        createdAt: new Date().toISOString()

    }

    const [blog, setBlog] = useState<IBlog>(initState);
    const [body,setBody] = useState('')
    const { auth, categories } = useSelector((state: RootStore) => state)
    const dispatch = useDispatch<any>();

    console.log(body);
    

    if(!auth.access_token) return <NotFound />
  return (
    <div className="create_blog">
        <h2>Create Blog</h2>

        <div className="div">
            <h5>Create</h5>
            <div className="div">
                <CreateForm blog={blog} setBlog={setBlog}/>
            </div>

            <div className="div">
                <CardHoriz blog={blog}/>
            </div>
            
        </div>

        <ReactQuill setBody= {setBody}/>

        <button className='btn btn-dark'> Create Post </button>
    </div>
  )
}

export default CreateBlog