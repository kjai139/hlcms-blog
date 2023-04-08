import { graphql } from 'gatsby'
import * as React from 'react'
import Seo from '../../../components/seo'
import Topblock from '../../../components/topblock'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'

import { Link } from 'gatsby'


const CategoryPost = (props) => {
    console.log(props.pageContext.id, 'contxt id from CategoryPost')
    const data = props.data
    
    console.log(data, 'data from CategoryPost')
    return (
        <div id="App"> 
            <div id="top-section-container">
                <Topblock inCat={true} curPage={data.contentfulCategories.slug} headerTitle={data.contentfulCategories.categoryName}></Topblock>
            </div>
            <div className='cata-content-container'>
            {data.contentfulCategories.blogpost ? data.contentfulCategories.blogpost.map((node) => {
                return (
                    
                    <div className="bot-nav-cards" key={node.contentful_id}>
                    
                    <div className="card-img-container">
                    <Link className="post-links" to={`/${node.slug}`} >
                    {node.thumbnail && <GatsbyImage image={node.thumbnail.gatsbyImageData} alt={'a gatsby image'} /> }
                    </Link>
                    </div>
                    
                    <ul className="tag-list">
                        <li className='dark-b'>{node.catRef.categoryName}</li>
                    </ul>
                    <Link className="post-links" to={`/${node.slug}`} key={node.contentful_id}>
                    <h2 className="card-post-title">
                        {node.postTitle}
                    </h2>
                    <p className="card-excerpt">
                        {node.excerpt}
                    </p>
                    </Link>
                    <div className="card-author-block">
                    <div className="card-author-avatar">
                    {node.soleAuthor ? <GatsbyImage image={node.soleAuthor[0].avatar.gatsbyImageData} alt={node.soleAuthor ? `${node.soleAuthor[0].name}'s avatar` : undefined} />: <StaticImage src="../../../images/default-portrait.jpg" alt={node.author ? node.author[0] : 'author avatar'}></StaticImage>}
                        
                        </div>
                        <div className="card-author-name">
                        {node.soleAuthor ? node.soleAuthor[0].name : undefined}
                        </div>


                    </div>
                    
                </div>
                )
                
            }): 'No content'}
            </div>
        </div>
    )
}

// the id here uses the gatsby generated id
export const query = graphql`
    query($id: String) {
        contentfulCategories(id: {eq: $id}) {
        slug
        categoryName
    
        blogpost {
            postTitle
            slug  
            contentful_id
            thumbnail {
                gatsbyImageData
            }
            excerpt
            catRef {
                categoryName
              }
            
            soleAuthor {
                avatar {
                  gatsbyImageData
                }
                name
              }
        }
        }
    }
`
export const Head = ({data}) => <Seo title={`SkiveAi - ${data.contentfulCategories.categoryName}`} description={`SkiveAi's reviews`}></Seo>

export default CategoryPost