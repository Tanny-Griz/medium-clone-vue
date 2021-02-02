import axios from '@/api/axios'

// без параметра, потому что с одного апи
const getTags = () => {
    return axios.get('/tags').then(res => res.data.tags)
}

export default {
    getTags
}