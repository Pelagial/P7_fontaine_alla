<template>
  <div class="profile">
    <header class="profile_header">
      <RouterLink to="/home">
        <fa class="profile_header-home" icon="arrow-left" />
      </RouterLink>
      <h1 class="profile_header-user-name">{{ user.username }}</h1>
    </header>
    <main>
      <div class="profile_wrapper">
        <div class="profile-content">
          <div class="profile_user-img">
            <img :src="user.picture" alt="Photo de profil de l'utilisateur" />
          </div>
          <div class="profile_user-infos">
            <ul>
              <li>
                <h2>email : {{ user.email }}</h2>
              </li>
              <li>
                <h2>Bio</h2>
              </li>
              <li>
                <p>{{ user.bio }}</p>
              </li>
            </ul>
          </div>
          <div class="profile_user-publications">
            <div class="profile_user-publication_1">
              <img
                class="publication_media"
                src="../assets/images/fabio-alves-IQCwKOpIQro-unsplash.jpg"
                alt="Photo de plusieur personnes qui boivent un verre"
              />
            </div>
            <div class="profile_user-publication_2">
              <img
                class="publication_media"
                src="../assets/images/fabio-alves-IQCwKOpIQro-unsplash.jpg"
                alt="Photo de plusieur personnes qui boivent un verre"
              />
            </div>
            <div class="profile_user-publication_3">
              <img
                class="publication_media"
                src="../assets/images/fabio-alves-IQCwKOpIQro-unsplash.jpg"
                alt="Photo de plusieur personnes qui boivent un verre"
              />
            </div>
            <div class="profile_user-publication_4">
              <img
                class="publication_media"
                src="../assets/images/fabio-alves-IQCwKOpIQro-unsplash.jpg"
                alt="Photo de plusieur personnes qui boivent un verre"
              />
            </div>
          </div>
          <div class="profile_user-action">
            <RouterLink to="profile/update">
              <fa class="profile_user-action-update" icon="pen-to-square" />
            </RouterLink>
            <fa class="profile_user-action-logout" icon="arrow-right-to-bracket" @click.prevent="logout()" />
            <fa class="profile_user-action-delete" icon="trash-can" @click.prevent="deleteAccount()" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'profile',
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
    logout() {
      this.$store.commit('logout');
      this.$router.push('/');
    },
    deleteAccount() {
      const self = this;
      this.$store.dispatch('deleteAccount')
        .then(function () {
          self.$store.commit('logout');
          self.$router.push('/');
        }, function (error) {
          console.log(error);
        })
    },
  }
}
</script>
