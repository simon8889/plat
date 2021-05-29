import axios from 'axios'

const url = process.env.REACT_APP_API_URL
console.log(url)

export const createTemp = (template) => axios.post(`${url}templates/create`, template, { headers: { 'Content-Type': 'multipart/form-data' }})
export const getTemplates = () => axios.get(`${url}templates/gettemps`)
export const getFile = (fileUrl) => axios.get(fileUrl)
export const addDownload = (id) => axios.put(`${url}templates/downloadadd/${id}`)
export const searchTemp = (name) => axios.get(`${url}templates/search/${name}`)
