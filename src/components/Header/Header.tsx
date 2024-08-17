import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <div className='header-all'>
      <header>
        <h2><Link to='/' className='bbs'>掲示板</Link></h2>
        <Link to = '/threads/new' className='post'>スレッドを立てる</Link>
        {/* <a href='/PostPage'>スレッドを立てる</a> */}
      </header>
    </div>
  )
}

export default Header; 