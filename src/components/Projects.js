import React from 'react'
import { motion } from 'framer-motion'
import { ClockIcon } from '@heroicons/react/24/outline'

const PROJECTS = [
  { title: 'Coming Soon', description: 'Something exciting is in progress.' },
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
          {PROJECTS.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.12, duration: 0.55, ease: 'easeOut' }}
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