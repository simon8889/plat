import axios from 'axios'

const url = "http://localhost:9000/"

export const createTemp = (template) => axios.post(`${url}templates/create`, template, { headers: { 'Content-Type': 'multipart/form-data' }})
export const getTemplates = () => axios.get(`${url}templates/gettemps`)
export const getFile = (id) => axios.get(`${url}templates/file/${id}`)
export const addDownload = (id) => axios.put(`${url}templates/downloadadd/${id}`)
export const searchTemp = (name) => axios.get(`${url}templates/search/${name}`)
