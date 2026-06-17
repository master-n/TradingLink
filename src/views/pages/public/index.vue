<template>
  <div class="tl-home">
    <RoleBasedHeader :userRole="userRole" />

    <!-- HERO -->
    <section class="tl-hero">
      <div class="tl-hero__overlay"></div>
      <div class="tl-hero__content">
        <div class="tl-hero__text">
          <h1 class="tl-hero__heading">
            Find Trusted Tradespeople<br>
            Across Jamaica —<br>
            <span class="tl-hero__highlight">Fast, Reliable, Secure</span>
          </h1>
          <p class="tl-hero__sub">Post your job and get connected with certified professionals today</p>
          <div class="tl-search">
            <div class="tl-search__wrap">
              <svg class="tl-search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                class="tl-search__input"
                type="text"
                placeholder="What trade do you need? e.g. Plumber, Electrician"
                v-model="searchQuery"
                @input="filterCategories"
                @focus="showDropdown = true"
                @blur="collapseDropdown"
                autocomplete="off"
              />
              <button class="tl-search__btn" @click="handleSearchBtn">Search</button>
            </div>
            <ul v-if="showDropdown && filteredCategories.length" class="tl-search__dropdown">
              <li
                v-for="result in filteredCategories.slice(0, 8)"
                :key="result.id"
                @mousedown.prevent="goToPostJob(result)"
                class="tl-search__item"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
                {{ result.name }}
              </li>
            </ul>
          </div>
          <div class="tl-hero__quick">
            <span class="tl-hero__quick-label">Popular:</span>
            <button v-for="(t, i) in quickTrades" :key="i" class="tl-pill" @click="$router.push('/find-tradesperson?category=' + t)">{{ t }}</button>
          </div>
        </div>
      </div>
    </section>

    <!-- TRUST BADGES -->
    <section class="tl-trust">
      <div class="tl-container">
        <div class="tl-trust__grid">
          <div class="tl-trust__item" v-for="(badge, i) in trustBadges" :key="i">
            <div class="tl-trust__icon" v-html="badge.icon"></div>
            <div>
              <div class="tl-trust__title">{{ badge.title }}</div>
              <div class="tl-trust__sub">{{ badge.sub }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="tl-section tl-how">
      <div class="tl-container">
        <span class="tl-label">Simple Process</span>
        <h2 class="tl-section__title">How <span class="tl-teal">Tradelink</span> works</h2>
        <p class="tl-section__sub">Connect with trusted professionals in 3 easy steps</p>
        <div class="tl-how__steps">
          <div class="tl-how__step" v-for="(step, i) in steps" :key="i">
            <div class="tl-how__img">
              <img :src="step.img" :alt="step.title" />
              <div class="tl-how__num">{{ String(i + 1).padStart(2, '0') }}</div>
            </div>
            <div class="tl-how__body">
              <h3 class="tl-how__title">{{ step.title }}</h3>
              <p class="tl-how__text">{{ step.body }}</p>
            </div>
          </div>
        </div>
        <div class="tl-center">
          <router-link to="/post-a-job" class="tl-btn tl-btn--primary">Post Your Job Free</router-link>
        </div>
      </div>
    </section>

    <!-- CATEGORIES -->
    <section class="tl-section tl-categories">
      <div class="tl-container">
        <div class="tl-section__header">
          <div>
            <span class="tl-label" style="text-align:left">Browse by Trade</span>
            <h2 class="tl-section__title" style="text-align:left">Popular <span class="tl-teal">Categories</span></h2>
          </div>
          <router-link to="/find-tradesperson" class="tl-link-more">View all trades →</router-link>
        </div>
        <div class="tl-categories__grid">
          <router-link
            v-for="(trade, i) in trades"
            :key="i"
            :to="'/find-tradesperson?category=' + trade.name"
            class="tl-cat-card"
          >
            <div class="tl-cat-card__icon" v-html="getCategoryIcon(trade.name)"></div>
            <div class="tl-cat-card__name">{{ trade.name }}</div>
            <svg class="tl-cat-card__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </router-link>
        </div>
        <div class="tl-center" style="margin-top:32px">
          <router-link to="/find-tradesperson" class="tl-btn tl-btn--outline">Explore All Trades →</router-link>
        </div>
      </div>
    </section>

    <!-- FOR TRADESPEOPLE -->
    <section class="tl-tradesperson">
      <div class="tl-container">
        <div class="tl-tradesperson__inner">
          <div class="tl-tradesperson__copy">
            <span class="tl-label tl-label--light">For Tradespeople</span>
            <h2 class="tl-tradesperson__heading">Looking for job <span class="tl-teal-light">leads?</span></h2>
            <p class="tl-tradesperson__sub">Grow your business with Tradelink — thousands of jobs posted every month across all 14 parishes.</p>
            <ul class="tl-perks">
              <li v-for="(perk, i) in tradePerks" :key="i">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg>
                {{ perk }}
              </li>
            </ul>
            <button class="tl-btn tl-btn--white" @click="goToSignUp">Sign Up for Free ✦</button>
          </div>
          <div class="tl-tradesperson__badges">
            <div class="tl-badge" v-for="(b, i) in tradeBadges" :key="i">
              <div class="tl-badge__icon" v-html="b.icon"></div>
              <div class="tl-badge__label">{{ b.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="tl-stats">
      <div class="tl-container">
        <div class="tl-stats__grid">
          <div class="tl-stat" v-for="(s, i) in statItems" :key="i">
            <div class="tl-stat__num">{{ s.num }}</div>
            <div class="tl-stat__label">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="tl-cta">
      <div class="tl-container">
        <h2 class="tl-cta__heading">Ready to get started?</h2>
        <p class="tl-cta__sub">Join thousands of Jamaicans who trust Tradelink to connect them with quality professionals.</p>
        <router-link to="/post-a-job" class="tl-btn tl-btn--primary">Post Your Job Now →</router-link>
      </div>
    </section>

    <HomeFooter />
  </div>
</template>

<script>
import HomeFooter from '../../base-layout/footer'
import appConfig from "../../../../app.config.json"
import { userService } from "@/apis/user.service"
import store from "@/store/store"
import RoleBasedHeader from "@/views/base-layout/roleBasedHeader"

export default {
  name: "Home",
  page: {
    title: "Find Trusted Tradespeople in Jamaica | TradeLinkJA",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { HomeFooter, RoleBasedHeader },
  data() {
    return {
      trades: [],
      stats: null,
      searchQuery: '',
      showDropdown: false,
      categories: [],
      filteredCategories: [],
      quickTrades: ['Plumber', 'Electrician', 'Carpenter', 'Painter', 'Tiler'],
      trustBadges: [
        { title: 'Verified Tradespeople', sub: 'All tradespeople are verified', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>` },
        { title: 'Secure Messaging', sub: 'Chat safely in-app', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>` },
        { title: 'Customer Reviews', sub: 'Real reviews from real customers', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>` },
        { title: 'Island-wide Coverage', sub: 'Connecting you across Jamaica', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>` },
      ],
      steps: [
        {
          title: 'Post your job',
          body: 'Tell us what you need done. Whether it\'s plumbing, painting, or electrical — give as much detail as you can so tradespeople understand the job clearly.',
          img: '/frontend/assets/images/bg/carpenter-cutting.jpg'
        },
        {
          title: 'Trades respond',
          body: 'Skilled tradespeople will reply with quotes and links to their profiles. Compare their experience, reviews, and portfolios before deciding.',
          img: '/frontend/assets/images/bg/carpenter-2.jpg'
        },
        {
          title: 'Choose & connect',
          body: 'When you\'re ready, select the tradesperson who best fits your job. Once confirmed, you\'ll be connected directly to make arrangements.',
          img: '/frontend/assets/images/bg/tradesperson.jpg'
        },
      ],
      tradePerks: [
        'Free to register and set up your profile',
        'Get matched to jobs in your trade and area',
        'Build your reputation with verified reviews',
        'No monthly subscription fees',
      ],
      tradeBadges: [
        { label: 'Verified Badge', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>` },
        { label: 'Star Ratings', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>` },
        { label: 'Portfolio', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>` },
        { label: 'Job Alerts', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>` },
      ],
    }
  },
  computed: {
    userRole() {
      const loggedUser = store.getters.GET_USER_INFO
      return loggedUser?.roles?.[0] || ''
    },
    statItems() {
      return [
        { num: this.stats ? `${this.stats.tradespeople_count}+` : '1,200+', label: 'Verified Tradespeople' },
        { num: this.stats ? `${this.stats.jobs_count}+` : '2,400+', label: 'Jobs Posted' },
        { num: '14', label: 'Parishes Covered' },
        { num: '4.8★', label: 'Average Rating' },
      ]
    }
  },
  methods: {
    getTrades() { userService.getTrades(6).then(res => { this.trades = res.extra }) },
    getAllTrades() {
      userService.postJobTrades().then(res => {
        this.filteredCategories = res.extra
        this.categories = res.extra
      })
    },
    pageStats() { userService.pageStats().then(res => { this.stats = res.extra }) },
    filterCategories() {
      const q = this.searchQuery.toLowerCase().trim()
      this.filteredCategories = q ? this.categories.filter(c => c.name.toLowerCase().includes(q)) : this.categories
      this.showDropdown = true
    },
    collapseDropdown() { setTimeout(() => { this.showDropdown = false }, 200) },
    handleSearchBtn() {
      if (this.filteredCategories.length === 1) { this.goToPostJob(this.filteredCategories[0]) }
      else if (this.searchQuery.trim()) { this.$router.push(`/find-tradesperson?q=${this.searchQuery}`) }
      else { this.$router.push('/find-tradesperson') }
    },
    goToPostJob(category) { this.$router.push(`/post-a-job?category=${category.name}`) },
    goToSignUp() {
      const loggedUser = store.getters.GET_USER_INFO
      if (!loggedUser) { this.$router.push('/register'); return }
      const role = loggedUser?.roles?.[0] || ''
      if (role === 'tradesperson') this.$router.push('/new-leads')
      else if (role === 'homeowner') this.$router.push('/post-a-job')
      else this.$router.push('/register')
    },
    handleClickOutside(event) { if (!this.$el.contains(event.target)) this.showDropdown = false },
    getCategoryIcon(name) {
      const icons = {
        'Plumber': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
        'Electrician': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
        'Carpenter': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
        'Painter': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 13.5V20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6.5"/><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>`,
        'Tiler': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
        'Landscaper': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22V12M12 12C12 7 7 3 2 3s5 9 10 9M12 12c0-5 5-9 10-9s-5 9-10 9"/></svg>`,
        'AC technician': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
        'Cleaner': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 22l3-3m0 0l7-7m-7 7l7-7m0 0l2-2a2.83 2.83 0 0 1 4 4l-2 2m-4-4l4 4"/></svg>`,
      }
      return icons[name] || `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>`
    },
  },
  created() { this.getTrades(); this.getAllTrades(); this.pageStats() },
  mounted() { document.addEventListener('click', this.handleClickOutside) },
  beforeDestroy() { document.removeEventListener('click', this.handleClickOutside) }
}
</script>

<style scoped>
* { box-sizing: border-box; }
.tl-home { font-family: 'Inter', system-ui, sans-serif; color: #1A2B2B; }
.tl-container { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
.tl-teal { color: #00A7AC; }
.tl-teal-light { color: #4DD9DE; }
.tl-center { text-align: center; }
.tl-label { display: block; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #00A7AC; margin-bottom: 8px; text-align: center; }
.tl-label--light { color: #80D8DB; }
.tl-section { padding: 80px 0; }
.tl-section__header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 36px; flex-wrap: wrap; gap: 12px; }
.tl-section__title { font-size: clamp(1.7rem, 3vw, 2.4rem); font-weight: 800; margin: 0 0 8px; line-height: 1.15; text-align: center; }
.tl-section__sub { color: #5C7878; font-size: 1rem; text-align: center; margin-bottom: 48px; }
.tl-btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 28px; border-radius: 8px; font-size: 0.95rem; font-weight: 700; text-decoration: none; cursor: pointer; border: none; transition: all 0.2s; font-family: inherit; }
.tl-btn--primary { background: #00A7AC; color: #fff; }
.tl-btn--primary:hover { background: #008C91; }
.tl-btn--outline { background: transparent; color: #00A7AC; border: 2px solid #00A7AC; }
.tl-btn--outline:hover { background: #00A7AC; color: #fff; }
.tl-btn--white { background: #fff; color: #00A7AC; }
.tl-btn--white:hover { background: #F0FAFA; }
.tl-link-more { color: #00A7AC; font-weight: 600; font-size: 0.9rem; text-decoration: none; }

/* HERO */
.tl-hero { min-height: 560px; background: url('/frontend/assets/images/bg/construction.jpg') center/cover no-repeat; position: relative; display: flex; align-items: center; }
.tl-hero__overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(5,41,34,0.92) 0%, rgba(0,60,65,0.82) 100%); }
.tl-hero__content { position: relative; width: 100%; max-width: 1180px; margin: 0 auto; padding: 80px 24px; }
.tl-hero__text { max-width: 640px; }
.tl-hero__heading { font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 900; color: #fff; line-height: 1.1; margin: 0 0 16px; letter-spacing: -0.02em; }
.tl-hero__highlight { color: #00A7AC; }
.tl-hero__sub { font-size: 1.05rem; color: rgba(255,255,255,0.75); margin-bottom: 32px; line-height: 1.6; }
.tl-search { position: relative; max-width: 580px; }
.tl-search__wrap { display: flex; align-items: center; background: #fff; border-radius: 10px; padding: 6px 6px 6px 18px; box-shadow: 0 8px 32px rgba(0,0,0,0.25); gap: 8px; }
.tl-search__icon { width: 20px; height: 20px; color: #9CA3AF; flex-shrink: 0; }
.tl-search__input { flex: 1; border: none; outline: none; font-size: 0.95rem; color: #1A2B2B; background: transparent; font-family: inherit; min-width: 0; }
.tl-search__input::placeholder { color: #9CA3AF; }
.tl-search__btn { background: #00A7AC; color: #fff; border: none; border-radius: 7px; padding: 10px 22px; font-size: 0.9rem; font-weight: 700; cursor: pointer; white-space: nowrap; font-family: inherit; }
.tl-search__dropdown { position: absolute; top: calc(100% + 8px); left: 0; right: 0; background: #fff; border-radius: 10px; box-shadow: 0 8px 32px rgba(0,0,0,0.15); list-style: none; margin: 0; padding: 8px 0; z-index: 200; }
.tl-search__item { display: flex; align-items: center; gap: 10px; padding: 12px 16px; cursor: pointer; font-size: 0.9rem; color: #1A2B2B; }
.tl-search__item svg { width: 16px; height: 16px; color: #00A7AC; flex-shrink: 0; }
.tl-search__item:hover { background: #F0FAFA; color: #00A7AC; }
.tl-hero__quick { display: flex; align-items: center; gap: 8px; margin-top: 20px; flex-wrap: wrap; }
.tl-hero__quick-label { font-size: 0.8rem; color: rgba(255,255,255,0.6); }
.tl-pill { background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.25); color: #fff; border-radius: 999px; padding: 5px 14px; font-size: 0.8rem; cursor: pointer; font-family: inherit; }
.tl-pill:hover { background: #00A7AC; border-color: #00A7AC; }

/* TRUST */
.tl-trust { background: #fff; border-bottom: 1px solid #E8F4F4; padding: 32px 0; }
.tl-trust__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.tl-trust__item { display: flex; align-items: center; gap: 14px; }
.tl-trust__icon { width: 44px; height: 44px; background: #E8F8F8; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #00A7AC; }
.tl-trust__icon :deep(svg) { width: 22px; height: 22px; }
.tl-trust__title { font-size: 0.875rem; font-weight: 700; }
.tl-trust__sub { font-size: 0.75rem; color: #5C7878; margin-top: 2px; }

/* HOW IT WORKS */
.tl-how { background: #F6FAFA; }
.tl-how__steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; margin-bottom: 40px; }
.tl-how__step { background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 16px rgba(0,167,172,0.08); }
.tl-how__img { height: 200px; overflow: hidden; position: relative; }
.tl-how__img img { width: 100%; height: 100%; object-fit: cover; }
.tl-how__num { position: absolute; top: 12px; left: 12px; background: #00A7AC; color: #fff; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 0.9rem; }
.tl-how__body { padding: 20px 24px 24px; }
.tl-how__title { font-size: 1.05rem; font-weight: 700; margin-bottom: 8px; }
.tl-how__text { font-size: 0.875rem; color: #5C7878; line-height: 1.65; margin: 0; }

/* CATEGORIES */
.tl-categories { background: #fff; }
.tl-categories__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.tl-cat-card { display: flex; align-items: center; gap: 14px; background: #F6FAFA; border: 1.5px solid #E0F0F0; border-radius: 12px; padding: 18px 20px; text-decoration: none; color: #1A2B2B; font-weight: 600; font-size: 0.95rem; transition: all 0.2s; }
.tl-cat-card:hover { border-color: #00A7AC; background: #E8F8F8; color: #00A7AC; }
.tl-cat-card__icon { color: #00A7AC; flex-shrink: 0; }
.tl-cat-card__icon :deep(svg) { width: 22px; height: 22px; }
.tl-cat-card__name { flex: 1; }
.tl-cat-card__arrow { width: 16px; height: 16px; color: #9CA3AF; flex-shrink: 0; transition: transform 0.2s; }
.tl-cat-card:hover .tl-cat-card__arrow { transform: translateX(4px); color: #00A7AC; }

/* FOR TRADESPEOPLE */
.tl-tradesperson { background: #052922; padding: 80px 0; }
.tl-tradesperson__inner { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
.tl-tradesperson__heading { font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 800; color: #fff; line-height: 1.15; margin: 0 0 16px; }
.tl-tradesperson__sub { color: rgba(255,255,255,0.65); font-size: 1rem; line-height: 1.65; margin-bottom: 24px; }
.tl-perks { list-style: none; padding: 0; margin: 0 0 32px; display: flex; flex-direction: column; gap: 12px; }
.tl-perks li { display: flex; align-items: center; gap: 10px; color: rgba(255,255,255,0.85); font-size: 0.9rem; }
.tl-perks li svg { width: 18px; height: 18px; color: #00A7AC; flex-shrink: 0; }
.tl-tradesperson__badges { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.tl-badge { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; padding: 28px 20px; display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; }
.tl-badge:hover { background: rgba(0,167,172,0.15); border-color: #00A7AC; }
.tl-badge__icon { color: #00A7AC; }
.tl-badge__icon :deep(svg) { width: 28px; height: 28px; }
.tl-badge__label { font-size: 0.85rem; font-weight: 600; color: rgba(255,255,255,0.75); }

/* STATS */
.tl-stats { background: #00A7AC; padding: 48px 0; }
.tl-stats__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; text-align: center; }
.tl-stat__num { font-size: 2.2rem; font-weight: 900; color: #fff; }
.tl-stat__label { font-size: 0.85rem; color: rgba(255,255,255,0.75); margin-top: 4px; }

/* CTA */
.tl-cta { background: #F6FAFA; padding: 80px 0; text-align: center; }
.tl-cta__heading { font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 800; margin: 0 0 8px; }
.tl-cta__sub { color: #5C7878; margin-bottom: 28px; }

/* RESPONSIVE */
@media (max-width: 900px) {
  .tl-trust__grid { grid-template-columns: repeat(2, 1fr); }
  .tl-stats__grid { grid-template-columns: repeat(2, 1fr); }
  .tl-how__steps { grid-template-columns: 1fr 1fr; }
  .tl-categories__grid { grid-template-columns: 1fr 1fr; }
  .tl-tradesperson__inner { grid-template-columns: 1fr; }
  .tl-tradesperson__badges { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .tl-section { padding: 56px 0; }
  .tl-hero { min-height: 480px; }
  .tl-how__steps { grid-template-columns: 1fr; }
  .tl-categories__grid { grid-template-columns: 1fr; }
  .tl-search__btn { padding: 10px 14px; }
  .tl-hero__quick { display: none; }
}
</style>
