import React from 'react'
import { Link } from 'react-router-dom';
import Search from './Search';
import Menu from './Menu';

const Header = () => {

  return (
    <div className="header">
        <Link to= '/'>Blog App</Link>

        <Search />
        <Menu />
    </div>
  )
}

export default Header