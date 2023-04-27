import { graphql, Link } from 'gatsby'
import * as React from 'react'
import Topblock from '../topblock';
import Seo from '../seo';
import { GatsbyImage } from 'gatsby-plugin-image';
import Footer from '../footer';
import Layout from '../layout';





const GamingPostList = ({ data, pageContext }) => {
    const { humanPageNumber, pageNumber, numberOfPages } = pageContext;
    const blogPosts = data.allContentfulBlogPost.edges;

    // console.log(data.allContentfulBlogPost, 'from creatorhlpostlist')
    // console.log(pageContext)

  return (
    <Layout>
      <div id="top-section-container">
        <Topblock curPage='gaming' headerTitle='Gaming Posts Archive' inArc={true}/>
        </div>
    <div className='archive-content'>
      {/* Render list of blog posts */}
      <ul className='archive-list'>
        {blogPosts.map(blogPost => (
          <li key={blogPost.node.slug}>
            
              <div className='archive-list-entry'>
              <Link to={`/${blogPost.node.slug}`}>
                <span>{blogPost.node.postTitle}</span>
                </Link>
                <div className='archive-author-details'>
                <Link to={`/authors/${blogPost.node.soleAuthor[0].slug}`}>
                  <div className='archive-avatar-div'>
                    <div className='archive-avatar-img-container'>
                    <GatsbyImage image={blogPost.node.soleAuthor[0].avatar.gatsbyImageData} alt={`${blogPost.node.soleAuthor[0].name}'s avatar`}></GatsbyImage>
                    </div>
                    {blogPost.node.soleAuthor[0].name}
                  </div>
                  </Link>
                  <span className='card-post-date'>{blogPost.node.createdAt}</span>
                </div>
              </div>
            
          </li>
        ))}
      </ul>

      {/* Render pagination links */}
      <nav className='page-nav'>
        <ul className='page-nav-list'>
            {Array(numberOfPages).fill().map( (_, i) => {
                return <li key={`pagination-number${i + 1}`} className={ i === pageNumber ? 'page-nav-entries selected' : 'page-nav-entries'}>
                   {i === pageNumber ? `${i + 1}` : <Link to={ i === 0 ? `../` : `./${i + 1}`}>{i + 1}</Link>}
                    
                </li>
            })}
          {/* {Array.from({ length: numberOfPages }, (_, i) => (
            <li key={`pagination-number${i + 1}`}>
                {pageNumber === i ? }
              <Link to={`/${i === 0 ? '' : i + 1}`}>{i + 1}</Link>
            </li>
          ))} */}
        </ul>
      </nav>
    </div>
    <footer id="footer-section-container">
      <Footer />

      </footer>
    </Layout> 
    
  );
};


export const query = graphql`
    query($skip: Int!, $limit: Int!) {
        allContentfulBlogPost(skip: $skip, limit: $limit, sort: {createdAt: DESC}, filter: {catRef: {categoryName: {eq: "Gaming"}}}) {
            edges {
                node {
                    slug
                    createdAt(formatString: "MMMM DD, YYYY")
                    postTitle
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
`

export const Head = () => <Seo title='Deskego - Gaming posts archive' description='archive of gaming related blog posts' />

export default GamingPostList