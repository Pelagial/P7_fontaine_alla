<template>
    <header class="profile_header">
        <RouterLink to="/profile">
            <fa class="profile_header-home" icon="arrow-left" />
        </RouterLink>
        <h1 class="profile_header-user-name">{{ user.username }}</h1>
    </header>

    <updateProfile/>

</template>

<script>
import updateProfile from '../components/updateProfile.vue'
import { mapState } from 'vuex'

export default {
    name: 'upProfile',
    components: {
        updateProfile
    },
    data: function () {
        return {
            
        }
    },
    mounted: function () {
        if (this.$store.state.user.userId == -1) {
            this.$router.push('/');
            return;
        };
        this.$store.dispatch('getUserInfos');
    },
    computed: {
        ...mapState({
            user: 'userInfos',
        })
    },
    methods: {
        
    }
}
</script>