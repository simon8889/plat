import React, { useRef, useState } from 'react'
import GetAppIcon from '@material-ui/icons/GetApp'
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import download from "downloadjs"
import { getFile, addDownload } from "../../../api.js"
import { useSnackbar } from "notistack"
import "./TemplateCard.css"

dayjs.extend(relativeTime)

const TemplateCard = ({ template }) => {
    const [downloadCount, setDownloadCount] = useState(template.downloadCount)
    const styles = {
        backgroundColor: template.background
    }
    const time = dayjs(template.createdAt)
    const { enqueueSnackbar } = useSnackbar()
    const downloadDesc = useRef(null)

    const errorSnackbar = {
        autoHideDuration: 2000,
        className: "templateCard__snackbarCreateError"
    }
    
    const handlePreview = async () => {
        try{
            const file = await getFile(template.resourceUrl)
            const doc = new File([file.data], "template.html", {type: file.headers["content-type"]})
            window.open(URL.createObjectURL(doc))
        } 
        catch(err) {
            enqueueSnackbar("Error displaying file.", errorSnackbar)
        }
    }
    
    const  handleDownload = async () => {
        try{
            const file = await getFile(template.resourceUrl)
            download(file.data, template.fileName, "text/html")
            const addDownloadCount = await addDownload(template._id)
            console.log(addDownloadCount)
            setDownloadCount(addDownloadCount.data.newObject.downloadCount)
        } 
        catch(err) {
            enqueueSnackbar("Error downloading file.", errorSnackbar)
        }
    }
    
    const onDownloadHover = () => {
        downloadDesc.current.className = "templateCard__downloadDesc templateCard__downloadDesc--view"
    }
    
    const outDownloadHover = () => {
        downloadDesc.current.className = "templateCard__downloadDesc"
    }

    return (
        <div className="templateCard">
            <div className="templateCard__title" style={ styles } onClick={ handlePreview }>
                <div style={ styles } className="templateCard__preview">
                    <p>Preview { template.fileName }</p>
                </div>
                <div style={ styles } className="templateCard__downloadDesc" ref={ downloadDesc }>
                    <p>Download { template.fileName }</p>
                </div>
                <h2>{ template.name }</h2>
                <p className="templateCard__responsivePreview">Click to preview {template.fileName}.</p>
            </div>
            <div className="templateCard__descContainer">
                <div className="templateCard__desc">
                    <div className="templateCard__info">
                        <h3>by { template.author }</h3>
                        <p>{ time.fromNow() }</p>
                    </div>
                    <div className="templateCard__download" onClick={ handleDownload }>
                        <p>{ downloadCount }</p>
                        <GetAppIcon className="templateCard__downloadIcon" onMouseOver={ onDownloadHover } onMouseOut={ outDownloadHover } />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TemplateCard
