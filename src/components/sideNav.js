import * as React from 'react'
import { useRef } from 'react'
import { useEffect, useState } from 'react'



const SideNavBar = ({contentArr}) => {
    const [sectionIds, setSectionIds] = useState([])
    const [activeSectionId, setActiveSectionId] = useState()
    const [viewId, setViewId] = useState()
    const [targetView, setTargetView] = useState()

    useEffect( () => {
        // console.log(contentArr, 'contentArr')
        
       
        const ids = Array.from(contentArr).map((section) => 
            section.id
        )

        // console.log(ids)
        setSectionIds(ids)

        const observer = new IntersectionObserver((entries) => {
            const visibleEntry = entries.find((entry) => entry.isIntersecting)

            if (visibleEntry) {
                console.log(targetView)
                console.log(visibleEntry.target, 'is being observed')
                // console.log(visibleEntry.target.id, 'target id obs')
                setActiveSectionId(visibleEntry.target.id)
                let viewId = Number(visibleEntry.target.id.split('-')[1])
                // console.log(viewId)
                
                setViewId(viewId)
                    
                
                
            }
        }, {
            // rootMargin: "20% 20% 20% 20%"
            root:null,
            rootMargin: `0px 0px -100% 0px`
            
        })

        ids.forEach((id) => {
            const section = document.getElementById(id)
            if (section) {
                observer.observe(section)
            }
        })

        return () => {
            observer.disconnect()
        }
    }, [])

    const handleViewChange = (id) => {
        const section = document.getElementById(id)
        let viewIdfromSect = Number(id.split('-')[1])
        setTargetView(viewIdfromSect)
        // console.log(id, 'id targeted')
        // console.log(viewId, 'viewid')
        section.scrollIntoView({behavior: "smooth"})
        
        // setTimeout(() => {
        //     setViewId(viewIdfromSect)
        //     setTargetView('')
            
        // }, 500);
        
       
    }

   


    return (
        <div className='content-side-nav-div'>
            <div className='side-nav-wrap'>
            <h6 className='side-nav-title'>Content</h6>
            <ul className='content-side-nav'>
                {sectionIds.length > 0 ? sectionIds.map((section, index) => {
                    if (contentArr[index]) {
                        // console.log(contentArr[index].sectionTitle, 'sectionTitle')
                    }
                    

                    return <li key={section} className={index + 1 === viewId ? 'selected-side-nav' : null}>
                        <button className='side-nav-btn' data-indexnum={`btn-${index + 1}`} onClick={() => { handleViewChange(section)}}><span className='side-nav-index'>{index + 1}.</span><span className='side-nav-title'>{contentArr[index].sectionTitle}</span></button>
                    </li>
                }): undefined}

            </ul>
            </div>

        </div>
    )

}

export default SideNavBar