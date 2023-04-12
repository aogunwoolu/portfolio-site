import React, { useState } from 'react';
import Modal from 'react-modal';

const ContactFormModal = ({isOpen, setIsOpen}) => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  return (
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Contact Form"
        style={{
            overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(20, 20, 24, 0.95)'
            },
            content: {
                margin: '2vh auto',
                border: '1px solid #ccc',
                background: '#0c0c0c',
                overflow: 'auto',
                padding: '20px',
                // minWidth: '500px'
                maxWidth: '800px',
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                flexDirection: 'column'
            }
        }}
      >
        <button onClick={() => setIsOpen(false)}>Close</button>
        <h1 style={{marginBottom: '1rem'}}>Contact Form</h1>
        <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', marginBottom: '1rem', width: '100%'}}>
            <label htmlFor="name" style={{display: 'flex', alignItems: 'center', fontWeight: 'bold', width: '100px', marginRight: '1rem'}}>
            <i className="fas fa-user" style={{marginRight: '0.5rem'}}></i> Name:
            </label>
            <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            style={{backgroundColor: 'transparent', border: '2px solid #fff', color: '#fff', borderRadius: '25px', padding: '0.5rem 1rem', width: '100%'}}
            />
        </div>
        <div style={{display: 'flex', alignItems: 'center', marginBottom: '1rem', width: '100%'}}>
            <label htmlFor="email" style={{display: 'flex', alignItems: 'center', fontWeight: 'bold', width: '100px', marginRight: '1rem'}}>
            <i className="fas fa-envelope" style={{marginRight: '0.5rem'}}></i> Email:
            </label>
            <input
            type="text"
            id="subject"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            style={{backgroundColor: 'transparent', border: '2px solid #fff', color: '#fff', borderRadius: '25px', padding: '0.5rem 1rem', width: '100%'}}
            />
        </div>
        <div style={{display: 'flex', flexDirection: 'column', marginBottom: '1rem', width: '100%'}}>
            <label htmlFor="message" style={{display: 'flex', alignItems: 'center', fontWeight: 'bold', marginBottom: '0.5rem'}}>
            <i className="fas fa-comments" style={{marginRight: '0.5rem'}}></i> Message:
            </label>
            <textarea
            id="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            style={{backgroundColor: 'transparent', border: '2px solid #fff', color: '#fff', borderRadius: '25px', padding: '0.5rem 1rem', flex: 1, minHeight: '200px'}}
            />
        </div>
        <a href={`mailto:a.gounwoolu@outlook.com?subject=Inquiry%20from%20${name}&body=${message.replace(/\n/g, '%0D%0A')}`} style={{backgroundColor: '#fff', color: '#000', border: 'none', borderRadius: '25px', padding: '0.5rem 1rem', cursor: 'pointer', marginTop: '1rem'}}>
        Send
        </a>
        </form>

      </Modal>
  );
};

export default ContactFormModal;
