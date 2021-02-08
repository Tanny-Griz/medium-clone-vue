<template>
  <div>
    
    <McvLoading v-if="isLoading" />
    <McvArticleForm 
      :initial-values="initialValues"
      :errors="validationErrors"
      :is-submitting="isSubmitting" 
      @articleSubmit="onSubmit" />
  </div>
</template>

<script>
// import mapState from 'vuex'
import McvArticleForm from '@/components/ArticleForm'
import McvLoading from '@/components/Loading'
import {actionTypes} from '@/store/modules/editArticle'

export default {
    name: 'McvEditArticle',
    components: {
      McvArticleForm,
      McvLoading
    },
    computed: {
      // ...mapState({
        // isSubmitting: state => state.editArticle.isSubmitting,
        // isLoading: state => state.editArticle.isLoading,
        // article: state => state.editArticle.article,
        // validationErrors: state => state.editArticle.validationErrors
      // }),
      isSubmitting() {
        return this.$store.state.editArticle.isSubmitting
      },
      validationErrors() {
        return this.$store.state.editArticle.validationErrors
      },
      article() {
        return this.$store.state.editArticle.article
      },
      isLoading() {
        return this.$store.state.editArticle.isLoading
      },
      initialValues() {
          if(!this.article) {
              return {
                title: '',
                description: '',
                body: '',
                tagList: []
              }
          }
          return {
            title: this.article.title,
            description: this.article.description,
            body: this.article.body,
            tagList: this.article.tagList
          }
      }
    },
    // при инициализации зафетчить данные
    mounted() {
        this.$store.dispatch(actionTypes.getArticle, {
            slug: this.$route.params.slug
        })
    },
    methods: {
      onSubmit(articleInput) {
          const slug = this.$route.params.slug
          this.$store.dispatch(actionTypes.updateArticle, {slug, articleInput}).then(article => {
            this.$router.push({name: 'article', params: {slug: article.slug}})
          })
      }
    },
}
</script>