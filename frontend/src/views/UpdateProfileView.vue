<template>
    <header class="profile_header">
        <RouterLink to="/profile">
            <fa class="profile_header-home" icon="arrow-left" />
        </RouterLink>
        <h1 class="profile_header-user-name">{{ user.username }}</h1>
    </header>
    <div class="profile_update-wrapper">
        <div class="profile_update-content">
            <div class="profile_user-img">
                <img :src="user.picture" alt="Photo de profil de l'utilisateur" />
            </div>
            <div class="profile_update-wrapper">
                <form class="profile_update-profile_info">
                    <div class="profile_update-profile_user-img">
                        <label for="pictures">
                            <strong>Image de profile</strong>
                        </label>
                        <input v-on:change="picture" type="file" name="pictures" accept="image/*" capture />
                    </div>
                    <div class="profile_update-container">
                        <label for="username"><strong>{{ user.username }}</strong></label>
                        <input v-model="username" type="text" placeholder="Enter New Username" name="username">
                        <label for="bio">
                            <strong>
                                Bio
                                <br />
                                {{ user.bio }}
                            </strong>
                        </label>
                        <textarea
                            v-model="bio"
                            class="profile_update-bio"
                            type="text"
                            rows="3"
                            placeholder="Enter  Your Bio"
                            name="bio"
                        />
                    </div>
                    <button
                        class="publication-button"
                        type="submit"
                        @click.prevent="updateAccount()"
                    >MODIFIER LE PROFIL</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'updateProfile',
    data: function () {
        return {
            picture:'',
            username: '',
            bio: '',
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
        updateAccount() {
            const self = this;
            this.$store.dispatch('updateAccount', {
                picture:this.picture,
                username: this.username,
                bio: this.bio
            })
                .then(function () {
                    self.$router.push('/profile');
                }, function (error) {
                    console.log(error);
                })
        },
    }
}
</script>