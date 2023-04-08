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
        contentfulCategories(categoryName: {eq: "Reviews"}) {
            blogpost {
              postTitle
              soleAuthor {
                avatar {
                  gatsbyImageData
                }
                name
              }
              slug
              thumbnail {
                gatsbyImageData
                description
              }
            }
          }
    }
    `)
    console.log(archiveResult.data)
    const blogPosts = archiveResult.data.allContentfulBlogPost.nodes
    const reviewPosts = reviewsResult.data.contentfulCategories.blogpost
    
    paginate({
        createPage,
        items: blogPosts,
        itemsPerPage: 10,
        pathPrefix: '/archive',
        component: path.resolve('./src/components/templates/blogpostlist.js')
      });

   
}