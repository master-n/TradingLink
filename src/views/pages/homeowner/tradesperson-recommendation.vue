<template>
  <div>
    <topHeader/>
    <div class="mt-4 text-end pe-4">
      <a @click="$router.push(`/my-projects/${jobId}`)" class="cursor-pointer">
        <i class="bi bi-chevron-left"></i> Job Details
      </a>
    </div>
    <div class="container mt-4" style="margin-bottom: 7rem">
      <div class="row">
        <div class="col-md-12 text-center mb-4">
          <h1>Let's find the best tradespeople near you</h1>
        </div>
        <div class="col-md-8 offset-md-2 text-center mb-4">
          <div class="alert bg-primary-1 diamond">
            <p class="fw-lighter mb-0 text-light">Invite 10 tradespeople to give you a quote. It's the fastest way to
              start a conversation!</p>
          </div>
        </div>
        <div class="col-md-8 offset-md-2">
          <div class="d-flex justify-content-between mb-4">
            <div class="text-center">
              <i class="bi bi-envelope-fill mb-2 text-primary-1" style="font-size: 2rem;"></i>
              <p>Send invites</p>
            </div>
            <div class="text-center">
              <i class="bi bi-chat mb-2" style="font-size: 2rem;"></i>
              <p>Get responses</p>
            </div>
            <div class="text-center">
              <i class="bi bi-chat-dots mb-2" style="font-size: 2rem;"></i>
              <p>Start chats</p>
            </div>
          </div>
          <h2 class="mb-4">Recommended tradespeople</h2>
          <div class="row" v-if="!isLoading">
            <div class="col-md-6 mb-4" v-for="(tradesperson, i) in tradespersons" :key="i">
              <div class="card">
                <div class="card-body text-center">
                  <router-link :to="`/user-profile/${tradesperson.id}`">
                    <img v-if="tradesperson.photo" :src="tradesperson.photo" alt="Profile" class=""
                         style="width: 50px; height: 50px; object-fit: cover; border-radius: 10px;"/>
                    <i v-else class="bi bi-person-circle mb-3" style="font-size: 2rem;"></i>
                    <h5 class="card-title">{{ tradesperson.name }}</h5>
                  </router-link>
                  <p class="card-text fw-bold text-primary-1">New on Trade Link</p>
                  <p class="card-text fw-lighter">Active within <span class="fw-bold">{{ tradesperson.distance }} miles of {{
                      city_name
                    }}</span>
                  </p>

                  <div>
                    <div v-if="tradesperson.invited">
                      <router-link :to="`/homeowner/chat/${jobId}?id=${tradesperson.user_invite.id}`"
                                   class="btn btn-gold">
                        <i class="bi bi-chat-dots"></i> View Chats
                      </router-link>
                    </div>

                    <button class="btn btn-primary" @click="chatTradesperson(tradesperson)" v-else>Send
                      message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-else>
            <div class="col-md-6 mb-4" v-for="i in 4" :key="i">
              <div class="card">
                <div class="card-body">
                  <div class="lines shine"></div>
                  <div class="lines shine"></div>
                  <div class="lines shine"></div>
                  <div class="lines shine"></div>
                  <div class="lines shine"></div>
                  <div class="lines shine"></div>
                </div>
              </div>

            </div>
          </div>
          <div class="text-center mt-4" v-if="tradespersons.length ===0">
            <p class="fw-lighter">Our algorithm is still locating the tradespersons around you, We recommend
              tradespeople based on your location and the service you need. If you want to
              see more tradespeople, please change your location or service.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import topHeader from '../../base-layout/navigation/homeowner-menu';
import appConfig from "../../../../app.config.json";
import {userService} from "@/apis/user.service";

export default {
  name: "TradespersonRecommendation",
  page: {
    title: "Tradesperson Recommendation | " + appConfig.name,
    meta: [{name: "description", content: appConfig.description}]
  },
  components: {
    topHeader,
  },
  data() {
    return {
      place: null,
      user: this.$store.getters.GET_USER_INFO,
      tradespersons: [],
      jobId: '',
      parish_name: '',
      city_name: '',
      isLoading: false,
    };
  },
  methods: {
    getRecommendedTradesperson() {
      this.isLoading = true;
      userService.getRecommendedTradesperson(this.jobId).then((res) => {
        this.isLoading = false;
        const {extra, status} = res;
        if (status) {
          this.tradespersons = extra.recommended;
          this.city_name = extra.city_name;
          this.parish_name = extra.parish_name;
        }
      });
    },

    chatTradesperson(tradesperson) {
      // invite tradesperson to the job with status accepted, send tradesperson a notification and chat with the tradesperson
      this.isLoading = true;
      const payload = {
        invited_user_id: tradesperson.id,
        request_id: this.$route.params.id,
      };
      userService.inviteTradesperson(payload).then((res) => {
        this.isLoading = false;
        const {extra, status,message} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.$router.push(`/homeowner/chat/${this.jobId}?id=${extra.id}`);

      });
    },
  },
  mounted() {
    this.jobId = this.$route.params.id;
    if (!this.jobId) {
      this.$router.push('/unauthorized');
      return;
    }

    this.getRecommendedTradesperson();
    this.$nextTick(() => {
      $('.sidebar-button').on("click", function () {
        $('.main-menu').addClass('show-menu');
      });
      $('.menu-close-btn').on("click", function () {
        $('.main-menu').removeClass('show-menu');
      });
      $('.search-btn').on("click", function () {
        $('.mobile-search').addClass('slide');
      });
      $('.search-cross-btn').on("click", function () {
        $('.mobile-search').removeClass('slide');
      });
    });
  },
};
</script>

<style scoped>
.diamond::before {
  content: "";
  position: absolute;
  top: 100%;
  left: 5%;
  width: 1rem;
  height: 1rem;
  background-color: #00A7AC;
  transform: translateY(-50%) translateX(-50%) rotate(45deg);
}

</style>
