<template>
  <div class="suspended-page">
    <div class="suspended-page__card">
      <div class="suspended-page__icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
      <h1 class="suspended-page__title">Account {{ statusLabel }}</h1>
      <p class="suspended-page__text">
        Your TradeLinkJA account has been {{ statusLabel.toLowerCase() }}.
        You cannot access leads, messages, or job details until this is resolved.
      </p>
      <p class="suspended-page__contact">
        If you believe this is a mistake, please contact us:
      </p>
      <a href="mailto:support@tradelinkja.com" class="suspended-page__email">
        support@tradelinkja.com
      </a>
      <div class="suspended-page__actions">
        <router-link to="/logout" class="suspended-page__logout">Log Out</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store/store'

export default {
  name: 'SuspendedPage',
  computed: {
    statusLabel() {
      const user = store.getters.GET_USER_INFO
      const status = user?.status || 'suspended'
      return status.charAt(0).toUpperCase() + status.slice(1)
    }
  }
}
</script>

<style scoped>
.suspended-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7fafa;
  padding: 24px;
}
.suspended-page__card {
  background: #fff;
  border-radius: 16px;
  padding: 48px 40px;
  max-width: 480px;
  width: 100%;
  text-align: center;
  box-shadow: 0 4px 32px rgba(0,0,0,0.08);
}
.suspended-page__icon {
  width: 64px;
  height: 64px;
  background: #fee2e2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  color: #ef4444;
}
.suspended-page__icon svg { width: 32px; height: 32px; }
.suspended-page__title {
  font-size: 1.4rem;
  font-weight: 800;
  color: #1A2B2B;
  margin: 0 0 16px;
}
.suspended-page__text {
  color: #5C7878;
  line-height: 1.65;
  margin-bottom: 20px;
}
.suspended-page__contact {
  color: #5C7878;
  font-size: 0.9rem;
  margin-bottom: 8px;
}
.suspended-page__email {
  color: #00A7AC;
  font-weight: 600;
  text-decoration: none;
  font-size: 0.95rem;
}
.suspended-page__actions { margin-top: 32px; }
.suspended-page__logout {
  display: inline-block;
  padding: 12px 28px;
  background: #f3f4f6;
  color: #374151;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
}
</style>
