
import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import Searchbar from "./searchbar"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"





const Topblock = ({headerTitle, headerTxt, curPage, inCat=false, inArc=false}) => {

    const data = useStaticQuery(graphql`
        query {
            allContentfulCategories {
            edges {
                node {
                categoryName
                contentful_id
                slug
                }
            }
            }
            contentfulAsset(title: {eq: "Deskego logo"}) {
                id
                gatsbyImageData
              }
        }
    `)

    // console.log(data, 'data from topblock')
    // console.log(inCat, curPage)
    return (
        
            <header className="top-nav-container">
            <div id="top-nav-div">
                <div id="site-logo">
                    
                    {data.contentfulAsset ? <div className="siteLogo-container"><Link to="/"><GatsbyImage image={data.contentfulAsset.gatsbyImageData} alt="Deskego.com site logo"></GatsbyImage></Link></div> :<div><Link to="/">Deskego</Link></div> }
                        
                    
                </div>
                <nav id="top-nav">
                    
                    {/* <input type="checkbox" id="menu-toggle"></input>
                    <label htmlFor='menu-toggle' className="menu-icon">&#9776;</label> */}
                    <ul className="navMenu">
                        <li className={curPage === 'home-office' ? 'selected navCat' : 'navCat'}>
                            {inArc ? <Link to='/categories/home-office' replace={true}>Home Office </Link> : <Link to={inCat ? '../home-office' : '../categories/home-office'}>
                            Home Office
                            </Link>}


                            
                        </li>
                        <li className={curPage === 'gaming' ? 'selected navCat' : 'navCat'}>
                            {inArc ? <Link to='/categories/gaming' replace={true}>Gaming</Link> : <Link to={inCat ? '../gaming' : '../categories/gaming'}>
                                Gaming
                                </Link>}
                        </li>
                        <li className={curPage === 'streaming' ? 'selected navCat' : 'navCat'}>
                            
                            {inArc ? <Link to='/categories/streaming' replace={true}>Streaming </Link> : <Link to={inCat ? '../streaming' : '../categories/streaming'}>
                                Streaming
                                </Link>}
               
                           
                        </li>
                        <li>
                            <Searchbar />
                            {/* <button id="searchBtn">
                                <span className="material-symbols-outlined">search</span>
                            </button> */}
                        </li>
                    </ul>

                </nav>
            </div>
            <div id="top-section-bottom">
                <div className="top-section-headers-cont">
                    <h1 className="top-sect-header">
                        {headerTitle ? headerTitle : 'Deskego'}
                    </h1>
                   
                    {headerTxt? <p className="top-sect-header-txt"> {headerTxt}</p> : null}
                        
    
                    {curPage === 'home' ? <div className="header-small-img"><StaticImage src='../images/whiteDesk.png' alt="a white desk"></StaticImage></div> : null}
                </div>
            </div>
            </header>
            
        
    )
}




export default Topblock