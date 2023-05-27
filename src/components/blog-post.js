import React, { useEffect, useState, useRef } from "react";
import { graphql, Link } from "gatsby";
import Layout from "./Layout";
import { FaPlay, FaPause, FaSync } from "react-icons/fa";
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";
deckDeckGoHighlightElement();

const Blog = ({ data }) => {
  const post = data.markdownRemark;
  const [activeHeading, setActiveHeading] = useState(null);
  const headingsRef = useRef([]);
  const [isReading, setIsReading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      for (const element of headingsRef.current) {
        const heading = element;
        const rect = heading?.getBoundingClientRect();
        if (rect?.top >= 0 && rect?.top <= window.innerHeight) {
          setActiveHeading(heading?.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function calculate_min_read(html) {
    const wordCount = html.replace(/<[^>]+>/g, "").split(/\s+/).length;
    const wordsPerMinute = 200; // Average reading speed in words per minute
    const minRead = Math.ceil(wordCount / wordsPerMinute);
    return minRead;
  }

  const handleReadAloud = () => {
    const stripHTML = (html) => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || '';
    };
  
    const textContent = stripHTML(post.html);
  
    const speech = new SpeechSynthesisUtterance(textContent);
    speech.lang = 'en-US';
    speechSynthesis.speak(speech);
  
    setIsReading(true);
  };
  
  const handlePauseReading = () => {
    speechSynthesis.cancel();
    setIsReading(false);
  };

  const handleRestartReading = () => {
    handlePauseReading();
    handleReadAloud();
  };

  const headingList = post.headings.filter((heading) => heading.value && heading.value.toLowerCase() !== "table of contents");

  return (
    <Layout>
      <div className="flex">
        <div className="posts pt-16 max-sm:mx-5 md:mx-44">
          <Link to="/blog" className="text-sm font-medium text-white mb-8">
            &larr; Back
          </Link>
          <div className="post border-y py-8 border-gray-300 my-8">
            <h1 className="text-4xl font-extrabold">{post.frontmatter.title}</h1>
            <p className="font-bold text-xs">by {post.frontmatter.author}</p>
            <div className="flex justify-start">
              <p className="text-xs mx-0">{post.frontmatter.date}</p>
              <p className="text-xs ml-5">{calculate_min_read(post.html)} min read</p>
              <div className="w-4/5" />
              {!isReading ? (
                <button className="ml-4 text-sm text-gray-600 mr-20" onClick={()=>handleReadAloud()}>
                  <FaPlay />
                </button>
              ) : (
                <div className=" flex flex-row gap-3 mr-10">
                  <button className="ml-4 text-sm text-gray-600" onClick={handlePauseReading}>
                    <FaPause />
                  </button>
                  <button className="ml-1 text-sm text-gray-600" onClick={handleRestartReading}>
                    <FaSync />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="md:grid md:grid-flow-col">
            <div
              className="
              [&_a]:text-[#b556ff] 
              [&_code]:text-white [&_code]:font-bold [&_code]:bg-[#282a36] [&_code]:rounded-md [&_code]:py-2 [&_code]:px-2
              [&_img]:w-full [&_img]:h-full [&_img]:object-cover [&_img]:rounded-md [&_img]:my-3
              [&_h1]:text-3xl"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
            <div className={`ml-8 hidden ${(headingList.length === 0)? "":"lg:block"}`}>
              <div className="sticky top-10">
                <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
                <ul>
                  {headingList.map((heading) => (
                    <li
                      key={heading.id}
                      className={`text-sm my-4 ${activeHeading === heading.id ? "font-bold" : ""}`}
                    >
                      <a href={`#${heading.id}`}>{heading.value}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="post border-t py-8 border-gray-300 my-8">
            {post.frontmatter.tags.map((tag, i) => (
              <span key={i} className="text-xs bg-gray-300 rounded-full py-1 px-2 text-gray-700">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(frontmatter: { slug: { eq: $id } }) {
      frontmatter {
        title
        slug
        author
        date(formatString: "DD/MM/YYYY")
        description
        tags
        src
      }
      html
      headings {
        id
        value
      }
    }
  }
`;
