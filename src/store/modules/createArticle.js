import articleApi from '@/api/article'

const state = {
    isSubmitting: false,
    validationErrors: null
}

export const mutationTypes = {
    createArticleStart: '[createArticle] Create article Start',
    createArticleSuccess: '[createArticle] Create article Success',
    createArticleFailure: '[createArticle] Create article Failure'
}

export const actionTypes = {
    createArticle: '[createArticle] Create article'
}

const mutations = {
    [mutationTypes.createArticleStart](state) {
        state.isSubmitting = true
    },

    [mutationTypes.createArticleSuccess](state) {
        state.isSubmitting = false
    },

    [mutationTypes.createArticleFailure](state, payload) {
        state.isSubmitting = false
        state.validationErrors = payload
    }
}

const actions = {
    // от нашего компонента получ обьект {articleInput}
    [actionTypes.createArticle](context, {articleInput}) {
        return new Promise(resolve => {
            context.commit(mutationTypes.createArticleStart)
            articleApi.createArticle(articleInput).then(article => {
                // передать статью котор получили от бэк
                context.commit(mutationTypes.createArticleSuccess, article)
                // получ обратно статью
                resolve(article)
            }).catch(result => {
                context.commit(mutationTypes.createArticleFailure, result.response.data.errors)
            })
        })
    }
}

export default {
    state,
    actions,
    mutations
}