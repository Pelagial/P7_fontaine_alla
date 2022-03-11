<template>
  <div class="profile">
    <header v-if="mode == 'account'" class="profile_header">
      <RouterLink to="/home">
        <fa class="profile_header-home" icon="arrow-left" />
      </RouterLink>
      <h1 class="profile_header-user-name">{{ user.pseudo }}</h1>
    </header>
    <header v-else class="profile_header">
        <fa @click="reloadPage" class="profile_header-home" icon="arrow-left" />
      <h1 class="profile_header-user-name">{{ user.pseudo }}</h1>
    </header>
    <main v-if="mode == 'account'">
      <div class="profile_wrapper">
        <div class="profile-content">
          <div class="profile_user-img">
            <img v-if="user.photo" :src="user.photo" alt="Photo de profil de l'utilisateur" />
            <fa v-else="user.photo === null" class="default_userIcon" icon="circle-user"></fa>          
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
            <fa class="profile_user-action-logout" icon="arrow-right-to-bracket" @click="logout" />
            <fa class="profile_user-action-delete" icon="trash-can" @click="deleteAccount(user.id)" />
          </div>          
        </div>
      </div>
    </main>
    <main v-else="mode == 'updateAccount'">
      <updateAccount/>
    </main>
  </div>
</template>

<script>
import updateAccount from '../components/updateAccount.vue'

export default {
  name: 'account',
  data: function (){
        return{
            mode:'account',
        }
  },
  components: {
        updateAccount
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  beforeMount(){
      if (this.$store.state.isLoggedIn) {
        return "black";
      } else {
        this.$router.push('/');
        return;
      };
  },
  mounted() {
    this.$store.dispatch("getUserById");
  },
  methods: {
    reloadPage() {
      this.$router.go();
    },
    getBackHome() {
      this.$router.push('/');
    },
    update() {
      this.mode='updateAccount';
    },
    logout() {
      this.$store.dispatch("logout");
      setTimeout(() => {
        this.getBackHome();
      }, 2000);
    },
    deleteAccount(id) {
      this.$store.dispatch("deleteAccount", id);
      this.$store.dispatch("logout");
      setTimeout(() => {
        this.getBackHome();
      }, 2000);
    },
  }
}
</script>
