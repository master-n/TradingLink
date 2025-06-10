<template>
  <body class="bg-wight">
  <topHeader></topHeader>

  <div class="dashboard-area pt-80 mb-120">
    <div class="container">
      <div class="row g-lg-4 gy-5 mb-90">
        <!-- Sidebar -->
        <div class="col-lg-3" v-show="showSidebar">
          <div class="dashboard-sidebar">
            <SideBar @link-clicked="toggleSidebar"></SideBar>
          </div>
        </div>

        <!-- Main Content -->
        <div class="col-lg-9" v-show="!showSidebar || !isMobile">
          <div class="mb-4" v-show="isMobile" @click="showSideBarMenu"><i class="bi bi-chevron-left"></i>
            Back to Menu
          </div>
          <div class="dashboard-inner">
            <div class="table-wrapper">
              <h5 class="title">contact details</h5>
              <div class="scroll-table">
                <!-- Table content -->
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
  </body>
</template>

<script>
import HomeFooter from '../base-layout/footer';
import topHeader from '../base-layout/header-2';
import SideBar from '../base-layout/tradesperson-sidebar';

export default {
  data() {
    return {
      user: this.$store.getters.GET_USER_INFO,
      showSidebar: false,
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
      this.showSidebar = !this.isMobile;
    },
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);

    $('#contact-details').addClass('active')

  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize);
  },
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
