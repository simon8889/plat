import multer from 'multer'
import Template from '../models/Template.js'
import colorsList from "../colors.js"
import path from "path"
import dotenv from "dotenv"
import { v2 as cloudinary } from "cloudinary"

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
}); 

const randomString = (length) => {
    let result = [];
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    
    for ( let i = 0; i < length; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }

    return result.join('');
}

const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".html") {
            cb(new Error("File type is not supported"), false);
            return;
        }
        cb(null, true);
    },
    limits: {
        fileSize: 5242880
    } 
}).single("file")

export default (req, res) => {
    upload(req, res, async () => {
        try {
            const result = await cloudinary.uploader.upload(req.file.path,  {
                public_id: `TEMPLATE-${Date.now()}-${randomString(10)}-${req.file.originalname}`,
                resource_type: "raw",
                folder: "plat"
            })
            
            const tempData = {
                name: req.body.name,
                author: req.body.author,
                fileName: req.file.originalname,
                resourceId: result.public_id,
                resourceUrl: result.url,
                background: colorsList[Math.floor(Math.random() * colorsList.length)]
            }
            
            const data = await new Template(tempData).save()
            res.status(201).json({templateData: data})
        }
        catch(err) {
            res.status(406).json({error: err})
        }
    })
} 