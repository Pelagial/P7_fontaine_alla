<template>
<!--header-->
  <header>
    <div class="header_logo-groupomania">
      <img alt="Logo de Groupomania" class="logo" src="@/assets/images/logos/logo-black.png" />
    </div>
  </header>
<!--header_end-->

<!--nav_bar_header-->
  <nav class="nav-bar-header_wrapper">
      <div class="nav-bar-header_logo-groupomania">
        <img alt="Logo de Groupomania" class="logo" src="../assets/images/logos/logo-black.png" />
      </div>
      <div class="nav-bar-header_menu">
        <RouterLink to="/home">
        <fa class="nav-bar-header_home" icon="house" />
      </RouterLink>
      <RouterLink to="/Publication">
        <fa class="nav-bar-header_add-post" icon="circle-plus" />
      </RouterLink>
      <RouterLink to="/profile">
        <div class="nav-bar-header_user-profile">
          <img
            class="user_img"
            src="../assets/images/profile_picture/default/tom-ramalho-NZaFD7tKhC8-unsplash.jpg"
            alt="Photo de profil de tom-ramalho"
          />
        </div>
      </RouterLink>
      </div>
    </nav>
<!--nav_bar_header_end-->

<!--nav_bar_bottom-->
  <nav class="nav-bar_wrapper">
    <RouterLink to="/home">
      <fa class="nav-bar_home" icon="house" />
    </RouterLink>
    <RouterLink to="/Publication">
      <fa class="nav-bar_add-post" icon="circle-plus" />
    </RouterLink>
    <RouterLink to="/profile">
      <div class="nav-bar_user-profile">
        <img
          class="user_img"
          src="../assets/images/profile_picture/default/tom-ramalho-NZaFD7tKhC8-unsplash.jpg"
          alt="Photo de profil de tom-ramalho"
        />
      </div>
    </RouterLink>
  </nav>
<!--nav_bar_end-->

<!--publication-->
  <main>
    <div class="publications_wrapper">
      <!--Publication_card-->
      <div class="publication-card">
        
          <!--user_profil_info-->
          <RouterLink to="/profile">
            <div class="publication-card_user-profile">
              <h2 class="publication-card_user-name">Tom Ramalho</h2>
              <div class="publication-card_user-img">
                <img
                  src="../assets/images/profile_picture/default/tom-ramalho-NZaFD7tKhC8-unsplash.jpg"
                  alt="Photo de profil de tom-ramalho"
                />
              </div>
            </div>
          </RouterLink>
          <!--user_profil_info_end-->

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
                <p><strong>17 février 2022</strong></p>
              </div>
              <div class="publication-card_like-comment-btn">
                <!-- <fa class="commented publication-card_comment-btn" icon="comment" /> -->
                <RouterLink to="/comment"><fa class="publication-card_comment-btn" :icon="['far', 'comment']" /></RouterLink>
                <!-- <fa class="liked publication-card_like-btn" icon="heart" /> -->
                <fa class="publication-card_like-btn" :icon="['far', 'heart']"  />
              </div>
            </div>
            <div class="publication-card_text">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Alias nisi nam dicta impedit ab voluptas quaerat! Libero aperiam, voluptatum ut aut quis blanditiis cumque,
                explicabo ex consequatur numquam molestiae optio.
              </p>
            </div>
            <div class="comment"></div>
          </div>
          <!--publication_text_end-->
      </div>
      <!--Publication_card_END-->


      <!-------------------------------------test-->
      <!--Publication_card-->
      <div class="publication-card">
        
          <!--user_profil_info-->
          <RouterLink to="/profile">
            <div class="publication-card_user-profile">
              <h2 class="publication-card_user-name">Chandri Anggara</h2>
              <div class="publication-card_user-img">
                <img
                  src="../assets/images/profile_picture/default/chandri-anggara-hoatnUWFiuc-unsplash.jpg"
                  alt="Photo de profil de tom-ramalho"
                />
              </div>
            </div>
          </RouterLink>
          <!--user_profil_info_end-->

          <!--publication_media-->
          <div class="publication-card_media-upload">
            <img
              class="publication_media"
              src="../assets/images/danist-soh-5LjfTAZMS10-unsplash.jpg"
              alt="Photo de plusieur personnes qui boivent un verre"
            />
          </div>
          <!--publication_media_end-->
          <!--publication_text-->
          <div class="publication-card_infos">
            <div class="publication-card_under-media-bar">
              <div class="publication-card_datetime">
                <p><strong>2 février 2022</strong></p>
              </div>
              <div class="publication-card_like-comment-btn">
                <!-- <fa class="commented publication-card_comment-btn" icon="comment" /> -->
                <RouterLink to="/comment"><fa class="publication-card_comment-btn" :icon="['far', 'comment']" /></RouterLink>
                <!-- <fa class="liked publication-card_like-btn" icon="heart" /> -->
                <fa class="publication-card_like-btn" :icon="['far', 'heart']"  />
              </div>
            </div>
            <div class="publication-card_text">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
            <div class="comment"></div>
          </div>
          <!--publication_text_end-->
      </div>
      <!--Publication_card_END-->

  <!--Publication_card-->
      <div class="publication-card">
        
          <!--user_profil_info-->
          <RouterLink to="/profile">
            <div class="publication-card_user-profile">
              <h2 class="publication-card_user-name">Alban Gillot</h2>
              <div class="publication-card_user-img">
                <img
                  src="../assets/images/profile_picture/default/ehimetalor-akhere-unuabona-Vc8tLPRMYV8-unsplash.jpg"
                  alt="Photo de profil de tom-ramalho"
                />
              </div>
            </div>
          </RouterLink>
          <!--user_profil_info_end-->

          <!--publication_media-->
          <div class="publication-card_media-upload">
            <img
              class="publication_media"
              src="../assets/images/toa-heftiba-FbKKtTnVOT4-unsplash.jpg"
              alt="Photo de plusieur personnes qui boivent un verre"
            />
          </div>
          <!--publication_media_end-->
          <!--publication_text-->
          <div class="publication-card_infos">
            <div class="publication-card_under-media-bar">
              <div class="publication-card_datetime">
                <p><strong>22 janvier 2022</strong></p>
              </div>
              <div class="publication-card_like-comment-btn">
                <!-- <fa class="commented publication-card_comment-btn" icon="comment" /> -->
                <RouterLink to="/comment"><fa class="publication-card_comment-btn" :icon="['far', 'comment']" /></RouterLink>
                <!-- <fa class="liked publication-card_like-btn" icon="heart" /> -->
                <fa class="publication-card_like-btn" :icon="['far', 'heart']"  />
              </div>
            </div>
            <div class="publication-card_text">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Alias nisi nam dicta impedit ab voluptas quaerat molestiae optio.
              </p>
            </div>
            <div class="comment"></div>
          </div>
          <!--publication_text_end-->
      </div>
      <!--Publication_card_END-->
<!-------------------------------------test-->


    </div>
  </main>
<!--publication_end-->


  <RouterView />
</template>
