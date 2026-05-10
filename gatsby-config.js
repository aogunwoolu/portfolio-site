const rehypePrism = require('rehype-prism-plus');

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content/blog/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/content/images/`, 
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        rehypePlugins: [
          [rehypePrism, { showLineNumbers: true, ignoreMissing: true }]
        ],
        remarkPlugins: [],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1035,
              linkImagesToOriginal: false,
              withWebp: true,
            },
          },
        ],
        extensions: ['.mdx', '.md'],
      },
    },
  ],
};
