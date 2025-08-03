<template>
  <div>
    <RoleBasedHeader :userRole="userRole" />

    <div class="hero2">
      <div class="hero-wapper overflow-visible">
        <div class="container-fluid px-0">
          <div class="row">
            <div class="col-lg-7 d-flex align-items-center">
              <div class="hero-content">
                <h1>Find Trusted Tradespeople Across Jamaica - Fast, Reliable, <span>Secure</span></h1>
                <h4 class="text-light mt-5">Postyour job and get connected with eartined professionals today</h4>
                <div class="job-search-area mt-3">
                  <form @submit.prevent>
                    <div class="form-inner job-title">
                      <input type="text" id="search" placeholder="For example: cleaner" v-model="searchQuery"
                             @input="filterCategories" @focus="showDropdown = true" @blur="collapseDropdown">
                      <ul v-if="showDropdown" class="list-group dropdown position-absolute w-100 text-start mt-1">
                        <li v-for="result in filteredCategories"
                            :key="result.id"
                            @click="goToPostJob(result)"
                            class="list-group-item list-group-item-action">
                          <div class="fw-bold">{{ result.name }}</div>
                        </li>
                      </ul>

                    </div>

<!--                    <div class="form-inner">-->
<!--                      <button type="button" class="primry-btn-2" @click="showDropdown=true"><img-->
<!--                          src="../../../../public/frontend/assets/images/icon/search-icon.svg" alt=""> Search-->
<!--                      </button>-->
<!--                    </div>-->
                  </form>

                  <!--                  <div class="dropdown" v-show="showDropdown">-->
