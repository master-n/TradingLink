<template>
  <header class="header-area style-3">
    <!-- Header content -->
    <div class="menu-area">
      <div class="header-logo">
        <router-link to="/">
          <img alt="image" class="img-fluid" src="../../../public/frontend/assets/images/header1-logo.svg"
               style="height: 80px;">
        </router-link>
      </div>
      <div class="main-menu">
        <!-- Main menu content -->
        <div class="mobile-logo-area d-lg-none d-flex justify-content-between align-items-center">
          <div class="mobile-logo-wrap">
            <router-link to="/">
              <img alt="image" src="../../../public/frontend/assets/images/header1-logo.svg" style="height: 70px">
            </router-link>
          </div>
          <div class="menu-close-btn">
            <i class="bi bi-x-lg"></i>
          </div>
        </div>
        <ul class="menu-list">
          <!-- Menu list items -->
        </ul>

        <div class="for-mobile-menu d-lg-none d-block mt-5">
          <!-- Mobile menu items -->
          <ul>
            <li>
              <router-link to="/register">Visit website <i class="bi bi-globe2 ms-2"></i>
              </router-link>
            </li>
            <hr />
            <li>
              <router-link to="/logout" class="text-danger">
                Log out <i class="bi bi-box-arrow-right ms-2 text-danger"/>
              </router-link>
            </li>

            <hr />
          </ul>
        </div>
      </div>

      <div class="nav-right d-flex justify-content-end align-items-center">
        <!-- Navigation right content -->
        <ul>
          <li class="d-md-flex d-none">
            <router-link to="/logout">Logout</router-link>
          </li>

          <li class="d-md-flex d-none">
            <div class="sign-in-btn">
              <router-link to="/" class="primry-btn-1 lg-btn">Visit website <i class="bi bi-globe2 ms-2"/></router-link>
            </div>
          </li>
        </ul>
        <div class="sidebar-button mobile-menu-btn">
          <button class="primry-btn-1 lg-btn d-flex align-items-center">
            <span>Menu</span>
            <i class="bi bi-list ms-2"></i>
          </button>
        </div>
      </div>
    </div>
  </header>

</template>

<script>
export default {
  name: "AdminTopNav",
  mounted() {
    $('.sidebar-button').on("click", function () {
      $('.main-menu').addClass('show-menu');
    });

    $('.menu-close-btn').on("click", function () {
      $('.main-menu').removeClass('show-menu');
    });
  }
}
</script>