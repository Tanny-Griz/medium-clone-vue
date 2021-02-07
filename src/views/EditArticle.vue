<template>
  <div>
    <McvArticleForm 
      :initial-values="initialValues"
      :errors="validationErrors"
      :is-submitting="isSubmitting" 
      @articleSubmit="onSubmit" />
  </div>
</template>

<script>
// import mapState from 'vuex'
// import McvArticleForm from '@/components/ArticleForm'
// import {actionTypes} from '@/store/modules/createArticle'

// export default {
//     name: 'McvCreateArticle',
//     components: {
//       McvArticleForm
//     },
//     data() {
//       return {
//         initialValues: {
//           title: '',
//           description: '',
//           body: '',
//           tagList: []
//         },
//         // validationErrors: null,
//         // isSubmitting: false
//       }
//     },
//     computed: {
//       // ...mapState({
//       //   isSubmitting: state => state.createArticle.isSubmitting,
//       //   validationErrors: state => state.createArticle.validationErrors
//       // })
//       isSubmitting() {
//         return this.$store.state.createArticle.isSubmitting
//       },
//       validationErrors() {
//         return this.$store.state.createArticle.validationErrors
//       }
//     },
//     methods: {
//       onSubmit(articleInput) {
//           this.$store.dispatch(actionTypes.createArticle, {articleInput}).then(article => {
//           this.$router.push({name: 'article', params: {slug: article.slug}})
//           })
//         console.log('sbmt', articleInput);
//       }
//     },
// }
</script>