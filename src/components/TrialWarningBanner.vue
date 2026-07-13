<template>
  <div v-if="visible" class="trial-warning-banner">
    <div class="trial-warning-banner__inner">
      <div class="trial-warning-banner__text">
        <i class="bi bi-exclamation-triangle-fill me-2"></i>
        Your free trial ends in {{ daysRemaining }} day{{ daysRemaining === 1 ? '' : 's' }} — subscribe to keep receiving leads.
      </div>
      <div class="trial-warning-banner__actions">
        <router-link to="/contact-us" class="trial-warning-banner__btn">Subscribe</router-link>
        <button class="trial-warning-banner__dismiss" @click="dismiss" aria-label="Dismiss">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {userService} from "@/apis/user.service";

const STORAGE_KEY = 'trial-warning-banner-dismissed';

export default {
  name: 'TrialWarningBanner',
  data() {
    return {
      subscription: null,
      dismissed: false,
    };
  },
  computed: {
    isTradesperson() {
      const user = this.$store.getters.GET_USER_INFO;
      return !!(user && Array.isArray(user.roles) && user.roles.includes('tradesperson'));
    },
    daysRemaining() {
      return this.subscription ? Number(this.subscription.days_remaining) : 0;
    },
    visible() {
      if (this.dismissed || !this.subscription) return false;
      return this.subscription.plan === 'trial' && this.daysRemaining <= 7 && this.daysRemaining >= 0;
    },
  },
  methods: {
    dismiss() {
      this.dismissed = true;
      try {
        sessionStorage.setItem(STORAGE_KEY, '1');
      } catch (e) {
        // sessionStorage unavailable (e.g. private browsing) — dismiss for this render only.
      }
    },
    fetchSubscription() {
      if (!this.isTradesperson) return;
      userService.getMySubscription().then((res) => {
        const {status, extra} = res;
        if (status) {
          this.subscription = extra;
        }
      });
    },
  },
  created() {
    try {
      this.dismissed = sessionStorage.getItem(STORAGE_KEY) === '1';
    } catch (e) {
      this.dismissed = false;
    }
    this.fetchSubscription();
  },
};
</script>

<style scoped>
.trial-warning-banner {
  background: #fff3cd;
  border-bottom: 1px solid #ffe69c;
  padding: 10px 16px;
}
.trial-warning-banner__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}
.trial-warning-banner__text {
  color: #7a5b00;
  font-size: 0.9rem;
  font-weight: 500;
}
.trial-warning-banner__actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
.trial-warning-banner__btn {
  background: #00A7AC;
  color: #fff;
  border-radius: 6px;
  padding: 6px 16px;
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
}
.trial-warning-banner__btn:hover {
  background: #008a8e;
  color: #fff;
}
.trial-warning-banner__dismiss {
  background: none;
  border: none;
  color: #7a5b00;
  font-size: 0.9rem;
  cursor: pointer;
  line-height: 1;
  padding: 4px;
}
</style>
