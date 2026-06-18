<template>
  <div v-if="show" class="subscription-banner">
    <div class="subscription-banner__inner">
      <div class="subscription-banner__icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      </div>
      <div class="subscription-banner__content">
        <h4 class="subscription-banner__title">Subscription required</h4>
        <p class="subscription-banner__text">
          {{ message || 'Upgrade your plan to view full job details, send messages, and register your interest.' }}
        </p>
      </div>
      <router-link to="/subscription" class="subscription-banner__btn">
        Upgrade Now
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubscriptionBanner',
  props: {
    // Show the banner
    show: {
      type: Boolean,
      default: true,
    },
    // Optional custom message
    message: {
      type: String,
      default: null,
    },
  },
}
</script>

<style scoped>
.subscription-banner {
  background: #fff8ec;
  border: 1.5px solid #b78554;
  border-radius: 12px;
  padding: 20px 24px;
  margin-bottom: 24px;
}
.subscription-banner__inner {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.subscription-banner__icon {
  width: 44px;
  height: 44px;
  background: #fde8c8;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #b78554;
}
.subscription-banner__icon svg { width: 22px; height: 22px; }
.subscription-banner__content { flex: 1; min-width: 200px; }
.subscription-banner__title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #7a4f20;
  margin: 0 0 4px;
}
.subscription-banner__text {
  font-size: 0.875rem;
  color: #8a6030;
  margin: 0;
  line-height: 1.5;
}
.subscription-banner__btn {
  background: #b78554;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
  transition: background 0.2s;
}
.subscription-banner__btn:hover { background: #9a6e42; }
</style>
