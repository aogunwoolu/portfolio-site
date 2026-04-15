import React, { useState, useEffect } from "react"
import { FiArrowUp } from "react-icons/fi"
import Layout from "../components/Layout"
import StartPage from "../components/StartPage"
import Projects from '../components/Projects'
import AboutInfo from '../components/AboutInfo'
import LatestPosts from '../components/latest-posts'
import 'bootstrap/dist/css/bootstrap.min.css'
import "../styles/global.css"
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader"
deckDeckGoHighlightElement()

export default function Home() {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > window.innerHeight * 0.7)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <Layout>
      <StartPage id="startPage" />
      <LatestPosts id="latestPosts" />
      <AboutInfo id="about" />
      <Projects id="projects" />
      {showButton && (
        <button
          className="fixed bottom-8 right-8 z-50 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background:  'linear-gradient(135deg, #7000cc, #b556ff)',
            boxShadow:   '0 0 20px rgba(143,0,255,0.4)',
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          <FiArrowUp size={16} />
        </button>
      )}
    </Layout>
  )
}
