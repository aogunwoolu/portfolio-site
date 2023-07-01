import React, { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"
import 'bootstrap/dist/css/bootstrap.min.css'
import "../styles/global.css"
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";
import Layout from "../components/Layout"
deckDeckGoHighlightElement();

const LIMIT = 3;

const IndexPage = (props) => {
  const [limit, setLimit] = useState(LIMIT);
  const posts = props.data.posts.edges.slice(0, limit);

  useEffect(() => {
    function handleScroll() {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      setLimit(prevLimit => prevLimit + LIMIT);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout>
      <div className="posts pt-16 mx-5">
        <h1 className=" font-bold text-lg">Vault</h1>
        <div className="grid grid-cols-4 gap-2">
        {posts.map((post, i) =>
          <div key={i} className="post border-y py-8 border-gray-300 my-8">
            <Link className="cursor-pointer" to={"/post/" + post.node.frontmatter.slug}>
              <div className="grid grid-cols-2 gap-8">
                <div className="col-span-1 max-sm:col-span-2">
                  <div className="flex justify-start">
                    <div className="">
                      <p className="font-bold text-xs inline-block mr-1">{post.node.frontmatter.author}</p>
                      •
                      <p className="text-xs inline-block ml-1">{post.node.frontmatter.date}</p>
                    </div>
                    <div className="max-sm:ml-auto"/>
                  </div>
                  <h2 className="text-lg font-extrabold max-sm:text-center">{post.node.frontmatter.title}</h2>
                  <p className="text-xs max-sm:text-center">{post.node.frontmatter.description}</p>
                  <div class="flex justify-center sm:justify-start flex-wrap">
                    {
                      post.node.frontmatter.tags.map((tag, i) =>
                        <span key={i} className="text-xs bg-purple-600 rounded-full px-2 py-1 text-white mr-2 mb-2">{tag}</span>)
                    }
                  </div>
                </div>
                <div className="col-span-1 max-sm:hidden" style={{textAlign: "center"}}>
                  <img src={post.node.frontmatter.src} alt="post" className="w-full max-w-md"/>
                </div>
              </div>
            </Link>
          </div>
        )}
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    posts: allMarkdownRemark (
      sort: { fields: [frontmatter___date], order: DESC }
    ){
      edges {
        node {
          frontmatter {
            title
            slug
            author
            date(formatString: "DD/MM/YYYY")
            description
            tags
            src
          }
        }
      }
    }
  }
`
