import React from 'react';
import { useSelector } from 'react-redux';
import { IBlog, RootStore, InputChange } from '../../utils/TypesScript';

interface IProps {
    blog: IBlog,
    setBlog: (blog:IBlog) => void
}

const CreateForm: React.FC<IProps> = ({blog,setBlog}) => {

    const { categories } = useSelector((state: RootStore) => state)

    const handleChangeInput = (e: InputChange) => {
        const { name, value }= e.target;

        setBlog({...blog, [name]: value})

    }

    const handleChangeThumb = (e: InputChange) => {
        const target = e.target as HTMLInputElement;
        const files = target.files;

        if(files) {
            const file = files[0];
            setBlog({...blog, thumbnail: file})
        }
    }

    // console.log({blog});
    
  return (
    <form >
        <div className="form-group position-relative" >
            <input type="text" className='form-control' 
            value={blog.title}
            name='title'
            onChange={handleChangeInput}
            />
            <small className='text-muted position-absolute' 
            style={{top:0, right:'3px'}}>{blog.title?.length}/50</small>
        </div>

        <div className="form-group">
            <input type="file" className='form-control' 
            accept='image/*' onChange={handleChangeThumb}
            />
        </div>

        <div className="form-group position-relative" >
            <textarea  className='form-control' 
            value={blog.description} 
            name="description" rows={4} 
            onChange={handleChangeInput}
            />
            <small className='text-muted position-absolute' 
            style={{bottom:0, right:'3px'}}>{blog.description?.length}/200</small>
        </div>

        <div className="form-group">
            <select className='form-control' 
            value={blog.category}
            name="category"
            onChange={handleChangeInput}
            >
                <option value="">Choose a category</option>

                {
                    categories.map(category => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))
                }
            </select>
        </div>
    </form>
  )
}

export default CreateForm