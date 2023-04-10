import * as React from 'react'
import Searchbar from './searchbar'


const Footer = () => {
    return (
        <div className='footer-section-container'>
            <div className='footer-sect'>
                <h4>Search the site</h4>
                <Searchbar />
                
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
                <span>© 2023 Deskego.com</span>
            </div>
        </div>
    )
}


export default Footer