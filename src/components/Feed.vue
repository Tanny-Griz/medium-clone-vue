<template>
  <div>
    <McvErrorMessage v-if="error" />
    <div v-if="feed">
        <div 
            class="article-preview"
            v-for="(article, index) in feed.articles"
            :key="index">
            <div class="article-meta">
                <router-link 
                    :to="{name: 'userProfile', params: {slug: article.author.username}}"
                >
                <img :src="article.author.image" alt="author-image" />
                </router-link>
                <div class="info">
                    <router-link
                        :to="{name: 'userProfile', params: {slug: article.author.username}}"
                        class="author"
                    >
                    {{article.author.username}}
                    </router-link>
                    <span class="date">{{article.createdAt}}</span>
                </div>
                <div class="pull-xs-right">
                    ADD TO FAVOR
                </div>
            </div>
            
            <router-link 
                :to="{name: 'article', params: {slug: article.slug}}"
                class="preview-link"
                >
                <h1>{{article.title}}</h1>
                <p>{{article.description}}</p>
                <span>Read more...</span>
                <!-- <McvTagList :tags="article.tagList" /> -->
            </router-link>
        </div>
        <McvPagination 
            :total="feed.articlesCount" 
            :limit="limit" 
            :current-page="currentPage"
            :url="baseUrl"
        />
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/feed'
import McvPagination from '@/components/Pagination'
import {limit} from '@/helpers/vars'
import {stringify, parseUrl} from 'query-string'
import McvErrorMessage from '@/components/ErrorMessage'
// import McvTagList from '@/components/TagList'

export default {
    name: 'McvFeed',
    props: {
        apiUrl: {
            type: String,
            required: true
        }
    },
    components: {
        McvPagination,
        McvErrorMessage,
        // McvTagList
    },
    // декларативно и имутабельно, просто опис переменные, но не меняем ничего!90% случ
    computed: {
        ...mapState({
            isLoading: state => state.feed.isLoading,
            feed: state => state.feed.data,
            error: state => state.feed.error
        }),
        currentPage() {
            return Number(this.$route.query.page || '1')
        },
        baseUrl() {
            return this.$route.path
        },
        offset() {
            return this.currentPage * limit - limit // p 1 * 10 - 10 = 0, p 2 * 10 - 10 = 10
        }
    },
    // на колбеках, 
    watch: {
        // локальн перем за которой хотим наблюдаьт, перезагр данные на стр!
        currentPage() {
            this.fetchFeed()
        }
    },
    mounted() {
        this.fetchFeed()
    },
    methods: {
        fetchFeed(){
            //получили снаружи урл и парсим
            const parsedUrl = parseUrl(this.apiUrl)
            const stringifiedParams = stringify({
                limit,
                offset: this.offset,
                ...parsedUrl.query
            })
            const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
            this.$store.dispatch(actionTypes.getFeed, {apiUrl: apiUrlWithParams})

        }
    },
    data() {
        return {
            // total: 500,
            limit,
            // currentPage: 5,
            url: '/'
        }
    }
}
</script>