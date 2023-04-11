import { Link } from 'gatsby';
import React from 'react';

export default function Navbar() {
  return (
  <nav className='mynav'>
    <h1></h1>
    <div className="links">
        <Link to="#startPage">Home</Link>
        <Link to="#radar">About</Link>
        <Link to="#projects">Projects</Link>
        <Link to="/">Resume</Link>
    </div>
  </nav>
  )
}
