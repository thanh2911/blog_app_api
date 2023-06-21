import React, {useState} from 'react';
import { FormSubmit, RootStore } from '../utils/TypesScript';
import { useSelector, useDispatch } from 'react-redux';
import NotFound from '../components/global/NotFound';
import { createCategory } from '../redux/actions/categoryAction';

const Category = () => {
    const [name,setName] = useState('');

    const { auth, categories } = useSelector((state: RootStore) => state);
    const dispatch = useDispatch<any>();

    const handleSubmit = (e: FormSubmit) => {
        e.preventDefault();

        if(!auth.access_token || !name) return ;

        dispatch(createCategory(name, auth.access_token));

        setName('')
    }

    if(auth.user?.role !== 'admin') return <NotFound />
  return (
    <div className="category">
        <form onSubmit={handleSubmit}>
            <label htmlFor="category">Category</label>

            <div>
                <input type="text" name='category' id='category'
                value={name} onChange={(e) => setName(e.target.value)} />

                <button type='submit'>Create</button>
            </div>
        </form>

        <div className="category_table">
                {
                    categories.map((category) => (
                        <div key= {category._id}>
                            <span>{category.name}</span>

                            <span>sua</span>
                            <span>xoa</span>
                        </div>
                    ))
                }

        </div>
    </div>
  )
}

export default Category;