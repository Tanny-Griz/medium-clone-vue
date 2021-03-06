import axios from '@/api/axios'

//метод делает апи запрос и передает наши креденшины из формы в нужной структуре
const register = credentials => {
    return axios.post('/users', {user: credentials})
}
// метод для логина
const login = credentials => {
    return axios.post('/users/login', {user: credentials})
}

const getCurrentUser = () => {
    return axios.get('/user')
}

const updateCurrentUser = currentUserInput => {
    return axios.put('/user', {user: currentUserInput}).then(response => response.data.user)
}

// апдейт текущего юзера

export default {
    register,
    login,
    getCurrentUser,
    updateCurrentUser
}