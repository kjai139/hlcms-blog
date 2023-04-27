import { graphql } from 'gatsby'
import * as React from 'react'
import Seo from "../../components/seo"
import Topblock from '../../components/topblock'
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import SideNavBar from '../../components/sideNav'

import Layout from '../../components/layout'
import { useRef } from 'react'
import { useEffect } from 'react'
import  Footer  from '../../components/footer'

const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children }) => <p className="align-center">{children}</p>

const BlogPosts = (props) => {

  const renderIndex = useRef(0)
  // const [contentSections, setContentSections] = useState([])
  let contentArr = []
  
  
  
  
  

    // console.log(props, 'props from blogPost')

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
            // console.log(element, 'ele from parser')
            if (element.nodeType === 'text') {
              
              textContent += element.value
            }
          });
          // console.log(textContent, 'txtcontent from paser')
          let cleanedString = textContent.replace(/\n/g, '')
          // console.log(cleanedString)
          let obj = {
            id: `section-${renderIndex.current}`,
            sectionTitle: cleanedString,
          }
          contentArr.push(obj)
          // console.log(contentArr)
          
          
         
          
          
          return <h2 id={`section-${renderIndex.current}`}>
            {children}
          </h2>
        },
        [INLINES.HYPERLINK]: (node, children) => {
          // console.log(node.data.uri, 'node data uri')
          // console.log(node, 'hyperlink node')
          // console.log(children, 'hyperlink children')
          if ((node.data.uri).includes('player.vimeo.com/video')){
            return <span className='iFrameContainer'><iframe title="Vimeo video player" src={node.data.uri} allowFullScreen></iframe></span>
          } else if((node.data.uri).includes("youtube.com/embed")) {
            return <span className='iFrameContainer'><iframe title="YouTube video player" src={node.data.uri} allow="accelerometer; encrypted-media; gyroscope; picture-in-picture;"  allowFullScreen></iframe></span>
          } else if((node.data.uri).includes("amzn.to")) {
            return <a href={node.data.uri} target='_blank' rel='noopener noreferrer' title='Link opens in a new window' className='amazon-link-btn'>{children}</a>
          } else {
            return <a href={node.data.uri} className='regular-links'>{children}</a>
          }
        },
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
          // console.log(node.data.target.gatsbyImageData)
          // console.log(node.data.target.description)

          let image = getImage(node.data.target)
          console.log(image)
          return (
            <div className={image.width < 600 ? 'post-content-img small-img' : 'post-content-img'}>
              
              <GatsbyImage 
              image={image}
  
              alt={node.data.target.description ? node.data.target.description : 'a dinosaur'}/>
            
            </div>
          )
          
          
        },
        [BLOCKS.EMBEDDED_ENTRY] : (node) => {
          // console.log(node, 'embeded entry block')
        },
        [INLINES.EMBEDDED_ASSET]: (node) => {
          // console.log(node, 'embeded entry inline')
        },

        [BLOCKS.TABLE]: (node, children) => {
          return (
            <div className='table-container'>
              <table>
                <tbody>
                {children}
                </tbody>
              
              </table>
              </div>
          )
        },
        [BLOCKS.LIST_ITEM] : (node, children) => {
          return <li className='main-lists'>{children}</li>
        },
        
      },
      
    }

    return (
      <Layout>
      <div id="top-section-container">
        <Topblock headerTitle={props.data.contentfulBlogPost.postTitle}></Topblock>
       
      </div>
      <div className='blogpost-body-container'>
        <SideNavBar contentArr={contentArr} />
        <div className='blogpost-center'>
        {props.data.contentfulBlogPost.body && renderRichText(props.data.contentfulBlogPost.body, options)}
        </div>
        <div className='blogpost-ad-block'>

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
      contentfulBlogPost(id: {eq: $id}) {
            id
        postTitle
        seo {
          ogTitle
          ogDescription
          ogImg{
            url
          }
        }
        body {
          raw
          references {
            ... on ContentfulAsset {

              contentful_id
              title
              gatsbyImageData
              description
              __typename

            }
          }
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

export const Head = ({data}) => <Seo title={data.contentfulBlogPost.postTitle} description={`${data.contentfulBlogPost.postTitle} blog post from Deskego.com`} ogDesc={data.contentfulBlogPost.seo.ogDescription} ogImg={`${data.contentfulBlogPost.seo.ogImg.url}`}></Seo>

export default BlogPosts