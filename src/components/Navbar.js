import { Link } from "gatsby"
import React, { useState } from "react"
import { FaBars, FaTimes } from "react-icons/fa"

export function MenuLinks({ onClick, isVertical }) {
  return (
    <div className={isVertical ? "flex flex-col items-center" : "flex"}>
      <Link to="/" onClick={onClick} className={isVertical ? "my-2" : "mx-4"}>
        Home
      </Link>
      <Link
        to="#radar"
        onClick={onClick}
        className={isVertical ? "my-2" : "mx-4"}
      >
        About
      </Link>
      <Link
        to="#projects"
        onClick={onClick}
        className={isVertical ? "my-2" : "mx-4"}
      >
        Projects
      </Link>
      <Link to="/blog" className={isVertical ? "my-2" : "mx-4"}>
        Blog
      </Link>
      {/* <Link to="/" onClick={onClick} className={isVertical ? "my-2" : "mx-4"}>
        Resume
      </Link> */}
    </div>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const toggleMenu = () => {
    setOpen(!open)
  }

  const handleLinkClick = e => {
    e.preventDefault()
    const target = e.target.hash
    if (window.location.pathname === "/") {
      if (!target) return
      document.querySelector(target).scrollIntoView({ behavior: "smooth" })
    } else {
      window.location.href = `/#${target.substring(1)}`
    }
    toggleMenu()
  }

  return (
    <nav
      initial={false}
      animate={open ? "open" : "closed"}
      className={`menu mynav ${open ? "bg-black" : ""}`}
    >
      <div className="hidden md:mx-8 md:flex md:justify-end">
        <MenuLinks onClick={handleLinkClick} />
      </div>
      <div
        className="md:hidden mx-8 mt-4 flex justify-end burger"
        onClick={toggleMenu}
      >
        {open ? <FaTimes /> : <FaBars />}
      </div>
      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black z-50">
          <MenuLinks onClick={handleLinkClick} isVertical={true} />
        </div>
      )}
    </nav>
  )
}