<!--                    <ul>-->
<!--                      <li v-for="(category,i) in filteredCategories" :key="i">-->
<!--                        <router-link :to="'/post-a-job?category='+category.name">{{ category.name }}</router-link>-->
<!--                      </li>-->
<!--                    </ul>-->
<!--                  </div>-->
                </div>
              </div>
            </div>
            <div class="col-lg-5 d-flex jsutify-content-end">
              <div class="banner-image-area">
                <div class="banner-img-left">
                  <div class="banner-img1">
                    <img class="img-fluid" src="../../../../public/frontend/assets/images/bg/carpenter-cutting.jpg"
                         alt="">
                  </div>
                  <div class="banner-img2">
                    <img class="img-fluid" src="../../../../public/frontend/assets/images/bg/carpenter-2.jpg" alt="">
                  </div>
                </div>
                <div class="banner-img-center">
                  <div class="banner-img3">
                    <img class="img-fluid" src="../../../../public/frontend/assets/images/bg/construction.jpg" alt=""
                         style="width: 210px; height: 330px; object-fit: cover">
                  </div>
                  <div class="banner-img4">
                    <div class="user-area" style="padding:10px 40px">
                      <ul>
                        <li>
                          <div class="total-user">
                            <h6>21k</h6>
                          </div>
                        </li>
                      </ul>
                      <p>People Joined!</p>
                    </div>
                  </div>
                </div>
                <div class="banner-img-right">
                  <div class="banner-img5">
                    <div class="new-job-list">
                      <h3>2400+</h3>
                      <p>New Job Listed!</p>
                    </div>
                  </div>
                  <div class="banner-img6">
                    <img class="img-fluid" src="../../../../public/frontend/assets/images/bg/carpenter.jpg"
                         style="width: 150px; height: 230px; object-fit: cover" alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="counter-area home2-counter-area mb-20">
      <div class="container">
        <div class="row justify-content-center" v-if="!statsLoader && stats">
          <div class="col-lg-4 col-sm-6 col-12 mb-4 d-flex justify-content-center">
            <div class="counter-single border-start text-start px-3" style="min-width: 200px;">
              <div class="coundown">
                <p class="mb-1">Tradespeople</p>
                <div class="d-flex align-items-center gap-2">
                  <h3 class="odometer mb-0 fw-bold">{{ stats.tradespeople }}</h3>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-sm-6 col-12 mb-4 d-flex justify-content-center">
            <div class="counter-single border-start text-start px-3" style="min-width: 200px;">
              <div class="coundown">
                <p class="mb-1">Trade categories</p>
                <div class="d-flex align-items-center gap-2">
                  <h3 class="odometer mb-0 fw-bold">{{ stats.trade_categories }}</h3>
                  <span class="fw-bold">+</span>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-sm-6 col-12 mb-4 d-flex justify-content-center">
            <div class="counter-single border-start text-start px-3" style="min-width: 200px;">
              <div class="coundown">
                <p class="mb-1">Reviews</p>
                <div class="d-flex align-items-center gap-2">
                  <h3 class="odometer mb-0 fw-bold">{{ stats.reviews }}</h3>
                  <span class="fw-bold">+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-center" v-else>
          <div class="col-lg-4 col-sm-6 col-12 mb-4 d-flex justify-content-center">
            <div class="counter-single border-start text-start px-3" style="min-width: 200px;">
              <div>
                <p class="mb-1">Tradespeople</p>
                <div class="d-flex align-items-center gap-2">
                  <div class="shine lines"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-sm-6 col-12 mb-4 d-flex justify-content-center">
            <div class="counter-single border-start text-start px-3" style="min-width: 200px;">
              <div class="">
                <p class="mb-1">Trade categories</p>
                <div class="d-flex align-items-center gap-2">
                  <div class="shine lines"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-sm-6 col-12 mb-4 d-flex justify-content-center">
            <div class="counter-single border-start text-start px-3" style="min-width: 200px;">
              <div class="coundown">
                <p class="mb-1">Reviews</p>
                <div class="d-flex align-items-center gap-2">
                  <div class="shine lines"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>


    <div class="home2-working-process mb-120">
      <div class="container" style="max-width: calc(66rem);">
        <div class="row mb-60">
          <div class="col-12 d-flex justify-content-center">
            <div class="section-title1 text-center">
              <img alt="image" class="img-fluid mb-2" src="../../../../public/frontend/assets/images/header1-logo.svg"
                   style="height: 80px;">
              <h2>How tradelink <span>works</span></h2>
            </div>
          </div>
        </div>
        <div class="row gy-5 justify-content-center align-items-stretch">
          <div class="col-lg-4 col-md-6 d-flex">
            <div class="fancy-card card flex-fill d-flex flex-column">
              <div class="recent-article-img card-img-top" style="height: 200px;">
                <img class="img-fluid" src="../../../../public/frontend/assets/images/home/step-1.png" alt="Post your job">
              </div>
              <div class="text-center card-body" style="background: white;">
                <h5 class="fw-bold">Post your job</h5>
                <p class="fw-lighter">Tell us what you need done. Whether it's plumbing, painting, or gardening — give
                  as much detail as you can so tradespeople understand the job clearly.
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 d-flex">
            <div class="fancy-card card flex-fill d-flex flex-column">
              <div class="recent-article-img card-img-top" style="height: 200px;">
                <img class="img-fluid" src="../../../../public/frontend/assets/images/home/step-2.png" alt="Trades respond">
              </div>
              <div class="card-body text-center" style="background: white;">
                <h5 class="fw-bold">Trades respond</h5>
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
                <img class="img-fluid" src="../../../../public/frontend/assets/images/home/step-3.png" alt="Choose and connect">
              </div>
              <div class="card-body text-center" style="background: white;">
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

    <div class="home3-top-company mb-120">
      <div class="container">
        <div class="row mb-60">
          <div class="col-12 d-flex flex-wrap align-items-end justify-content-md-between justify-content-start gap-3">
            <div class="section-title1">
              <h2>Popular <span>Categories</span></h2>
              <p>Find top-rated professionals and services from trusted users across Jamaica, island-wide.</p>
            </div>
            <div class="explore-btn">
              <a href="#">Explore More
                <span>
                <img src="../../../../public/frontend/assets/images/icon/explore-elliose.svg" alt="">
              </span>
              </a>
            </div>
          </div>
        </div>
        <div class="row justify-content-center g-4">
          <div class="col-lg-4 col-md-6 col-sm-10" v-for="(trade, i) in trades" :key="i">
            <div class="top-company-card">
              <div class="company-details">
                <div class="name-location">
                  <h5>
                    <router-link :to="'/find-tradesperson?category='+trade.name">{{ trade.name }}</router-link>
                  </h5>
                </div>
              </div>
              <div class="job-details-vacancies">
                <div class="apply-btn">
                  <router-link :to="'/find-tradesperson?category='+trade.name"><span/>View
                    Details
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="home2-category-area mb-120">
      <div class="container" style="    max-width: calc(66rem);">
        <div class="row mb-60">
          <div class="col-12 d-flex justify-content-center gap-3 mb-5">
            <div class="section-title1 text-center">
              <h2>Looking for job <span>leads?</span></h2>
              <h4>Grow your business with <span class="">Tradelink</span></h4>
            </div>
          </div>

          <div class="col-12 col-md-4 offset-md-1">
            <img src="../../../../public/frontend/assets/images/bg/carpenter.jpg" alt="Skilled carpenter at work"
                 class="img-fluid card-cut">
          </div>

          <div class="col-12 col-md-6">
            <h5 class="mb-3 mt-3 mt-md-2">Tradelink helps you find the kind of jobs you actually want, quickly and reliably.</h5>

            <p class="font-weight-lighter mb-3">Sign up for free to receive a steady stream
              of local job opportunities that match your skills.</p>

            <p class="font-weight-lighter">Take on big jobs or smaller gap fillers - it’s up to you.</p>

          </div>


        </div>
      </div>
    </div>

    <div class="home2-talent-area mb-120">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="talent-wrap bg-primary-dark">
              <div class="talent-content">
                <h4>Grow your business with Tradelink - Thousands of jobs posted every <span>month.</span></h4>
              </div>
              <button class="find-btn primry-btn-2 lg-btn" @click="goToSignUp()">
                Sign up for free *
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="home5-clients-feedback-area">
      <div class="container">
        <div class="row mb-5">
          <div class="section-title3">
            <h2 class="text-light">Find Trusted Tradespeople for Your Project</h2>
            <p class="text-light">Join thousands of happy clients. Post your job and get quotes from verified professionals today.</p>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-3">
            <div class="card card-cut bg-primary-1 text-light mb-sm-2 mb-3">
              <div class="card-body py-5" style="margin-bottom: 1rem">
                <h3 class="">Verified Reviews from Real Customers</h3>
                <p class="fw-lighter text-light mt-3" style="font-size: 18px">Authentic feedback from homeowners like you</p>
                <div class="text-center mt-5">
                  <router-link to="/post-a-job" class="btn btn-light text-center py-3 btn-block">Get Free Quotes</router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-9">
            <div class="swiper home5-feedback-slider swiper-initialized swiper-horizontal swiper-pointer-events">
              <div class="swiper-wrapper" id="swiper-wrapper-a97345a614234bc4" aria-live="off"
                   style="transform: translate3d(-2624px, 0px, 0px); transition-duration: 1700ms;">
                <div class="swiper-slide swiper-slide-duplicate" data-swiper-slide-index="0" role="group"
                     aria-label="1 / 2" style="width: 636px; margin-right: 20px;">
                  <div class="client-feedback-wrap hover-btn">
                    <span class="for-border"></span>
                    <div class="client-feedback-inner">
                      <div class="client-feedback-top">
                        <div class="author-area">
                          <div class="author-img">
                            <img src="../../../../public/frontend/assets/images/bg/home5-testimonial-01.png" alt="">
                            <div class="author-quat">
                              <img class="quate1" src="../../../../public/frontend/assets/images/icon/home5-testimonial-quat.svg" alt="">
                              <img class="quate2" src="../../../../public/frontend/assets/images/icon/home5-testimonial-quat2.svg" alt="">
                            </div>
                          </div>
                          <div class="author-content">
                            <h5>Rakhab Uddin</h5>
                            <span>UI/UX Engineer</span>
                          </div>
                        </div>
                        <div class="reviews">
                          <ul>
                            <li><i class="bi bi-star-fill"></i></li>
                            <li><i class="bi bi-star-fill"></i></li>
                            <li><i class="bi bi-star-fill"></i></li>
                            <li><i class="bi bi-star-fill"></i></li>
                            <li><i class="bi bi-star-half"></i></li>
                          </ul>
                        </div>
                      </div>
                      <div class="client-feedback-content">
                        <p>On the other hand, denounce with righteous to indignation and dislike men who are so the
                          beguiled and demoralized.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-prev" data-swiper-slide-index="1"
                     role="group" aria-label="2 / 2" style="width: 636px; margin-right: 20px;">
                  <div class="client-feedback-wrap hover-btn">
                    <span class="for-border"></span>
                    <div class="client-feedback-inner">
                      <div class="client-feedback-top">
                        <div class="author-area">
                          <div class="author-img">
                            <img src="../../../../public/frontend/assets/images/bg/home5-testimonial-02.png" alt="">
                            <div class="author-quat">
                              <img class="quate1" src="../../../../public/frontend/assets/images/icon/home5-testimonial-quat.svg" alt="">
                              <img class="quate2" src="../../../../public/frontend/assets/images/icon/home5-testimonial-quat2.svg" alt="">
                            </div>
                          </div>
                          <div class="author-content">
                            <h5>Mrs. Jordan Harry</h5>
                            <span>UI/UX Engineer</span>
                          </div>
                        </div>
                        <div class="reviews">
                          <ul>
                            <li><i class="bi bi-star-fill"></i></li>
                            <li><i class="bi bi-star-fill"></i></li>
                            <li><i class="bi bi-star-fill"></i></li>
                            <li><i class="bi bi-star-fill"></i></li>
                            <li><i class="bi bi-star-half"></i></li>
                          </ul>
                        </div>
                      </div>
                      <div class="client-feedback-content">
                        <p>On the other hand, denounce with righteous to indignation and dislike men who are so the
                          beguiled and demoralized.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide swiper-slide-duplicate-active" data-swiper-slide-index="0" role="group"
                     aria-label="1 / 2" style="width: 636px; margin-right: 20px;">
                  <div class="client-feedback-wrap hover-btn">
                    <div class="client-feedback-inner">
                      <h5 class="fw-bold">Replace wooden front door with upvc</h5>

                      <div class="client-feedback-top">
                        <div class="author-area">
                          <div class="author-content">
                            <h5>Rakhab Uddin</h5>
                          </div>
                        </div>
                        <div class="reviews">
                          <ul>
                            <li><i class="bi bi-star-fill"></i></li>
                            <li><i class="bi bi-star-fill"></i></li>
                            <li><i class="bi bi-star-fill"></i></li>
                            <li><i class="bi bi-star-fill"></i></li>
                            <li><i class="bi bi-star-half"></i></li>
                          </ul>
                        </div>
                      </div>
                      <div class="client-feedback-content">
                        <p>"Wow! Very efficient and professional. Really good communication on time and did a great job of de-weeding the …"</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide swiper-slide-prev swiper-slide-duplicate-next" data-swiper-slide-index="1"
                     role="group" aria-label="2 / 2" style="width: 636px; margin-right: 20px;">
                  <div class="client-feedback-wrap hover-btn">
                    <span class="for-border"></span>
                    <div class="client-feedback-inner">
                      <div class="client-feedback-top">
                        <div class="author-area">
                          <div class="author-img">
                            <img src="../../../../public/frontend/assets/images/bg/home5-testimonial-02.png" alt="">
                            <div class="author-quat">
                              <img class="quate1" src="../../../../public/frontend/assets/images/icon/home5-testimonial-quat.svg" alt="">
                              <img class="quate2" src="../../../../public/frontend/assets/images/icon/home5-testimonial-quat2.svg" alt="">
                            </div>
                          </div>
                          <div class="author-content">
                            <h5>Mrs. Jordan Harry</h5>
                          </div>
                        </div>
                        <div class="reviews">
                          <ul>
                            <li><i class="bi bi-star-fill"></i></li>
                            <li><i class="bi bi-star-fill"></i></li>
                            <li><i class="bi bi-star-fill"></i></li>
                            <li><i class="bi bi-star-fill"></i></li>
                            <li><i class="bi bi-star-half"></i></li>
                          </ul>
                        </div>
                      </div>
                      <div class="client-feedback-content">
                        <p>"They provide a professional service with attention to detail and competitive pricing. I recommend their servic…"</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide swiper-slide-duplicate swiper-slide-active" data-swiper-slide-index="0"
                     role="group" aria-label="1 / 2" style="width: 636px; margin-right: 20px;">
                  <div class="client-feedback-wrap hover-btn">
                    <span class="for-border"></span>
                    <div class="client-feedback-inner">
                      <div class="client-feedback-top">
                        <div class="author-area">
                          <div class="author-img">
                            <img src="../../../../public/frontend/assets/images/bg/home5-testimonial-01.png" alt="">
                            <div class="author-quat">
                              <img class="quate1" src="../../../../public/frontend/assets/images/icon/home5-testimonial-quat.svg" alt="">
                              <img class="quate2" src="../../../../public/frontend/assets/images/icon/home5-testimonial-quat2.svg" alt="">
                            </div>
                          </div>
                          <div class="author-content">
                            <h5>Rakhab Uddin</h5>
                          </div>
                        </div>
                        <div class="reviews">
                          <ul>
                            <li><i class="bi bi-star-fill"></i></li>
                            <li><i class="bi bi-star-fill"></i></li>
                            <li><i class="bi bi-star-fill"></i></li>
                            <li><i class="bi bi-star-fill"></i></li>
                            <li><i class="bi bi-star-half"></i></li>
                          </ul>
                        </div>
                      </div>
                      <div class="client-feedback-content">
                        <p>"Quick turnaround, good price, good communication and 10yr warranty"</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide swiper-slide-duplicate swiper-slide-next swiper-slide-duplicate-prev"
                     data-swiper-slide-index="1" role="group" aria-label="2 / 2"
                     style="width: 636px; margin-right: 20px;">
                  <div class="client-feedback-wrap hover-btn">
                    <span class="for-border"></span>
                    <div class="client-feedback-inner">
                      <div class="client-feedback-top">
                        <div class="author-area">
                          <div class="author-img">
                            <img src="../../../../public/frontend/assets/images/bg/home5-testimonial-02.png" alt="">
                            <div class="author-quat">
                              <img class="quate1" src="../../../../public/frontend/assets/images/icon/home5-testimonial-quat.svg" alt="">
                              <img class="quate2" src="../../../../public/frontend/assets/images/icon/home5-testimonial-quat2.svg" alt="">
                            </div>
                          </div>
                          <div class="author-content">
                            <h5>Mrs. Jordan Harry</h5>
                          </div>
                        </div>
                        <div class="reviews">
                          <ul>
                            <li><i class="bi bi-star-fill"></i></li>
                            <li><i class="bi bi-star-fill"></i></li>
                            <li><i class="bi bi-star-fill"></i></li>
                            <li><i class="bi bi-star-fill"></i></li>
                            <li><i class="bi bi-star-half"></i></li>
                          </ul>
                        </div>
                      </div>
                      <div class="client-feedback-content">
                        <p>"Fitted me in next day as I was in a hurry and done an excellent job. Would 100% recommend"</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>
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

    <HomeFooter></HomeFooter>

  </div>

