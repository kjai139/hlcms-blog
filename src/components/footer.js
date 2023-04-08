import * as React from 'react'
import Searchbar from './searchbar'


const Footer = () => {
    return (
        <div className='footer-section-container'>
            <div className='footer-sect'>
                <h4>Search the site</h4>
                <Searchbar />
                <span>© 2023 SkiveAi</span>
            </div>
            <div className='footer-sect'>
                <h4>Content Categories</h4>
                <ul className='footer-list'>
                    <li>Reviews</li>
                    <li>Best Picks</li>
                    <li>Creator Highlights</li>

                </ul>
            </div>
            <div className='footer-sect'>
                <h4>Contact Us</h4>
            </div>
        </div>
    )
}


export default Footer