import React from 'react'
import Navbar from './Navbar'

export default function Layout({ children }) {
  return (
    <div className="layout min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <footer
        className="border-t py-8"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-700">
            © {new Date().getFullYear()} Abisade Ogunwoolu. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="https://github.com/aogunwoolu"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-gray-700 hover:text-gray-400 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/abisade-ogunwoolu-0bb804155/"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-gray-700 hover:text-gray-400 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:a.ogunwoolu@outlook.com"
              className="text-xs text-gray-700 hover:text-gray-400 transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
