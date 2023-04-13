require('dotenv').config()

/**
 * @type {import('gatsby').GatsbyConfig}
 */
const siteUrl = process.env.MY_SITE_URL
module.exports = {
  siteMetadata: {
    title: `Deskego`,
    siteUrl: process.env.MY_SITE_URL,
    description: 'Discover the ultimate guide to creating your perfect desk setup for office work, gaming, or streaming. Explore expert recommendations, tips, and reviews on ergonomic solutions, space-saving ideas, and the latest accessories to enhance your workspace.',
    logo: 'https://images.ctfassets.net/z6w0khw4r6q1/4gE0xQWPfopxSspwb62gBJ/d956f16d7cd8a5fb17c9312de2de8b86/logo.png',
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `{
          allContentfulBlogPost {
            edges {
              node {
                slug
                updatedAt
              }
            }
          }
        }`,
        resolveSiteUrl: () => siteUrl,
        resolvePages: ({
          allContentfulBlogPost
        }) => {
          
          const posts = allContentfulBlogPost.edges.map(edges => edges.node)
          return posts.map(post => {
            return {
              path:`/${post.slug}`,
              modifiedGmt: post.updatedAt,
            }
          })
        },
        serialize: ({path, modifiedGmt}) => {
          return {
            url: path,
            lastmod: modifiedGmt,
          }
        }
      }
      
    },
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
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/favicon.svg'
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-DM12CPJ9FV"
        ],
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
