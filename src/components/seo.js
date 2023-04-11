import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import ogImgDefault from "../images/logo.png"


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
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Noto+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet"></link>
        <meta property='og:image' content={ogImg ? ogImg : ogImgDefault }></meta>
        <meta property='og:description' content={ogDesc? ogDesc : 'The most updated reviews on your office, gaming, streaming needs'} />
        <meta property='og:title' content={title? `${title} | Deskego.com` : 'Deskego.com'}></meta>
        <meta property='og:image:secure_url' content={ogImg ? ogImg : '/logo.png'}></meta>
        </>

    )
}

export default Seo