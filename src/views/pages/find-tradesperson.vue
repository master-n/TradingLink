<template>
  <div>
    <!--  <div class="eg-preloder">-->
    <!--  </div>-->

    <topHeader/>

    <div class="container">
      <div class="row justify-content-center align-items-center mb-4 mb-sm-0">
        <!-- Column with text content -->
        <div class="col-md-4 order-md-first order-last">
          <h1 class="mt-4 mt-sm-0">{{ selectedTrade ? selectedTrade : 'Jobs' }} near me</h1>
          <p>Discover vetted and reviewed local {{ selectedTrade ? selectedTrade : 'professionals' }} with ease. Simply
            post your job to receive free quotes from TradeLink's trusted
            {{ selectedTrade ? selectedTrade : 'professionals' }} in your area.</p>
          <div class="input-group mb-3">
            <select class="form-select" v-model="selectedTrade">
              <option v-for="(trade,i) in trades" :key="i" :value="trade.name">{{ trade.name }}</option>
            </select>
          </div>
          <router-link :to="`/post-a-job?category=${selectedTrade}`" class="mb-4">
            <button class="btn btn-primary big-button">Continue</button>
          </router-link>
        </div>
        <div class="col-md-6 position-relative text-white order-md-last order-first" style="border-radius: 5px;">
          <div class="img-before">
            <div class="overlay position-absolute w-100 h-100 top-0 start-0"></div>
            <img class="img-fluid w-100 h-100" src="../../../public/frontend/assets/images/bg/carpenter.jpg"
                 alt="Skilled carpenter at work">
          </div>
        </div>
      </div>
    </div>

    <div class="home2-job-list-area mb-40">
      <div class="home4-top-recruitersa-area">
        <div class="container" style="max-width: calc(66rem);">
          <div class="row mb-60">
            <div class="col-12 d-flex justify-content-center">
              <div class="section-title1 text-center">
                <h2>How it <span>works</span></h2>
              </div>
            </div>
          </div>
          <div class="row gy-5 justify-content-center align-items-stretch">
            <div class="col-lg-4 col-md-6 d-flex">
              <div class="fancy-card card flex-fill d-flex flex-column">
                <div class="recent-article-img card-img-top" style="height: 200px;">
                  <img class="img-fluid" src="../../../public/frontend/assets/images/home/post-job.jpg"
                       alt="Post your job">
                </div>
                <div class="recent-article-content text-center card-body">
                  <h5 class="fw-bold">Post your job for free</h5>
                  <p class="fw-lighter">Tell us what you need done. Whether it's plumbing, painting, or gardening — give
                    as much detail as you can so tradespeople understand the job clearly.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 d-flex">
              <div class="fancy-card card flex-fill d-flex flex-column">
                <div class="recent-article-img card-img-top" style="height: 200px;">
                  <img class="img-fluid" src="../../../public/frontend/assets/images/home/tradespeople-respond.jpg"
                       alt="Trades respond">
                </div>
                <div class="recent-article-content card-body text-center">
                  <h5 class="fw-bold">Tradespeople respond</h5>
                  <p class="fw-lighter">Skilled tradespeople will reply with quotes, questions, and links to their
                    profiles.
                    You can compare
                    their experience, reviews, and portfolios before making a decision.</p>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 d-flex">
              <div class="fancy-card card">
                <div class="recent-article-img card-img-top" style="height: 200px;">
                  <img class="img-fluid" src="../../../public/frontend/assets/images/home/step-3.png"
                       alt="Choose and connect">
                </div>
                <div class="recent-article-content card-body text-center">
                  <h5 class="fw-bold">Choose and connect</h5>
                  <p class="fw-lighter">When you're ready, select the tradesperson who best fits your job. Once you
                    confirm,
                    you’ll be
                    connected directly to make arrangements and get started.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="home2-talent-area mb-120">
      <div class="container" style="max-width: calc(66rem);">
        <!-- Header with Search Bar -->
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h1>Some of our top {{ selectedTrade ? selectedTrade : 'professionals' }}</h1>
        </div>
        <div class="me-3 col-md-3 col-8 mb-4">
          <input type="text" class="form-control" placeholder="Your address">
        </div>

        <!-- Sorting Options -->
        <div class="d-flex justify-content-between align-items-center mb-4">
          <p>{{ tradespersons.length }} Results</p>
