import * as React from "react"
import Topblock from "../components/topblock"
import Seo from "../components/seo"
import "../components/styles/styles.css"
import BotBlock from "../components/botblock"
import TopPosts from "../components/topposts"

const HomePage = () => {

  

  return (
    <div id="App"> 
      <div id="top-section-container">
        <Topblock curPage="home" />
        <TopPosts />
      </div>
    <BotBlock />
    </div>
  )
}




export const Head = () => <Seo />

export default HomePage