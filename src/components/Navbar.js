import { Link } from "gatsby"
import React, { useState, useEffect } from "react"
import { FaBars, FaTimes } from "react-icons/fa"

const NAV_LINKS = [
  { to: "/",         label: "Home",     anchor: false },
  { to: "#about",    label: "About",    anchor: true  },
  { to: "#projects", label: "Projects", anchor: true  },
  { to: "/blog",     label: "Blog",     anchor: false },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleAnchor = (e, to) => {
    if (!to.startsWith("#")) return
    e.preventDefault()
    const id = to.slice(1)
    if (window.location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    } else {
      window.location.href = `/${to}`
    }
    setOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/5 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-lg font-bold tracking-tight select-none">
          <span style={{ color: "#b556ff" }}>Abi</span>
          <span className="text-white">sade</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ to, label, anchor }) => (
            <Link
              key={label}
              to={to}
              onClick={anchor ? e => handleAnchor(e, to) : undefined}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
            >
              {label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-purple-500 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-white p-2 transition-colors"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {open ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/5 py-6">
          <div className="flex flex-col items-center gap-6">
            {NAV_LINKS.map(({ to, label, anchor }) => (
              <Link
                key={label}
                to={to}
                onClick={anchor ? e => handleAnchor(e, to) : () => setOpen(false)}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
