import { graphql } from 'gatsby'
import * as React from 'react'
import Seo from '../../../components/seo'
import Topblock from '../../../components/topblock'
import { GatsbyImage } from 'gatsby-plugin-image'
import  Footer  from '../../../components/footer'
import { Link } from 'gatsby'
import Layout from '../../../components/layout'


const CategoryPost = (props) => {
    // console.log(props.pageContext.id, 'contxt id from CategoryPost')
    const data = props.data.allContentfulBlogPost.edges
    // console.log(props)

    const catString = props.pageContext.slug
    const CategoryN = catString.charAt(0).toUpperCase() + catString.slice(1)
    // console.log(data[0].node.catRef)
    // console.log(data[0].node, 'data from CategoryPost')
    return (
        
        <Layout> 
             <div id="top-section-container">
                <Topblock inCat={true} curPage={data[0]? data[0].node.catRef.categoryName: CategoryN} headerTitle={data[0] ? data[0].node.catRef.categoryName : CategoryN}></Topblock>
            </div>
            <div className='bot-section-container'>
            <div className='cata-content-container'>
            {data ? data.map((node) => {
                // console.log(node.node, 'from node map')
                return (
                   
                    <div className="bot-nav-cards" key={node.node.contentful_id}>
                    
                    <div className="card-img-container">
                    <Link className="post-links" to={`/${node.node.slug}`} >
                    {node.node.thumbnail && <GatsbyImage image={node.node.thumbnail.gatsbyImageData} alt={'a gatsby image'} /> }
                    </Link>
                    </div>
                    
                    <ul className="tag-list">
                        <li className='dark-b'>{node.node.catRef.categoryName}</li>
                    </ul>
                    <Link className="post-links" to={`/${node.node.slug}`}>
                    <h2 className="card-post-title">
                        {node.node.postTitle}
                    </h2>
                    <p className="card-excerpt">
                        {node.node.excerpt}
                    </p>
                    </Link>
                    <div className="card-author-block">
                    <div className="card-author-avatar">
                    {node.node.soleAuthor ? <Link to={`/authors/${node.node.soleAuthor[0].slug}`}><GatsbyImage image={node.node.soleAuthor[0].avatar.gatsbyImageData} alt={node.node.soleAuthor ? `${node.node.soleAuthor[0].name}'s avatar` : undefined} /></Link>: null}
                        
                        </div>
                        <div className="card-author-name">
                        {node.node.soleAuthor ? <Link to={`/authors/${node.node.soleAuthor[0].slug}`}>{node.node.soleAuthor[0].name}</Link> : undefined}
                        </div>
                        <span className='card-post-date'>{node.node.createdAt}</span>


                    </div>
                    
                </div>
               
                )
                
            }): 'No content'}
            </div>
            </div>
            <div className='view-more-cont'>
                <Link to='./page'>
                <button className='view-more-btn'>VIEW MORE POSTS</button>
                </Link>
            </div>
            <footer id="footer-section-container">
            <Footer />

            </footer>
           
        </Layout>
        
    )
}




// the id here uses the gatsby generated id in pageContext, the filesystem uses its filename as the query and for the acutal page there can be a seperate query for the content


export const query = graphql`
    query($id: String) {
        allContentfulBlogPost(
            sort: {createdAt: DESC}
            filter: {catRef: {id: {eq: $id}}}
            limit: 6
        ) {
            edges {
            node {
                createdAt(formatString: "MMMM DD, YYYY")
                postTitle
                seo {
                    ogTitle
                    ogDescription
                    ogImg {
                        url
                    }
                }
                catRef {
                    categoryName
                    slug
                }
                slug
                excerpt
                soleAuthor {
                    avatar {
                      gatsbyImageData
                    }
                    name
                    slug
                  }
                thumbnail {
                    gatsbyImageData
                  }
                contentful_id
            }
            }
        }
    }
`


export const Head = (props) => <Seo title={`Deskego - ${props.pageContext.slug.charAt(0).toUpperCase() + props.pageContext.slug.slice(1)}`} description={`The most updated blog posts on ${props.pageContext.slug.charAt(0).toUpperCase() + props.pageContext.slug.slice(1)} | Deskego.com`}></Seo>





export default CategoryPost