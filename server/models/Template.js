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
    serverStorageFileName: {
        type: String,
        require: true
    },
    filePath: {
        type: String,
        require: true
    },
    background: {
        type: String,
        require: true,
        default: "#8d9990"
    }
})

export default mongoose.model("template", template)
