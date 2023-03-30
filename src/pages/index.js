import * as React from "react"
import Topblock from "../components/topblock"
import Seo from "../components/seo"
import "../components/styles/styles.css"

const HomePage = () => {

  

  return (
    <div id="App"> 
    <Topblock />
    </div>
  )
}




export const Head = () => <Seo />

export default HomePage