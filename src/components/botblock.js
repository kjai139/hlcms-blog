import * as React from 'react'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { useStaticQuery, graphql } from 'gatsby'

const botBlock = () => {
    const data = useStaticQuery(graphql`
   
    query{
        allContentfulBlogPost(limit: 6, sort: {createdAt: DESC}) {
            edges {
              node {
                createdAt
                excerpt
                contentful_id
                slug
                postTitle
                tags
                thumbnail {
                  gatsbyImageData
                  title
                }
                catRef {
                  categoryName
                  contentful_id
                }
                author
              }
            }
          }
        }
    `)

    const renderBottomFourPosts = () => {
        return data.allContentfulBlogPost.edges.slice(2,6).map(node => 
            <div className="bot-nav-cards" key={node.node.contentful_id}>
                    <div className="card-img-container">
                    <GatsbyImage image={node.node.thumbnail.gatsbyImageData} alt={node.node.thumbnail.title}></GatsbyImage>
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
                            {node.node.authorRef ? <GatsbyImage image={node.node.authorRef.gatsbyImageData} alt={node.node.author ? node.node.author : undefined} />: <StaticImage src="../images/default-portrait.svg" alt={node.node.author ? node.node.author : 'author avatar'}></StaticImage>}
                        
                        </div>
                        <div className="card-author-name">
                        {node.node.author ? node.node.author : undefined}
                        </div>


                    </div>

                </div>
        )
    }

    return (
        <div id="bot-section-container">
            {renderBottomFourPosts()}
        </div>
    )
}

export default botBlock