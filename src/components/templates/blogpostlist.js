import { graphql, useStaticQuery, Link } from 'gatsby'
import * as React from 'react'
import Topblock from '../topblock';
import Seo from '../seo';
import { GatsbyImage } from 'gatsby-plugin-image';




const BlogPostList = ({ data, pageContext }) => {
    const { currentPage, numPages } = pageContext;
    const blogPosts = data.allContentfulBlogPost.edges;

    console.log(data.allContentfulBlogPost)

  return (
    <div id="App"> 
      <div id="top-section-container">
        <Topblock headerTitle='Post Archive' curPage="home" />
        </div>
    <div className='archive-content'>
      {/* Render list of blog posts */}
      <ul className='archive-list'>
        {blogPosts.map(blogPost => (
          <li key={blogPost.node.slug}>
            <Link to={`/${blogPost.node.slug}`}>
              <div className='archive-list-entry'>
                <span>{blogPost.node.postTitle}</span>
                <div className='archive-author-details'>
                  
                  <div className='archive-avatar-div'>
                    <div className='archive-avatar-img-container'>
                    <GatsbyImage image={blogPost.node.soleAuthor[0].avatar.gatsbyImageData} alt={`${blogPost.node.soleAuthor[0].name}'s avatar`}></GatsbyImage>
                    </div>
                    {blogPost.node.soleAuthor[0].name}
                  </div>
                  <span>{blogPost.node.createdAt}</span>
                </div>
              </div>
              </Link>
          </li>
        ))}
      </ul>

      {/* Render pagination links */}
      <nav>
        <ul>
          {Array.from({ length: numPages }, (_, i) => (
            <li key={`pagination-number${i + 1}`}>
              <Link to={`/archive/${i === 0 ? '' : i + 1}`}>{i + 1}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
    </div>
    
  );
};

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allContentfulBlogPost(skip: $skip, limit: $limit, sort: {createdAt: DESC}) {
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
                }
        }
      }
    }
  }
`;

export const Head = () => <Seo title='SkiveAi - Post Archive' description='Blogposts archive' />

export default BlogPostList


