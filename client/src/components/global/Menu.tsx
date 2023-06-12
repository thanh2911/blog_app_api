import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../../utils/TypesScript';
import { logout } from '../../redux/actions/authAction';

const Menu = () => {

    const { auth } = useSelector((state: RootStore) => state );
    const dispatch = useDispatch<any>();

    
    const bfLoginLinks = [
        {label: 'Login', path:'/login'},
        {label: 'Register', path:'/register'},
    ]

    const afLoginLinks = [
        {label: 'Home', path:'/'},
        {label: 'CreateBlog', path:'/create_blog'},
    ]

    const navLinks = auth.access_token ? afLoginLinks : bfLoginLinks

  return (
    <div className="menu">
        <ul>
            {
                navLinks.map((link, index) => (
                    <li key={index}>
                        <Link to={link.path}>{link.label}</Link>
                    </li>
                ))
            }
        </ul>
        <div className="dropdown">
            {
                auth.user && 
                <li>
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={auth.user.avatar} alt="" style={{width:"30px", height: "30px"}}/>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><Link to={`/profile/${auth.user._id}`}>Profile</Link></li>
                        <li><Link to='#' 
                        onClick={() => dispatch(logout())}
                        >
                            Logout
                        </Link></li>
                        <li></li>
                    </ul>
                    </li>
            }
           
        </div>
    </div>
  )
}

export default Menu