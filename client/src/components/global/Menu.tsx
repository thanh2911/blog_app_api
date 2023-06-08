import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
    const bfLoginLinks = [
        {label: 'Login', path:'/login'},
        {label: 'Register', path:'/register'},
    ]
  return (
    <div className="menu">
        <ul>
            {
                bfLoginLinks.map((link, index) => (
                    <li key={index}>
                        <Link to={link.path}>{link.label}</Link>
                    </li>
                ))
            }
        </ul>
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                User Name
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><Link to='/profile'>Profile</Link></li>
                <li><Link to='#'>Logout</Link></li>
                <li></li>
            </ul>
        </div>
    </div>
  )
}

export default Menu