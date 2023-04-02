import * as React from 'react'
import { useRef } from 'react'
import { useState, useEffect } from 'react'



const Searchbar = () => {
    const [query, setQuery] = useState('tyler1')
    const [results, setResults] = useState([])

    // const [isSearchOpen, setisSearchOpen] = useState(false)

    // const [isSearchLoading, setisSearchLoading] = useState(false)

    const [isResultOut, setIsResultOut] = useState(false)

    const overlayRef = useRef(null)

    

    console.log(window.__FLEXSEARCH__.en.index)
    console.log(window.__FLEXSEARCH__.en.store)

    const getSearchResults = (query) => {
        let index = window.__FLEXSEARCH__.en.index
        let store = window.__FLEXSEARCH__.en.store

        if (!query || !index) {
            return []
        } else {
            setResults([])
            let results = []
            Object.keys(index).forEach(idx => {
                results.push(...index[idx].values.search(query))
            })

            results = Array.from(new Set(results))

            let nodes = store.filter(node => (results.includes(node.id) ? node : null))
            .map(node => node.node)
            console.log(nodes)
            setResults(nodes)
            setIsResultOut(true)
            
        }
    }

    const toggleMenuOpen = () => {
        setIsResultOut(!isResultOut)
    }
    
    
    
    useEffect( () => {
        const overlayNode = overlayRef.current
        const handleKeydown = (event) => {
            if (event.key === 'Escape' && overlayRef.current) {
                event.preventDefault()
                setIsResultOut(false)
            }
        }

        overlayNode.addEventListener('keydown', handleKeydown)
        // removes the listener when unmounts
        return () => {
            overlayNode.removeEventListener('keydown', handleKeydown)
        }
    }, [setIsResultOut])
   


    return (
        <div className='search-btn-container'>
        <form className='search-btn-div'>
            
        <input type="text" placeholder='Enter keywords here...'>
        </input>
        <button id="searchBtn" onClick={(e) => {
            e.preventDefault()
           
            
            getSearchResults(query)
        }}>
            <span className="material-symbols-outlined">search</span>
        </button>
        </form>
        <div ref={overlayRef} className={isResultOut ? 'overlay' : 'overlay hidden'} aria-disabled={isResultOut ? false : true} onClick={toggleMenuOpen} tabIndex="0" role="button" aria-label='Press Escape to close search menu'></div>
        <div className='search-result-div'>
                
                <ul className='searchResult-list'>
                {results.length > 0 && isResultOut ? results.map((node) => {
                    return (
                        <li>
                            {node.postTitle}
                        </li>
                    )
                }) : null}
                {results.length === 0 && isResultOut ?  <li>No results</li> : null}
                </ul>
            </div>
        </div>
    )
}

export default Searchbar
