import { Link } from 'gatsby';
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export function MenuLinks({ onClick }) {
  return (
    <>
      <Link to="/" onClick={onClick}>
        Home
      </Link>
      <Link to="#radar" onClick={onClick}>
        About
      </Link>
      <Link to="#projects" onClick={onClick}>
        Projects
      </Link>
      <Link to="/blog">Blog</Link>
      <Link to="/" onClick={onClick}>
        Resume
      </Link>
    </>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
    const target = e.target.hash;
    if (window.location.pathname === '/') {
      if (!target) return;
      document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${target.substring(1)}`;
    }
    toggleMenu();
  };

  return (
    <nav initial={false} animate={open ? 'open' : 'closed'} className="menu mynav">
      <h1></h1>
      <div className="hidden md:mx-8 md:block md:flex md:justify-end">
        <MenuLinks onClick={handleLinkClick} />
      </div>
      <div
        className="md:hidden mx-8 mt-4 block flex justify-end burger"
        onClick={toggleMenu}
      >
        {open ? <FaTimes /> : <FaBars />}
      </div>
      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black z-50">
          <MenuLinks onClick={handleLinkClick} />
        </div>
      )}
    </nav>
  );
}