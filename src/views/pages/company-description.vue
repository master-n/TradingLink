<template>
  <div class="bg-wight">
    <topHeader></topHeader>
    <div class="dashboard-area pt-80 mb-120">
      <div class="container">
        <div class="row g-lg-4 gy-5 mb-90">
          <!-- Sidebar -->
          <div class="col-lg-3" v-show="showSidebar">
            <div class="dashboard-sidebar">
              <SideBar></SideBar>
            </div>
          </div>

          <!-- Main Content -->
          <div class="col-lg-9" v-show="!showSidebar || !isMobile">
            <div class="mb-4" v-show="isMobile" @click="showSideBarMenu">
              <i class="bi bi-chevron-left"></i> Back to Menu
            </div>
            <h4 class="title">Company description</h4>
            <h5 class="mb-4">About your company</h5>
            <h5>Guarantee</h5>
            <p class="font-weight-lighter">Increase your chances of getting hired by offering a guarantee.</p>
            <small class="font-weight-lighter">
              <i class="bi bi-info-circle"></i> Homeowners are aware guarantees vary and should discuss the terms in advance.
            </small>
            <div class="row">
              <div class="col-md-8">
                <div class="profession-list mt-4">
                  <div class="profession-item">
                    <label for="yes" class="form-check-label">
                      <input type="radio" id="yes" value="yes" class="form-check-input"> Yes, I offer a guarantee
                    </label>
                  </div>
                  <div class="profession-item">
                    <label for="no" class="form-check-label">
                      <input type="radio" id="no" value="no" class="form-check-input"> No, I do not offer a guarantee
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div v-show="!isMobile">
      <HomeFooter></HomeFooter>
    </div>
  </div>
</template>


<script>
import HomeFooter from '../base-layout/footer';
import topHeader from '../base-layout/header-2';
import SideBar from '../base-layout/tradesperson-sidebar';

export default {
  data() {
    return {
      user: this.$store.getters.GET_USER_INFO,
      showSidebar: true,
      isMobile: false,
    };
  },
  components: {
    HomeFooter,
    topHeader,
    SideBar,
  },
  computed: {
    loggedIn() {
      return this.$store.getters.GET_USER_INFO;
    },
  },
  methods: {
    toggleSidebar() {
      if (this.isMobile) {
        this.showSidebar = !this.showSidebar;
      }
    },
    showSideBarMenu() {
      if (this.isMobile) {
        this.showSidebar = true;
      }
    },
    checkScreenSize() {
      this.isMobile = window.innerWidth < 992;
      // this.showSidebar = !this.isMobile;
    },
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
    document.body.classList.add('bg-wight');
    document.getElementById('company-description').classList.add('active');
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize);
  },
};
</script>


<style scoped>
/* Add any custom styles here */

.profession-list {
  height: auto !important;
}
</style>
