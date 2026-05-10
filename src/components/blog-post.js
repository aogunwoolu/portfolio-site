import React, { useEffect, useState, useRef } from "react"
import { graphql, Link } from "gatsby"
import Layout from "./Layout"
import "../styles/global.css"
import { FaPlay, FaPause, FaSync } from "react-icons/fa"
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader"
deckDeckGoHighlightElement()

const Blog = ({ data }) => {
  const post = data.markdownRemark
  const [activeHeading, setActiveHeading] = useState(null)
  const headingsRef = useRef([])
  const [isReading, setIsReading] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      for (const heading of headingsRef.current) {
        const rect = heading?.getBoundingClientRect()
        if (rect?.top >= 0 && rect?.top <= window.innerHeight) {
          setActiveHeading(heading?.id)
          break
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    return () => {
      speechSynthesis.cancel()
    }
  }, [])

  function calculate_min_read(html) {
    const wordCount = html.replace(/<[^>]+>/g, "").split(/\s+/).length
    return Math.ceil(wordCount / 200)
  }

  const handleReadAloud = () => {
    const doc = new DOMParser().parseFromString(post.html, "text/html")
    const text = doc.body.textContent || ""
    const speech = new SpeechSynthesisUtterance(text)
    speech.lang = "en-US"
    speech.onend = () => setIsReading(false)
    speechSynthesis.speak(speech)
    setIsReading(true)
  }

  const handlePauseReading = () => {
    speechSynthesis.cancel()
    setIsReading(false)
  }

  const handleRestartReading = () => {
    handlePauseReading()
    handleReadAloud()
  }

  const headingList = post.headings.filter(
    h => h.value && h.value.toLowerCase() !== "table of contents"
  )

  return (
    <Layout>
      <div className="min-h-screen pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto flex gap-10">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Back link */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors duration-200"
              style={{ color: "#b556ff" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#d08aff")}
              onMouseLeave={e => (e.currentTarget.style.color = "#b556ff")}
            >
              ← Back to Blog
            </Link>

            {/* Post header */}
            <div
              className="rounded-2xl p-8 mb-8"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <h1 className="text-4xl font-extrabold text-white leading-tight mb-4">
                {post.frontmatter.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 justify-between">
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "#b556ff" }}
                  >
                    {post.frontmatter.author}
                  </span>
                  <span className="text-gray-600">·</span>
                  <span className="text-gray-400 text-sm">
                    {post.frontmatter.date}
                  </span>
                  <span className="text-gray-600">·</span>
                  <span className="text-gray-400 text-sm">
                    {calculate_min_read(post.html)} min read
                  </span>
                </div>

                {/* Read-aloud controls */}
                <div className="flex items-center gap-2">
                  {!isReading ? (
                    <button
                      onClick={handleReadAloud}
                      className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full transition-all duration-200"
                      style={{
                        background: "rgba(143,0,255,0.12)",
                        border: "1px solid rgba(143,0,255,0.3)",
                        color: "#c97aff",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background =
                          "rgba(143,0,255,0.22)"
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background =
                          "rgba(143,0,255,0.12)"
                      }}
                    >
                      <FaPlay size={10} /> Listen
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePauseReading}
                        className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full transition-all duration-200"
                        style={{
                          background: "rgba(143,0,255,0.18)",
                          border: "1px solid rgba(143,0,255,0.4)",
                          color: "#c97aff",
                        }}
                      >
                        <FaPause size={10} /> Stop
                      </button>
                      <button
                        onClick={handleRestartReading}
                        className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full transition-all duration-200"
                        style={{
                          background: "rgba(143,0,255,0.12)",
                          border: "1px solid rgba(143,0,255,0.3)",
                          color: "#c97aff",
                        }}
                      >
                        <FaSync size={10} /> Restart
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Post content */}
            <div
              className="
                prose-container
                [&_a]:text-[#b556ff] [&_a:hover]:text-[#d08aff]
                [&_code]:font-mono [&_code]:text-sm
                [&_:not(pre)>code]:text-white [&_:not(pre)>code]:bg-[#1a1228] [&_:not(pre)>code]:rounded-md [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:px-1.5
                [&_.gatsby-highlight]:my-6
                [&_img]:w-full [&_img]:rounded-xl [&_img]:my-6 [&_img]:object-cover
                [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:my-6
                [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-4
                [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-white [&_h3]:mt-8 [&_h3]:mb-3
                [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-gray-200 [&_h4]:mt-6 [&_h4]:mb-2
                [&_p]:text-gray-300 [&_p]:leading-relaxed [&_p]:my-4
                [&_ul]:my-4 [&_li]:text-gray-300 [&_li]:my-2 [&_li]:leading-relaxed [&_li]:list-disc [&_li]:ml-6
                [&_ol]:my-4 [&_ol>li]:list-decimal [&_ol>li]:ml-6
                [&_blockquote]:border-l-4 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-400 [&_blockquote]:my-6
              "
              dangerouslySetInnerHTML={{ __html: post.html }}
            />

            {/* Tags footer */}
            <div
              className="mt-12 pt-8 flex flex-wrap gap-2"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              {post.frontmatter.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs rounded-full px-3 py-1 font-medium"
                  style={{
                    background: "rgba(143,0,255,0.12)",
                    border: "1px solid rgba(143,0,255,0.28)",
                    color: "#c97aff",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Back link footer */}
            <div className="mt-10">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                style={{ color: "#b556ff" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#d08aff")}
                onMouseLeave={e => (e.currentTarget.style.color = "#b556ff")}
              >
                ← Back to Blog
              </Link>
            </div>
          </div>

          {/* Table of Contents sidebar */}
          {headingList.length > 0 && (
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-28">
                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-4"
                    style={{ color: "#b556ff" }}
                  >
                    Contents
                  </p>
                  <ul className="flex flex-col gap-2">
                    {headingList.map(heading => (
                      <li key={heading.id}>
                        <a
                          href={`#${heading.id}`}
                          className="text-sm leading-snug transition-colors duration-150 block py-0.5"
                          style={{
                            color:
                              activeHeading === heading.id
                                ? "#b556ff"
                                : "#9ca3af",
                            fontWeight:
                              activeHeading === heading.id ? "600" : "400",
                          }}
                          onMouseEnter={e =>
                            (e.currentTarget.style.color = "#b556ff")
                          }
                          onMouseLeave={e => {
                            e.currentTarget.style.color =
                              activeHeading === heading.id
                                ? "#b556ff"
                                : "#9ca3af"
                          }}
                        >
                          {heading.value}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Blog

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(frontmatter: { slug: { eq: $id } }) {
      frontmatter {
        title
        slug
        author
        date(formatString: "DD MMMM YYYY")
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
`
