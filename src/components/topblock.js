import "./styles/styles.css"
import * as React from "react"



const Topblock = ({pageTitle, children}) => {
    return (
        <div id="top-section-container">
            <div className="top-nav-container">
            <div id="top-nav-div">
                <div id="site-logo">
                    <div>Site Logo</div>
                </div>
                <nav id="top-nav-container">
                    <ul className="navMenu">
                        <li>
                            Reviews
                        </li>
                        <li>
                            Best Picks
                        </li>
                        <li>
                            Creator Highlights
                        </li>
                        <li>
                            <button>
                                <span className="material-symbols-outlined">search</span>
                            </button>
                        </li>
                    </ul>

                </nav>
            </div>
            <div id="top-section-bottom">
                <div className="top-section-headers-cont">
                    <h1 className="top-sect-header">
                        The affliate site
                    </h1>
                    <p className="top-sect-header-txt">
                        Make cash money having people click on the links to buy shit on the website
                    </p>
                </div>
            </div>
            </div>
            <div className="bot-nav-container">
                <div className="bot-nav-cards">
                    <ul className="tag-list">
                        <li>Reviews</li>
                        <li>Parts</li>
                    </ul>
                    <h2 className="card-post-title">
                        How to make a shitload of money off affliate sites
                    </h2>
                    <p className="card-excerpt">
                        This is the post excerpt that will appear on the cards. The ideal length will probabaly be three lines of text.
                    </p>
                    <div className="card-author-block">
                        Image and author name goes here followed by date

                    </div>

                </div>
                <div className="bot-nav-cards">
                <ul className="tag-list">
                        <li>Reviews</li>
                        <li>Parts</li>
                    </ul>
                    <h2 className="card-post-title">
                        How to make a shitload of money off affliate sites
                    </h2>
                    <p className="card-excerpt">
                        This is the post excerpt that will appear on the cards. The ideal length will probabaly be three lines of text.
                    </p>
                    <div className="card-author-block">
                        Image and author name goes here followed by date

                    </div>
                </div>

            </div>
        </div>
    )
}


export default Topblock