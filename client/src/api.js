import axios from 'axios'

const url = "http://localhost:9000/"

export const createTemp = (template) => axios.post(`${url}templates/create`, template, { headers: { 'Content-Type': 'multipart/form-data' }})