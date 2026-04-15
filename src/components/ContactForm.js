import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { FaTimes } from 'react-icons/fa'

Modal.setAppElement('#___gatsby')

const INPUT_BASE = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '10px',
  padding: '0.7rem 1rem',
  color: '#fff',
  fontSize: '0.875rem',
  outline: 'none',
  transition: 'border-color 0.2s',
  fontFamily: 'inherit',
}

export default function ContactFormModal({ isOpen, setIsOpen }) {
  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [message, setMessage] = useState('')
  const [focused, setFocused] = useState(null)

  // Reset on open
  useEffect(() => {
    if (isOpen) { setName(''); setEmail(''); setMessage('') }
  }, [isOpen])

  const handleSubmit = e => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`)
    const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:a.ogunwoolu@outlook.com?subject=${subject}&body=${body}`
    setIsOpen(false)
  }

  const fieldStyle = key => ({
    ...INPUT_BASE,
    borderColor: focused === key ? 'rgba(181,86,255,0.7)' : 'rgba(255,255,255,0.1)',
    boxShadow:   focused === key ? '0 0 0 3px rgba(143,0,255,0.12)' : 'none',
  })

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      contentLabel="Contact Form"
      style={{
        overlay: {
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(4,1,12,0.85)',
          backdropFilter: 'blur(6px)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        content: {
          position: 'relative',
          inset: 'unset',
          width: '100%',
          maxWidth: '520px',
          background: 'rgba(14,10,26,0.98)',
          border: '1px solid rgba(143,0,255,0.25)',
          borderRadius: '20px',
          padding: '2.5rem',
          boxShadow: '0 0 60px rgba(143,0,255,0.15)',
          color: '#fff',
        },
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem' }}>
        <div>
          <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#b556ff', marginBottom: '0.4rem' }}>
            Say hello
          </p>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', margin: 0 }}>Get In Touch</h2>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', padding: '4px', lineHeight: 1 }}
          aria-label="Close"
        >
          <FaTimes size={18} />
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, color: 'rgba(255,255,255,0.45)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Name
            </label>
            <input
              type="text"
              required
              placeholder="Abi"
              value={name}
              onChange={e => setName(e.target.value)}
              onFocus={() => setFocused('name')}
              onBlur={() => setFocused(null)}
              style={fieldStyle('name')}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, color: 'rgba(255,255,255,0.45)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Email
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
              style={fieldStyle('email')}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, color: 'rgba(255,255,255,0.45)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Message
          </label>
          <textarea
            required
            rows={5}
            placeholder="What's on your mind?"
            value={message}
            onChange={e => setMessage(e.target.value)}
            onFocus={() => setFocused('message')}
            onBlur={() => setFocused(null)}
            style={{ ...fieldStyle('message'), resize: 'vertical', minHeight: '120px' }}
          />
        </div>

        <button
          type="submit"
          style={{
            marginTop: '0.5rem',
            padding: '0.8rem 1.5rem',
            borderRadius: '50px',
            border: 'none',
            background: 'linear-gradient(135deg, #7000cc, #b556ff)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            letterSpacing: '0.04em',
            boxShadow: '0 0 28px rgba(143,0,255,0.35)',
            transition: 'box-shadow 0.2s',
            fontFamily: 'inherit',
          }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 44px rgba(181,86,255,0.65)')}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 28px rgba(143,0,255,0.35)')}
        >
          Send Message →
        </button>
      </form>
    </Modal>
  )
}