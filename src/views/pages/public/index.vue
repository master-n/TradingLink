<template>
  <div>
    <RoleBasedHeader :userRole="userRole" />
<div class="hero2">
  <div class="hero-wapper overflow-visible">
    <div class="container-fluid px-0">
      <div class="row">
        <div class="col-lg-7 d-flex align-items-center">
          <div class="hero-content">
            <div class="hero-kicker">JAMAICA'S TRUSTED TRADE NETWORK</div>
            <h1>Find Trusted Tradespeople Across Jamaica - Fast, Reliable, <span>Secure</span></h1>
            <h4 class="text-light mt-5">Post your job and get connected with certified professionals today</h4>

            <div class="job-search-area mt-3">
              <form class="search-form" @submit.prevent="goToSearch">
                <div class="form-inner job-title">
                  <label for="search" class="sr-only">Search for a trade or service</label>
                  <svg class="search-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="7"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input type="text" id="search" placeholder="For example: cleaner, electrician, plumber" v-model="searchQuery"
                    autocomplete="off" role="combobox" aria-autocomplete="list" :aria-expanded="showDropdown && !!filteredCategories.length"
                    aria-controls="search-suggestions"
                    :aria-activedescendant="highlightedIndex >= 0 ? `search-option-${highlightedIndex}` : null"
                    @input="filterCategories" @focus="showDropdown = true" @blur="collapseDropdown" @keydown="onSearchKeydown">

                  <transition name="dropdown-fade">
                    <ul v-if="showDropdown && filteredCategories.length" id="search-suggestions" role="listbox" class="list-group search-dropdown text-start">
                      <li v-for="(result, index) in filteredCategories"
                        :id="`search-option-${index}`"
                        :key="result.id"
                        role="option"
                        :aria-selected="index === highlightedIndex"
                        :class="['list-group-item', 'list-group-item-action', { active: index === highlightedIndex }]"
                        @mousedown.prevent="goToPostJob(result)"
                        @mouseenter="highlightedIndex = index">
                        <div class="fw-bold">{{ result.name }}</div>
                      </li>
                    </ul>
                  </transition>
                </div>
                <button type="submit" class="primry-btn-2 lg-btn search-submit-btn">Search</button>
              </form>
            </div>

            <div class="trust-row">
              <div class="trust-item"><i class="bx bx-badge-check"></i> Verified tradespeople</div>
              <div class="trust-item"><i class="bx bx-shield"></i> Secure payments</div>
              <div class="trust-item"><i class="bx bx-map"></i> Island-wide coverage</div>
            </div>
          </div>
        </div>

        <div class="col-lg-5 d-flex justify-content-end">
          <div class="banner-image-area">
            <div class="banner-img-left">
              <div class="banner-img1">
                <img class="img-fluid" src="../../../../public/frontend/assets/images/bg/carpenter-cutting.jpg" alt="Carpenter cutting wood on site">
              </div>

              <div class="banner-img2">
                <img class="img-fluid" src="../../../../public/frontend/assets/images/bg/carpenter-2.jpg" alt="Carpenter at work">
              </div>
            </div>

            <div class="banner-img-center">
              <div class="banner-img3">
                <img class="img-fluid" src="../../../../public/frontend/assets/images/bg/construction.jpg" alt="Construction tradesperson on a job site"
                  style="width: 210px; height: 330px; object-fit: cover">
              </div>

              <div class="banner-img4">
                <div class="user-area" style="padding:10px 40px">
                  <ul>
                    <li>
                      <div class="total-user">
                        <h6>{{ stats ? stats.tradespeople : '...' }}</h6>
                      </div>
                    </li>
                  </ul>
                  <p>Verified tradespeople</p>
                </div>
              </div>
            </div>

            <div class="banner-img-right">
              <div class="banner-img5">
                <div class="new-job-list">
                  <h3>{{ stats ? stats.reviews : '...' }}</h3>
                  <p>Verified reviews</p>
                </div>
              </div>

              <div class="banner-img6">
                <img class="img-fluid" src="../../../../public/frontend/assets/images/bg/carpenter.jpg"
                  style="width: 150px; height: 230px; object-fit: cover" alt="Tradesperson on site">
              </div>
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
          <div class="col-lg-4 col-md-4 d-flex">
            <div class="fancy-card card flex-fill d-flex flex-column">
              <div class="recent-article-img card-img-top" style="height: 200px;">
                <img class="img-fluid w-100" src="../../../../public/frontend/assets/images/home/step-1.png" alt="Post your job">
              </div>
              <div class="text-center card-body" style="background: white;">
                <h5 class="fw-bold">Post your job</h5>
                <p class="text-muted">Tell us what you need done. Whether it's plumbing, painting, or gardening — give
                  as much detail as you can so tradespeople understand the job clearly.
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 d-flex">
            <div class="fancy-card card flex-fill d-flex flex-column">
              <div class="recent-article-img card-img-top" style="height: 200px;">
                <img class="img-fluid w-100" src="../../../../public/frontend/assets/images/home/step-2.png" alt="Trades respond">
              </div>
              <div class="card-body text-center" style="background: white;">
                <h5 class="fw-bold">Trades respond</h5>
                <p class="text-muted">Skilled tradespeople will reply with quotes, questions, and links to their
                  profiles.
                  You can compare
                  their experience, reviews, and portfolios before making a decision.</p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 d-flex">
            <div class="fancy-card card flex-fill d-flex flex-column">
              <div class="recent-article-img card-img-top" style="height: 200px;">
                <img class="img-fluid w-100" src="../../../../public/frontend/assets/images/home/step-3.png" alt="Trades respond">
              </div>
              <div class="card-body text-center" style="background: white;">
                <h5 class="fw-bold">Choose and connect</h5>
                <p class="text-muted">When you're ready, select the tradesperson who best fits your job. Once you confirm, you’ll be connected directly to make arrangements and get started.</p>
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
              <router-link to="/find-tradesperson">Explore More
                <span>
                <img src="../../../../public/frontend/assets/images/icon/explore-elliose.svg" alt="">
              </span>
              </router-link>
            </div>
          </div>
        </div>
        <div class="row justify-content-center g-4">
          <div class="col-lg-4 col-md-6 col-sm-10" v-for="(trade, i) in trades" :key="i">
            <div class="top-company-card">
              <div class="company-details">
                <div class="category-icon"><i class="bx bx-wrench"></i></div>
                <div class="name-location">
                  <h5>
                    <router-link :to="'/find-tradesperson?category='+encodeURIComponent(trade.name)">{{ trade.name }}</router-link>
                  </h5>
                </div>
              </div>
              <div class="job-details-vacancies">
                <div class="apply-btn">
                  <router-link :to="'/find-tradesperson?category='+encodeURIComponent(trade.name)"><span/>View
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

            <p class="text-muted mb-3">Sign up for free to receive a steady stream
              of local job opportunities that match your skills.</p>

            <p class="text-muted">Take on big jobs or smaller gap fillers - it’s up to you.</p>

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
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <div class="card card-cut bg-primary-1 text-light mb-sm-2 mb-3">
              <div class="card-body py-5 text-center">
                <h3 class="">Verified Reviews from Real Customers</h3>
                <p class="text-light mt-3" style="font-size: 18px">Authentic feedback from homeowners like you</p>
                <div class="text-center mt-5">
                  <router-link to="/post-a-job" class="btn btn-light text-center py-3 btn-block">Get Free Quotes</router-link>
                </div>
              </div>
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

    <HomeFooter></HomeFooter>

  </div>

