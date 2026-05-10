import React, { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"
import "../styles/global.css"
import Layout from "../components/Layout"
import { motion } from "framer-motion"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader"
deckDeckGoHighlightElement()

const LIMIT = 6

const FallbackImage = ({ title }) => {
  const initials = (title || "?").slice(0, 2).toUpperCase()
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-2"
      style={{
        minHeight: "160px",
        background:
          "linear-gradient(135deg, rgba(112,0,204,0.35) 0%, rgba(4,1,12,1) 100%)",
      }}
    >
      <span
        className="text-3xl font-extrabold select-none"
        style={{ color: "rgba(181,86,255,0.6)" }}
      >
        {initials}
      </span>
      <span className="text-xs" style={{ color: "rgba(181,86,255,0.35)" }}>
        No preview
      </span>
    </div>
  )
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
}

const BlogPage = props => {
  const [limit, setLimit] = useState(LIMIT)
  const allPosts = props.data.posts?.edges || []
  const images = props.data.images?.nodes || []
  const posts = allPosts.slice(0, limit)

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + window.pageYOffset >=
        document.documentElement.scrollHeight - 80
      ) {
        setLimit(prev => prev + LIMIT)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <Layout>
      <section className="min-h-screen pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-14">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#b556ff" }}
            >
              Writing
            </p>
            <h1 className="text-5xl font-extrabold text-white">Blog</h1>
            <p className="mt-3 text-gray-400 text-base max-w-xl">
              Thoughts on engineering, DevOps, and the things I've been building.
            </p>
          </div>

          {/* Posts */}
          <div className="flex flex-col gap-6">
            {posts.map((post, i) => {
              const src = post.node.frontmatter.src || ""
              // normalize frontmatter path: "./images/gatsby.png" → "gatsby.png"
              // relativePath in allFile is relative to the source root (content/images/)
              const normalized = src.replace(/^\.\/+/, "").replace(/^images\//, "")
              const file = images.find(n => n.relativePath === normalized)
              const imageData = file ? getImage(file.childImageSharp) : null

              return (
                <motion.div
                  key={post.node.frontmatter.slug}
                  custom={i % LIMIT}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={cardVariants}
                >
                  <Link to={"/post/" + post.node.frontmatter.slug}>
                    <div
                      className="rounded-2xl overflow-hidden transition-all duration-300 group"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.border =
                          "1px solid rgba(181,86,255,0.45)"
                        e.currentTarget.style.background =
                          "rgba(181,86,255,0.05)"
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.border =
                          "1px solid rgba(255,255,255,0.07)"
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.03)"
                      }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                        {/* Text */}
                        <div className="md:col-span-2 p-7 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-3 flex-wrap">
                              <span
                                className="text-xs font-semibold"
                                style={{ color: "#b556ff" }}
                              >
                                {post.node.frontmatter.author}
                              </span>
                              <span className="text-gray-600 text-xs">·</span>
                              <span className="text-gray-500 text-xs">
                                {post.node.frontmatter.date}
                              </span>
                            </div>
                            <h2 className="text-xl font-bold text-white mb-2 leading-snug">
                              {post.node.frontmatter.title}
                            </h2>
                            <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                              {post.node.frontmatter.description}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {post.node.frontmatter.tags.map((tag, ti) => (
                              <span
                                key={ti}
                                className="text-xs rounded-full px-3 py-1 font-medium"
                                style={{
                                  background: "rgba(143,0,255,0.12)",
                                  border: "1px solid rgba(143,0,255,0.3)",
                                  color: "#c97aff",
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Image */}
                        <div className="md:col-span-1 hidden md:block relative overflow-hidden">
                          {imageData ? (
                            <GatsbyImage
                              image={imageData}
                              alt={post.node.frontmatter.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              style={{ minHeight: "160px" }}
                            />
                          ) : (
                            <FallbackImage title={post.node.frontmatter.title} />
                          )}
                          <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                              background:
                                "linear-gradient(to right, rgba(4,1,12,0.6), transparent)",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* End of posts hint */}
          {limit >= allPosts.length && allPosts.length > 0 && (
            <p className="text-center text-gray-600 text-sm mt-14">
              You've read everything —{" "}
              <span style={{ color: "#b556ff" }}>that's all for now.</span>
            </p>
          )}
        </div>
      </section>
    </Layout>
  )
}

export default BlogPage

export const pageQuery = graphql`
  query {
    posts: allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      edges {
        node {
          frontmatter {
            title
            slug
            author
            date(formatString: "DD MMMM YYYY")
            description
            tags
            src
          }
        }
      }
    }
    images: allFile(filter: { sourceInstanceName: { eq: "images" } }) {
      nodes {
        relativePath
        childImageSharp {
          gatsbyImageData(width: 800, placeholder: BLURRED)
        }
      }
    }
  }
`
