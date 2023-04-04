import { graphql } from 'gatsby'
import * as React from 'react'
import Seo from "../../components/seo"
import Topblock from '../../components/topblock'
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { GatsbyImage } from 'gatsby-plugin-image'
import SideNavBar from '../../components/sideNav'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'

const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children }) => <p className="align-center">{children}</p>

const BlogPosts = (props) => {

  const renderIndex = useRef(0)
  const [contentSections, setContentSections] = useState([])
  let contentArr = []
  
  
  
  
  

    console.log(props, 'props from blogPost')

    // const rawBody = props.data.contentfulBlogPost.body.raw
    // console.log(rawBody)
    useEffect( () => {
      renderIndex.current = 0
      
    }, [])


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
        [BLOCKS.HEADING_2]: (node, children) => {
          
          renderIndex.current += 1
          let textContent = ''
          
          

          node.content.forEach(element => {
            console.log(element.nodeType)
            if (element.nodeType === 'text') {
              
              textContent += element.value
            }
          });
          console.log(node)
          let cleanedString = textContent.replace(/\n/g, '')
          console.log(cleanedString)
          let obj = {
            id: `section-${renderIndex.current}`,
            sectionTitle: cleanedString,
          }
          contentArr.push(obj)
          console.log(contentArr)
          
          
         
          
          
          return <h2 id={`section-${renderIndex.current}`}>
            {children}
          </h2>
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
        {props.data.contentfulBlogPost.thumbnail && <div className='post-thumbnail'><GatsbyImage image={props.data.contentfulBlogPost.thumbnail.gatsbyImageData} alt={props.data.contentfulBlogPost.thumbnail.description}/></div>}
      </div>
      <div className='blogpost-body-container'>
        <SideNavBar contentArr={contentArr} />
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
          description
        }
      }
    }
`

export const Head = ({data}) => <Seo title={data.contentfulBlogPost.postTitle}></Seo>

export default BlogPosts