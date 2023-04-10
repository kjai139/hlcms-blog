const path = require('path')
const { paginate } = require('gatsby-awesome-pagination')


exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions

    const archiveResult = await graphql(`
    query {
        allContentfulBlogPost(sort: {createdAt: DESC}) {
           
            nodes {
                slug
            }
            
        }
    }
    `)

    const officeResult = await graphql(`
    query {
      allContentfulBlogPost(
        filter: {catRef: {categoryName: {eq: "Home Office"}}}
        sort: {createdAt: DESC}
      ) {
        edges {
          node {
            slug
            postTitle
            soleAuthor {
              avatar {
                gatsbyImageData
              }
              name
            }
            contentful_id
          }
        }
      }
    }
    `)
    const gamingResult = await graphql(`
    query {
      allContentfulBlogPost(
        filter: {catRef: {categoryName: {eq: "Gaming"}}}
        sort: {createdAt: DESC}
      ) {
        edges {
          node {
            slug
            postTitle
            soleAuthor {
              avatar {
                gatsbyImageData
              }
              name
            }
            contentful_id
          }
        }
      }
    }
    `)

    const streamingResult = await graphql(`
    query {
      allContentfulBlogPost(
        filter: {catRef: {categoryName: {eq: "Streaming"}}}
        sort: {createdAt: DESC}
      ) {
        edges {
          node {
            slug
            postTitle
            soleAuthor {
              avatar {
                gatsbyImageData
              }
              name
            }
            contentful_id
          }
        }
      }
    }
    `)

    // console.log(archiveResult.data)
    // console.log(reviewsResult.data)
    const blogPosts = archiveResult.data.allContentfulBlogPost.nodes
    const officePosts = officeResult.data.allContentfulBlogPost.edges
    const gamingPosts = gamingResult.data.allContentfulBlogPost.edges
    const streamingPosts = streamingResult.data.allContentfulBlogPost.edges
    
    paginate({
        createPage,
        items: blogPosts,
        itemsPerPage: 5,
        pathPrefix: '/archive',
        component: path.resolve('./src/components/templates/blogpostlist.js')
      });

    paginate({
      createPage,
      items: officePosts,
      itemsPerPage: 10,
      pathPrefix: '/categories/home-office/page',
      component: path.resolve('./src/components/templates/officepostlist.js')
    })

    paginate({
      createPage,
      items: gamingPosts,
      itemsPerPage: 10,
      pathPrefix: '/categories/gaming/page',
      component: path.resolve('./src/components/templates/gamingpostlist.js')
    })

    paginate({
      createPage,
      items: streamingPosts,
      itemsPerPage: 10,
      pathPrefix: '/categories/streaming/page',
      component: path.resolve('./src/components/templates/streamingpostlist.js')
    })

   
}