<template>
      <!--Publication_card-->
      <div class="publication-card" v-for="userPublication of userPublications" :key="userPublication.id" :id="userPublication.id">

          <!--publication_media-->
          <div class="publication-card_media-upload" 
          :id="userPublication.id">
            <img
              class="publication_media"
              src="../assets/images/fabio-alves-IQCwKOpIQro-unsplash.jpg"
              alt="Photo de plusieur personnes qui boivent un verre"
            />
          </div>
          <!--publication_media_end-->
          <!--publication_text-->
          <div class="publication-card_infos">
            <div class="publication-card_under-media-bar">
              <div class="publication-card_datetime">
                <p><strong>Publié le {{ moment(userPublication.createdAt).format('DD-MM-YYYY à HH:mm')}}</strong></p>
                <p v-if="userPublication.likes > 2">likes</p>
                <p v-else >O like</p> 
              </div>
              <div class="publication-card_btn">
                <fa class="publication-card_delete-btn" icon="trash-can" @click.prevent="deletePost" />
              </div>
            </div>
            <div class="publication-card_text">
              <h2>
                {{ userPublication.title }}
              </h2>
              <p>
                {{ userPublication.message }}
              </p>
            </div>
            <div class="comment"></div>
          </div>
          <!--publication_text_end-->
      </div>
      <!--Publication_card_END-->
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'

export default {
    name: 'userPostCard',
    data() {
        return {

        }
    },
    mounted: function () {
        this.$store.dispatch('getUserPublication');
    },
    computed: {
        ...mapState({
            userPublications: 'userPublications',
        })
    },
    methods: {
      moment: function (date) {
        return moment(date);
      },
      deletePost() {

        console.log(id);
        
      }
    }
}
</script>