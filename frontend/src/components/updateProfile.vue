<template>
    <div class="profile_update-wrapper">
        <div class="profile_update-content">
            <div class="profile_user-img">
                <img class="preview_picture" :src="user.picture" alt="Photo de profil de l'utilisateur" />
            </div>
            <div class="profile_update-wrapper">
                <form class="profile_update-profile_info" enctype="multipart/form-data">
                    <div class="profile_update-profile_user-img">
                        <label for="pictures">
                            <strong>Image de profile</strong>
                        </label>
                        <input type="file" @change="getFile" ref="picture" />
                    </div>
                    <div class="profile_update-container">
                        <label for="username">
                            <strong>{{ user.username }}</strong>
                        </label>
                        <input
                            v-model="username"
                            type="text"
                            placeholder="Enter New Username"
                            name="username"
                        />
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
    data() {
        return {
            picture: '',
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
        previewFile() {
            const preview = document.querySelector('.preview_picture');
            const picture = document.querySelector('input[type=file]').files[0];
            const reader = new FileReader();
            
            reader.addEventListener("load", function () {
                // on convertit l'image en une chaîne de caractères base64
                preview.src = reader.result;
            }, false);

            if (picture) {
                reader.readAsDataURL(picture);
            }
        },
        getFile(){
            const file = document.querySelector('input[type=file]').files[0];
            if (file){
                const picture = window.URL.createObjectURL(file);
                console.log(picture);
            }    
        },
        updateAccount() {
            const file = document.querySelector('input[type=file]').files[0];
            
            this.$store.dispatch('updateAccount', {
                picture: picture,
                username: this.username,
                bio: this.bio
            })
                .then(function (res) {
                    console.log(res);
                },
                    function (error) {
                        console.log(error);
                    })
            this.$router.push('/home');
        },
    }
}
</script>