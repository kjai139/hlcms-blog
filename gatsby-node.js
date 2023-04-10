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

    const reviewsResult = await graphql(`
    query {
      allContentfulBlogPost(
        filter: {catRef: {categoryName: {eq: "Reviews"}}}
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
    const bestPickResult = await graphql(`
    query {
      allContentfulBlogPost(
        filter: {catRef: {categoryName: {eq: "Reviews"}}}
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

    const creatorHlightsResult = await graphql(`
    query {
      allContentfulBlogPost(
        filter: {catRef: {categoryName: {eq: "Reviews"}}}
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
    const reviewPosts = reviewsResult.data.allContentfulBlogPost.edges
    const bestPickPosts = bestPickResult.data.allContentfulBlogPost.edges
    const creatorHlightPosts = creatorHlightsResult.data.allContentfulBlogPost.edges
    
    paginate({
        createPage,
        items: blogPosts,
        itemsPerPage: 5,
        pathPrefix: '/archive',
        component: path.resolve('./src/components/templates/blogpostlist.js')
      });

    paginate({
      createPage,
      items: reviewPosts,
      itemsPerPage: 3,
      pathPrefix: '/categories/reviews/page',
      component: path.resolve('./src/components/templates/reviewpostlist.js')
    })

    paginate({
      createPage,
      items: bestPickPosts,
      itemsPerPage: 10,
      pathPrefix: '/categories/best-picks/page',
      component: path.resolve('./src/components/templates/bestpickslist.js')
    })

    paginate({
      createPage,
      items: creatorHlightPosts,
      itemsPerPage: 10,
      pathPrefix: '/categories/creator-highlights/page',
      component: path.resolve('./src/components/templates/creatorhllist.js')
    })

   
}