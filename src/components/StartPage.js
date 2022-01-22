import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import * as styles from '../styles/start.module.css';
import { FaGithub } from 'react-icons/fa';
import { AiFillTwitterCircle, AiFillLinkedin } from 'react-icons/ai'
import { BsChevronDown } from 'react-icons/bs'
import Navbar from './Navbar'

export default function StartPage() {
  return (
    <div className={styles.nebula_img}>
        <Container className={styles.about_container}>
            <Row>
                <Col className={styles.about_me}>
                    <div className={styles.content}>
                        <h3>
                            <strong>Hey, I'm</strong>
                        </h3>
                        <h1>
                            <p><span className="name">(Abi)</span>sade,</p>
                        </h1>
                        <h3>
                            <strong>Full-Stack Developer.</strong><br/>
                            <strong>I also do crypto & blockchain things.</strong>
                        </h3>
                        <h3>
                            <strong className="skill-array">
                                [Frontend,Backend,Databases] 
                            </strong>
                        </h3>
                        <br/>
                        <Button variant="flat">Contact Me</Button>
                        <br/>
                        <Container>
                            <Row className={styles.social_bar}>
                                <Col>
                                    <FaGithub onClick={() => window.open("https://github.com/aogunwoolu")} size={28}/>
                                </Col>
                                <Col>
                                    <AiFillTwitterCircle onClick={() => window.open("https://github.com/aogunwoolu")} size={28}/>
                                </Col>
                                <Col>
                                    <AiFillLinkedin onClick={() => window.open("https://www.linkedin.com/in/abisade-ogunwoolu-0bb804155/")} size={28}/>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Col>
                <Col className='col-4'/>
            </Row>
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
        </Container>
    </div>
  );
}
