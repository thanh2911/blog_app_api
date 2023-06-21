import React, {useEffect, useState} from 'react';
import { FormSubmit, RootStore,ICategory } from '../utils/TypesScript';
import { useSelector, useDispatch } from 'react-redux';
import NotFound from '../components/global/NotFound';
import { createCategory, updateCategory,deleteCategory } from '../redux/actions/categoryAction';

const Category = () => {
    const [name,setName] = useState('');
    const [edit, setEdit] = useState<ICategory | null>(null);

    const { auth, categories } = useSelector((state: RootStore) => state);
    const dispatch = useDispatch<any>();

    useEffect(() => {
        if(edit) setName(edit.name)
    },[edit])
    

    const handleSubmit = (e: FormSubmit) => {
        e.preventDefault();

        if(!auth.access_token || !name) return ;

        if(edit) {
            if(edit.name === name) return;
            const data = {...edit, name}
            dispatch(updateCategory(data, auth.access_token))
            
        }else {
        
            dispatch(createCategory(name, auth.access_token));

        }
        setName('');
        setEdit(null)
    }

    const handleDelete = (id: string) => {
       if(!auth.access_token) return;

       dispatch(deleteCategory(id,auth.access_token))
        
    }

    if(auth.user?.role !== 'admin') return <NotFound />
  return (
    <div className="category">
        <form onSubmit={handleSubmit}>
            <label htmlFor="category">Category</label>

            <div>
                {
                    edit && <span onClick={() => setEdit(null)}>X</span>
                }
                <input type="text" name='category' id='category'
                value={name} onChange={(e) => setName(e.target.value)} />

                <button type='submit'>{ edit ? "Update" : "Create"}</button>
            </div>
        </form>

        <div className="category_table">
                {
                    categories.map((category) => (
                        <div key= {category._id}>
                            <span>{category.name}</span>

                            <span onClick={() => setEdit(category)}>sua</span>
                            <span onClick={() => handleDelete(category._id)}>xoa</span>
                        </div>
                    ))
                }

        </div>
    </div>
  )
}

export default Category;