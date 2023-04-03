require('dotenv').config()

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `HLCMS Affiliate Blog`,
    siteUrl: `https://www.yourdomain.tld`,
    description: 'A headless CMS affiliate blog website',
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.SPACE_ID,
        accessToken: process.env.API_TOKEN,
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      },
    },
    {
      resolve: `gatsby-plugin-flexsearch`,
      options: {
        languages: ['en'],
        type: "ContentfulBlogPost",
        fields: [
          {
            name: 'postTitle',
            indexed:true,
            resolver: 'postTitle',
            attributes: {
              encode: 'balance',
              tokenize: 'forward',
              threshold: 6,
              depth: 3,

            },
            store:true,
          },
          {
            name: 'excerpt',
            indexed: false,
            resolver: 'excerpt',
            attributes: {
              encode: 'balance',
              tokenize: 'full',
              threshold: 6,
              depth: 3,
            },
            store:true,
          },
          {
            name: 'slug',
            resolver: 'slug',
            store:true,
            
          },
          {
            name: 'contentful_id',
            resolver: 'contentful_id',
            store:true, 
          },
        ],
      },
    },
  ]
}
