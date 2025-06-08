<template>
  <div>
    <div class="top-bar2" style="justify-content: end">
      <!--      <p>Welcome Our Job Portal! <a href="bookmark.html">Save Jobs</a></p>-->
      <div class="top-bar-right">
        <div class="language-select">
          <img src="../../../public/frontend/assets/images/icon/flag-eng.svg" alt="image"><span>Language</span>
          <ul class="topbar-sublist">
            <li><img src="../../../public/frontend/assets/images/icon/flag-germeny.svg" alt="image"><span>Germeny</span>
            </li>
            <li><img src="../../../public/frontend/assets/images/icon/flag-french.svg" alt="image"><span>French</span>
            </li>
            <li><img src="../../../public/frontend/assets/images/icon/flag-bangla.svg" alt="image"><span>Bengali</span>
            </li>
          </ul>
        </div>
        <div class="social-area">
          <ul>
            <li><a href="https://www.facebook.com/"><i class="bx bxl-facebook"></i></a></li>
            <li><a href="https://twitter.com/"><i class='bx bxl-twitter'></i></a></li>
            <li><a href="https://www.linkedin.com/"><i class='bx bxl-linkedin'></i></a></li>
            <li><a href="https://www.instagram.com/"><i class='bx bxl-instagram'></i></a></li>
          </ul>
        </div>
      </div>
    </div>
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
                    <ul class="menu-list">
<!--                      <li class="active"><router-link to="/">Post a job</router-link></li>-->
<!--                      <li><router-link to="/login">Login</router-link></li>-->

          <!--            <li class="menu-item-has-children">-->
          <!--              <a href="#" class="drop-down">Find Jobs</a><i class="bi bi-plus dropdown-icon"></i>-->
          <!--              <ul class="sub-menu">-->
          <!--                <li><a href="category.html">Job Category</a></li>-->
          <!--                <li><a href="job-listing1.html">Job Listing 01</a></li>-->
          <!--                <li><a href="job-listing2.html">Job Listing 02</a></li>-->
          <!--                <li><a href="job-details.html">Job Details</a></li>-->
          <!--              </ul>-->
          <!--            </li>-->
          <!--            <li class="menu-item-has-children">-->
          <!--              <a href="#" class="drop-down">Pages</a><i class="bi bi-plus dropdown-icon"></i>-->
          <!--              <ul class="sub-menu">-->
          <!--                <li><a href="dashboard.html">Candidate Dashboard</a></li>-->
          <!--                <li><a href="job-post.html">Post A Jobs</a></li>-->
          <!--                <li><a href="pricing-plan.html">Pricing Plan</a></li>-->
          <!--                <li><a href="faq.html">FAQ</a></li>-->
          <!--                <li><a href="checkout.html">Checkout</a></li>-->
          <!--                <li><a href="error.html">Error</a></li>-->
          <!--                <li><a href="login.html">Login</a></li>-->
          <!--                <li><a href="register.html">Register</a></li>-->
          <!--              </ul>-->
          <!--            </li>-->
          <!--            <li class="menu-item-has-children">-->
          <!--              <a href="#">Company</a><i class="bi bi-plus dropdown-icon"></i>-->
          <!--              <ul class="sub-menu">-->
          <!--                <li><a href="company-listing1.html">Company Listing 01</a></li>-->
          <!--                <li><a href="company-listing2.html">Company Listing 02</a></li>-->
          <!--                <li><a href="company-details.html">Company Details</a></li>-->
          <!--                <li><a href="company-dashboard.html">Company Dashboard</a></li>-->
          <!--              </ul>-->
          <!--            </li>-->
          <!--            <li class="menu-item-has-children">-->
          <!--              <a href="#">Blog</a><i class="bi bi-plus dropdown-icon"></i>-->
          <!--              <ul class="sub-menu">-->
          <!--                <li><a href="blog-grid.html">Blog Grid</a></li>-->
          <!--                <li><a href="blog-standard.html">Blog Standard</a></li>-->
          <!--                <li><a href="blog-right-sidebar.html">Blog Right Sidebar</a></li>-->
          <!--                <li><a href="blog-details.html">Blog Details</a></li>-->
          <!--              </ul>-->
          <!--            </li>-->
          <!--            <li><a href="contact.html">Contact</a></li>-->
                    </ul>

          <div class="for-mobile-menu d-lg-none d-block mt-5">
            <ul v-if="!loggedIn">
              <li class="">
                <router-link class="" to="/">Post a job </router-link>
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
            <ul v-else>
              <li class="">
                <router-link class="" to="/">New leads </router-link>
              </li>
              <hr>
              <li class="">
                <router-link class="" to="/login">Activity </router-link>
              </li>
              <hr>
              <li class="">
                <router-link to="/register" class="">Contacts</router-link>
              </li>
              <hr>
              <li class="">
                <router-link to="/register" class="">My Account <i class="bi bi-list ms-2"></i> </router-link>
              </li>
              <hr>
            </ul>
          </div>
        </div>

        <div class="nav-right d-flex jsutify-content-end align-items-center">
          <ul v-if="loggedIn">
            <li class="d-md-flex d-none active">
              <router-link to="/">New leads</router-link>
            </li>
            <li class="d-md-flex d-none">
              <router-link to="/login" class="">Activity</router-link>
            </li>
            <li class="d-md-flex d-none">
              <router-link to="/login" class="">Contacts</router-link>
            </li>
            <li class="d-md-flex d-none">
              <div class="sign-in-btn">
                <router-link to="/register" class="primry-btn-1 lg-btn">
                  My Account <i class="bi bi-list ms-2"></i> </router-link>
              </div>
            </li>
          </ul>

          <ul v-else>
            <li class="d-md-flex d-none active">
              <router-link to="/">Post a job </router-link>
            </li>
            <li class="d-md-flex d-none">
              <router-link to="/login" class="">Log in </router-link>
            </li>
            <li class="d-md-flex d-none">
              <div class="sign-in-btn">
                <router-link to="/register" class="primry-btn-1 lg-btn">
                  Sign up as a tradesperson </router-link>
              </div>
            </li>
          </ul>
          <div class="sidebar-button mobile-menu-btn ">
            <button class="primry-btn-1 lg-btn d-flex align-items-center">
              <span>Menu</span>
              <i class="bi bi-list ms-2"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "Header2",
  data() {
    return {};
  },
  computed: {
    loader() {
      return this.$store.getters.LOADER;
    },
    loggedIn() {
      return this.$store.getters.GET_USER_INFO;
    },
  }
};
</script>

<style scoped>
.top-bar2 {
  background: white !important;
}
</style>

