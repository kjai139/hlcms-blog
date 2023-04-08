import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'

const TopPosts = () => {

    const data = useStaticQuery(graphql`
   
    query{
        allContentfulBlogPost(limit: 2, sort: {createdAt: DESC}) {
            edges {
              node {
                createdAt
                excerpt
                contentful_id
                slug
                postTitle
                authorRef {
                    gatsbyImageData
                  }
                thumbnail {
                  gatsbyImageData
                  title
                  url
                }
                catRef {
                  categoryName
                  contentful_id
                }
                author
                soleAuthor {
                    avatar {
                      gatsbyImageData
                    }
                    name
                  }
              }
            }
          }
        }
    `)

    const renderMostRecentTwo = () => {
        return (
            data.allContentfulBlogPost.edges.slice(0, 2).map( (node) => {
                const image = getImage(node.node.thumbnail)
                const authorAvatar = getImage(node.node.soleAuthor[0].avatar)
                return (
                    <div className="bot-nav-cards" key={node.node.contentful_id}>
                    <div className="card-img-container">
                    {node.node.thumbnail && <GatsbyImage image={image} alt={node.node.thumbnail && node.node.thumbnail.title} /> }
                       
    
                    </div>
                    <ul className="tag-list">
                        <li>{node.node.catRef.categoryName}</li>
                    </ul>
                    <h2 className="card-post-title">
                        {node.node.postTitle}
                    </h2>
                    <p className="card-excerpt">
                        {node.node.excerpt}
                    </p>
                    <div className="card-author-block">
                        <div className="card-author-avatar">
                            {node.node.soleAuthor ? <GatsbyImage image={authorAvatar} alt={node.node.soleAuthor ? `${node.node.soleAuthor[0].name}'s avatar` : undefined} />: <StaticImage src="../images/default-portrait.jpg" alt={node.node.author ? node.node.author[0] : 'author avatar'}></StaticImage>}
                        
                        </div>
                        <div className="card-author-name">
                        {node.node.soleAuthor ? node.node.soleAuthor[0].name : undefined}
                        </div>

                    </div>

                </div>
                )
            })
        )
    }


    
    return (
        <div className="bot-nav-container">
        {renderMostRecentTwo()}

    </div>
    )
}



export default TopPosts