</template>

<script>
import HomeFooter from '../../base-layout/footer'
import appConfig from "../../../../app.config.json";
import {userService} from "@/apis/user.service";
import store from "@/store/store";
import RoleBasedHeader from "@/views/base-layout/roleBasedHeader";

export default {
  name: "Home",
  page: {
    title: "Home",
    meta: [{name: "description", content: appConfig.description}]
  },
  data() {
    return {
      trades: [],
      stats: null,
      tradesLoader: false,
      statsLoader: false,
      categoryLoader: false,
      user: this.$store.getters.GET_USER_INFO || {},
      searchQuery: '',
      showDropdown: false,
      categories: ['Engineering', 'Marketing', 'Healthcare', 'Education', 'Finance', 'IT', 'Construction'],
      filteredCategories: []
    };
  },
  computed: {
    userRole() {
      const loggedUser = store.getters.GET_USER_INFO;
      if(!loggedUser){
        return '';
      }
      return loggedUser?.roles?.[0] || '';
    },

  },
  components: {
    HomeFooter,
    RoleBasedHeader
  },
  methods: {
    async getTrades() {
      this.tradeLoader = true
      userService.getTrades(6).then((res) => {
        this.trades = res.extra;
        this.tradeLoader = false
      });
    },
    async getAllTrades() {
      this.categoryLoader = true
      userService.postJobTrades().then((res) => {
        this.filteredCategories = res.extra;
        this.categories = res.extra;
        this.categoryLoader = false
      });
    },

    async pageStats() {
      this.statsLoader = true
      userService.pageStats().then((res) => {
        this.statsLoader = false
        this.stats = res.extra;
        this.triggerCounter();
      });
    },
    triggerCounter(){
      setTimeout(() => {
        $('.odometer').counterUp({
          delay: 10,
          time: 2000
        });
      }, 1000)
    },
    filterCategories() {
      if (this.searchQuery.trim() === '') {
        this.filteredCategories = this.categories;
      } else {
        const query = this.searchQuery.toLowerCase();
        this.filteredCategories = this.categories.filter(category =>
            category.name.toLowerCase().includes(query)
        );
      }
    },
    collapseDropdown() {
      setTimeout(() => {
        this.showDropdown = false;
      }, 200);
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.showDropdown = false;
      }
    },

    goToPostJob(category) {
      this.$router.push(`/post-a-job?category=${category.name}`)
    },

    goToSignUp() {
      const loggedUser = store.getters.GET_USER_INFO;

      if (!loggedUser) {
        this.$router.push('/register');
        return;
      }

      const role = loggedUser?.roles?.[0] || '';

      if (role === 'tradesperson') {
        alert('You are already logged in as a tradesperson. You can browse available leads instead.');
        this.$router.push('/new-leads');
      } else if (role === 'homeowner') {
        alert('You are already logged in as a homeowner. You can post a job instead.');
        this.$router.push('/post-a-job');
      } else {
        alert(`You are already logged in as ${role}. This action is not available for your role.`);
      }
    }

  },
  created() {
    this.getTrades();
    this.getAllTrades();
    this.pageStats();
  },
  mounted() {
    this.$nextTick(() => {
      $('.select1').niceSelect();
      $('#slick1').slick({
        rows: 2,
        dots: false,
        arrows: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 2000,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [{
          breakpoint: 1200,
          settings: {
            arrows: false,
            slidesToShow: 2
          }
        }, {
          breakpoint: 991,
          settings: {
            arrows: false,
            slidesToShow: 2
          }
        }, {
          breakpoint: 768,
          settings: {
            arrows: false,
            slidesToShow: 1
          }
        }, {
          breakpoint: 576,
          settings: {
            arrows: false,
            slidesToShow: 1
          }
        }, {
          breakpoint: 480,
          settings: {
            arrows: false,
            slidesToShow: 1
          }
        }, {
          breakpoint: 350,
          settings: {
            arrows: false,
            slidesToShow: 1
          }
        }]
      });
      new Swiper(".home5-feedback-slider", {
        slidesPerView: 2,
        spaceBetween: 20,
        loop: true,
        infinite: true,
        autoplay: false,
        speed: 1700,
        // autoplay: {
        //   delay: 2200,
        // },
        navigation: {
          nextEl: ".next-13",
          prevEl: ".prev-13",
        },
        breakpoints: {
          280: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 1
          },
          768: {
            slidesPerView: 1
          },
          992: {
            slidesPerView: 1
          },
          1200: {
            slidesPerView: 2
          },
          1400: {
            slidesPerView: 2
          },
          1600: {
            slidesPerView: 2
          },
        }
      });


      $('.sidebar-button').on("click", function () {
        $('.main-menu').addClass('show-menu');
      });

      $('.menu-close-btn').on("click", function () {
        $('.main-menu').removeClass('show-menu');
      });

    });
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  }
}
</script>

<style scoped>


.dropdown {
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  width: 43%;
  z-index: 10;
  max-height: 400px;
  overflow-x: hidden;
  overflow-y: auto;
  left: 0;
}

.dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown li {
  padding: 18px 16px;
  cursor: pointer;
  color: #00A7AC;
}

.dropdown li:hover {
  background-color: #f8f9fa;
}


::placeholder {
  color: rgba(154, 153, 153, 0.3);
  opacity: 1;
}

.border-start{
  border-left: 3px solid #00A7AC !important;
}
</style>