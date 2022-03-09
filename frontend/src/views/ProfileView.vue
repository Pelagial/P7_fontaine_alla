<template>
  <div class="profile">
    <header class="profile_header">
      <RouterLink to="/home">
        <fa class="profile_header-home" icon="arrow-left" />
      </RouterLink>
      <h1 class="profile_header-user-name">{{ user.username }}</h1>
    </header>
    <main v-if="mode == 'profile'">
      <div class="profile_wrapper">
        <div class="profile-content">
          <div class="profile_user-img">
            <img v-if="user.imageUrl" :src="user.imageUrl" alt="Photo de profil de l'utilisateur" />
            <fa v-else="user.imageUrl === null" class="default_userIcon" icon="circle-user"></fa>          
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
          
          <div class="profile_user-action">
            <fa @click.prevent="update()" class="profile_user-action-update" icon="pen-to-square" />
            <fa class="profile_user-action-logout" icon="arrow-right-to-bracket" @click.prevent="logout()" />
            <fa class="profile_user-action-delete" icon="trash-can" @click.prevent="deleteAccount()" />
          </div>

          <div class="profile_user-publications">
          <h2>Mes publications</h2>
              <userPublicationsCard/>
          </div>
          
        </div>
      </div>
    </main>
    <main v-else="mode == 'updateProfile'">
      <updateProfile/>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import updateProfile from '../components/updateProfile.vue'
import userPublicationsCard from '../components/userPublicationsCard.vue'

export default {
  name: 'profile',
  data: function (){
        return{
            mode:'profile',
        }
  },
  components: {
        updateProfile,
        userPublicationsCard
  },
  beforeMount(){
      if (this.$store.state.user.userId == -1) {
      this.$router.push('/');
      localStorage.removeItem('user');
      return;
      };
  },
  mounted: function () {
    this.$store.dispatch('getUserInfos');
  },
  computed: {
    ...mapState({
      user: 'userInfos',
    })
  },
  methods: {
    update() {
      this.mode='updateProfile';
    },
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
