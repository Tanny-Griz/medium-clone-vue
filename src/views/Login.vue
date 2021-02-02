<template>
    <div class="auth-page">
        <div class="conteiner-page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">Sign in</h1>
                    <router-link :to="{name: 'register'}">Need an account?</router-link>
                    <McvValidationErrors 
                        v-if="validationErrors" 
                        :validation-errors="validationErrors"
                        />
                    <form @submit.prevent="onSubmit">
                        <fieldset class="form-group">
                            <input 
                                type="text"
                                class="form-control form-control-lg"
                                placeholder="Email"
                                v-model="email"
                            />
                        </fieldset>
                        <fieldset class="form-group">
                            <input 
                                type="password"
                                class="form-control form-control-lg"
                                placeholder="Password"
                                v-model="password"
                            />
                        </fieldset>
                        <button 
                            class="btn btn-lg btn-primary pull-xs-right"
                            :disabled="isSubmitting"
                            >
                            Sign in
                        </button>
                    </form>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex' //computed более удобно создает
import McvValidationErrors from '@/components/ValidationErrors'
import {actionTypes} from '@/store/modules/auth'
export default {
    name: 'McvLogin',
    components: {
        McvValidationErrors
    },
    data() {
        return {
            email: '',
            password: ''
        }
    },
    computed: {
        // спред что б получить рез-т в computed
        ...mapState({
            isSubmitting: state => state.auth.isSubmitting,
            validationErrors: state => state.auth.validationErrors
        }),
        // isSubmitting() {
        //     return this.$store.state.auth.isSubmitting
        // },
        // validationErrors() {
        //     return this.$store.state.auth.validationErrors
        // }
    },
    methods: {
        onSubmit() {
            this.$store.dispatch(actionTypes.login, {
                email: this.email, 
                password: this.password
                }).then(() => {
                    this.$router.push({name: 'globalFeed'})
                })
        }
    }
    
}
</script>