<!--          <div class="dropdown">-->
<!--            <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="sortDropdown"-->
<!--                    data-bs-toggle="dropdown" aria-expanded="false">-->
<!--              Sort by: Recommended-->
<!--            </button>-->
<!--            <ul class="dropdown-menu" aria-labelledby="sortDropdown">-->
<!--              <li><a class="dropdown-item" href="#">Recommended</a></li>-->
<!--              <li><a class="dropdown-item" href="#">Highest Rated</a></li>-->
<!--              <li><a class="dropdown-item" href="#">Most Reviewed</a></li>-->
<!--            </ul>-->
<!--          </div>-->
        </div>

        <!-- Cards for Painters and Decorators -->
        <div class="row">
          <div class="col-md-4 mb-4 d-flex" v-for="(tradesperson,i) in tradespersons" :key="i">
            <div class="card flex-fill d-flex flex-column h-100">
              <!-- Card Body with fixed height -->
              <div class="card-body d-flex flex-column" style="height: 270px;">
                <div class="d-flex align-items-center mb-3 cursor-pointer" @click="$router.push(`/user-profile/${tradesperson.id}`)">
                  <img :src="tradesperson.photo" :alt="tradesperson.name"
                       class="rounded-circle me-3"
                       style="width: 50px; height: 50px; object-fit: cover" v-if="tradesperson.photo">
                  <div v-else class="profile-image cursor-pointer rounded-circle" style="width: 50px; height: 50px;">
                    <i class="bi bi-person-fill"></i>
                  </div>
                  <div>
                    <h5 class="card-title">{{ tradesperson.name }}</h5>
                    <div class="d-flex align-items-center">
                      <span class="badge bg-primary-1 text-light me-2">★ {{ tradesperson.latest_rating?tradesperson.average_rating:5 }}/5</span>
                      <span v-if="tradesperson.latest_rating">({{ tradesperson.total_ratings }} reviews)</span>
                    </div>
                  </div>
                </div>
                <p class="card-text line-clamp small fw-lighter">{{tradesperson.description ? tradesperson.description : 'No description available' }}</p>
                <button class="btn btn-outline-primary-1 w-100 ">Get in touch</button>
              </div>
              <!-- Card Footer with fixed height -->
              <div class="card-footer text-muted d-flex flex-column" style="min-height: 70px; overflow:hidden">
                <div v-if="tradesperson.latest_rating">
                  <p class="fw-lighter mb-1 small"><i class="bi bi-chat-dots"/> Latest review:</p>
                  <p class="small mb-1 fw-lighter"><span class="text-decoration-underline">{{ tradesperson.latest_rating?.service_request?.headline }}</span> - {{tradesperson.latest_rating?.created_at | toHumanDayMonthYear}}</p>
                  <p class="small line-clamp fw-lighter">{{tradesperson.latest_rating?.comment ? tradesperson.latest_rating?.comment : 'No reviews yet' }}</p>
                </div>
                <div v-else>
                  <p class="fw-lighter mb-1 small"><i class="bi bi-chat-dots"/> Latest review:</p>
                  <p class="small mb-1 fw-lighter">No reviews yet</p>
                </div>

              </div>
            </div>
          </div>
        </div>


      </div>
    </div>


    <!-- ========== Home Two Talented Area Start============= -->
    <div class="home2-talent-area mb-120">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="talent-wrap">
              <div class="talent-content">
                <h4>There's lots of demand for good <span>tradespeople</span></h4>
                <p>150,000 jobs posted every month</p>
              </div>
              <div class="find-btn">
                <a class="primry-btn-2 lg-btn" href="job-listing1.html">Sign up for free</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ========== Home Two Talented Area End============= -->
    <div class="py-5 bg-primary-1">
      <div class="container">
        <a href="/post-a-job" class="d-flex justify-content-start align-items-center">
          <h2 class="text-light fw-bold me-2">Post your job now</h2>
          <svg aria-hidden="true" focusable="false" data-prefix="fass" data-icon="circle-arrow-right"
               class="svg-inline--fa fa-circle-arrow-right " role="img" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 512 512" fill="currentColor" color="#FFFFFF" style="width: 1.5rem; height: 1.5rem;">
            <path fill="currentColor"
                  d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zm409 17L297 385l-17 17L246.1 368l17-17 71-71L120 280l-24 0 0-48 24 0 214.1 0-71-71-17-17L280 110.1l17 17L409 239l17 17-17 17z"></path>
          </svg>
        </a>
      </div>
    </div>

    <HomeFooter></HomeFooter>

  </div>

</template>

<script>
import HomeFooter from '../base-layout/footer'
import topHeader from '../base-layout/header-2'
import {userService} from "@/apis/user.service";
import appConfig from "../../../app.config.json";

export default {
  page: {
    title: "Find Tradesperson | " + appConfig.title,
    meta: [{name: "description", content: appConfig.description}],
  },
  data() {
    return {
      selectedTradeId: '',
      selectedTrade: '',
      trades: [],
      tradespersons: [],
      isLoading: false,
      tradeLoader: false,
    };
  },
  components: {
    HomeFooter,
    topHeader
  },
  methods: {

    getTrades() {
      this.tradeLoader = true
      userService.getTrades().then((res) => {
        this.trades = res.extra;
        this.tradeLoader = false
      });
    },

    getTradespersonsByTrade() {
      this.isLoading = true
      userService.getTradespersonsByTrade(this.selectedTrade).then((res) => {
        this.tradespersons = res.extra;
        this.isLoading = false
      });
    },

  },
  created() {
    const category = this.$route.query.category;
    if (category) {
      this.selectedTrade = category
    }
    this.getTrades();
    this.getTradespersonsByTrade()
  },
  mounted() {
    $('.sidebar-button').on("click", function () {
      $('.main-menu').addClass('show-menu');
    });

    $('.menu-close-btn').on("click", function () {
      $('.main-menu').removeClass('show-menu');
    });
// mobile-search-area

    $('.search-btn').on("click", function () {
      $('.mobile-search').addClass('slide');
    });

    $('.search-cross-btn').on("click", function () {
      $('.mobile-search').removeClass('slide');
    });
    this.$nextTick(() => {
      $('.select1').select2({
        width: '100%',
        multiple: false,
        tags: false,
        allowClear: true,
      });

    });
  }

}
</script>

<style scoped>

</style>