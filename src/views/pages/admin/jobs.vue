<template>
  <div>
    <topHeader/>
    <!-- ========== Job Listing Start============= -->
    <div class="job-listing-area mb-120">
      <div class="container">
        <div class="row g-lg-4 gy-5">
          <div class="col-lg-8 offset-lg-2 order-lg-2 order-1">
            <div class="job-listing-wrrap">
              <div class="row">
                <div class="col-md-12 mb-3 mt-3">
                  <h4 class="text-center fw-bolder">Posted Jobs</h4>
                </div>
                <div class="col-md-12 mb-4">
                  <input
                      type="text"
                      class="form-control"
                      v-model="searchTerm"
                      placeholder="Search by headline, location, or poster name..."
                  />
                </div>

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

                <div class="col-lg-12 mb-30" v-for="(service, i) in filteredServices" :key="i">
                  <div class="job-listing-card">
                    <div class="job-list-content">
                      <div class="company-area">
                        <div class="company-details">
                          <router-link :to="'/jobs/'+service.id" class="name-location">
                            <h5 class="text-capitalize">{{ service.headline }}</h5>
                            <div class="mb-2 small">Job Reference: {{service.job_reference || 'N/A'}}</div>
                            <p class="fw-light"><i class="bi bi-pin-map"></i> {{ service.city_name }}, <small
                                class="fw-light">{{service.created_at | formatDate}}</small></p>
                            <p>Posted By: {{service.user.name}}</p>
                          </router-link>
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
    </div>
  </div>
</template>

<script>
import HomeFooter from '../../base-layout/footer';
import topHeader from '../../base-layout/admin-header'
import SideBar from '../../base-layout/navigation/tradesperson-sidebar';
import MobileFooter from '../../../components/mobile-nav';
import appConfig from "../../../../app.config.json";
import {userService} from "@/apis/user.service";

export default {
  page: {
    title: "Admin My Projects",
    meta: [{name: "description", content: appConfig.description}]
  },
  data() {
    return {
      user: this.$store.getters.GET_USER_INFO,
      showSidebar: false,
      isMobile: false,
      isLoading: false,
      services: [],
      searchTerm: ''
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
    filteredServices() {
      if (!this.searchTerm) return this.services;

      const keyword = this.searchTerm.toLowerCase();
      return this.services.filter(service =>
          service.id?.toString().includes(keyword) ||
          service.job_reference?.toLowerCase().includes(keyword) ||
          service.headline?.toLowerCase().includes(keyword) ||
          service.city_name?.toLowerCase().includes(keyword) ||
          service.user?.name?.toLowerCase().includes(keyword)
      );
    },

  },
  methods: {
    getPostedServices() {
      this.isLoading = true;
      userService.getJobPosts().then((res) => {
        this.isLoading = false;
        const {extra, status} = res;
        if (status) {
          this.services = extra;
        }
      });
    },
  },
  created() {
    this.getPostedServices();
  },
  mounted() {
    $('#job-posts').addClass('active')
  },
};
</script>

<style scoped>

</style>
