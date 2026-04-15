import React from 'react'
import { motion } from 'framer-motion'

const SKILLS = {
  Frontend:   ['JavaScript', 'React', 'TailwindCSS', 'Figma'],
  Backend:    ['Python', 'Django', 'Golang', 'SQL'],
  Operations: ['Docker', 'Terraform', 'AWS', 'GCP', 'Jenkins', 'Concourse', 'Linux', 'Git'],
}

const STATS = [
  { value: '3+',  label: 'Years Experience'   },
  { value: '10+', label: 'Technologies'        },
  { value: 'SRE', label: 'Current Role'        },
  { value: 'Sky', label: 'Current Employer'    },
]

const slideIn = side => ({
  hidden:  { opacity: 0, x: side === 'left' ? -30 : 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: 'easeOut' } },
})

export default function AboutInfo({ id }) {
  return (
    <section
      id={id}
      className="py-24"
      style={{ background: 'rgba(255,255,255,0.015)' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <p
          className="text-xs font-semibold tracking-[0.22em] uppercase mb-2"
          style={{ color: '#b556ff' }}
        >
          Background
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">About Me</h2>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: bio + skill pills */}
          <motion.div
            variants={slideIn('left')}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <p className="text-gray-400 leading-relaxed mb-8 text-sm md:text-base">
              I'm a software developer with a passion for learning and creating. I studied
              Computer Science at{' '}
              <span style={{ color: '#b556ff' }}>Queen Mary University of London</span>, where I was
              Treasurer of the Data Science Society. I currently work at{' '}
              <span style={{ color: '#b556ff' }}>Sky UK as a Site Reliability Engineer</span>,
              constantly looking for new opportunities to learn and grow.
            </p>

            <h3 className="text-base font-semibold text-white mb-5">Skills</h3>
            <div className="flex flex-col gap-6">
              {Object.entries(SKILLS).map(([category, skills]) => (
                <div key={category}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-600 mb-3">
                    {category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full text-xs font-medium text-gray-300"
                        style={{
                          background: 'rgba(143,0,255,0.1)',
                          border:     '1px solid rgba(143,0,255,0.28)',
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: stat cards */}
          <motion.div
            variants={slideIn('right')}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-2 gap-4"
          >
            {STATS.map(({ value, label }) => (
              <div
                key={label}
                className="rounded-xl p-6 flex flex-col justify-center"
                style={{
                  background: 'rgba(143,0,255,0.06)',
                  border:     '1px solid rgba(143,0,255,0.18)',
                }}
              >
                <span
                  className="text-3xl font-extrabold leading-none mb-2"
                  style={{ color: '#b556ff' }}
                >
                  {value}
                </span>
                <span className="text-xs text-gray-500 font-medium leading-snug">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}