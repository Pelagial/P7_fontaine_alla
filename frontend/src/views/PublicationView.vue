<template>
  <!--Publication_header-->
  <header class="publication-header">
    <RouterLink to="/home">
      <fa class="publication-home" icon="arrow-left" />
    </RouterLink>
    <div class="publication-header_user-profile">
              <h1 class="publication-header_user-name">Tom Ramalho</h1>
              <div class="publication-header_user-img">
                <img
                  src="../assets/images/profile_picture/default/tom-ramalho-NZaFD7tKhC8-unsplash.jpg"
                  alt="Photo de profil de tom-ramalho"
                />
              </div>
            </div>
  </header>
  <!--Publication_header_end-->

  <!--Publication_formular-->
  <div class="publication_formular">
    <form class="publication">
      <div class="publication_content">
        <div class="publication_content-media-upload">
          <label for="uploadmedia">
            <strong>Choisi un media à partager</strong>
          </label>
          <input
            class="publication_content-media"
            type="file"
            name="uploadmedia"
            accept="image/video/*"
            capture
          />
        </div>
        <div class="publication_content-text-content">
          <label for="textContent">
            <strong>Commentaire</strong>
          </label>
          <textarea
            class="publication_content-text"
            type="text"
            rows="3"
            placeholder="Enter votre commentaire"
            name="textContent"
          />
        </div>
      </div>
      <button type="submit">partager</button>
    </form>
  </div>
  <!--Publication_formular_end-->
</template>


<script>

</script>