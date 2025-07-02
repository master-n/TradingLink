<template>
  <div>
    <homeOwnerHeader v-if="isHomeOwner"/>
    <topHeader v-else/>
    <div class="job-listing-area pt-120 mb-120">
      <div class="container text-center mt-5">
        <!-- Header with Tabs -->
        <h1 class="mb-4">Contacts</h1>
        <ul class="nav nav-pills justify-content-center mb-5">
          <li class="nav-item">
            <a class="nav-link active" href="#">Messages</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Archive</a>
          </li>
        </ul>

        <!-- Main Content -->
        <div class="row justify-content-center">
          <div class="col-md-6">
            <!-- Icon Placeholder -->
            <div class="mb-4">
              <div class="bg-light p-4 rounded-circle d-inline-flex">
                <i class="bi bi-folder-fill" style="font-size: 3rem; color: #28a745;"></i>
              </div>
            </div>

            <!-- Message -->
            <h3 class="mb-3">No contact details shared yet</h3>
            <p class="mb-4">When customers want to get in touch with you, their contact details are displayed here.</p>

            <!-- Button -->
            <router-link to="/new-leads" class="btn btn-primary rounded-pill px-4 py-2">View new leads</router-link>
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
