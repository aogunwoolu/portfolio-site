/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
  //   {
  //     // The name of the plugin
  //     resolve: 'gatsby-source-mongodb',
  //     options: {
  //         // Name of the database and collection where are books reside
  //         dbName: 'portfolio',
  //         collection: 'posts',
  //         server: {
  //             address: 'ac-j13dzgz-shard-00-01.fh6nlzm.mongodb.net',
  //             port: 27017
  //         },
  //         auth: {
  //             user: 'aogunwoolu',
  //             password: 'Abisade_97878'
  //         },
  //         extraParams: {
  //             replicaSet: 'Main-shard-0',
  //             ssl: true,
  //             authSource: 'admin',
  //             retryWrites: true
  //         }
  //     },
  // },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'content',
      path: `${__dirname}/content/blog/`,
    },
  },
  'gatsby-transformer-remark',
  ],
}
