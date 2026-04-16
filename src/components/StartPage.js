import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FaGithub } from "react-icons/fa"
import { AiFillLinkedin } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import GalaxyBackground from "./GalaxyBackground"
import ContactFormModal from "./ContactForm"

const ROLES = [
  "Platform Engineer",
  "Site Reliability Engineer",
  "Automation Enthusiast",
]

const fadeUp = delay => ({
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { delay, duration: 0.65, ease: "easeOut" } },
})

export default function StartPage({ id }) {
  const [roleIdx,   setRoleIdx]   = useState(0)
  const [fadeIn,    setFadeIn]    = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setFadeIn(false)
      setTimeout(() => {
        setRoleIdx(i => (i + 1) % ROLES.length)
        setFadeIn(true)
      }, 350)
    }, 3200)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id={id} className="relative h-screen flex items-center overflow-hidden">
      <GalaxyBackground />

      {/* Gradient so left-side text stays readable */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(4,1,12,0.88) 0%, rgba(4,1,12,0.55) 55%, rgba(4,1,12,0.05) 100%)",
        }}
      />

      <div className="relative z-20 max-w-6xl mx-auto px-6 w-full pt-16">
        <motion.p
          className="text-xs font-semibold tracking-[0.28em] uppercase mb-5"
          style={{ color: "#b556ff" }}
          variants={fadeUp(0)}
          initial="hidden"
          animate="visible"
        >
          Welcome — I'm
        </motion.p>

        <motion.h1
          className="font-extrabold leading-none mb-6 text-white"
          style={{ fontSize: "clamp(3.5rem, 10vw, 7rem)" }}
          variants={fadeUp(0.12)}
          initial="hidden"
          animate="visible"
        >
          <span style={{ color: "#b556ff" }}>Abi</span>sade
        </motion.h1>

        <motion.div
          className="text-xl md:text-2xl font-medium text-gray-300 mb-6 h-8"
          variants={fadeUp(0.24)}
          initial="hidden"
          animate="visible"
        >
          <span
            style={{
              display: "inline-block",
              transition: "opacity 0.32s ease, transform 0.32s ease",
              opacity:   fadeIn ? 1 : 0,
              transform: fadeIn ? "translateY(0)" : "translateY(-6px)",
            }}
          >
            {ROLES[roleIdx]}
          </span>
        </motion.div>

        <motion.p
          className="text-gray-400 max-w-sm md:max-w-md mb-10 text-sm md:text-base leading-relaxed"
          variants={fadeUp(0.36)}
          initial="hidden"
          animate="visible"
        >
          I build things for the web and the cloud — passionate about clean,
          scalable solutions across the full stack.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 items-center"
          variants={fadeUp(0.48)}
          initial="hidden"
          animate="visible"
        >
          <button
            onClick={() => setModalOpen(true)}
            className="px-7 py-3 rounded-full font-semibold text-sm tracking-wide text-white transition-all duration-300"
            style={{
              background:  "linear-gradient(135deg, #7000cc, #b556ff)",
              boxShadow:   "0 0 28px rgba(143,0,255,0.35)",
              border:      "none",
              cursor:      "pointer",
              fontFamily:  "inherit",
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 44px rgba(181,86,255,0.65)")}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 28px rgba(143,0,255,0.35)")}
          >
            Get In Touch
          </button>

          <div className="flex gap-5 items-center">
            <a
              href="https://github.com/aogunwoolu"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <FaGithub size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/abisade-o-0bb804155"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <AiFillLinkedin size={24} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={() => document.getElementById("latestPosts")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-gray-500 hover:text-white transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
        <BsChevronDown size={16} className="animate-bounce" />
      </button>

      <ContactFormModal isOpen={modalOpen} setIsOpen={setModalOpen} />
    </section>
  )
}