</template>

<script>
import HomeFooter from '../../base-layout/footer'
import appConfig from "../../../../app.config.json";
import {userService} from "@/apis/user.service";
import store from "@/store/store";
import RoleBasedHeader from "@/views/base-layout/roleBasedHeader";
import Swal from "sweetalert2";

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
      highlightedIndex: -1,
      categories: [],
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
      this.tradesLoader = true
      userService.getTrades(6).then((res) => {
        this.trades = res.extra;
        this.tradesLoader = false
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
      });
    },
    filterCategories() {
      this.highlightedIndex = -1;
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
        this.highlightedIndex = -1;
      }, 200);
    },
    onSearchKeydown(event) {
      if (!this.showDropdown || !this.filteredCategories.length) {
        return;
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        this.highlightedIndex = (this.highlightedIndex + 1) % this.filteredCategories.length;
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        this.highlightedIndex = (this.highlightedIndex - 1 + this.filteredCategories.length) % this.filteredCategories.length;
      } else if (event.key === 'Enter' && this.highlightedIndex >= 0) {
        event.preventDefault();
        this.goToPostJob(this.filteredCategories[this.highlightedIndex]);
      } else if (event.key === 'Escape') {
        this.showDropdown = false;
        this.highlightedIndex = -1;
      }
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.showDropdown = false;
      }
    },

    goToPostJob(category) {
      this.showDropdown = false;
      this.$router.push(`/post-a-job?category=${encodeURIComponent(category.name)}`)
    },

    goToSearch() {
      if (this.filteredCategories.length) {
        this.goToPostJob(this.filteredCategories[0]);
        return;
      }
      if (this.searchQuery.trim()) {
        this.$router.push(`/post-a-job?category=${encodeURIComponent(this.searchQuery.trim())}`);
      }
    },

    goToSignUp() {
      const loggedUser = store.getters.GET_USER_INFO;

      if (!loggedUser) {
        this.$router.push('/register');
        return;
      }

      const role = loggedUser?.roles?.[0] || '';

      if (role === 'tradesperson') {
        Swal.fire('Already logged in', 'You are already logged in as a tradesperson. You can browse available leads instead.', 'info')
            .then(() => this.$router.push('/new-leads'));
      } else if (role === 'homeowner') {
        Swal.fire('Already logged in', 'You are already logged in as a homeowner. You can post a job instead.', 'info')
            .then(() => this.$router.push('/post-a-job'));
      } else {
        Swal.fire('Already logged in', `You are already logged in as ${role}. This action is not available for your role.`, 'info');
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
    });
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  }
}
</script>

