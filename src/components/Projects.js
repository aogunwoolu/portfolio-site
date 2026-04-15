import React from 'react'
import { motion } from 'framer-motion'
import { ClockIcon } from '@heroicons/react/24/outline'

const COMING_SOON = [
  { title: 'Coming Soon', description: 'Something exciting is in progress.' },
  { title: 'Coming Soon', description: 'Something exciting is in progress.' },
]

export default function Projects({ id }) {
  return (
    <section id={id} className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <p
          className="text-xs font-semibold tracking-[0.22em] uppercase mb-2"
          style={{ color: '#b556ff' }}
        >
          Work
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">Projects</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Ansible101 */}
          <motion.a
            href="https://ansible101.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0, duration: 0.55, ease: 'easeOut' }}
            className="rounded-xl flex flex-col items-start justify-between h-64 transition-all duration-300 no-underline overflow-hidden"
            style={{
              background: '#0d1117',
              border:     '1px solid rgba(75,107,255,0.25)',
              fontFamily: "'Space Mono', 'Courier New', monospace",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(75,107,255,0.6)'
              e.currentTarget.style.boxShadow   = '0 0 32px rgba(75,107,255,0.14)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(75,107,255,0.25)'
              e.currentTarget.style.boxShadow   = 'none'
            }}
          >
            {/* Site header bar */}
            <div
              className="w-full flex items-center gap-2 px-4 py-2 text-xs"
              style={{
                background:  'rgba(75,107,255,0.12)',
                borderBottom:'1px solid rgba(75,107,255,0.2)',
                color:       '#4B6BFF',
                fontFamily:  "'Space Mono', 'Courier New', monospace",
              }}
            >
              <span style={{ color: '#4B6BFF', fontSize: '0.6rem' }}>▶</span>
              <span className="font-bold tracking-widest uppercase" style={{ fontSize: '0.6rem' }}>ansible101.com</span>
            </div>

            {/* Card body */}
            <div className="flex flex-col flex-1 justify-between p-6">
              <div>
                <h3
                  className="font-bold text-base leading-snug mb-2"
                  style={{ color: '#ffffff', fontFamily: "'Space Mono', 'Courier New', monospace" }}
                >
                  Ansible101
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.45)', fontFamily: "'Space Mono', 'Courier New', monospace" }}
                >
                  Visual debugger, logic explainer &amp; Jinja2 sandbox for Ansible playbooks.
                </p>
              </div>
              <span
                className="text-xs font-semibold"
                style={{ color: '#4B6BFF', fontFamily: "'Space Mono', 'Courier New', monospace" }}
              >
                Visit →
              </span>
            </div>
          </motion.a>

          {/* Coming Soon cards */}
          {COMING_SOON.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: (i + 1) * 0.12, duration: 0.55, ease: 'easeOut' }}
              className="rounded-xl p-8 flex flex-col items-center justify-center text-center h-64 transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border:     '1px solid rgba(255,255,255,0.07)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(181,86,255,0.35)'
                e.currentTarget.style.boxShadow   = '0 0 32px rgba(143,0,255,0.12)'
                e.currentTarget.style.background  = 'rgba(143,0,255,0.06)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.boxShadow   = 'none'
                e.currentTarget.style.background  = 'rgba(255,255,255,0.03)'
              }}
            >
              <ClockIcon className="w-10 h-10 mb-4" style={{ color: 'rgba(255,255,255,0.15)' }} />
              <h3 className="font-semibold text-gray-500 text-base">{project.title}</h3>
              <p className="text-xs text-gray-700 mt-2">{project.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}