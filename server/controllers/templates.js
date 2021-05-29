import Template from "../models/Template.js";
import path, { dirname } from 'path'
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url));

export const getTemplates = (req, res) => {
    Template.find({})
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).json({ error: true }))
} 

export const downloadAdd = (req, res) => {
    const id = req.params.id
    Template.findByIdAndUpdate(id, {$inc: { downloadCount: 1 }})
        .then(() => {
            Template.findById(id)
                .then(data => res.status(200).json({ updated: true, newObject: data }))
                .catch(err => res.status(500).json({ error: err }))
        })
        .catch(err => res.status(500).json({ error: err }))
        
}

export const searchTemp = (req, res) => {
    const search = req.params.search; 
    Template.find({ name: { $regex: search, $options: "i" } } )
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).json({ error: err }))
}