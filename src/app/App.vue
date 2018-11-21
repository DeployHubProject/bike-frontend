<template>
    <div class="jumbotron">
        <div class="container">
            <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
            <div class="row d-flex justify-content-center">
                    <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'app',
    computed: {
        ...mapState({
            alert: state => state.alert
        })
    },
    methods: {
        ...mapActions({
            clearAlert: 'alert/clear' 
        })
    },
    watch: {
        $route (to, from){
            // clear alert on location change
            this.clearAlert();
        }
    } 
};
</script>