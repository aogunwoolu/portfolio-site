import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { motion } from 'framer-motion'
import moment from 'moment'

export default function LatestPosts({ id }) {
  const data = useStaticQuery(graphql`
    query {
      posts: allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
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
  `)

  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - 3)
  const posts = data.posts.edges.slice(0, 3)

  return (
    <section id={id} className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <p
          className="text-xs font-semibold tracking-[0.22em] uppercase mb-2"
          style={{ color: '#b556ff' }}
        >
          Writing
        </p>
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Latest Posts</h2>
          <Link
            to="/blog"
            className="text-sm font-medium text-gray-500 hover:text-white transition-colors border-b border-gray-700 hover:border-white pb-0.5"
          >
            View all →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map(({ node }, i) => {
            const { title, slug, date, description, src } = node.frontmatter
            const isRecent = moment(date, 'DD/MM/YYYY').toDate() >= cutoff

            return (
              <motion.div
                key={slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.12, duration: 0.55, ease: 'easeOut' }}
              >
                <Link to={`/post/${slug}`} className="block group h-full">
                  <div
                    className="relative h-72 overflow-hidden rounded-xl flex flex-col justify-end"
                    style={{
                      border:     '1px solid rgba(255,255,255,0.07)',
                      transition: 'border-color 0.3s, box-shadow 0.3s',
                      background: '#0d0d18',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(181,86,255,0.45)'
                      e.currentTarget.style.boxShadow  = '0 0 32px rgba(143,0,255,0.18)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                      e.currentTarget.style.boxShadow  = 'none'
                    }}
                  >
                    {src && (
                      <img
                        src={src}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(4,1,12,0.97) 0%, rgba(4,1,12,0.6) 50%, transparent 100%)',
                      }}
                    />
                    <div className="relative z-10 p-5">
                      {isRecent && (
                        <span
                          className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2"
                          style={{
                            background: 'rgba(181,86,255,0.18)',
                            border:     '1px solid rgba(181,86,255,0.5)',
                            color:      '#d4a0ff',
                          }}
                        >
                          New
                        </span>
                      )}
                      <h3 className="font-semibold text-white text-base leading-snug mb-1">{title}</h3>
                      <p className="text-xs text-gray-500 mb-2">{date}</p>
                      <p className="text-xs text-gray-400 leading-relaxed" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
