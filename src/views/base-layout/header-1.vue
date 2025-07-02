<template>
  <div>
    <header class="header-area style-3">
      <div class="menu-area">
        <div class="header-logo">
          <router-link to="/"><img alt="image" class="img-fluid"
                                    src="../../../public/frontend/assets/images/header1-logo.svg"
                                    style="height: 80px;"></router-link>
        </div>
        <div class="main-menu">
          <div class="mobile-logo-area d-lg-none d-flex justify-content-between align-items-center">
            <div class="mobile-logo-wrap">
              <router-link to="/"><img alt="image" src="../../../public/frontend/assets/images/header1-logo.svg" style="height: 70px"></router-link>
            </div>
            <div class="menu-close-btn">
              <i class="bi bi-x-lg"></i>
            </div>
          </div>

          <div class="for-mobile-menu d-lg-none d-block mt-5">
            <ul>
              <li class="">
                <router-link class="" to="/post-a-job">Post a job </router-link>
              </li>
              <hr>
              <li class="">
                <router-link class="" to="/login">Log in </router-link>
              </li>
              <hr>
              <li class="">
                <router-link to="/register" class="">Sign up as a tradesperson </router-link>
              </li>
              <hr>
            </ul>
          </div>
        </div>

      </div>
    </header>
  </div>
</template>