<style scoped>

.hero-kicker {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: #5DCAA5;
  margin-bottom: 14px;
}

.trust-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 22px;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.85);
}

.trust-item i {
  font-size: 1.1rem;
  color: #5DCAA5;
}

.category-icon {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(0, 167, 172, 0.1);
  color: #00A7AC;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  margin-right: 12px;
  flex-shrink: 0;
}

.top-company-card .company-details {
  justify-content: flex-start;
}

/* Hero search bar: the .hero2 template variant shipped with no styling for the
   search input/button, leaving it unpositioned and the suggestions dropdown
   floating relative to the wrong ancestor. Defined here explicitly. */
.search-form {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px;
}

@media (max-width: 767px) {
  .search-form {
    flex-wrap: wrap;
  }
}

.form-inner.job-title {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  height: 60px;
  background: #EFF3F2;
  border-radius: 8px;
  padding: 0 20px 0 48px;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #6b7a78;
  pointer-events: none;
}

.form-inner.job-title input {
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  font-size: 0.95rem;
  color: var(--title-color1, #14181b);
}

.form-inner.job-title input:focus {
  outline: none;
}

.search-submit-btn {
  flex-shrink: 0;
  border: none;
  cursor: pointer;
  white-space: nowrap;
}

.search-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.18);
  width: 100%;
  z-index: 20;
  max-height: 320px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 6px 0;
}

.search-dropdown li {
  padding: 14px 20px;
  cursor: pointer;
  color: #00A7AC;
  border: none;
  transition: background-color 0.15s ease;
}

.search-dropdown li:hover,
.search-dropdown li:focus,
.search-dropdown li.active {
  background-color: #f3faf9;
}

.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

::placeholder {
  color: rgba(154, 153, 153, 0.6);
  opacity: 1;
}

.border-start{
  border-left: 3px solid #00A7AC !important;
}

/* Premium polish: elevation + lift on interactive cards instead of the flat
   stock-template look, with accessible focus states for keyboard users. */
.fancy-card {
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  overflow: hidden;
}

.fancy-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.12);
}

.top-company-card {
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.top-company-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.12);
}

a:focus-visible,
button:focus-visible,
input:focus-visible {
  outline: 2px solid #00A7AC;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .fancy-card,
  .top-company-card,
  .dropdown-fade-enter-active,
  .dropdown-fade-leave-active {
    transition: none !important;
  }
}
</style>
