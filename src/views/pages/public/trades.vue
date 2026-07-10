<template>
  <div>
    <RoleBasedHeader :userRole="userRole"/>
    <div class="container pt-5">

      <div class="text-center mb-4">
        <h2 class="fw-bold">Our tradespeople's professions</h2>
        <p class="text-muted">Find skilled professionals across a wide range of trades</p>
      </div>

      <div class="row g-3" v-if="trades.length === 0" >
        <div class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3" v-for="item in 15"
             :key="item">
          <div class="card h-100 shadow-sm trade-card text-center p-3">
            <div class="lines shine"></div>
          </div>
        </div>

      </div>

      <div class="row g-3">
        <div
            class="col-6 col-sm-4 col-md-3 col-lg-2"
            v-for="(trade, index) in trades"
            :key="index"
        >
          <router-link :to="`/find-tradesperson?category=${trade.name}`" class="card h-100 shadow-sm trade-card text-center p-3">
            <span class="text-dark fw-semibold small">{{ trade.name }}</span>
          </router-link>
        </div>
      </div>

      <div class="bg-light py-5">
        <div class="container">
          <h2 class="fw-bold text-center mb-5">Hire an exceptional tradesperson</h2>
          <div class="row text-center">
            <div class="col-md-4 mb-4 mb-md-0">
              <h3 class="text-primary-1 fw-bold fs-2">1</h3>
              <h5 class="fw-semibold">Post your job</h5>
              <p class="text-muted">Tell us about your job, and we'll send it to suitable tradespeople in your area.</p>
            </div>
            <div class="col-md-4 mb-4 mb-md-0">
              <h3 class="text-primary-1 fw-bold fs-2">2</h3>
              <h5 class="fw-semibold">Tradespeople respond</h5>
              <p class="text-muted">Once your job is posted, you'll get responses from interested tradespeople, usually within 24 hours.</p>
            </div>
            <div class="col-md-4">
              <h3 class="text-primary-1 fw-bold fs-2">3</h3>
              <h5 class="fw-semibold">Shortlist and get in touch</h5>
              <p class="text-muted">Browse profiles, photos, and reviews, then choose who to share your details with.</p>
            </div>
          </div>
        </div>
      </div>


    </div>

    <div class="py-5 iJZMjH">
      <div class="container">
        <router-link to="/post-a-job" class="hOqzfX kFPtkB">
          <h2 class="text-light fw-bold">Post your job now</h2>
          <svg aria-hidden="true" focusable="false" data-prefix="fass" data-icon="circle-arrow-right"
               class="svg-inline--fa fa-circle-arrow-right " role="img" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 512 512" fill="currentColor" color="#FFFFFF" style="width: 1.5rem; height: 1.5rem;">
            <path fill="currentColor"
                  d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zm409 17L297 385l-17 17L246.1 368l17-17 71-71L120 280l-24 0 0-48 24 0 214.1 0-71-71-17-17L280 110.1l17 17L409 239l17 17-17 17z"></path>
          </svg>
        </router-link>
      </div>
    </div>

    <HomeFooter/>

  </div>
</template>

<script>
import HomeFooter from "../../base-layout/footer";
import store from "@/store/store";
import appConfig from "../../../../app.config.json";
import RoleBasedHeader from "@/views/base-layout/roleBasedHeader";
import {userService} from "@/apis/user.service";

export default {
  name: "OurTrades",
  page: {
    title: "Trades | Trade Link",
    meta: [{name: "description", content: appConfig.pageDescriptions.about}],
  },
  computed: {
    userRole() {
      const loggedUser = store.getters.GET_USER_INFO;
      if (!loggedUser) {
        return "";
      }
      return loggedUser?.roles?.[0] || "";
    },
  },
  components: {
    HomeFooter,
    RoleBasedHeader,
  },
  data() {
    return {
      trades: []
    };
  },
  methods: {
    async getAllTrades() {
      this.loader = true
      userService.getTrades().then((res) => {
        this.categoryLoader = false;
        this.trades = res.extra;
      });
    },
  },
  created() {
    this.getAllTrades();
  }
};
</script>

<style scoped>
.trade-card {
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  border-radius: 0.5rem;
}

.trade-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}
</style>
