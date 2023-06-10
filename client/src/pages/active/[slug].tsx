import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { IParams } from '../../utils/TypesScript';
import { postAPI } from '../../utils/FetchData';
import { ShowErrMsg,ShowSuccessMsg } from '../../components/alert/Alert';

const Active = () => {

    const { slug }: IParams = useParams();

    const [success, setSuccess] = useState('');
    const [errors, setErrors] = useState('');

    useEffect(() => {
        if(slug) {
            postAPI('active', {active_token: slug})
            .then(res => 
              setSuccess(res.data.msg)
            )
            .catch(err => 
                setErrors(err.response.data.msg)
            )
        }
    },[slug])

    // console.log(success,errors);

  return (
    <div>
    { errors && ShowErrMsg(errors)}
    { success && ShowSuccessMsg(success)}

    </div>

  )
}

export default Active