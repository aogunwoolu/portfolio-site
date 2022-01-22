import { Link } from 'gatsby';
import React from 'react';

export default function Navbar() {
  return (
  <nav className='mynav'>
    <h1></h1>
    <div className="links">
        <Link to="/">Home</Link>
        <Link to="/">About</Link>
        <Link to="/">Projects</Link>
        <Link to="/">Resume</Link>
    </div>
  </nav>
  )
}
