<template>
  <div>
  <topHeader></topHeader>
    <!-- ========== Job Listing Start============= -->
    <div class="job-listing-area pt-120 mb-120">
      <div class="container">
        <div class="row g-lg-4 gy-5">
          <div class="col-lg-8 offset-lg-2 order-lg-2 order-1">
            <div class="job-listing-wrrap">
              <div class="row g-4 mb-25">
                <div class="col-lg-6 d-flex align-items-center">
                  <p class="show-item">Showing results {{ services.length }} job lead(s)</p>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12" v-if="isLoading">
                  <div class="job-listing-card mb-30" v-for="(item,i) in 4" :key="i">
                    <div class="job-list-content">
                      <div class="company-area">
                        <div class="company-details">
                          <div class="lines shine"></div>
                          <div class="lines shine"></div>
                          <div class="lines shine"></div>
                          <div class="lines shine"></div>
                          <div class="lines shine"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-12 mb-30" v-for="(service, i) in services" :key="i">
                  <div class="job-listing-card">
                    <div class="job-list-content">
                      <div class="company-area">
                        <div class="company-details">
                          <div class="name-location">
                            <h5 class="text-capitalize mb-2"><router-link :to="`/job-lead-details/${service.city_name}/${service.id}`">{{ service.headline }}</router-link></h5>
                            <small class="fw-light">{{service.trade.name}}</small>
                            <p class="fw-light mt-3"><i class="bi bi-pin-map"></i> {{ service.city_name }} ({{service.distance}} miles), <small
                                class="fw-light">{{service.created_at | toHumanDate()}}</small></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <h4 v-if="!services.length && !isLoading">
                  No new leads found
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ========== Job Listing e nd============= -->
  <!-- Footer -->
  <div v-show="!isMobile" >
    <HomeFooter></HomeFooter>
  </div>
    <MobileFooter></MobileFooter>

  </div>
</template>

<script>
import HomeFooter from '../base-layout/footer';
import topHeader from '../base-layout/header-2';
import SideBar from '../base-layout/navigation/tradesperson-sidebar';
import MobileFooter from '../../components/mobile-nav';
import appConfig from "../../../app.config.json";
import {userService} from "@/apis/user.service";

export default {
  page: {
    title: "New Leads",
    meta: [{ name: "description", content: appConfig.description }]
  },
  data() {
    return {
      user: this.$store.getters.GET_USER_INFO,
      showSidebar: false,
      isMobile: false,
      isLoading:false,
      services: [],
    };
  },
  components: {
    HomeFooter,
    topHeader,
    SideBar,
    MobileFooter
  },
  computed: {
    loggedIn() {
      return this.$store.getters.GET_USER_INFO;
    },
  },
  methods: {
    checkScreenSize() {
      this.isMobile = window.innerWidth < 992;
      this.showSidebar = !this.isMobile;
    },
    getJobsNearMe() {
      this.isLoading = true;
      userService.getJobsNearMe().then((res) => {
        this.isLoading = false;
        const {extra, status} = res;
        if (status) {
          this.services = extra;
        }
      });
    },
  },
  created() {
    this.getJobsNearMe();
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

</style>
