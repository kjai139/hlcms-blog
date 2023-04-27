import { graphql } from 'gatsby'
import * as React from 'react'
import Seo from '../../../components/seo'
import Topblock from '../../../components/topblock'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import  Footer  from '../../../components/footer'
import { Link } from 'gatsby'
import Layout from '../../../components/layout'

const AuthorPanel = ({data}) => {
        return (
            <Layout>
            <div id="top-section-container">
            <Topblock headerTitle={data.contentfulAuthorInfo.name} headerTxt='Writer' curPage="authors2" inArc={true} inCat={false}></Topblock>
            </div>
            <div id="bot-section-container">
                <div className='authors-content'>
            <div className='authors-details-container'>
                <div className='authors-details-avatar'>
                {data.contentfulAuthorInfo.name ? 
                <GatsbyImage image={data.contentfulAuthorInfo.avatar.gatsbyImageData} alt={data.contentfulAuthorInfo.avatar.description} /> : null }
                </div>
                <div className='authors-details-description'>
                    <h3 className='authors-details-head'>Author</h3>
                    <h1>{data.contentfulAuthorInfo.name}</h1>
                    <p>{data.contentfulAuthorInfo.about}</p>
                </div>
    
                   

                

            </div>
            <div className='authors-bot-section'>
                <h1 className='authors-bot-header'>Some of {data.contentfulAuthorInfo.name}'s Best Posts</h1>
                    <div className='authors-best-posts'>
                        {data.allContentfulBlogPost ? data.allContentfulBlogPost.edges.map((node) => {
                    // console.log(node.node)
                    return (
                        <div className="bot-nav-cards" key={node.node.contentful_id}>
                    <div className="card-img-container">
                    {node.node.thumbnail && <Link to={`/${node.node.slug}`}><GatsbyImage image={node.node.thumbnail.gatsbyImageData} alt={'a gatsby image'} /></Link> }
                    </div>
                    <ul className="tag-list">
                        <li className='dark-b'><Link to={`/categories/${node.node.catRef.slug}`}>{node.node.catRef.categoryName}</Link></li>
                    </ul>
                    <Link to={`/${node.node.slug}`}>
                    <h2 className="card-post-title">
                        {node.node.postTitle}
                    </h2>
                    <p className="card-excerpt">
                        {node.node.excerpt}
                    </p>
                    </Link>
                    <div className="card-author-block">
                    <div className="card-author-avatar">
                    {node.node.soleAuthor ? <GatsbyImage image={node.node.soleAuthor[0].avatar.gatsbyImageData} alt={node.node.soleAuthor ? `${node.node.soleAuthor[0].name}'s avatar` : undefined} />: null}
                        
                        </div>
                        <div className="card-author-name">
                        {node.node.soleAuthor ? node.node.soleAuthor[0].name : undefined}
                        </div>
                        <span className='card-post-date'>{node.node.createdAt}</span>

                    </div>

                </div>
                    )
                }): null}
                    </div>
                    </div>
            </div>
            </div>
            <footer id="footer-section-container">
            <Footer />

            </footer>


        </Layout>
        )
}




export const query = graphql`
    query($id: String) {
        contentfulAuthorInfo(id: {eq: $id}) {
            name
            avatar {
            description
            gatsbyImageData
            }
            about
        }
        allContentfulBlogPost(
            sort: {createdAt: DESC}
            limit: 3
            filter: {soleAuthor: {elemMatch: {id: {eq: $id}}}}
          ) {
            edges {
              node {
                postTitle
                slug
                contentful_id
                createdAt(formatString: "MMMM DD, YYYY")
                thumbnail {
                  gatsbyImageData
                }
                excerpt
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
                }
              }
            }
          }
    }`

export const Head = ({data}) => <Seo title={`Deskego - ${data.contentfulAuthorInfo.name}`}description={`Author page of ${data.contentfulAuthorInfo.name}`}></Seo>


export default AuthorPanel