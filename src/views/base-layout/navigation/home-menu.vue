<template>
  <div>
    <header class="tl-nav">
      <div class="tl-nav__inner">

        <!-- Logo -->
        <router-link to="/" class="tl-nav__logo">
          <img
            src="../../../../public/frontend/assets/images/header1-logo.svg"
            alt="TradeLinkJA"
            class="tl-nav__logo-img"
          />
        </router-link>

        <!-- Desktop links -->
        <nav class="tl-nav__links">

          <!-- Logged OUT -->
          <template v-if="!loggedIn">
            <router-link to="/post-a-job" class="tl-nav__link">Post a job</router-link>
            <router-link to="/login" class="tl-nav__link">Log in</router-link>
            <router-link to="/register" class="tl-nav__btn">Sign up as a tradesperson</router-link>
          </template>

          <!-- Logged IN -->
          <template v-else>
            <router-link to="/new-leads" class="tl-nav__link">New leads</router-link>
            <router-link to="/my-proposals/contacts" class="tl-nav__link">Contacts</router-link>

            <!-- Registration incomplete badge -->
            <a v-if="!isRegistrationComplete" @click="completeRegistration" class="tl-nav__link tl-nav__link--alert" style="cursor:pointer">
              Complete registration
              <span class="tl-nav__badge">{{ registrationSteps }} left</span>
            </a>

            <!-- Account dropdown -->
            <div class="tl-nav__dropdown-wrap">
              <button class="tl-nav__btn tl-nav__btn--account">
                My Account
                <i class="bi bi-list"></i>
                <span v-if="inboxCount" class="tl-nav__inbox">{{ inboxCount }}</span>
              </button>
              <div class="tl-nav__dropdown">
                <router-link to="/profile" class="tl-nav__dropdown-item">
                  <i class="bi bi-person-circle"></i> Profile
                  <span v-if="inboxCount" class="tl-nav__badge">{{ inboxCount }}</span>
                </router-link>
                <router-link to="/ask-a-trade" class="tl-nav__dropdown-item">
                  <i class="bi bi-people"></i> Ask a tradesperson
                </router-link>
                <router-link to="/logout" class="tl-nav__dropdown-item tl-nav__dropdown-item--danger">
                  <i class="bi bi-box-arrow-right"></i> Log Out
                </router-link>
              </div>
            </div>
          </template>
        </nav>

        <!-- Mobile hamburger -->
        <button class="tl-nav__hamburger sidebar-button mobile-menu-btn" aria-label="Menu">
          <i class="bi bi-list"></i>
        </button>
      </div>

      <!-- Mobile drawer -->
      <div class="tl-nav__mobile main-menu">
        <div class="tl-nav__mobile-header">
          <router-link to="/">
            <img src="../../../../public/frontend/assets/images/header1-logo.svg" alt="TradeLinkJA" style="height:60px">
          </router-link>
          <button class="tl-nav__mobile-close menu-close-btn">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <div class="tl-nav__mobile-links">
          <template v-if="!loggedIn">
            <router-link to="/post-a-job" class="tl-nav__mobile-link">Post a job</router-link>
            <router-link to="/login" class="tl-nav__mobile-link">Log in</router-link>
            <router-link to="/register" class="tl-nav__mobile-link tl-nav__mobile-link--btn">Sign up as a tradesperson</router-link>
          </template>
          <template v-else>
            <a v-if="!isRegistrationComplete" @click="completeRegistration" class="tl-nav__mobile-link" style="cursor:pointer">
              Complete registration <span class="tl-nav__badge">{{ registrationSteps }} left</span>
            </a>
            <router-link to="/profile" class="tl-nav__mobile-link">Profile</router-link>
            <router-link to="/ask-a-trade" class="tl-nav__mobile-link">Ask a tradesperson</router-link>
            <router-link to="/logout" class="tl-nav__mobile-link">Log Out</router-link>
          </template>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "HomeMenu",
  data() {
    return {
      user: this.$store.getters.GET_USER_INFO || {},
      inboxCount: this.$store.getters.GET_INBOX_COUNT || 0,
    };
  },
  watch: {
    '$store.getters.GET_INBOX_COUNT': {
      handler(count) { this.inboxCount = count || 0 },
      immediate: true,
      deep: true
    }
  },
  computed: {
    registrationSteps() { return 8 - this.user.registration_step },
    isRegistrationComplete() { return this.user.registration_status === 'complete' },
    loggedIn() { return this.$store.getters.GET_USER_INFO }
  },
  methods: {
    completeRegistration() {
      const routes = { 1: '/create-account', 2: '/professions', 3: '/travel-to-work', 4: '/business-type', 5: '/business-details', 6: '/verify-identity', 7: '/verify-skills' }
      if (routes[this.user.registration_step]) this.$router.push(routes[this.user.registration_step])
    }
  }
}
</script>

