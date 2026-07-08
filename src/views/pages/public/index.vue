<template>
  <div style="background:#fff; font-family:'Inter',Arial,sans-serif;">
    <RoleBasedHeader :userRole="userRole" />

    <!-- HERO -->
    <section style="position:relative; padding:90px 20px 70px; background:linear-gradient(90deg,rgba(255,255,255,0.96) 0%,rgba(255,255,255,0.88) 45%,rgba(255,255,255,0.35) 100%), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'); background-size:cover; background-position:center;">
      <div style="max-width:1180px; margin:0 auto;">
        <div style="max-width:650px;">
          <div style="display:inline-block; background:#FFF3D6; color:#1A3A2A; padding:8px 14px; border-radius:999px; font-weight:700; margin-bottom:18px;">
            Jamaica's trusted trades platform
          </div>
          <h1 style="font-size:clamp(38px,6vw,72px); line-height:1.02; margin:0 0 16px; color:#1A3A2A; font-weight:900;">
            Find Trusted Tradespeople Across Jamaica
          </h1>
          <h2 style="font-size:clamp(22px,4vw,38px); margin:0 0 18px; color:#00A7AC; font-weight:800;">
            Fast. Reliable. Secure.
          </h2>
          <p style="font-size:18px; color:#334; margin-bottom:26px;">
            Post your job for free and connect with reliable local tradespeople across all 14 parishes.
          </p>
          <div style="display:flex; flex-wrap:wrap; gap:10px; background:#fff; padding:10px; border-radius:16px; box-shadow:0 10px 30px rgba(0,0,0,0.12); max-width:640px;">
            <input
              v-model="searchQuery"
              @input="filterCategories"
              @focus="showDropdown = true"
              @blur="collapseDropdown"
              type="text"
              placeholder="What job do you need help with?"
              autocomplete="off"
              style="flex:1; min-width:220px; border:1px solid #e5e5e5; border-radius:12px; padding:16px; font-size:16px; outline:none;"
            />
            <button
              @click="handleSearchBtn"
              style="background:#F5A623; color:#1A3A2A; border:none; border-radius:12px; padding:16px 22px; font-weight:900; font-size:15px; cursor:pointer;"
            >
              Post Your Job Free
            </button>
          </div>
          <ul v-if="showDropdown && filteredCategories.length" style="position:absolute; background:#fff; border-radius:12px; box-shadow:0 8px 32px rgba(0,0,0,0.15); list-style:none; margin:4px 0 0; padding:8px 0; z-index:200; max-width:640px; width:100%;">
            <li
              v-for="result in filteredCategories.slice(0,8)"
              :key="result.id"
              @mousedown.prevent="goToPostJob(result)"
              style="padding:12px 16px; cursor:pointer; font-size:0.9rem; color:#1A3A2A;"
            >
              🔧 {{ result.name }}
            </li>
          </ul>
          <p style="margin-top:18px; color:#1A3A2A; font-weight:700;">
            ✓ 100% Free to post &nbsp;•&nbsp; ✓ No Obligation &nbsp;•&nbsp; ✓ Secure & Easy
          </p>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section style="padding:22px 20px; background:#1A3A2A;">
      <div style="max-width:1180px; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:16px;">
        <div v-for="stat in statItems" :key="stat.label" style="color:#fff; text-align:center; padding:14px;">
          <div style="font-size:32px; font-weight:900; color:#F5A623;">{{ stat.num }}</div>
          <div style="font-size:14px; font-weight:700;">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section style="padding:70px 20px; background:#fff;">
      <div style="max-width:1180px; margin:0 auto; text-align:center;">
        <h2 style="color:#1A3A2A; font-size:38px; font-weight:900; margin-bottom:12px;">How TradeLinkJA Works</h2>
        <p style="color:#667; margin-bottom:40px;">Simple, quick and free for homeowners.</p>
        <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:24px;">
          <div v-for="step in steps" :key="step.title" style="background:#FAFAFA; border:1px solid #eee; border-radius:20px; padding:30px; box-shadow:0 6px 20px rgba(0,0,0,0.05);">
            <div style="width:66px; height:66px; border-radius:50%; background:#FFF3D6; margin:0 auto 18px; display:flex; align-items:center; justify-content:center;">
              <span style="font-size:30px;">{{ step.icon }}</span>
            </div>
            <h3 style="color:#1A3A2A; font-size:22px; font-weight:900;">{{ step.title }}</h3>
            <p style="color:#667;">{{ step.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CATEGORIES -->
    <section style="padding:70px 20px; background:#F7FBFA;">
      <div style="max-width:1180px; margin:0 auto;">
        <h2 style="color:#1A3A2A; font-size:38px; font-weight:900; text-align:center;">Popular Categories</h2>
        <p style="text-align:center; color:#667; margin-bottom:36px;">Find the right trade for your project.</p>
        <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(130px,1fr)); gap:16px;">
          <router-link
            v-for="trade in trades"
            :key="trade.id"
            :to="'/find-tradesperson?category=' + trade.name"
            style="text-decoration:none; background:#fff; border-radius:18px; padding:22px 12px; text-align:center; border:1px solid #e9eeee; box-shadow:0 5px 14px rgba(0,0,0,0.05);"
          >
            <div style="font-size:34px; margin-bottom:10px;">{{ getCategoryIcon(trade.name) }}</div>
            <div style="color:#1A3A2A; font-weight:900;">{{ trade.name }}</div>
          </router-link>
        </div>
        <div style="text-align:center; margin-top:28px;">
          <router-link to="/find-tradesperson" style="color:#00A7AC; font-weight:700; text-decoration:none;">View all trades →</router-link>
        </div>
      </div>
    </section>

    <!-- FOR TRADESPEOPLE -->
    <section style="padding:70px 20px; background:linear-gradient(90deg,rgba(26,58,42,0.95),rgba(0,167,172,0.85)), url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80'); background-size:cover; background-position:center; color:#fff;">
      <div style="max-width:1180px; margin:0 auto; display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:24px;">
        <div style="max-width:620px;">
          <h2 style="font-size:38px; font-weight:900; margin-bottom:12px;">Looking for job leads?</h2>
          <h3 style="font-size:26px; color:#F5A623; font-weight:900; margin-bottom:12px;">Grow your business with TradeLinkJA</h3>
          <p style="font-size:17px;">Connect with homeowners actively looking for plumbers, electricians, builders, tilers and more across all 14 parishes.</p>
        </div>
        <button @click="goToSignUp" style="background:#F5A623; color:#1A3A2A; border:none; border-radius:14px; padding:18px 28px; font-weight:900; font-size:16px; cursor:pointer;">
          Sign Up For Free →
        </button>
      </div>
    </section>

    <!-- TESTIMONIALS -->
    <section style="padding:70px 20px; background:#fff;">
      <div style="max-width:1180px; margin:0 auto;">
        <h2 style="color:#1A3A2A; font-size:38px; font-weight:900; text-align:center; margin-bottom:36px;">Trusted By Jamaicans</h2>
        <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:22px;">
          <div v-for="review in reviews" :key="review.name" style="background:#fff; border:1px solid #eee; border-radius:20px; padding:26px; box-shadow:0 8px 22px rgba(0,0,0,0.07);">
            <div style="color:#F5A623; font-size:22px; margin-bottom:10px;">★★★★★</div>
            <p style="color:#445; margin-bottom:14px;">"{{ review.text }}"</p>
            <strong style="color:#1A3A2A;">{{ review.name }}</strong>
            <div style="color:#00A7AC; font-weight:700; font-size:14px;">{{ review.parish }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER CTA -->
    <section style="padding:50px 20px; background:#F5A623;">
      <div style="max-width:1180px; margin:0 auto; display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:20px;">
        <div>
          <h2 style="color:#1A3A2A; font-size:34px; font-weight:900; margin:0 0 6px;">Ready to get started?</h2>
          <p style="color:#1A3A2A; margin:0;">Post your job for FREE and let the right tradespeople come to you.</p>
        </div>
        <router-link to="/post-a-job" style="background:#1A3A2A; color:#fff; border:none; border-radius:14px; padding:17px 26px; font-weight:900; text-decoration:none; font-size:16px;">
          Post Your Job For FREE →
        </router-link>
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
      pageStatsData: null,
      searchQuery: '',
      showDropdown: false,
      categories: [],
      filteredCategories: [],
      steps: [
        { icon: '📝', title: 'Post Your Job', text: 'Tell us what you need done. Quick, easy and completely free.' },
        { icon: '💬', title: 'Receive Quotes', text: 'Verified tradespeople respond with quotes and availability.' },
        { icon: '🤝', title: 'Choose & Hire', text: 'Compare quotes and reviews, then hire the right person.' }
      ],
      reviews: [
        { name: 'Michelle R.', parish: 'Kingston', text: 'TradeLinkJA made it so easy to find a reliable electrician. I posted my job and got quotes the same day.' },
        { name: 'Andre W.', parish: 'Montego Bay', text: 'I found a great plumber through Tradelink. Professional, on time and the price was fair.' },
        { name: 'Jason P.', parish: 'Spanish Town', text: 'As a contractor, TradeLinkJA has helped me get consistent leads and grow my business.' }
      ]
    }
  },
  computed: {
    userRole() {
      const loggedUser = store.getters.GET_USER_INFO
      return loggedUser?.roles?.[0] || ''
    },
    statItems() {
      return [
        { num: this.pageStatsData ? `${this.pageStatsData.tradespeople}+` : '2,100+', label: 'Verified Tradespeople' },
        { num: '5,000+', label: 'Jobs Posted' },
        { num: '14', label: 'Parishes Covered' },
        { num: '100%', label: 'Trusted & Secure' },
      ]
    }
  },
  methods: {
    getTrades() {
      userService.getTrades(8).then(res => { this.trades = res.extra })
    },
    getAllTrades() {
      userService.postJobTrades().then(res => {
        this.filteredCategories = res.extra
        this.categories = res.extra
      })
    },
    pageStats() {
      userService.pageStats().then(res => { this.pageStatsData = res.extra })
    },
    filterCategories() {
      const q = this.searchQuery.toLowerCase().trim()
      this.filteredCategories = q
        ? this.categories.filter(c => c.name.toLowerCase().includes(q))
        : this.categories
      this.showDropdown = true
    },
    collapseDropdown() {
      setTimeout(() => { this.showDropdown = false }, 200)
    },
    handleSearchBtn() {
      if (this.filteredCategories.length === 1) {
        this.goToPostJob(this.filteredCategories[0])
      } else if (this.searchQuery.trim()) {
        this.$router.push(`/find-tradesperson?q=${this.searchQuery}`)
      } else {
        this.$router.push('/post-a-job')
      }
    },
    goToPostJob(category) {
      this.$router.push(`/post-a-job?category=${category.name}`)
    },
    goToSignUp() {
      const loggedUser = store.getters.GET_USER_INFO
      if (!loggedUser) { this.$router.push('/register'); return }
      const role = loggedUser?.roles?.[0] || ''
      if (role === 'tradesperson') this.$router.push('/new-leads')
      else if (role === 'homeowner') this.$router.push('/post-a-job')
      else this.$router.push('/register')
    },
    getCategoryIcon(name) {
      const icons = {
        'Plumber': '🚰', 'Electrician': '⚡', 'Builder': '🧱',
        'Tiler': '🪟', 'Painter': '🎨', 'AC technician': '❄️',
        'Carpenter': '🪚', 'Landscaper': '🌿', 'Cleaner': '🧹',
        'Handyman': '🔨', 'Roofer': '🏠', 'Welder': '🔥'
      }
      return icons[name] || '🔧'
    }
  },
  created() {
    this.getTrades()
    this.getAllTrades()
    this.pageStats()
  }
}
</script>
