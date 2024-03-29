import * as React from 'react'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { useStaticQuery, graphql, Link } from 'gatsby'

const BotBlock = () => {
    const data = useStaticQuery(graphql`
   
    query{
        allContentfulBlogPost(skip: 2, limit: 5, sort: {createdAt: DESC}) {
            edges {
              node {
                createdAt(formatString: "MMMM DD, YYYY")
                excerpt
                contentful_id
                slug
                postTitle
                thumbnail {
                  gatsbyImageData
                  title
                }
                catRef {
                  categoryName
                  contentful_id
                  slug
                }
                
                soleAuthor {
                    avatar {
                      gatsbyImageData
                    }
                    name
                    slug
                }
              }
            }
          }
        }
    `)

    const renderBottomFourPosts = () => {
        return data.allContentfulBlogPost.edges.map(node => 
            <div className="home-nav-cards" key={node.node.contentful_id}>
                    <div className="home-card-img-container">
                    {node.node.thumbnail && <Link to={`${node.node.slug}`}><GatsbyImage image={node.node.thumbnail.gatsbyImageData} alt={'a gatsby image'} /></Link> }
                    </div>
                    <div className='home-nav-cards-right'>
                    <ul className="tag-list">
                        <li className='dark-b'><Link to={`/categories/${node.node.catRef.slug}`}>{node.node.catRef.categoryName}</Link></li>
                    </ul>
                    <Link to={`${node.node.slug}`}>
                    <h2 className="card-post-title">
                        {node.node.postTitle}
                    </h2>
                    <p className="card-excerpt">
                        {node.node.excerpt}
                    </p>
                    </Link>
                    <div className="card-author-block">
                    <div className="card-author-avatar">
                    {node.node.soleAuthor ? <Link to={`/authors/${node.node.soleAuthor[0].slug}`}><GatsbyImage image={node.node.soleAuthor[0].avatar.gatsbyImageData} alt={node.node.soleAuthor ? `${node.node.soleAuthor[0].name}'s avatar` : undefined} /></Link>: <StaticImage src="../images/default-portrait.jpg" alt={node.node.author ? node.node.author[0] : 'author avatar'}></StaticImage>}
                        
                        </div>
                        <div className="card-author-name">
                        {node.node.soleAuthor ? <Link to={`/authors/${node.node.soleAuthor[0].slug}`}>{node.node.soleAuthor[0].name}</Link> : undefined}
                        </div>
                        <span className='card-post-date'>{node.node.createdAt}</span>

                    </div>
                    </div>

                </div>
        )
    }

    return (
        <div id="bot-section-container">
            <div className='bot-content-container'>
            {renderBottomFourPosts()}
            </div>
        </div>
    )
}

export default BotBlock