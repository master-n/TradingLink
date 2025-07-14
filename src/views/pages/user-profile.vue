<template>
<div>
  <div class="container">
    <homeOwnerHeader v-if="isHomeOwner"/>

    <topHeader v-else/>
  </div>

  <div class="container py-4">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div @click="$router.go(-1)" class="text-muted mb-5 cursor-pointer"><i class="bi bi-arrow-left"></i> Back</div>

        <div class="alert bg-primary-1 mb-5 py-1" v-if="checkIfUser">
          <p class="fw-lighter text-light small mb-0"><i class="bi bi-info-circle"/> Viewing profile as a customer</p>
          <router-link to="/profile" class="small text-light">Edit Profile <i class="bi bi-arrow-right"/></router-link>
        </div>

        <!-- Header -->
        <div class="d-flex align-items-center mb-5">
          <img v-if="userInfo.photo" :src="userInfo.photo" alt="Company Logo"
               class="rounded-circle me-3" width="60"
               height="60" style="object-fit: cover;"/>
          <div v-else class="profile-image cursor-pointer rounded-circle" style="width: 70px; height: 70px;">
            <i class="bi bi-person-fill"></i>
          </div>
          <div v-if="!userLoader">
            <h6 class="mb-2">{{ userInfo.name }}</h6>
            <div class="text-muted mb-2">
              <i class="bi bi-star-fill text-primary-1"></i> 4.9/5 (551 reviews)
            </div>
            <div v-if="userInfo.city_name"><i class="bi bi-geo-alt"></i>
              {{ userInfo.city_name ? `${userInfo.city_name} ~ ${userInfo.parish_name}` : '' }}
            </div>
            <div v-else><i class="bi bi-geo-alt"></i> N/A</div>
          </div>
          <div v-else class="w-50">
            <div class="lines shine" v-for="(item,i) in 3" :key="i"></div>
          </div>
        </div>
        <div class="mb-5" v-if="!checkIfUser">
          <b-button variant="primary">Get in touch</b-button>
        </div>

        <!-- Tabs -->
        <b-tabs v-model="tabIndex" fill>
          <b-tab title="Profile">
            <!-- Good to know -->
            <div class="mb-4 mt-4">
              <h6>Good to know</h6>
              <ul class="list-unstyled">
                <!--                <li><i class="bi bi-person-check me-2"></i> Verified by Trade Link</li>-->
                <li><i class="bi bi-shield-check me-2"></i> {{ guarantee ? 'Offers warranty' : 'N/A' }}</li>
                <!--                <li><i class="bi bi-building me-2"></i> Registered at Companies House</li>-->
              </ul>
            </div>

            <!-- About -->
            <div class="mb-4" v-if="userInfo.description">
              <h6 class="fw-bold">About this company *</h6>
              <p class="fw-lighter small">
                {{ userInfo.description || 'No description provided.' }}
              </p>
              <!--              <p class="fst-italic small">-->
              <!--                *Trade Lin does not check company descriptions. If you think something is incorrect,-->
              <!--                <a href="#">let us know</a>.-->
              <!--              </p>-->
            </div>

            <!-- Portfolio -->
            <div class="mt-2" v-if="portfolio.length >0">
              <h6 class="fw-bold">Portfolio</h6>
              <div class="row g-2">
                <div class="col-4 col-sm-3 col-md-2" v-for="(item, index) in portfolio" :key="index">
                  <img :src="item.file || 'https://placehold.co/400x300'" class="img-fluid rounded border"
                       alt="Portfolio image" @click="openGallery(index)"/>
                </div>
              </div>
            </div>
          </b-tab>

          <b-tab title="Reviews">
            <p class="mt-4 fw-lighter small">Customer reviews will be displayed here.</p>
          </b-tab>
        </b-tabs>

      </div>
    </div>
    <!-- Back -->
  </div>

  <!-- Gallery Modal -->
  <b-modal v-model="galleryVisible" size="xl" hide-footer centered>
    <div class="d-flex flex-row">
      <b-button
          variant="light"
          class="position-absolute btn-primary"
          style="top: 50%; left: 20px; transform: translateY(-50%); z-index: 10; border-radius: 50%; width: 50px; height: 50px;"
          @click="prevImage"
          :disabled="currentIndex === 0"
      >
        <i class="bi bi-chevron-left"></i>
      </b-button>
      <b-button
          variant="light"
          class="position-absolute btn-primary"
          style="top: 50%; right: 20px; transform: translateY(-50%); z-index: 10; border-radius: 50%; width: 50px; height: 50px;"
          @click="nextImage"
          :disabled="currentIndex === portfolio.length - 1"
      >
        <i class="bi bi-chevron-right"></i>
      </b-button>
    </div>
    <div class="row">
      <div class="col-md-6">
        <img
            :src="portfolio[currentIndex]?.file || 'https://placehold.co/400x300'"
            class="img-fluid w-100" style="object-fit: cover"
        >
      </div>
      <div class="col-md-6">
        <h5 class="mt-4">{{ portfolio[currentIndex]?.title || 'Untitled' }}</h5>
        <p>{{ portfolio[currentIndex]?.description || 'No description provided.' }}</p>
      </div>
    </div>
  </b-modal>

</div>
</template>

<script>
import BaseDashboardLayout from '../base-layout/tradesperson-dashboard';
import appConfig from "../../../app.config.json";
import {userService} from "@/apis/user.service";
import topHeader from '../base-layout/navigation/home-menu';
import store from "@/store/store";
import homeOwnerHeader from '../base-layout/navigation/homeowner-menu'


export default {
  page: {
    title: "User Profile",
    meta: [{name: "description", content: appConfig.description}]
  },
  name: 'UserProfile',
  data() {
    return {
      tabIndex: 0,
      userProfile: this.$store.getters.GET_USER_INFO || {},
      portfolioLoader: false,
      portfolio: [],
      galleryVisible: false,
      userLoader: false,
      currentIndex: 0,
      guarantee: '',
      userInfo: {},
    };
  },
  components: {
    BaseDashboardLayout,
    topHeader,
    homeOwnerHeader
  },
  watch: {
  },
  computed: {
    checkIfUser() {
      return Number(this.userProfile.id) === Number(this.userInfo.id);
    },
    isHomeOwner() {
      const loggedUser = store.getters.GET_USER_INFO;
      if (!loggedUser) {
        return false
      }
      const userRole = loggedUser.roles?.[0] || '';
      return userRole === 'homeowner';
    }

  },
  methods: {
    openGallery(index) {
      this.currentIndex = index;
      this.galleryVisible = true;
    },
    prevImage() {
      if (this.currentIndex > 0) this.currentIndex--;
    },
    nextImage() {
      if (this.currentIndex < this.portfolio.length - 1) this.currentIndex++;
    },

    getUserProfile(userId) {
      this.userLoader = true;
      userService.getUserProfile(userId).then((res) => {
        this.userLoader = false;
        const {status, extra} = res;
        if (!status) {
          this.$router.push('/error/404')
          return;
        }
        this.userInfo = extra;
      });
    }

  },
  created() {
    // Fetch user profile data
    const userId = this.$route.params.userId;
    if (!userId) {
      this.$router.push('/unauthorized')
      return;
    }
    this.getUserProfile(userId);
  },
  mounted() {
  }
}
</script>

<style scoped>
</style>
