<template>
    <div>
        <h5 style="margin-bottom:30px">You are logged in as {{account.user.username}} with the {{account.user.feature}} feature.</h5>
     <div id="bike" style="height: 550px;">   
    <div id="bike-frame">
             <img :src="account.bikeframe" >
	</div>
    <div id="bike-seat" style="position:relative;top:-480px;left:184px">
             <img :src="account.bikeseat" >
	</div>
       <div id="bike-front" style="position:relative;top:-442px;left:469px">
             <img :src="account.bikefront" >
	</div>
    <div id="bike-rear" style="position:relative;top:-736px;left:49px">
             <img :src="account.bikerear" >
	</div>
    </div>
    <div>
        <p>Features assigned to all users:</p>
        <em v-if="users.loading">Loading users...</em>
        <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>
        <ul v-if="users.items">
            <table class="table table-bordered">
            <thead class="thead-light"><tr><th>User Name</th><th>Feature</th></tr> </thead>  
            <tbody>
            <tr v-for="user in users.items" :key="user.id">
                <td>{{user.username}}</td><td>{{user.feature}}</td>
            </tr>
            </tbody>
            </table>
        </ul>
        <p>
            <router-link to="/login">
            <button>Logout</button></router-link>
        </p>
     </div>   
    </div>

</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState({
            account: state => state.account,
            users: state => state.users.all,
        })
    },
    created () {
        this.$store.dispatch('account/getUserDetails');
        this.getAllUsers(this.account.user);
    },
    methods: {
        ...mapActions('users', {
            getAllUsers: 'getAll',
            deleteUser: 'delete'
        })
    }
};  

</script>