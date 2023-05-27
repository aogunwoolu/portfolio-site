import React, { useEffect, useState, useRef } from "react";
import { graphql } from "gatsby";
import Layout from "./Layout";
import { FaPlay, FaPause, FaSync } from "react-icons/fa";
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";
deckDeckGoHighlightElement();

const Blog = ({ data }) => {
  const post = data.markdownRemark;
  const [activeHeading, setActiveHeading] = useState(null);
  const headingsRef = useRef([]);

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
    const wordCount = html.replace(/<[^>]+>/g, '').split(/\s+/).length;
    const wordsPerMinute = 200; // Average reading speed in words per minute
    const minRead = Math.ceil(wordCount / wordsPerMinute);
    return minRead;
  }

  return (
    <Layout>
      <div className="posts pt-16 max-sm:mx-5 md:mx-44">
        <button onClick={() => window.history.back()} className="text-sm font-medium text-white mb-8">&larr; Back</button>
        <div className="post border-y py-8 border-gray-300 my-8">
          <h1 className="text-4xl font-extrabold">{post.frontmatter.title}</h1>
          <p className="font-bold text-xs">by {post.frontmatter.author}</p>
          <div className="flex justify-start">
          <p className="text-xs mx-0">{post.frontmatter.date}</p>
          <p className="text-xs ml-5">{calculate_min_read(post.html)} min read</p>
          <div className=" w-4/5"/>
          </div>
        </div>
        <div className="flex">
          {/* w-4/5 */}
          <div className="
            [&_a]:text-[#b556ff]
            [&_code]:text-white [&_code]:font-bold [&_code]:bg-[#282a36] [&_code]:rounded-md [&_code]:py-2 [&_code]:px-2
            [&_img]:w-full [&_img]:h-full [&_img]:object-cover [&_img]:rounded-md [&_img]:my-3 
            [&_h1]:text-3xl
            "
            
            dangerouslySetInnerHTML={{ __html: post.html }} 
          />

        </div>
        <div className="post border-t py-8 border-gray-300 my-8">
          {post.frontmatter.tags.map((tag, i) => (
            <span key={i} className="text-xs bg-gray-300 rounded-full px-2 py-1 text-gray-700 mr-2">
              {tag}
            </span>
          ))}
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
