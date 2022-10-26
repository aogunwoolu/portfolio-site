import React from "react"
import Layout from "../components/Layout"
import StartPage from "../components/StartPage"
import Projects from '../components/Projects';
import AboutBall from '../components/AboutBall';
import 'bootstrap/dist/css/bootstrap.min.css'
import "../styles/global.css"

import { Col, Container, Row, Button } from 'react-bootstrap';
import * as styles from '../styles/start.module.css';
import { BsChevronDown } from 'react-icons/bs'

export default function Home() {
  return (
    <div style={{
      // backgroundColor: '#0c0c0c',
      // color: 'white'
    }}>
      <Layout>
        <StartPage/>
        <br/>
        <Container>
            <Row className={styles.scroll}>
                <Col className='col-1'>
                    <BsChevronDown size={28}/>
                </Col>
                <Col className='col-1'/>
                <Col>
                    <p className='align-middle'>scroll for more</p>
                </Col>
            </Row>
        </Container>
        <Projects/>
        <br/>
        <AboutBall/>
      </Layout>
    </div>
  )
}
