import React from 'react'
import { Link } from 'react-router-dom';
import Search from './Search';
import Menu from './Menu';

const Header = () => {

  return (
    <div className="header" style={{
      position: 'sticky', top:0,left:0, zIndex: 9
    }}>
        <Link to= '/'>Blog App</Link>

        <Search />
        <Menu />
    </div>
  )
}

export default Header