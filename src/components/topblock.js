
import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import Searchbar from "./searchbar"




const Topblock = ({headerTitle, headerTxt, curPage, inCat=false}) => {

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
        }
    `)

    console.log(data)
    console.log(inCat, curPage)
    return (
        
            <div className="top-nav-container">
            <div id="top-nav-div">
                <div id="site-logo">
                    <div><Link to="/">Site Logo</Link></div>
                </div>
                <nav id="top-nav-container">
                    <ul className="navMenu">
                        <li className={curPage === 'reviews' ? 'selected' : undefined}><Link to={inCat ? '../reviews' : '../categories/reviews'}>
                            Reviews
                            </Link>
                        </li>
                        <li className={curPage === 'best-picks' ? 'selected' : undefined}><Link to={inCat ? '../best-picks' : '../categories/best-picks'}>
                            Best Picks
                            </Link>
                        </li>
                        <li className={curPage === 'creator-highlights' ? 'selected' : undefined}><Link to={inCat ? '../creator-highlights' : '../categories/creator-highlights'}>
                            Creator Highlights
                            </Link>
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
                        {headerTitle ? headerTitle : 'The affiliate site'}
                    </h1>
                    <p className="top-sect-header-txt">
                        {headerTxt? headerTxt : null}
                    </p>
                </div>
            </div>
            </div>
            
        
    )
}




export default Topblock