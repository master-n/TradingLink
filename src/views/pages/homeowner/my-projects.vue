<template>
  <div>
    <topHeader/>
    <!-- ========== Job Listing Start============= -->
    <div class="job-listing-area pt-120 mb-120">
      <div class="container">
        <div class="row g-lg-4 gy-5">
          <div class="col-lg-8 offset-lg-2 order-lg-2 order-1">
            <div class="job-listing-wrrap">
              <div class="row">
                <div class="col-lg-12" v-if="isLoading">
                  <div class="job-listing-card mb-30" v-for="i in 4" :key="i">
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
                            <h5 class="text-capitalize"><router-link :to="'/my-projects/'+service.id">{{ service.headline }}</router-link></h5>
                            <p class="fw-light"><i class="bi bi-pin-map"></i> {{ service.city_name }}, <small
                                class="fw-light">{{service.created_at | toHumanDate()}}</small></p>
                            <p>Suitable local tradespeople have been alerted about your job. As soon as one is
                              interested we will let you know.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="p-2 text-light fw-lighter" style="border-radius: 10px; background: #2d5657"><span
                        class="text-decoration-underline fw-bold">Send invite</span> to 10 more tradespeople to get more
                      responses
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeFooter from '../../base-layout/footer';
import topHeader from '../../base-layout/navigation/homeowner-menu';
import SideBar from '../../base-layout/navigation/tradesperson-sidebar';
import MobileFooter from '../../../components/mobile-nav';
import appConfig from "../../../../app.config.json";
import {userService} from "@/apis/user.service";

export default {
  page: {
    title: "My Project",
    meta: [{name: "description", content: appConfig.description}]
  },
  data() {
    return {
      user: this.$store.getters.GET_USER_INFO,
      showSidebar: false,
      isMobile: false,
      isLoading: false,
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
    getPostedServices() {
      this.isLoading = true;
      userService.getPostedServices().then((res) => {
        this.isLoading = false;
        const {extra, status} = res;
        if (status) {
          this.services = extra;
        }
      });
    },
    checkScreenSize() {
      this.isMobile = window.innerWidth < 992;
      this.showSidebar = !this.isMobile;
    },
  },
  created() {
    this.getPostedServices();
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
