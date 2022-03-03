<template>
      <!--Publication_card-->
      <div class="publication-card" v-for="userPublication of userPublications" :key="userPublication.id" :id="userPublication.id">

          <!--publication_media-->
          <div class="publication-card_media-upload">
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
                <p><strong>Publié le {{ userPublication.createdAt }}</strong></p>
              </div>
              <div class="publication-card_btn">
                <fa class="publication-card_delete-btn" icon="trash-can" @click.prevent="getPublicationId" />
                <!-- <fa class="liked publication-card_like-btn" icon="heart" /> -->
                <fa class="publication-card_like-btn" :icon="['far', 'heart']"  />
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

export default {
    name: 'userPublicationCard',
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
      getPublicationId() {
      console.log(userPublication.id);
      },
    }
}
</script>