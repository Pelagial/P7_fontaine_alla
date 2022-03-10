<template>
<div class="user-signup">

</div>
<RouterView />
</template>


<script>
import { RouterLink, RouterView } from 'vue-router';

export default {
  name: "app",
  data: () => {
    return {      
    };
  },
   computed:{
     user() {
       return this.$store.getters.user
     }
   },
   mounted() {
     if(this.user.email) {
     this.$store.dispatch("getUsers");
     this.$store.dispatch("getUserById", this.user.id);
     }
   }
  
};
</script>

<style lang='scss'>
@import "@/assets/sass/style.scss";
</style>
