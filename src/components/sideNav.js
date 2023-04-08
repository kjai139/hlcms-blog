import * as React from 'react'
import { useRef } from 'react'
import { useEffect, useState } from 'react'



const SideNavBar = ({contentArr}) => {
    const [sectionIds, setSectionIds] = useState([])
    const [activeSectionId, setActiveSectionId] = useState()
    const [viewId, setViewId] = useState()

    useEffect( () => {
        console.log(contentArr, 'contentArr')
        
       
        const ids = Array.from(contentArr).map((section) => 
            section.id
        )

        console.log(ids)
        setSectionIds(ids)

        const observer = new IntersectionObserver((entries) => {
            const visibleEntry = entries.find((entry) => entry.isIntersecting)

            if (visibleEntry) {
                console.log(visibleEntry, 'is being observed')
                console.log(visibleEntry.target.id, 'target id obs')
                setActiveSectionId(visibleEntry.target.id)
                let viewId = Number(visibleEntry.target.id.split('-')[1])
                console.log(viewId)
                setViewId(viewId)
            }
        }, {
            rootMargin: "-50% 0% -50% 0%"
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
        console.log(id, 'id targeted')
        section.scrollIntoView({behavior: "smooth"})
    }


    return (
        <div className='content-side-nav-div'>
            <div className='side-nav-wrap'>
            <h6 className='side-nav-title'>Content</h6>
            <ul className='content-side-nav'>
                {sectionIds.length > 0 ? sectionIds.map((section, index) => {
                    if (contentArr[index]) {
                        console.log(contentArr[index].sectionTitle, 'sectionTitle')
                    }
                    

                    return <li key={section} className={index + 1 === viewId ? 'selected-side-nav' : null}>
                        <button className='side-nav-btn' data-indexnum={`btn-${index + 1}`} onClick={() => {setViewId(index + 1); handleViewChange(section)}}>{contentArr[index].sectionTitle}</button>
                    </li>
                }): undefined}

            </ul>
            </div>

        </div>
    )

}

export default SideNavBar