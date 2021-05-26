import React, { useState, useEffect } from 'react'
import { getTemplates, searchTemp } from '../../api.js'
import { useSnackbar } from 'notistack'
import "./Explore.css"

import TemplateCard from './TemplateCard/TemplateCard.js'

const Explore = () => {
    const [templates, setTemplates] = useState(null)
    const [originalTemplateData, setOriginalTemplateData] = useState(null)
    const [initalDependency ] = useState(0)
    const [search, setSearch] = useState("")

    const { enqueueSnackbar } = useSnackbar()
    
    const errorSnackbar = {
        autoHideDuration: 2000,
        className: "explore__snackbarCreateError"
    }
    
    useEffect(() => {
        getTemplates()
            .then(data => setOriginalTemplateData(data.data))
            .catch(err => enqueueSnackbar("failed to fetch(500).", errorSnackbar))
    }, [initalDependency])
    
    useEffect(() => {
        setTemplates(originalTemplateData)
    }, [originalTemplateData])
    
    const handleSearch = (e) => {
        e.preventDefault()
        if (search.length === 0) return enqueueSnackbar("Fill the search field.", errorSnackbar)
        searchTemp(search)
            .then(data => data.data.length === 0 ? enqueueSnackbar("No templates found.", errorSnackbar): setTemplates(data.data))
            .catch(err => enqueueSnackbar("failed to search(500).", errorSnackbar))
        
    }
    
    const clearSearch = (e) => {
        e.preventDefault()
        setTemplates(originalTemplateData)
        setSearch("")
    }
    
    return (
        <div className="explore">
            <div className="circle explore__decorator"></div>
            { templates ? 
                <div className="explore__cardsContainer">
                    <div className="explore__info">
                        <h2>Explore</h2>
                        <p>And download templates.</p>
                        <form onSubmit={ handleSearch }>
                            <input type="text" placeholder="Template name" className="explore__search" value={search} onChange={ e => setSearch(e.target.value) } />
                            <input type="submit" value="search" className="explore__searchSubmit"/>
                            <button className="explore__searchClear" onClick={ clearSearch }>X</button>
                        </form>
                    </div>
                    { templates.map(data => ( <TemplateCard key={data._id} template={data} /> )) }
                </div>
                :
                (<div className="loader"></div>)  
            }
        </div>
    )
}

export default Explore