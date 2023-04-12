import React, { useEffect, useState, useRef } from "react";
import { graphql } from "gatsby";
import Layout from "./layout";
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

  return (
    <Layout>
      <div className="posts pt-16 mx-5">
        <button onClick={() => window.history.back()} className="text-sm font-medium text-white mb-8">&larr; Back</button>
        <div className="post border-y py-8 border-gray-300 my-8">
          <h1 className="text-4xl font-extrabold">{post.frontmatter.title}</h1>
          <p className="text-xs">{post.frontmatter.date}</p>
          <p className="font-bold text-xs">by {post.frontmatter.author}</p>
        </div>
        <div className="flex">
          <div className="blog-post-content w-4/5" dangerouslySetInnerHTML={{ __html: post.html }} />
          <div className="ml-8 max-md:hidden">
            {post.headings.length > 0 && (
              <ul className="sticky top-16">
                {post.headings.map((heading, i) => (
                  <li
                    key={heading.id}
                    className={`cursor-pointer text-sm font-medium mt-2 ${
                      activeHeading === heading.id ? "text-purple-600" : ""
                    }`}
                    onClick={() => headingsRef.current[i].scrollIntoView({ behavior: "smooth" })}
                    ref={(el) => (headingsRef.current[i] = el)}
                  >
                    {heading.value}
                  </li>
                ))}
              </ul>
            )}
          </div>
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
