// scrollable list of latest posts
// --------------------------------------------------------

import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import moment from 'moment';

export default function LatestPosts(props) {
    const data = useStaticQuery(graphql`
    query {
      posts: allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
  `);

    const limit = 3;
    const posts = data.posts.edges.slice(0, limit);

    const cutoffDate = new Date();
    cutoffDate.setDate((new Date).getDate() - 3);
    
    return (
        <div className='mx-5'>
            <h3 className='text-xl font-bold'>Latest Blog Posts</h3>
            <div id={props.id} className="divide-y gap-x-10 shadow md:grid md:grid-cols-3 md:gap-px md:divide-y-0">
                {posts.map((post, postIdx) => {
                    const postDate = moment(post.node.frontmatter.date, 'DD/MM/YYYY').toDate();
                    const isRecent = postDate >= cutoffDate;

                    console.log(postDate, cutoffDate, isRecent)

                    return (
                        <Link key={post.node.frontmatter.slug} className="cursor-pointer" to={"/post/" + post.node.frontmatter.slug}>
                            <div
                                className="m-2 h-80 mb-8 relative min-w-md cursor-pointer"
                                style={{
                                    backgroundColor: '#222',
                                    color: '#fff',
                                    fontSize: '2rem',
                                    fontWeight: 'thin',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                    e.currentTarget.style.backgroundColor = '#b14eff';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.backgroundColor = '#222';
                                }}
                            >
                                <img
                                    src={post.node.frontmatter.src}
                                    alt={post.node.frontmatter.title}
                                    className="cursor-pointer"
                                    style={{
                                        objectFit: 'cover',
                                        width: '100%',
                                        height: '100%',
                                    }}
                                />
                                <div
                                    className="absolute inset-0 cursor-pointer"
                                    style={{
                                        background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.95) 0%, rgba(27, 18, 34, 0.90) 100%)',
                                    }}
                                />
                                <div className="absolute bottom-0 p-4 my-20 sm:my-12 justify-center items-center cursor-pointer">
                                    {isRecent && (
                                        <div
                                            className='px-3 text-sm w-fit rounded-full cursor-pointer border-2 bg-transparent text-white'
                                            title='New post'
                                        >
                                            New
                                        </div>
                                    )}
                                    <h1 className="mt-2 text-base cursor-pointer">{post.node.frontmatter.title}</h1>
                                    <p className="text-xs mx-0 cursor-pointer">{post.node.frontmatter.date}</p>
                                    <p className="text-sm mb-3 sm:mb-5 md:text-xs h-12 cursor-pointer" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>{post.node.frontmatter.description}</p>
                                </div>
                            </div>
                        </Link>
                    );}
                )}
            </div>
        </div>
    );
}
