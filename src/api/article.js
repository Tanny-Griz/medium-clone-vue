import axios from '@/api/axios'
import { response } from 'express'

const getArticle = slug => {
    return axios.get(`/articles/${slug}`).then(response => response.data.article)
}

const deleteArticle = slug => {
    return axios.delete(`/articles/${slug}`)
}
// боди для api, передать на бек
const createArticle = articleInput => {
    return axios.post('/articles', {article: articleInput}).then(response => response.data.article)
}

const updateArticle = (slug, articleInput) => {
    return axios.put(`/articles/${slug}`, articleInput).then( response => response.data.article)
}

export default {
    getArticle,
    deleteArticle,
    createArticle,
    updateArticle
}