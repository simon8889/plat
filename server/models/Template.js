import mongoose from 'mongoose'

const template = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: new Date
    },
    downloadCount: {
        type: Number,
        default: 0
    },
    fileName: {
        type: String,
        require: true
    },
    background: {
        type: String,
        require: true,
        default: "#8d9990"
    },
    resourceId: {
        type: String, 
        require: true
    },
    resourceUrl: {
        type: String, 
        require: true
    }
})

export default mongoose.model("template", template)
