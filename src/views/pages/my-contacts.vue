<template>
  <div>
    <topHeader/>
    <div class="container mt-5">
      <!-- Header with Tabs -->
      <h1 class="mb-4 text-center">Contacts</h1>

      <!-- Main Content -->
      <div class="row" v-if="!isLoading && !invites.length">
        <div class="col-md-12 text-center">
          <!-- Icon Placeholder -->
          <div class="mb-4 d-inline-flex">
            <div class="profile-image cursor-pointer rounded-circle" style="width: 70px; height: 70px;">
              <i class="bi bi-folder-fill text-primary-1" style="font-size: 24px;"></i>
            </div>
          </div>

          <div>
            <p class="mb-4">You have not shown any interest in a job</p>
            <router-link to="/new-leads" class="btn btn-primary rounded-pill px-4 py-2">View new leads</router-link>
          </div>

        </div>
      </div>
      <div class="row g-lg-4 gy-5">
        <div class="col-lg-8 offset-lg-2">

          <div class="row">
            <div class="col-lg-12 mb-30">
              <p class="text-center fw-lighter small"> You have shown interest in these job(s) </p>
              <div class="job-listing-card" v-for="(invite, i) in invites" :key="i">
                <div class="cursor-pointer"
                     @click="$router.push(`/job-lead-details/${invite.service.city_name}/${invite.service.id}`)">
                  <h5 class="text-capitalize mb-2">
                    {{ invite.service.headline }}
                  </h5>
                  <small class="fw-light">{{ invite.service.trade.name }}</small>
                  <p class="fw-light mt-3"><i class="bi bi-pin-map"></i> {{ invite.service.city_name }}
                    ({{ invite.service.distance }} miles), <small
                        class="fw-light">{{ invite.service.created_at | toHumanDate() }}</small></p>
                </div>
                <hr/>
                <div v-if="invite.status ==='accepted'">
                  <div>
                    <router-link class="btn btn-gold btn-sm"
                                 :to="`/chat?job=${invite.service.headline}&id=${invite.id}`">
                      <i class="bi bi-chat-dots"></i>
                      Send a message to the homeowner to discuss the job.
                    </router-link>
                  </div>
                </div>

                <button class="btn btn-primary flex-shrink-1" v-else>
                  <div class="badge bg-primary-1 text-white rounded-pill">
                    Invite sent. Waiting for the homeowner to respond.
                  </div>
                </button>

              </div>
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
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import HomeFooter from '../base-layout/footer';
import topHeader from '../base-layout/header-2';
import SideBar from '../base-layout/navigation/tradesperson-sidebar';
import MobileFooter from '../../components/mobile-nav';
import appConfig from "../../../app.config.json";
import {userService} from "@/apis/user.service";
import homeOwnerHeader from '../base-layout/navigation/homeowner-menu';
import store from "@/store/store";

export default {
  page: {
    title: "Contacts",
    meta: [{name: "description", content: appConfig.description}]
  },
  name: "MyContacts",
  data() {
    return {
      user: this.$store.getters.GET_USER_INFO,
      showSidebar: false,
      isMobile: false,
      isLoading: false,
      invites: [],
    };
  },
  components: {
    HomeFooter,
    topHeader,
    SideBar,
    MobileFooter,
    homeOwnerHeader
  },
  computed: {
    loggedIn() {
      return this.$store.getters.GET_USER_INFO;
    },
  },
  methods: {
    getJobInterests() {
      this.isLoading = true;
      userService.getUserInterest().then((res) => {
        this.isLoading = false;
        const {extra, status} = res;
        if (status) {
          this.invites = extra;
        }
      });
    },

    checkScreenSize() {
      this.isMobile = window.innerWidth < 992;
      this.showSidebar = !this.isMobile;
    },
  },
  created() {
    this.getJobInterests();
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
