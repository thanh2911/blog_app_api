import React, {useState, useRef, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore, IBlog, IUser } from '../utils/TypesScript';
import NotFound from '../components/global/NotFound';
import CreateForm from '../components/cards/CreateForm';
import CardHoriz from '../components/cards/CardHoriz';
import ReactQuill from '../components/editor/ReactQuill';
import { shallowEqual, validCreateBlog } from '../utils/Valid';
import { ALERT } from '../redux/types/alertType';
import { createBlog, updateBlog } from '../redux/actions/blogAction';
import { getAPI } from '../utils/FetchData';

interface IProps {
    id?: string
}

const CreateBlog: React.FC<IProps> = ({id}) => {
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
    const { auth } = useSelector((state: RootStore) => state)
    const dispatch = useDispatch<any>();
    const divRef = useRef<HTMLDivElement>(null)
    const [text,setText] = useState('');
    const [oldData, setOldData] = useState<IBlog>(initState);
    

    useEffect(() => {
        const div = divRef.current;
        if(!div) return ;

        const text = (div?.innerText as string)
        setText(text)
    },[body])

    useEffect(() => {
        if(!id) return;

        getAPI(`blog/${id}`)
            .then(res => {
                console.log({res});
                setBlog(res.data)
                setBody(res.data.content)
                setOldData(res.data)
            })
            .catch(err => console.log(err)
            )
        
            return () => {
                setBlog(initState)
                setBody('')
                setOldData(initState)
            }
    },[id])
    
    const handleSubmit = async () => {
        if(!auth.access_token) return;

        const check = validCreateBlog({...blog, content: text})


        if(check.errLength !==0) {
            return dispatch({type:ALERT, payload: {errors: check.errMsg}})
        }
        

        let newData = {...blog, content: body}

        if(id) {
                
        
            if((blog.user as IUser)._id !== auth.user?._id) {
                return dispatch({
                    type: ALERT,
                    payload: { errors: "Invalid Authentication"}
                })
            }

            const result = shallowEqual(oldData,newData);
            if(result) {
                return dispatch({
                    type: ALERT,
                    payload: { errors: "Data does not change"}
                })
            }
            
            dispatch(updateBlog(newData, auth.access_token))
            
            
        }else{
            dispatch(createBlog(newData, auth.access_token))

        }
        
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

        <ReactQuill setBody= {setBody} body={body}/>

        <div ref={divRef} dangerouslySetInnerHTML={{
            __html: body
        }}></div>
        <small>{text.length}</small>

        <button className='btn btn-dark' onClick={handleSubmit}>
             { id ? "Update Blog" : "Create Post"} 
        </button>
    </div>
  )
}

export default CreateBlog