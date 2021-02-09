import authApi from '@/api/auth'
import {setItem} from '@/helpers/persistanceStorage'

// описываем состояние нашего модуля
const state = {
    isLoading: true,
    isSubmitting: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null
}

export const mutationTypes = {
    registerStart: '[auth] registerStart',
    registerSuccess: '[auth] registerSuccess',
    registerFailure: '[auth] registerFailure',

    loginStart: '[auth] loginStart',
    loginSuccess: '[auth] loginSuccess',
    loginFailure: '[auth] loginFailure',

    getCurrentUserStart: '[auth] getCurrentUserStart',
    getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
    getCurrentUserFailure: '[auth] getCurrentUserFailure',

    updateCurrentUserStart: '[auth] updateCurrentUserStart',
    updateCurrentUserSuccess: '[auth] updateCurrentUserSuccess',
    updateCurrentUserFailure: '[auth] updateCurrentUserFailure',

    logout: '[auth] logout'
}
// экшины для диспатча
export const actionTypes = {
    register: '[auth] register',
    login: '[auth] login',
    getCurrentUser: '[auth] getCurrentUser',
    updateCurrentUser: '[auth] updateCurrentUser',
    logout: '[auth] logout'
}

export const getterTypes = {
    currentUser: '[auth] currentUser',
    isLoggedIn: '[auth] isLoggedIn',
    isAnonymous: '[auth] isAnonymous'
}
const getters = {
    [getterTypes.currentUser]: state => {
        return state.currentUser
    },
    [getterTypes.isLoggedIn]: state => {
        return Boolean(state.isLoggedIn)
    },
    [getterTypes.isAnonymous]: state => {
        return state.isLoggedIn === false
    }
}

// как мы меняем это состояние
// регистрир мутаций, mutations, actions глобальны, доступня с любого места
const mutations = {
    [mutationTypes.registerStart](state){
        state.isSubmitting = true
        state.validationErrors = null
    },
    [mutationTypes.registerSuccess](state, payload){
        state.isSubmitting = false
        state.currentUser = payload
        state.isLoggedIn = true
    },
    [mutationTypes.registerFailure](state, payload){
        state.isSubmitting = false
        state.validationErrors = payload
    },

    [mutationTypes.loginStart](state){
        state.isSubmitting = true
        state.validationErrors = null
    },
    [mutationTypes.loginSuccess](state, payload){
        state.isSubmitting = false
        state.currentUser = payload
        state.isLoggedIn = true
    },
    [mutationTypes.loginFailure](state, payload){
        state.isSubmitting = false
        state.validationErrors = payload
    },

    [mutationTypes.getCurrentUserStart](state){
        state.isLoading = true
    },
    [mutationTypes.getCurrentUserSuccess](state, payload){
        state.isLoading = false
        state.currentUser = payload
        state.isLoggedIn = true
    },
    [mutationTypes.getCurrentUserFailure](state){
        state.isLoading = false
        state.isLoggedIn = false
        state.currentUser = null
    },

    [mutationTypes.updateCurrentUserStart]() {},
    [mutationTypes.updateCurrentUserSuccess](state, payload) {
        state.currentUser = payload
    },
    [mutationTypes.updateCurrentUserFailure]() {},

    [mutationTypes.logout](state) {
        state.currentUser = null
        state.isLoggedIn = false
    }
}

const actions = {
    // все action врапить в промисы, что б подписаться в компоненте
    [actionTypes.register](context, credentials) {
        return new Promise(resolve => {
            context.commit(mutationTypes.registerStart)
            authApi.register(credentials).then(response => {
                // коммитим мутацию что б поменять состояние
                context.commit(mutationTypes.registerSuccess, response.data.user)
                setItem('accessToken', response.data.user.token)
                resolve(response.data.user)
            }).catch(result => {
                context.commit(mutationTypes.registerFailure, result.response.data.errors)
            })
        })
    },

    [actionTypes.login](context, credentials) {
        return new Promise(resolve => {
            context.commit(mutationTypes.loginStart)
            authApi.login(credentials).then(response => {
                // коммитим мутацию что б поменять состояние
                context.commit(mutationTypes.loginSuccess, response.data.user)
                setItem('accessToken', response.data.user.token)
                resolve(response.data.user)
            }).catch(result => {
                context.commit(mutationTypes.loginFailure, result.response.data.errors)
            })
        })
    },

    [actionTypes.getCurrentUser](context) {
        return new Promise(resolve => {
            context.commit(mutationTypes.getCurrentUserStart)
            authApi.getCurrentUser().then(response => {
                // коммитим мутацию что б поменять состояние
                context.commit(mutationTypes.getCurrentUserSuccess, response.data.user)
                resolve(response.data.user)
            }).catch(() => {
                context.commit(mutationTypes.getCurrentUserFailure)
            })
        })
    },

    [actionTypes.updateCurrentUser](context, {currentUserInput}) {
        console.log('www  ', context, 'ddd  ', currentUserInput);
        return new Promise(resolve => {
            context.commit(mutationTypes.updateCurrentUserStart)
            authApi.updateCurrentUser(currentUserInput).then(user => {
                console.log(user);
                context.commit(mutationTypes.updateCurrentUserSuccess, user)
                resolve(user)
            }).catch(result => {
                context.commit(mutationTypes.updateCurrentUserFailure, result.response.data.errors)
            })
        })
    },

    [actionTypes.logout](context) {
        return new Promise(resolve => {
            setItem('accessToken', '')
            context.commit(mutationTypes.logout)
            resolve()
        })
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}