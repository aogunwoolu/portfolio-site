import React from 'react'
import Abi_Radar from './Radar';

function AboutInfo({id}) {
  return (
    <div id={id} className='grid grid-cols-2 max-sm:grid-cols-1 gap-2 mx-5'>
        <div className='col-span-1'>
            <h3 className='text-xl font-bold'>About Me</h3>
            <p className='font-light'>
                I am a software developer with a passion for learning and creating. 
                I was a student at the University of Queen Mary University London studying Computer Science. 
                I was the Treasurer of the Data Science Society, and attended the Board Games Society. 
                I am a programmer with a background in web development and app development. 
                I am currently working at Sky Uk as a Site Reliability Engineer. 
                I am constantly looking for new opportunities to learn and grow as a developer.
                {/* I am currently working on a project called <a href="">Abi</a> which is a personal assistant that helps you manage your life. */}
            </p>

            <h1 className='text-xl font-bold'>Skills</h1>
            <p className='font-light'>I have experience with the following technologies:</p>
            <div className="grid grid-cols-3">
                <div>
                    <h4 className='font-bold'>Frontend</h4>
                    <ul className='font-light'>
                        <li>Figma</li>
                        <li>JavaScript</li>
                        <li>React</li>
                        <li>TailwindCSS</li>
                    </ul>
                </div>
                <div>
                    <h4 className='font-bold'>Backend</h4>
                    <ul className='font-light'>
                        <li>Python</li>
                        <li>Django</li>
                        <li>Golang</li>
                        <li>SQL</li>
                        <li>Git</li>
                        <li>Redis</li>
                    </ul>
                </div>
                <div>
                    <h4 className='font-bold'>Operations</h4>
                    <ul className='font-light'>
                        <li>Git</li>
                        <li>Linux</li>
                        <li>Jenkins</li>
                        <li>Google Cloud Platform</li>
                        <li>Amazon Web Services</li>
                        <li>Concourse</li>
                        <li>Terraform</li>
                        <li>Docker</li>
                    </ul>
                </div>
            </div>
        </div>
        <div>
            <Abi_Radar />
        </div>
    </div>
  )
}

export default AboutInfo