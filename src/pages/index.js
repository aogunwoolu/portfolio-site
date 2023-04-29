import React, { useState, useEffect } from "react"
import { FiArrowUp } from "react-icons/fi";
import Layout from "../components/Layout";
import StartPage from "../components/StartPage";
import Projects from '../components/Projects';
import AboutInfo from '../components/AboutInfo';
import LatestPosts from '../components/latest-posts';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/global.css";
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";
deckDeckGoHighlightElement();

export default function Home() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > document.getElementById("startPage").offsetTop) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }} className="overflow-hidden">
      <Layout>
        <StartPage id="startPage"/>
        <br/>
        <LatestPosts id="latestPosts"/>
        <br/>
        <AboutInfo id="radar"/>
        <br/>
        <Projects id="projects"/>
        <br/>
        {showButton && (
          <button
            className="btn btn-primary bg-purple-600 border-0 pr-4 rounded-circle w-12 h-12 fixed bottom-10 right-10 z-50"
            onClick={handleBackToTop}
          >
            <FiArrowUp className="ml-1"/>
          </button>
        )}
      </Layout>
    </div>
  )
}
