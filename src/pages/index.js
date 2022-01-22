import React from "react"
import Layout from "../components/Layout"
import StartPage from "../components/StartPage"
import Projects from '../components/Projects';
import AboutBall from '../components/AboutBall';
import 'bootstrap/dist/css/bootstrap.min.css'
import "../styles/global.css"

export default function Home() {
  return (
    <div style={{
      // backgroundColor: '#0c0c0c',
      // color: 'white'
    }}>
      <Layout>
        <StartPage/>
        <br/>
        <Projects/>
        <br/>
        <AboutBall/>
      </Layout>
    </div>
  )
}
