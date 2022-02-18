<template>
 <header class="profile_header">
            <RouterLink to="/profile">
                <fa class="profile_header-home" icon="arrow-left" />
            </RouterLink>
            <h1 class="profile_header-user-name">Tom Ramalho</h1>
        </header>
    <div class="profile_update-wrapper">
        <div class="profile_update-content">
            <div class="profile_user-img">
            <img
                src="../assets/images/profile_picture/default/tom-ramalho-NZaFD7tKhC8-unsplash.jpg"
                alt="Photo de profil de tom-ramalho"
            />
        </div>
        <div class="profile_update-wrapper">
            <form class="profile_update-profile_info">
                <div class="profile_update-profile_user-img">
                    <label for="pictures"><strong>Image de profile</strong></label>
                    <input type="file" name="pictures" accept="image/*" capture />
                </div>
                    <div class="profile_update-container">
                        <label for="username">
                            <strong>Nom d'utilisateur</strong>
                        </label>
                        <input type="email" placeholder="Enter New Username" name="username" required />
                        <label for="email">
                            <strong>Email</strong>
                        </label>
                        <input type="text" placeholder="Enter New Email" name="email" required />
                        <label for="password">
                            <strong>Mot de passe</strong>
                        </label>
                        <input type="password" placeholder="Enter  New Password" name="password" required />
                        <label for="bio">
                            <strong>Bio</strong>
                        </label>
                        <textarea class="profile_update-bio" type="text" rows="3" placeholder="Enter  Your Bio" name="bio" />
                    </div>
                <button class="publication-button" type="submit">MODIFIER LE PROFIL</button>
            </form>
        </div>
        </div>
    </div>
</template>