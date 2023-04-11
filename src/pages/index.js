import React from "react"
import Layout from "../components/Layout"
import StartPage from "../components/StartPage"
import Projects from '../components/Projects';
import AboutBall from '../components/AboutBall';
import AboutInfo from '../components/AboutInfo';
import 'bootstrap/dist/css/bootstrap.min.css'
import "../styles/global.css"

import { Col, Container, Row, Button } from 'react-bootstrap';
import * as styles from '../styles/start.module.css';
import { BsChevronDown } from 'react-icons/bs'

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }} className="overflow-hidden">
      <Layout>
        <StartPage id="startPage"/>
        <br/>
        <AboutInfo id="radar"/>
        <br/>
        <Projects id="projects"/>
        <br/>
      </Layout>
    </div>
  )
}
