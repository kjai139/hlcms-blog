import { graphql } from 'gatsby'
import * as React from 'react'
import Seo from '../../../components/seo'
import Topblock from '../../../components/topblock'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import defaultImg from "../../../images/default-portrait.jpg"
import { Link } from 'gatsby'


const CategoryPost = (props) => {
    console.log(props.pageContext.id)
    const data = props.data
    
    console.log(data)
    return (
        <div id="App"> 
            <div id="top-section-container">
                <Topblock inCat={true} curPage={data.contentfulCategories.slug} headerTitle={data.contentfulCategories.categoryName}></Topblock>
            </div>
            <div className='cata-content-container'>
            {data.contentfulCategories.blogpost ? data.contentfulCategories.blogpost.map((node) => {
                return (
                    <Link className="post-links" to={`/${node.slug}`} key={node.contentful_id}>
                    <div className="bot-nav-cards">
                    <div className="card-img-container">
                    {node.thumbnail && <GatsbyImage image={node.thumbnail.gatsbyImageData} alt={'a gatsby image'} /> }
                    </div>
                    <ul className="tag-list">
                        <li className='dark-b'>{node.catRef.categoryName}</li>
                    </ul>
                    <h2 className="card-post-title">
                        {node.postTitle}
                    </h2>
                    <p className="card-excerpt">
                        {node.excerpt}
                    </p>
                    <div className="card-author-block">
                    <div className="card-author-avatar">
                    {node.authorRef ? <GatsbyImage image={node.authorRef.gatsbyImageData} alt={node.author ? node.author[0] : undefined} />: <StaticImage src="../../../images/default-portrait.jpg" alt={node.author ? node.author[0] : 'author avatar'}></StaticImage>}
                        
                        </div>
                        <div className="card-author-name">
                        {node.author ? node.author : undefined}
                        </div>


                    </div>

                </div>
                </Link>
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
            authorRef {
                gatsbyImageData
            }
            author
        }
        }
    }
`
export const Head = ({data}) => <Seo title={`AFS - ${data.contentfulCategories.categoryName}`}></Seo>

export default CategoryPost