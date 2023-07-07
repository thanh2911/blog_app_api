import React, {useState, useEffect} from 'react'
import { RootStore, IParams, IBlog } from '../../utils/TypesScript'
import { useParams } from 'react-router-dom'
import { getAPI } from '../../utils/FetchData';
import Loading from '../../components/global/Loading';
import { ShowErrMsg } from '../../components/alert/Alert';
import DisplayBlog from '../../components/blog/DisplayBlog';

const DetailBlog = () => {

    const {slug}: IParams = useParams();

    const [blog,setBlog] = useState<IBlog>()
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState('')

    useEffect(() => {
        if(!slug) return;
        setLoading(true)
        getAPI(`blog/${slug}`)
            .then(res => {
                // console.log(res)
                setBlog(res.data.blog)
                setLoading(false)
                
            })
            .catch(err => {
                // console.log(err);
                setError(err.response.data.msg)
                setLoading(false)
            })
        
        return () => setBlog(undefined)
    },[slug])

    if(loading && !blog) return <Loading />  
  return (
    <div>
        {error && ShowErrMsg(error)}
        {blog && <DisplayBlog blog={blog}/>}
    </div>
  )
}

export default DetailBlog