import React, {useState, useRef, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore, IBlog } from '../utils/TypesScript';
import NotFound from '../components/global/NotFound';
import CreateForm from '../components/cards/CreateForm';
import CardHoriz from '../components/cards/CardHoriz';
import ReactQuill from '../components/editor/ReactQuill';
import { validCreateBlog } from '../utils/Valid';
import { ALERT } from '../redux/types/alertType';
import { ImgUploadFile } from '../utils/ImageUpload';
import { createBlog } from '../redux/actions/blogAction';

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
    const divRef = useRef<HTMLDivElement>(null)
    const [text,setText] = useState('');


    useEffect(() => {
        const div = divRef.current;
        if(!div) return ;

        const text = (div?.innerText as string)
        setText(text)
    },[body])
    
    const handleSubmit = async () => {
        if(!auth.access_token) return;

        const check = validCreateBlog({...blog, content: text})


        if(check.errLength !==0) {
            return dispatch({type:ALERT, payload: {errors: check.errMsg}})
        }
        

        let newData = {...blog, content: body}

        dispatch(createBlog(newData, auth.access_token))
        
    }

    // console.log({blog,text});
    

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

        <div ref={divRef} dangerouslySetInnerHTML={{
            __html: body
        }}></div>
        <small>{text.length}</small>

        <button className='btn btn-dark' onClick={handleSubmit}> Create Post </button>
    </div>
  )
}

export default CreateBlog