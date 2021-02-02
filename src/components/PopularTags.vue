<template>
<div>
    <McvLoading v-if="isLoading" />
    <McvErrorMessage v-if="error" />
    <div 
        v-if="tags"
        class="sidebar"
        >
        <div>
            <p>Popular Tags</p>
            <div class="tag-list">
                <router-link v-for="tag in tags" :key="tag"
                    :to="{name: 'tag', params: { slug: tag }}" 
                    class="tag-default tag-pill">
                    {{tag}}
                </router-link>
            </div>
        </div>
    </div>    
</div>

</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/tags'
import McvLoading from '@/components/Loading'
import McvErrorMessage from '@/components/ErrorMessage'

export default {
    name: 'McvPopularTags',
    components: {
        McvLoading,
        McvErrorMessage
    },
    computed: {
        ...mapState({
            isLoading: state => state.tags.isLoading,
            tags: state => state.tags.data,
            error: state => state.tags.error
        }),
    },
    mounted() {
        this.$store.dispatch(actionTypes.getTags)
    }

}
</script>