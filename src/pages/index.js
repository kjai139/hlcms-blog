import * as React from "react"
import Topblock from "../components/topblock"
import Seo from "../components/seo"
import Layout from "../components/layout"
import BotBlock from "../components/botblock"
import TopPosts from "../components/topposts"
import Footer from "../components/footer"
import { Link } from "gatsby"

const HomePage = () => {

  

  return (
    <Layout>
      <div id="top-section-container">
        <Topblock curPage="home" headerTitle='DESKEGO'/>
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
    </Layout>
  )
}




export const Head = () => <Seo title={'Deskego - Home'} description={'Discover the ultimate guide to creating your perfect desk setup for office work, gaming, or streaming. Explore expert recommendations, tips, and reviews on ergonomic solutions, space-saving ideas, and the latest accessories to enhance your workspace.'} />

export default HomePage