<template>
  <div>
    <topHeader></topHeader>
    <div class="mt-4 text-end pe-4">
      <router-link :to="'/projects/menu/'+job_id" v-if="isMobile" class="mb-4">
        <i class="bi bi-chevron-left"></i> Back to Menu
      </router-link>
    </div>

    <div class="dashboard-area pt-80 mb-120">
      <div class="container">
        <div class="row g-lg-4 gy-5 mb-90">
          <!-- Sidebar -->
          <div class="col-lg-3" v-if="!isMobile">
            <div class="dashboard-sidebar">
              <SideBar></SideBar>
            </div>
          </div>

          <!-- Main Content -->
          <div class="col-lg-9">
            <slot name="title"></slot>
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import topHeader from '../base-layout/navigation/homeowner-menu';
import SideBar from './navigation/homeowner-sidebar';
import MobileFooter from '../../components/mobile-nav';
import appConfig from "../../../app.config.json";

export default {
  page: {
    title: "Homeowner Dashboard",
    meta: [{name: "description", content: appConfig.description}]
  },
  components: {
    topHeader,
    SideBar,
    MobileFooter
  },
  data() {
    return {
      isMobile: false,
      showMainContent: false,
      job_id: null
    };
  },
  methods: {
    handleNavigation() {
      if (this.isMobile) {
        this.showMainContent = true;
      }
    },
    toggleView() {
      this.showMainContent = !this.showMainContent;
    },
    checkScreenSize() {
      this.isMobile = window.innerWidth < 768;
      if (this.isMobile) {
        this.showMainContent = true;
      }
    }
  },
  created() {
    this.job_id = this.$route.params.id
    if (!this.job_id) {
      this.$router.push('/unauthorized');
    }
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize);
  }
};
</script>
