import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const IndexPage = (props) => {
  const posts = props.data.posts.edges;

  return (
    <Layout>
      <div className="posts pt-16">
        {posts.map(post =>
          <div className="post">
            <h2><Link to={"/post/" + post.node.frontmatter.slug}>{post.node.frontmatter.title}</Link></h2>
            <p>By {post.node.frontmatter.author}</p>
          </div>)}
      </div>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    posts: allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            slug
            author
          }
        }
      }
    }
  }
`