<style scoped>
/* ── NAV ─────────────────────────────────────────────── */
.tl-nav {
  background: #fff;
  box-shadow: 0 1px 8px rgba(0,0,0,0.08);
  position: sticky;
  top: 0;
  z-index: 500;
}
.tl-nav__inner {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.tl-nav__logo-img { height: 56px; }
.tl-nav__links {
  display: flex;
  align-items: center;
  gap: 8px;
}
.tl-nav__link {
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
  text-decoration: none;
  padding: 8px 14px;
  border-radius: 8px;
  transition: background 0.15s;
  white-space: nowrap;
}
.tl-nav__link:hover { background: #F0FAFA; color: #00A7AC; }
.tl-nav__link--alert { color: #b78554; }
.tl-nav__btn {
  background: #00A7AC;
  color: #fff !important;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: inherit;
  transition: background 0.2s;
}
.tl-nav__btn:hover { background: #008C91; }
.tl-nav__btn--account { position: relative; }
.tl-nav__inbox {
  position: absolute;
  top: -6px; right: -6px;
  background: #ef4444;
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  width: 18px; height: 18px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
}
.tl-nav__badge {
  background: #00A7AC;
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 999px;
  margin-left: 4px;
}

/* Dropdown */
.tl-nav__dropdown-wrap { position: relative; }
.tl-nav__dropdown-wrap:hover .tl-nav__dropdown { display: flex; }
.tl-nav__dropdown {
  display: none;
  flex-direction: column;
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  padding: 8px 0;
  min-width: 200px;
  z-index: 100;
}
.tl-nav__dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  font-size: 0.9rem;
  color: #1A2B2B;
  text-decoration: none;
  transition: background 0.15s;
}
.tl-nav__dropdown-item:hover { background: #F0FAFA; color: #00A7AC; }
.tl-nav__dropdown-item i { color: #00A7AC; }
.tl-nav__dropdown-item--danger:hover { color: #ef4444; }
.tl-nav__dropdown-item--danger i { color: #ef4444; }

/* Hamburger */
.tl-nav__hamburger {
  display: none;
  background: none;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 1.2rem;
  cursor: pointer;
  color: #333;
}

/* Mobile drawer */
.tl-nav__mobile {
  display: none;
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: #fff;
  z-index: 999;
  flex-direction: column;
  padding: 24px;
}
.tl-nav__mobile.show-menu { display: flex; }
.tl-nav__mobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
}
.tl-nav__mobile-close {
  background: none; border: none;
  font-size: 1.5rem; cursor: pointer; color: #333;
}
.tl-nav__mobile-links { display: flex; flex-direction: column; gap: 4px; }
.tl-nav__mobile-link {
  display: block;
  padding: 16px 0;
  font-size: 1rem;
  font-weight: 500;
  color: #1A2B2B;
  text-decoration: none;
  border-bottom: 1px solid #f0f0f0;
}
.tl-nav__mobile-link--btn {
  margin-top: 16px;
  background: #00A7AC;
  color: #fff !important;
  padding: 14px 20px;
  border-radius: 8px;
  text-align: center;
  font-weight: 700;
  border-bottom: none;
}

/* Responsive */
@media (max-width: 768px) {
  .tl-nav__links { display: none; }
  .tl-nav__hamburger { display: flex; }
}
</style>
