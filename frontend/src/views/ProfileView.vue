<template>
  <div class="profile">
    <header class="profile_header">
      <RouterLink to="/">
        <fa class="profile_header-home" icon="arrow-left" />
      </RouterLink>
      <h1 class="profile_header-user-name">Tom Ramalho</h1>
    </header>
    <main>
      <div class="profile_user-img">
        <img
          src="../assets/images/profile_picture/default/tom-ramalho-NZaFD7tKhC8-unsplash.jpg"
          alt="Photo de profil de tom-ramalho"
        />
      </div>
      <div class="profile_user-infos">
        <ul>
          <li><h2>email : TomRamalho@groupomania.com</h2></li>
          <li><h2>bio</h2></li>
          <li><p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Repellendus, ab. At nostrum magnam fugiat eaque.</p></li>
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
        <fa class="profile_user-action-update" icon="pen-to-square" />
        <fa class="profile_user-action-logout" icon="arrow-right-to-bracket" />
        <fa class="profile_user-action-delete" icon="trash-can" />
      </div>
    </main>
  </div>  
</template>

<style>
</style>
