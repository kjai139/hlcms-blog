import { graphql } from 'gatsby'
import * as React from 'react'
import Seo from '../../components/seo'
import Topblock from '../../components/topblock'

const ReviewsPage = ({data}) => {


    return (
        <div id="App"> 
        <div id="top-section-container">
        <Topblock headerTitle="Categories" headerTxt="Take a look at what we have" curPage="categories" inCat={true}></Topblock>
        </div>

        <div className='reviews-content-container'>
            {console.log(data)}

        </div>


        </div>
    )
}
export const query = graphql`
    query{
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
`


export const Head = () => <Seo title="Reviews" description="A page with many reviews of tech products"></Seo>

export default ReviewsPage