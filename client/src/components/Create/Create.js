import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { createTemp } from '../../api.js'
import { useSnackbar } from "notistack"
import "./Create.css"

const Create = () => {
    const [file, setFile] = useState(undefined)
    const [templateInfo, setTemplateInfo] = useState({
        name: "",
        author: ""
    })
    
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    
    const errorSnackbar = {
        autoHideDuration: 2000,
        className: "create__snackbarCreateError"
    }
    
    const createdSnackBar = {
        autoHideDuration: 3000,
        className: "create__snackbarTemplateCreated"
    }

    const { getRootProps, getInputProps }  = useDropzone({
        accept: ".html",
        maxFiles: 1,
        maxSize: 5242880,
        onDrop: (acceptedFiles) => {
            const [uploadedFile] = acceptedFiles
            setFile(uploadedFile)
        }
    })
    
    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (templateInfo.name.length === 0 || templateInfo.author.length === 0 || file === undefined) return enqueueSnackbar("All fields must be complete.", errorSnackbar)

        const tempData = new FormData()
        tempData.append("name", templateInfo.name)
        tempData.append("author", templateInfo.author)
        tempData.append("file", file)
        
        createTemp(tempData)
            .then(data => enqueueSnackbar("Template created.", createdSnackBar))
            .catch(err => enqueueSnackbar("All fields must be complete.", errorSnackbar))
        
        setFile(undefined)
        setTemplateInfo({
            name: "",
            author: ""
        })
    }
    
    return (
        <div className="create">
            <div className="circle blue"></div>
            <div className="create__instructions">
                <h2 className="create__title">Create</h2>
                <p>create your html file, decorate it with a style tag, add interactivity with javascript inside a script tag, fill the paragraphs and titles with lorem texts and finally share it with a name and an author. (max 5MB)</p>
            </div>
            <div className="create__form"> 
                <form onSubmit={ handleSubmit }>
                    <div className="create__formInput">
                        <label htmlFor="name">Name</label>
                        <input name="name" type="text" value={templateInfo.name} onChange={(e) => setTemplateInfo({...templateInfo, name: e.target.value})} autoComplete="off" />
                    </div>
                    
                    <div className="create__formInput">
                        <label htmlFor="author">Author</label>
                        <input name="author" type="text" value={templateInfo.author} onChange={(e) => setTemplateInfo({...templateInfo, author: e.target.value})} autoComplete="off" />
                    </div>
                    
                    <div className="create__fileInput">
                        
                        <div { ...getRootProps() } className="create__dragNdrop">
                            
                            <input {  ...file === undefined ? { ...getInputProps() } : null } style={ {display: "none"} } />
                            
                            { 
                            file === undefined ? 
                                (<p>Drop your html here.</p>) 
                            : 
                                (
                                    <div className="create__fileOptions">
                                        <div> 
                                            <p>{ file.name }</p> 
                                        </div>
                                        <div className="create__clearFiles">
                                            <p onClick={() => setFile(undefined)} className="create__clearFilesText">Clear</p>
                                            <a rel="noreferrer" target="_blank" href={ URL.createObjectURL(file) } className="create__clearFilesText">Preview</a>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <input type="submit" value="Create Template" className="create__submit"/>
                </form>
            </div>
        </div>
    )
}

export default Create
