<template>

  <div class="settings-container container">
    <div class="mt-4 text-end pe-4">
      <a @click="$router.push(`/my-projects/${jobId}`)" class="cursor-pointer mb-4">
        <i class="bi bi-chevron-left"></i> Go Back
      </a>
    </div>
    <div class="container mt-4">
      <!-- Header Section -->
      <div class="mb-4">
        <h2 class="">Responses to your job: headline and all the details</h2>
        <div>
          <router-link :to="'/my-projects/'+jobId" class="btn btn-link me-2 text-primary-1">View details</router-link>
          <button class="btn btn-link text-danger">Close job</button>
        </div>
      </div>

      <!-- My Chats Section -->
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">My chats</h5>
          <div v-if="isLoading">
            <div v-for="i in 4" class="lines shine" :key="i"></div>
          </div>
          <p v-if="!isLoading && chatTradespeople.length <1">You didn't start a chat with any tradespeople yet. Start a
            chat to get
            your job done soon.</p>
          <ul class="list-group list-group-flush" v-else>
            <li class="list-group-item" v-for="(person,i) in chatTradespeople" :key="i">
              <div class="d-flex align-items-center justify-content-between">
                <div>
                  {{ person.invited_user.name }}
                </div>
                <router-link
                    :to="`/homeowner/chat/${jobId}?id=${person.id}`"
                    class="btn btn-sm btn-primary"
                >
                  Message
                </router-link>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Interested Tradespeople Section -->
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">Interested tradespeople</h5>
          <div v-if="interestLoader">
            <div v-for="i in 4" class="lines shine" :key="i"></div>
          </div>
          <div v-if="!interestLoader && interestedTradespeople.length <1">
            <p>Tradespeople interested in your job will show here.</p>
            <p>Waiting for more tradespeople</p>
          </div>

          <ul class="list-group list-group-flush" v-else>
            <li class="list-group-item" v-for="(interest,i) in interestedTradespeople" :key="i">
              <div class="d-flex align-items-center justify-content-between">
                <div>
                  {{ interest.invited_user.name }}
                </div>
                <button class="btn btn-sm btn-primary" @click="acceptInvite(interest)"
                        v-if="interest.status !=='accepted'">Accept
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Get More Responses Section -->
      <div class="card mb-3" v-if="interestedTradespeople.length<10">
        <div class="card-body">
          <h5 class="card-title">Get more responses</h5>
          <p class="card-text">
            <router-link :to="'/tradesperson-recommendation/'+jobId" class="text-decoration-underline">Invite {{ 10 - interestedTradespeople.length }}</router-link>
            more recommended tradespeople to
            get more responses.</p>
        </div>
      </div>

      <!-- View Recommended Tradespeople Button -->
      <div class="d-grid gap-2">
        <router-link :to="'/tradesperson-recommendation/'+jobId" class="btn btn-primary rounded-pill">View recommended
          tradespeople
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {userService} from "@/apis/user.service";

export default {
  name: "homeownerSmMenu",
  data() {
    return {
      user: this.$store.getters.GET_USER_INFO || {},
      isMobile: false,
      interestLoader: false,
      isLoading: false,
      jobId: null,
      chatTradespeople: [],
      interestedTradespeople: [],
    };
  },
  computed: {

  },
  watch: {
    // Watch the Vuex store getter directly and update local user data
    '$store.getters.GET_USER_INFO': {
      handler(newUser) {
        this.user = newUser || {};
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    checkScreenSize() {
      this.isMobile = window.innerWidth < 768;
      if (!this.isMobile) {
        this.$router.push('/my-projects/' + this.jobId);
      }
    },
    getAcceptInterest() {
      this.isLoading = true;
      userService.getAcceptedInterest(this.jobId).then((res) => {
        this.isLoading = false;
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.chatTradespeople = extra;
      });
    },
    getJobInterests() {
      this.interestLoader = true;
      userService.getProjectInterest(this.jobId).then((res) => {
        this.interestLoader = false;
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.interestedTradespeople = extra;
      });
    },


  },
  created() {
    this.jobId = this.$route.params.id
    if (!this.jobId) {
      this.$router.push('/unauthorized');
    }
    this.getJobInterests();
    this.getAcceptInterest();

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

<style scoped>

</style>
