import { graphql } from 'gatsby'
import * as React from 'react'
import Seo from "../../components/seo"
import Topblock from '../../components/topblock'
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { GatsbyImage } from 'gatsby-plugin-image'

const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children }) => <p className="align-center">{children}</p>

const BlogPosts = (props) => {


  

    console.log(props)

    // const rawBody = props.data.contentfulBlogPost.body.raw
    // console.log(rawBody)

    const options = {
      renderMark: {
        [MARKS.BOLD]: text => <Bold>{text}</Bold>,
      },
      renderNode: {
        [BLOCKS.PARAGRAPH]: (node, children) => {
          // if (node.content.length === 1 && node.content[0].value === ""){
          //   return <br />
          // } else {
            return <Text>{children}</Text>
            
          },

        
        [BLOCKS.EMBEDDED_ASSET]: node => {
          return (
            <>
              <h2>Embedded Asset</h2>
              <pre>
                <code>{JSON.stringify(node, null, 2)}</code>
              </pre>
            </>
          )
        },
        
      },
      "embedded-asset-block": node => {
        const { gatsbyImageData } = node.data.target
        if (!gatsbyImageData) {
          // asset is not an image
          return null
        }
        return <GatsbyImage image={gatsbyImageData} />
      },
    }

    return (
      <div id="App"> 
      <div id="top-section-container">
        <Topblock headerTitle={props.data.contentfulBlogPost.postTitle}></Topblock>
        {props.data.contentfulBlogPost.thumbnail && <div className='post-thumbnail'><GatsbyImage image={props.data.contentfulBlogPost.thumbnail.gatsbyImageData} /></div>}
      </div>
      <div className='blogpost-body-container'>
        {props.data.contentfulBlogPost.body && renderRichText(props.data.contentfulBlogPost.body, options)}

      </div>
      </div>
    )
}


export const query = graphql`
    query($id: String) {
      contentfulBlogPost(id: {eq: $id}) {
            id
        postTitle
        body {
          raw
        }
        catRef {
          slug
          categoryName
        }
        createdAt
        thumbnail {
          gatsbyImageData
        }
      }
    }
`

export const Head = ({data}) => <Seo title={data.contentfulBlogPost.postTitle}></Seo>

export default BlogPosts