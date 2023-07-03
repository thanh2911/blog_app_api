import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom'

interface IProps {
    total: number
    callback: (num: number) => void
}

const Pagination: React.FC<IProps>= ({total,callback}) => {

    const [page,setPage] = useState<number>(1);
    const navigate = useNavigate();
    const location = useLocation();

    const newArray = [...Array(total)].map((_,i) => i + 1);

    const handlePagination = (num: number) => {
        navigate(`?page=${num}`)
        
    }

    useEffect(() => {
        const num = location.search.slice(6) || 1;
        setPage(Number(num))
        callback(Number(num))
        
        
    },[location.search,navigate])   



  return (
    <nav aria-label="Page navigation example">
        <ul className="pagination">
            {
                page > 1 &&
                <li className="page-item" onClick={() => handlePagination(page - 1)}>
                    <span className="page-link" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </span>
                </li>
            }


            {
                newArray.map(num => (
                <li className="page-item" key={num} onClick={() => handlePagination(num)}>
                    <span className="page-link">
                        {num}
                    </span>
                </li>
                ))
            }


            {
                page < total &&
                <li className="page-item" onClick={() => handlePagination(page + 1)}>
                    <span className="page-link" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </span>
                </li>
            }
            

        </ul>
    </nav>
  )
}

export default Pagination