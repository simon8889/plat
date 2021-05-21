import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import "./Create.css"

const Create = () => {
    const [files, setFiles] = useState([])
    const [templateInfo, setTemplateInfo] = useState({
        name: "",
        author: ""
    })
    
    const { getRootProps, getInputProps }  = useDropzone({
        accept: ".html",
        maxFiles: 1,
        maxSize: 5242880,
        onDrop: (acceptedFiles) => {
            setFiles(acceptedFiles.map((file) => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            ))
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
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
                            
                            <input { ...files.length === 0 ? { ...getInputProps() } : null } style={ {display: "none"} } />
                            
                            { 
                            files.length === 0 ? 
                                (<p>Drop your html here.</p>) 
                            : 
                                (
                                    <div className="create__fileOptions">
                                        <div> { files.map(file => (<p key={file.name}>{file.name}</p>)) } </div>
                                        <div className="create__clearFiles">
                                            <p onClick={() => setFiles([])} className="create__clearFilesText">Clear</p>
                                            <a target="_blank" href={files.map(file => file.preview)} className="create__clearFilesText">Preview</a>
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
