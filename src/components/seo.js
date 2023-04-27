import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'



const Seo = ({title, description, siteUrl, ogImg, ogTitle, ogDesc}) => {

    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                    description
                    siteUrl
                }
            }
        }
    `)
    
    


    return (
        <>
        <title>{title? title : data.site.siteMetadata.title}</title>
        <meta name='description' content={description? description : data.site.siteMetadata.description}></meta>
    
        <meta property='og:image' content={ogImg ? ogImg : 'https://images.ctfassets.net/z6w0khw4r6q1/4gE0xQWPfopxSspwb62gBJ/d956f16d7cd8a5fb17c9312de2de8b86/logo.png' }></meta>
        <meta property='og:description' content={ogDesc? ogDesc : 'The most updated reviews on your office, gaming, streaming needs'} />
        <meta property='og:title' content={title? `${title} | Deskego.com` : 'Deskego.com'}></meta>
        <meta property='og:image:secure_url' content={ogImg ? ogImg : 'https://images.ctfassets.net/z6w0khw4r6q1/4gE0xQWPfopxSspwb62gBJ/d956f16d7cd8a5fb17c9312de2de8b86/logo.png'}></meta>
        </>

    )
}

export default Seo