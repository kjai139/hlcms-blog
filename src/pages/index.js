import * as React from "react"
import Topblock from "../components/topblock"
import Seo from "../components/seo"
import "../components/styles/styles.css"
import BotBlock from "../components/botblock"
import TopPosts from "../components/topposts"
import Footer from "../components/footer"
import { Link } from "gatsby"

const HomePage = () => {

  

  return (
    <div id="App"> 
      <div id="top-section-container">
        <Topblock curPage="home"/>
        <TopPosts />
      </div>
    <BotBlock />
    <div className='view-more-cont'>
                <Link to='/archive'>
                <button className='view-more-btn'>VIEW MORE POSTS</button>
                </Link>
            </div>
    <footer id="footer-section-container">
      <Footer />

    </footer>
    </div>
  )
}




export const Head = () => <Seo title={'Deskego - Home'} description={'Deskego, the most updated reviews on computer related gear'} />

export default HomePage