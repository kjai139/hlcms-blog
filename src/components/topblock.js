
import * as React from "react"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import { useStaticQuery, graphql } from "gatsby"




const Topblock = ({pageTitle, children}) => {

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
                authorRef {
                    gatsbyImageData
                  }
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

    

    const renderMostRecentTwo = () => {
        console.log(data.allContentfulBlogPost.edges[0].node)

        // const renderCategories = (node) => {
            
        // }

        // const renderAuthors = (node) => {
        //     //this will need to use the contentful management api if using real author names
        // }





        return data.allContentfulBlogPost.edges.slice(0,2).map(node => 
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
        <div id="top-section-container">
            <div className="top-nav-container">
            <div id="top-nav-div">
                <div id="site-logo">
                    <div>Site Logo</div>
                </div>
                <nav id="top-nav-container">
                    <ul className="navMenu">
                        <li>
                            Reviews
                        </li>
                        <li>
                            Best Picks
                        </li>
                        <li>
                            Creator Highlights
                        </li>
                        <li>
                            <button id="searchBtn">
                                <span className="material-symbols-outlined">search</span>
                            </button>
                        </li>
                    </ul>

                </nav>
            </div>
            <div id="top-section-bottom">
                <div className="top-section-headers-cont">
                    <h1 className="top-sect-header">
                        The affiliate site
                    </h1>
                    <p className="top-sect-header-txt">
                        Make cash money by having people click on the links to buy shit on the website
                    </p>
                </div>
            </div>
            </div>
            <div className="bot-nav-container">
                {renderMostRecentTwo()}

            </div>
        </div>
    )
}




export default Topblock