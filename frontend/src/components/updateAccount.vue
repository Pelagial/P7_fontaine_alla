<template>
    <div class="profile_update-wrapper">
        <div class="profile_update-content">
            <div class="profile_user-img">
                <img class="preview_picture" :src="user.photo" alt="Photo de profil de l'utilisateur" />
            </div>
            <div class="profile_update-wrapper">
                <form class="profile_update-profile_info" >
                    <div class="profile_update-profile_user-img">
                        <label for="imageUrl">
                            <strong>Image de profile</strong>
                        </label>
                        <input 
                        @change="uploadImage"
                        type="file"
                        accept="image/png, image/jpeg,
                        image/bmp"
                        ref="file"
                        name="file"
                        />
                    </div>
                    <div class="profile_update-container">
                        <label for="pseudo">
                            <strong>{{ user.pseudo }}</strong>
                        </label>
                        <input
                            v-model="newPseudo"
                            type="text"
                            placeholder="Enter New Pseudo"
                            name="newPseudo"
                        />
                        <label for="bio">
                            <strong>
                                Bio
                                <br />
                                {{ user.bio }}
                            </strong>
                        </label>
                        <textarea
                            v-model="newBio"
                            class="profile_update-bio"
                            type="text"
                            rows="3"
                            placeholder="Enter  Your Bio"
                            name="newBio"
                        />
                    </div>
                    <span class="alert_message" v-html="errorMessage" />
                    <span class="alert_message" v-html="message" />
                    <button
                        class="post-button"
                        type="submit"
                        @click.prevent="updateAccount(user.id)"
                    >MODIFIER LE PROFIL</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'updateAccount',
    data() {
        return {
            file: "",
            newPseudo: "",
            newBio: "",
            message: null,
            errorMessage: null,
        }
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },
    },
    beforeMount() {
        this.$store.dispatch("getUserById");
    },
    methods: {
        uploadImage() {
            const preview = document.querySelector('.preview_picture');
            const reader = new FileReader();
            const imageUrlPrev = reader.readAsDataURL(this.$refs.imageUrl.files[0]);
            reader.addEventListener("load", function () {
                // on convertit l'image en une chaîne de caractères base64
                preview.src = reader.result;
            }, false);
        },
        uploadImage() {
            const preview = document.querySelector('.preview_picture');
            const reader = new FileReader();
            const file = this.$refs.file.files[0];
            reader.readAsDataURL(file);
            reader.addEventListener("load", function () {
                // we convert image in string base64
                preview.src = reader.result;
            }, false);
            this.file = file;
            console.log(this.file);
        },
        updateAccount() {
            const formData = new FormData();
            formData.append("pseudo", this.newPseudo);
            formData.append("bio", this.newBio);
            if (this.file !== null) {
                formData.append("image", this.file);
            }
            this.$store.dispatch("getUsers");
            this.$store.dispatch("getUserById", this.user.id);
            this.$store.dispatch("updateAccount", formData);
            this.$store.dispatch("getUserById", this.user.id);
        },
    }
}
</script>