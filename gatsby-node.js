const path = require('path')
const fs = require('fs')

function injectAdminKey(srcHtml, destHtml) {
  const key = process.env.UNSPLASH_ACCESS_KEY || ''
  const html = fs.readFileSync(srcHtml, 'utf8').replace(/__UNSPLASH_KEY__/g, key)
  fs.mkdirSync(path.dirname(destHtml), { recursive: true })
  fs.writeFileSync(destHtml, html, 'utf8')
}

// ── LOCAL DEV ─────────────────────────────────────────────────────────────────
// Write the key-injected admin file to public/ at bootstrap time so it exists
// before any request comes in, then serve it via Express.
exports.onPreBootstrap = () => {
  const adminSrc  = path.join(__dirname, 'static', 'admin')
  const adminDest = path.join(__dirname, 'public', 'admin')
  fs.mkdirSync(adminDest, { recursive: true })

  // Copy config.yml so Gatsby's static-file manifest never tries to
  // unlink a file that doesn't exist after gatsby clean
  const configSrc = path.join(adminSrc, 'config.yml')
  const configDst = path.join(adminDest, 'config.yml')
  if (fs.existsSync(configSrc)) fs.copyFileSync(configSrc, configDst)

  // Copy logo.svg if present
  const logoSrc = path.join(adminSrc, 'logo.svg')
  const logoDst = path.join(adminDest, 'logo.svg')
  if (fs.existsSync(logoSrc)) fs.copyFileSync(logoSrc, logoDst)

  // Copy key-injected index.html
  const src  = path.join(adminSrc, 'index.html')
  const dest = path.join(adminDest, 'index.html')
  if (fs.existsSync(src)) injectAdminKey(src, dest)
}

exports.onCreateDevServer = ({ app }) => {
  // Serve directly from static/admin/index.html (with key injection) so edits
  // are picked up on the next request without restarting gatsby develop.
  const src = path.join(__dirname, 'static', 'admin', 'index.html')
  const serveAdmin = (req, res) => {
    if (!fs.existsSync(src)) { res.status(404).send('Admin not found'); return }
    const key = process.env.UNSPLASH_ACCESS_KEY || ''
    const html = fs.readFileSync(src, 'utf8').replace(/__UNSPLASH_KEY__/g, key)
    res.setHeader('Content-Type', 'text/html')
    res.send(html)
  }
  app.get('/admin', serveAdmin)
  app.get('/admin/', serveAdmin)
}

// ── PRODUCTION BUILD ──────────────────────────────────────────────────────────
// Overwrite the static-copied admin file with the key-injected version.
exports.onPostBuild = () => {
  const adminSrc  = path.join(__dirname, 'static', 'admin')
  const adminDest = path.join(__dirname, 'public', 'admin')
  fs.mkdirSync(adminDest, { recursive: true })

  const configSrc = path.join(adminSrc, 'config.yml')
  const configDst = path.join(adminDest, 'config.yml')
  if (fs.existsSync(configSrc)) fs.copyFileSync(configSrc, configDst)

  const logoSrc = path.join(adminSrc, 'logo.svg')
  const logoDst = path.join(adminDest, 'logo.svg')
  if (fs.existsSync(logoSrc)) fs.copyFileSync(logoSrc, logoDst)

  const src  = path.join(adminSrc, 'index.html')
  const dest = path.join(adminDest, 'index.html')
  if (fs.existsSync(src)) injectAdminKey(src, dest)
}

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

  for (const { node } of (data?.posts?.edges || [])) {

    createPage({
      path: `/post/${node.frontmatter.slug}/`,
      component: blogTemplate,
      context: {
        id: node.frontmatter.slug
      },
    })
  }
}