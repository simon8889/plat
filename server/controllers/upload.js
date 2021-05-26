import multer from 'multer'
import path from "path"
import Template from '../models/Template.js'
import colorsList from "../colors.js"

const randomString = (length) => {
    let result = [];
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    
    for ( let i = 0; i < length; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }

    return result.join('');
}

const storage = multer.diskStorage({
    destination: "./templates/",
    filename: (req, file, callback) => {
        callback(null, `TEMPLATE-${Date.now()}-${randomString(10)}-${file.originalname}`)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5242880
    }
}).single("file")

export default (req, res) => {
    upload(req, res, () => {
        
        const tempData = {
            name: req.body.name,
            author: req.body.author,
            fileName: req.file.originalname,
            serverStorageFileName: req.file.filename,
            filePath: req.file.path,
            background: colorsList[Math.floor(Math.random() * colorsList.length)]

        }
        
        new Template(tempData).save()
            .then(data => res.status(201).json({templateData: data}))
            .catch(err => res.status(406).json({error: err}))
    })
} 