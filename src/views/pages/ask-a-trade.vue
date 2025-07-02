<template>
  <div>
    <homeOwnerHeader v-if="isHomeOwner"/>
    <topHeader v-else/>
    <div class="job-listing-area pt-120 mb-120">
      <div class="container">
        <div class="row g-lg-4 gy-5">
          <div class="col-lg-8 offset-lg-2 order-lg-2 order-1">
            <div class="job-listing-wrap">
              <h1 class="text-center mb-5">Ask a tradesperson</h1>

              <!-- Answer a Question Section -->
              <div class="card mb-4">
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                      <i class="bi bi-patch-question-fill me-3"></i>
                      <h5 class="card-title mb-0">Answer a question</h5>
                    </div>
                    <i class="bi bi-chevron-right"></i>
                  </div>
                  <p class="card-text mt-3">
                    Show your skills by answering questions. Strengthen your profile by providing professional answers
                    to genuine questions from our customers.
                  </p>
                </div>
              </div>

              <!-- My Answers Section -->
              <div class="card">
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                      <i class="bi bi-hand-thumbs-up me-3"></i>
                      <h5 class="card-title mb-0">My answers</h5>
                    </div>
                    <i class="bi bi-chevron-right"></i>
                  </div>
                  <p class="card-text mt-3">
                    Check for new likes on your answers. All customers can like answers. Providing the best answer to a
                    question increases your chances of being hired.
                  </p>
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
import topHeader from '../base-layout/navigation/homeowner-menu';
import SideBar from '../base-layout/navigation/tradesperson-sidebar';
import MobileFooter from '../../components/mobile-nav';
import appConfig from "../../../app.config.json";
import {userService} from "@/apis/user.service";
import homeOwnerHeader from '../base-layout/navigation/homeowner-menu';
import store from "@/store/store";

export default {
  page: {
    title: "Ask a trade",
    meta: [{name: "description", content: appConfig.description}]
  },
  name: "AskATrade",
  data() {
    return {
      user: this.$store.getters.GET_USER_INFO,
      showSidebar: false,
      isMobile: false,
      services: [],
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
    isHomeOwner() {
      const loggedUser = store.getters.GET_USER_INFO;
      if(!loggedUser){
        return false
      }
      const userRole = loggedUser.roles?.[0] || '';
      return userRole === 'homeowner';
    }
  },
  methods: {
    checkScreenSize() {
      this.isMobile = window.innerWidth < 992;
      this.showSidebar = !this.isMobile;
    },
  },
  created() {
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
.job-listing-area {
  padding-top: 120px;
  padding-bottom: 120px;
}

.card {
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.card-body {
  padding: 20px;
}

.bi-patch-question-fill, .bi-hand-thumbs-up {
  font-size: 1.5rem;
}
</style>
