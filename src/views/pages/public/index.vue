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
              <svg class="tl-search__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
    <section id="how-it-works" class="tl-section tl-how">
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
            v-for="(trade, i) in popularTrades"
            :key="i"
            :to="'/find-tradesperson?category=' + trade.name"
            class="tl-cat-card"
          >
            <div class="tl-cat-card__icon">
              <img :src="trade.img" :alt="trade.name" loading="lazy" />
            </div>
            <div class="tl-cat-card__name">{{ trade.name }}</div>
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
            <p class="tl-tradesperson__sub">Grow your business with Tradelink — get matched to jobs across all 14 parishes.</p>
            <ul class="tl-perks">
              <li v-for="(perk, i) in tradePerks" :key="i">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg>
                {{ perk }}
              </li>
            </ul>
            <button class="tl-btn tl-btn--gold" @click="goToSignUp">Sign Up for Free →</button>
          </div>
          <div class="tl-tradesperson__media">
            <img :src="leadsImg" alt="Tradesperson at work" class="tl-tradesperson__img" loading="lazy" />
            <div class="tl-tradesperson__chips">
              <span class="tl-chip" v-for="(b, i) in tradeBadges" :key="i">
                <span class="tl-chip__icon" v-html="b.icon"></span>{{ b.label }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS -->
    <section class="tl-section tl-testimonials">
      <div class="tl-container">
        <span class="tl-label">What people say</span>
        <h2 class="tl-section__title">Trusted by <span class="tl-teal">Jamaicans</span></h2>
        <p class="tl-section__sub">Homeowners across the island getting jobs done with tradespeople they can rely on.</p>
        <div class="tl-testimonials__grid">
          <figure class="tl-quote" v-for="(t, i) in testimonials" :key="i">
            <div class="tl-quote__stars" aria-label="5 out of 5 stars">
              <svg v-for="n in 5" :key="n" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <blockquote class="tl-quote__text">"{{ t.quote }}"</blockquote>
            <figcaption class="tl-quote__by">
              <span class="tl-quote__name">{{ t.name }}</span>
              <span class="tl-quote__meta">{{ t.trade }} · {{ t.place }}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- STATS — hidden pre-launch (no real numbers yet); flip showStats to true to re-enable -->
    <section class="tl-stats" v-if="showStats">
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
        <div class="tl-cta__banner">
          <h2 class="tl-cta__heading">Ready to get started?</h2>
          <p class="tl-cta__sub">Join Jamaicans who trust Tradelink to connect them with quality professionals.</p>
          <router-link to="/post-a-job" class="tl-btn tl-btn--gold">Post Your Job Now →</router-link>
        </div>
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
      // Pre-launch: the homepage stats bar is hidden because we don't have real
      // figures yet. Flip to true (once real numbers exist) to show it again —
      // the section markup and statItems computed are kept intact.
      showStats: false,
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
          img: require('@/assets/images/how-step-1.png')
        },
        {
          title: 'Trades respond',
          body: 'Skilled tradespeople will reply with quotes and links to their profiles. Compare their experience, reviews, and portfolios before deciding.',
          img: require('@/assets/images/how-step-2.png')
        },
        {
          title: 'Choose & connect',
          body: 'When you\'re ready, select the tradesperson who best fits your job. Once confirmed, you\'ll be connected directly to make arrangements.',
          img: require('@/assets/images/how-step-3.png')
        },
      ],
      tradePerks: [
        'Free to register and set up your profile',
        'Get matched to jobs in your trade and area',
        'Build your reputation with verified reviews',
        'Flexible subscription plans to suit your business',
      ],
      tradeBadges: [
        { label: 'Verified Badge', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>` },
        { label: 'Star Ratings', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>` },
        { label: 'Portfolio', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>` },
        { label: 'Job Alerts', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>` },
      ],
      popularTrades: [
        { name: 'Plumber', img: require('@/assets/images/icon-plumber.png') },
        { name: 'Electrician', img: require('@/assets/images/icon-electrician.png') },
        { name: 'Carpenter', img: require('@/assets/images/icon-carpenter.png') },
        { name: 'Painter', img: require('@/assets/images/icon-painter.png') },
        { name: 'Tiler', img: require('@/assets/images/icon-tiler.png') },
        { name: 'AC Technician', img: require('@/assets/images/icon-ac.png') },
        { name: 'Handyman', img: require('@/assets/images/icon-handyman.png') },
        { name: 'Contractor', img: require('@/assets/images/icon-contractor.png') },
      ],
      leadsImg: require('@/assets/images/leads-worker.png'),
      testimonials: [
        { name: 'Marcia B.', place: 'Kingston', trade: 'Bathroom renovation', quote: 'Posted my job in the evening and had three quotes by morning. The plumber I chose was verified and did clean work.' },
        { name: 'Devon G.', place: 'Montego Bay', trade: 'Electrical rewiring', quote: 'I could see reviews and past work before choosing. No more guessing whether a tradesman is reliable.' },
        { name: 'Shanice P.', place: 'Mandeville', trade: 'Tiling', quote: 'Everything stayed in the app — messages, quotes, the lot. Felt safe from start to finish.' },
      ],
    }
  },
  computed: {
    userRole() {
      const loggedUser = store.getters.GET_USER_INFO
      return loggedUser?.roles?.[0] || ''
    },
    statItems() {
      const s = this.stats || {}
      return [
        { num: this.statValue(s.tradespeople, '500'), label: 'Verified Tradespeople' },
        { num: this.statValue(s.trade_categories, '40'), label: 'Trade Categories' },
        { num: '14', label: 'Parishes Covered' },
        { num: '4.8★', label: 'Average Rating' },
      ]
    }
  },
  methods: {
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
    statValue(value, fallback) {
      const n = value != null && value !== '' ? Number(value) : null
      const shown = n != null && !Number.isNaN(n) ? n.toLocaleString() : fallback
      return `${shown}+`
    },
  },
  created() { this.getAllTrades(); this.pageStats() },
  mounted() { document.addEventListener('click', this.handleClickOutside) },
  beforeDestroy() { document.removeEventListener('click', this.handleClickOutside) }
}
</script>

