const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const { data } = await graphql(`
    {
      posts: allMarkdownRemark {
        edges {
          node {
            frontmatter {
                slug
            }
          }
        }
      }
    }
  `)

  const blogTemplate = path.resolve('./src/components/blog-post.js')

  for (const { node } of data.posts.edges) {

    createPage({
      path: `/post/${node.frontmatter.slug}/`,
      component: blogTemplate,
      context: {
        id: node.frontmatter.slug
      },
    })
  }
}