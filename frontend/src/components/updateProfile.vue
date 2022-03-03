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
                        <input 
                        @change="uploadImage"
                        type="file"
                        accept="image/png, image/jpeg,
                        image/bmp, image/gif"
                        ref="picture"
                        name="picture"
                        />
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
            localStorage.removeItem('user');
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
            return picture;
        },
        uploadImage() {
            const preview = document.querySelector('.preview_picture');
            const picture = this.$refs.picture.files[0];

            const reader = new FileReader();
            reader.addEventListener("load", function () {
                // on convertit l'image en une chaîne de caractères base64
                preview.src = reader.result;
            }, false);

            if (picture) {
                reader.readAsDataURL(picture);
            }
            this.file = picture;
            console.log(picture);
        },
        updateAccount() {
            const formData = new FormData();
            formData.append("username", this.username);
            formData.append("bio", this.bio);
            if (this.file !== null) {
                formData.append("picture", this.file);
            }
            this.$store.dispatch('updateAccount', formData)
                .then(function (res) {
                    console.log(res);
                },
                    function (error) {
                        console.log(error);
                    })
            this.$router.push('home');
        },
    }
}
</script>