<style scoped>
* { box-sizing: border-box; }
.tl-home { font-family: 'Inter', system-ui, sans-serif; color: #1A1A1A; }
.tl-home h1, .tl-home h2, .tl-home h3 { font-family: 'Montserrat', 'Inter', system-ui, sans-serif; }
.tl-container { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
.tl-teal { color: #00A7AC; }
.tl-teal-light { color: #4DD9DE; }
.tl-gold { color: #F5A623; }
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
.tl-btn--gold { background: #F5A623; color: #1A1A1A; }
.tl-btn--gold:hover { background: #e0951a; }
.tl-link-more { color: #00A7AC; font-weight: 600; font-size: 0.9rem; text-decoration: none; }

/* HERO */
.tl-hero { min-height: 620px; background: #13452E url('~@/assets/images/hero-tradesperson.png') right center / cover no-repeat; position: relative; display: flex; align-items: center; overflow: hidden; }
.tl-hero__overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(19,69,46,0.28) 0%, rgba(19,69,46,0.42) 45%, rgba(19,69,46,0.82) 100%); }
.tl-hero__content { position: relative; width: 100%; max-width: 1180px; margin: 0 auto; padding: 80px 24px; }
.tl-hero__text { max-width: 640px; }
.tl-hero__heading { font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 900; color: #fff; line-height: 1.1; margin: 0 0 16px; letter-spacing: -0.02em; text-shadow: 0 2px 16px rgba(0,0,0,0.45); }
.tl-hero__highlight { color: #00A7AC; }
.tl-hero__sub { font-size: 1.05rem; color: #fff; margin-bottom: 32px; line-height: 1.6; text-shadow: 0 1px 8px rgba(0,0,0,0.55); }
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
.tl-trust { background: #fff; padding: 40px 0; }
.tl-trust__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; background: #13452E; border-radius: 18px; padding: 28px 34px; }
.tl-trust__item { display: flex; align-items: center; gap: 14px; }
.tl-trust__icon { width: 44px; height: 44px; background: rgba(245,166,35,0.14); border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #F5A623; }
.tl-trust__icon :deep(svg) { width: 22px; height: 22px; }
.tl-trust__title { font-size: 0.875rem; font-weight: 700; color: #fff; }
.tl-trust__sub { font-size: 0.75rem; color: rgba(255,255,255,0.7); margin-top: 2px; }

/* HOW IT WORKS */
.tl-how { background: #F6FAFA; }
.tl-how__steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; margin-bottom: 40px; }
.tl-how__step { background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 16px rgba(0,167,172,0.08); }
.tl-how__img { position: relative; }
.tl-how__img img { width: 100%; height: auto; display: block; }
.tl-how__num { position: absolute; top: 12px; left: 12px; background: #00A7AC; color: #fff; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 0.9rem; }
.tl-how__body { padding: 20px 24px 24px; }
.tl-how__title { font-size: 1.05rem; font-weight: 700; margin-bottom: 8px; }
.tl-how__text { font-size: 0.875rem; color: #13452E; line-height: 1.65; margin: 0; }

/* CATEGORIES */
.tl-categories { background: #fff; }
.tl-categories__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
.tl-cat-card { display: flex; flex-direction: column; align-items: center; gap: 12px; background: #F6FAFA; border: 1.5px solid #E0F0F0; border-radius: 16px; padding: 26px 18px; text-decoration: none; color: #1A1A1A; font-weight: 700; font-size: 0.98rem; text-align: center; transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s; }
.tl-cat-card:hover { border-color: #00A7AC; box-shadow: 0 10px 28px rgba(26,60,52,0.12); transform: translateY(-4px); }
.tl-cat-card__icon { width: 88px; height: 88px; display: flex; align-items: center; justify-content: center; }
.tl-cat-card__icon img { max-width: 100%; max-height: 100%; object-fit: contain; }
.tl-cat-card__name { line-height: 1.2; }

/* FOR TRADESPEOPLE */
.tl-tradesperson { background: #1A3C34; padding: 80px 0; }
.tl-tradesperson__inner { display: grid; grid-template-columns: 1.05fr 1fr; gap: 60px; align-items: center; }
.tl-tradesperson__heading { font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 800; color: #fff; line-height: 1.15; margin: 0 0 16px; }
.tl-tradesperson__sub { color: rgba(255,255,255,0.65); font-size: 1rem; line-height: 1.65; margin-bottom: 24px; }
.tl-perks { list-style: none; padding: 0; margin: 0 0 32px; display: flex; flex-direction: column; gap: 12px; }
.tl-perks li { display: flex; align-items: center; gap: 10px; color: rgba(255,255,255,0.85); font-size: 0.9rem; }
.tl-perks li svg { width: 18px; height: 18px; color: #F5A623; flex-shrink: 0; }
.tl-tradesperson__media { position: relative; }
.tl-tradesperson__img { width: 100%; border-radius: 20px; display: block; box-shadow: 0 24px 60px rgba(0,0,0,0.35); }
.tl-tradesperson__chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 18px; }
.tl-chip { display: inline-flex; align-items: center; gap: 7px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.14); color: rgba(255,255,255,0.88); font-size: 0.78rem; font-weight: 600; border-radius: 999px; padding: 7px 14px; }
.tl-chip__icon { display: inline-flex; color: #F5A623; }
.tl-chip__icon :deep(svg) { width: 15px; height: 15px; }

/* TESTIMONIALS */
.tl-testimonials { background: #F6FAFA; }
.tl-testimonials__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
.tl-quote { margin: 0; background: #fff; border: 1px solid #E4EFEF; border-radius: 18px; padding: 28px 26px; display: flex; flex-direction: column; gap: 14px; box-shadow: 0 2px 14px rgba(26,60,52,0.05); }
.tl-quote__stars { display: flex; gap: 3px; color: #F5A623; }
.tl-quote__text { margin: 0; font-size: 1rem; line-height: 1.6; color: #24352F; }
.tl-quote__by { display: flex; flex-direction: column; gap: 2px; margin-top: auto; }
.tl-quote__name { font-weight: 700; font-size: 0.95rem; color: #1A1A1A; }
.tl-quote__meta { font-size: 0.8rem; color: #5C7878; }

/* STATS */
.tl-stats { background: #00A7AC; padding: 48px 0; }
.tl-stats__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; text-align: center; }
.tl-stat__num { font-size: 2.2rem; font-weight: 900; color: #fff; }
.tl-stat__label { font-size: 0.85rem; color: rgba(255,255,255,0.75); margin-top: 4px; }

/* CTA */
.tl-cta { background: #fff; padding: 80px 0; }
.tl-cta__banner { background: #1A3C34; border-radius: 24px; padding: 60px 32px; text-align: center; position: relative; overflow: hidden; }
.tl-cta__banner::before { content: ""; position: absolute; top: -40px; right: -40px; width: 200px; height: 200px; background: radial-gradient(circle, rgba(245,166,35,0.25) 0%, transparent 70%); }
.tl-cta__heading { font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 800; margin: 0 0 10px; color: #fff; position: relative; }
.tl-cta__sub { color: rgba(255,255,255,0.75); margin: 0 auto 28px; max-width: 560px; position: relative; }

/* RESPONSIVE */
@media (max-width: 900px) {
  .tl-trust__grid { grid-template-columns: repeat(2, 1fr); }
  .tl-stats__grid { grid-template-columns: repeat(2, 1fr); }
  .tl-how__steps { grid-template-columns: 1fr 1fr; }
  .tl-categories__grid { grid-template-columns: repeat(3, 1fr); }
  .tl-testimonials__grid { grid-template-columns: 1fr; }
  .tl-tradesperson__inner { grid-template-columns: 1fr; }
  .tl-tradesperson__media { max-width: 460px; }
}
@media (max-width: 600px) {
  .tl-section { padding: 56px 0; }
  .tl-hero { min-height: 460px; background-size: cover; background-position: right center; }
  .tl-hero__overlay { background: linear-gradient(180deg, rgba(19,69,46,0.72) 0%, rgba(19,69,46,0.86) 100%); }
  .tl-trust__grid { padding: 22px 20px; }
  .tl-how__steps { grid-template-columns: 1fr; }
  .tl-categories__grid { grid-template-columns: repeat(2, 1fr); }
  .tl-cat-card__icon { width: 72px; height: 72px; }
  .tl-cta__banner { padding: 44px 22px; }
  .tl-search__btn { padding: 10px 14px; }
  .tl-hero__quick { display: none; }
}
</style>
