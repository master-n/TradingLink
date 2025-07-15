<template>
  <div>
<!--    <div class="top-bar2" style="justify-content: end">-->
<!--      &lt;!&ndash; Top bar content &ndash;&gt;-->
<!--      <div class="top-bar-right">-->
<!--        <div class="social-area">-->
<!--          <ul>-->
<!--            <li><a href="https://www.facebook.com/"><i class="bx bxl-facebook"></i></a></li>-->
<!--            <li><a href="https://twitter.com/"><i class='bx bxl-twitter'></i></a></li>-->
<!--            <li><a href="https://www.linkedin.com/"><i class='bx bxl-linkedin'></i></a></li>-->
<!--            <li><a href="https://www.instagram.com/"><i class='bx bxl-instagram'></i></a></li>-->
<!--          </ul>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

    <header class="header-area style-3 mt-4">
      <!-- Header content -->
      <div class="menu-area">
        <div class="header-logo">
          <router-link to="/">
            <img alt="image" class="img-fluid" src="../../../../public/frontend/assets/images/header1-logo.svg"
                 style="height: 80px;">
          </router-link>
        </div>
        <div class="main-menu">
          <!-- Main menu content -->
          <div class="mobile-logo-area d-lg-none d-flex justify-content-between align-items-center">
            <div class="mobile-logo-wrap">
              <router-link to="/">
                <img alt="image" src="../../../../public/frontend/assets/images/header1-logo.svg" style="height: 70px">
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
            <ul v-if="!loggedIn">
              <li>
                <router-link to="/post-a-job">Post a job</router-link>
              </li>
              <hr>
              <li>
                <router-link to="/login">Log in</router-link>
              </li>
              <hr>
              <li>
                <router-link to="/register">Sign up as a tradesperson</router-link>
              </li>
              <hr>
            </ul>
            <ul v-else>
              <li v-if="!isRegistrationComplete" class="cursor-pointer">
                <a @click="completeRegistration">
                  <div>Complete my registration</div>
                  <div class="badge bg-secondary rounded-pill">{{ registrationSteps }} steps left</div>
                </a>
                <hr>
              </li>
              <li>
                <router-link to="/saved-leads">Saved leads</router-link>
              </li>
              <hr>
              <li>
                <router-link to="/profile-menu">Profile</router-link>
              </li>
              <hr>
              <li>
                <router-link to="/ask-a-trade">Ask a tradesperson</router-link>
              </li>
              <hr>
              <li>
                <router-link to="/logout">Log Out</router-link>
              </li>
              <hr>
            </ul>
          </div>
        </div>

        <div class="nav-right d-flex justify-content-end align-items-center">
          <!-- Navigation right content -->
          <ul v-if="loggedIn">
            <li class="d-md-flex d-none active">
              <router-link to="/new-leads">New leads</router-link>
            </li>
            <li class="d-md-flex d-none">
              <router-link to="/my-proposals/contacts">Contacts</router-link>
            </li>
            <li class="d-md-flex d-none">
              <div class="btn-group dropdown">
                <div class="notifications-area dropdown-toggle" role="button" id="dropdownMenuButton3"
                     data-bs-toggle="dropdown" aria-expanded="false">
                  <div class="sign-in-btn">
                    <a class="primry-btn-1 lg-btn">My Account <i class="bi bi-list ms-2"></i></a>
                    <span style="width: 20px; height: 20px;" class="bg-danger">{{ inboxCount }}</span>

                  </div>
                </div>
                <div class="user-card dropdown-menu" aria-labelledby="dropdownMenuButton3">
                  <ul style="box-shadow: rgba(0, 0, 0, 0.15) 0 0.0625rem 0.375rem; border-radius: 0.25rem;">
                    <li v-if="!isRegistrationComplete" class="cursor-pointer">
                      <a @click="completeRegistration" >
                        <div>Complete my registration</div>
                        <div class="badge bg-secondary rounded-pill">{{ registrationSteps }} steps left</div>
                      </a>
                    </li>
                    <li>
                      <router-link to="/saved-leads">
                        <i class="bi bi-bookmark text-primary-1"></i> Saved leads
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/profile">
                        <i class="bi bi-person-circle text-primary-1"></i> Profile
                        <span class="badge bg-danger text-white rounded-pill" v-if="inboxCount">{{ inboxCount }}</span>
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/ask-a-trade">
                        <i class="bi bi-people text-primary-1"></i> Ask a tradesperson
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/logout">
                        <i class="bi bi-box-arrow-right text-primary-1"></i> Log Out
                      </router-link>
                    </li>

                  </ul>
                </div>
              </div>
            </li>
          </ul>

          <ul v-else>
            <li class="d-md-flex d-none active">
              <router-link to="/post-a-job">Post a job</router-link>
            </li>
            <li class="d-md-flex d-none">
              <router-link to="/login">Log in</router-link>
            </li>
            <li class="d-md-flex d-none">
              <div class="sign-in-btn">
                <router-link to="/register" class="primry-btn-1 lg-btn">Sign up as a tradesperson</router-link>
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

  </div>
</template>

<script>
export default {
  name: "Header2",
  data() {
    return {
      isMobile: false,
      user: this.$store.getters.GET_USER_INFO || {},
      inboxCount: this.$store.getters.GET_INBOX_COUNT || 0,
    };
  },
  watch: {
    '$store.getters.GET_INBOX_COUNT': {
      handler(count) {
        this.inboxCount = count || 0;
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    registrationSteps() {
      return 8 - this.user.registration_step;
    },
    isRegistrationComplete() {
      return this.user.registration_status ==='complete'
    },
    loggedIn() {
      return this.$store.getters.GET_USER_INFO;
    }
  },
  methods: {
    checkScreenSize() {
      this.isMobile = window.innerWidth < 768;
    },
    completeRegistration() {
      // Check the registration step and route accordingly
      switch (this.user.registration_step) {
        case 1:
          this.$router.push('/create-account');
          break;
        case 2:
          this.$router.push('/professions');
          break;
        case 3:
          this.$router.push('/travel-to-work');
          break;
        case 4:
          this.$router.push('/business-type');
          break;
        case 5:
          this.$router.push('/business-details');
          break;
        case 6:
          this.$router.push('/verify-identity');
          break;
        case 7:
          this.$router.push('/verify-skills');
          break;
        default:
          console.log('Unknown registration step');
      }
    }
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize);
  },
};
</script>

<style scoped>

.nav-link i {
  font-size: 1.25rem;
}
</style>
