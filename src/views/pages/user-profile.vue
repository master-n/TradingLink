<template>
  <BaseDashboardLayout>
    <template v-slot:title>
      <h4 class="title mb-5 font-weight-bold">Profile</h4>
    </template>

    <div class="row mt-4 mb-5">

      <!-- Profile Area -->
      <div class="col-md-12">
        <div class="text-center">
            <img
                :src="userProfile.avatar"
                class="mb-3"
                width="120"
                height="120"
                alt="User Avatar"
                style="border-radius: 10px; object-fit: cover;">
          <h4 class="card-title">{{ userProfile.name }}</h4>
          <p class="text-muted"><i class="fas fa-map-marker-alt"></i> {{ userProfile.parish_name }}  {{userProfile.city_name?' ~ ' + userProfile.city_name:''}}</p>

          <!-- Good to know -->
          <div class="my-3">
            <p><i class="fas fa-user-check text-primary-1"></i> Verified by Trade Link</p>
            <p><i class="fas fa-shield-alt text-primary-1"></i> Offers warranty</p>
          </div>

          <!-- Portfolio -->
          <div>
            <h5 class="mb-3">Portfolio</h5>
            <div class="row justify-content-start align-items-stretch">
              <div v-for="(item, index) in portfolio" :key="index" class="col-md-3 mb-3 d-flex">
                <div
                    class="card h-100 shadow-sm"
                    style="cursor: pointer;"
                >
                  <img
                      :src="item.file || 'https://placehold.co/400x300'"
                      class="card-img-top"
                      @click="openGallery(index)"
                      style="height: 200px; object-fit: cover;"
                  >
                  <div class="card-body">
                    <h5 class="mb-2 p-description" @click="openGallery(index)">{{ item.title || 'Untitled' }}</h5>
                    <p class="p-description" @click="openGallery(index)">{{
                        item.description || 'No description provided.'
                      }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </BaseDashboardLayout>
</template>

<script>
import BaseDashboardLayout from '../base-layout/tradesperson-dashboard';
import appConfig from "../../../app.config.json";
import {userService} from "@/apis/user.service";

export default {
  page: {
    title: "User Profile",
    meta: [{name: "description", content: appConfig.description}]
  },
  data() {
    return {
      userProfile: this.$store.getters.GET_USER_INFO || {},
      portfolioLoader: false,
      portfolio: []
    };
  },
  components: {
    BaseDashboardLayout
  },
  watch: {
    '$store.getters.GET_USER_INFO': {
      handler(newUser) {
        this.user = newUser || {};
      },
      immediate: true,
      deep: true
    }
  },

  methods: {
    openGallery(index) {
      // Logic to open a gallery modal or redirect to a detailed view
      console.log(`Open gallery for item at index: ${index}`);
    },
    getPortfolio() {
      this.portfolioLoader = true;
      userService.getPortfolio().then((res) => {
        this.portfolioLoader = false;
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.portfolio = extra.portfolio;
      });
    },


  },
  created() {
    this.getPortfolio();
  },
  mounted() {
  }
}
</script>

<style scoped>
.portfolio-item {
  transition: transform 0.2s;
}

.portfolio-item:hover {
  transform: scale(1.05);
}

>>> .slick-arrow{
  top: 30% !important;
  z-index: 100;
}

.p-description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  /*min-height: 48px;*/
}

</style>
