<template>
  <div class="subscription-card card mb-4" v-if="!loading && subscription">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start flex-wrap gap-3">
        <div>
          <h6 class="text-muted mb-1">Your plan</h6>
          <div class="d-flex align-items-center gap-2 mb-2">
            <span class="badge rounded-pill plan-pill" :style="planPillStyle">{{ planLabel }}</span>
          </div>
          <div class="small text-muted" v-if="subscription.expires_at">
            <span v-if="subscription.plan === 'trial'">Trial ends {{ formattedExpiry }}</span>
            <span v-else-if="subscription.plan === 'expired'">Ended {{ formattedExpiry }}</span>
            <span v-else>Renews / expires {{ formattedExpiry }}</span>
            <span v-if="subscription.days_remaining !== null && subscription.days_remaining !== undefined">
              &middot; {{ subscription.days_remaining }} day{{ subscription.days_remaining === 1 ? '' : 's' }} remaining
            </span>
          </div>
        </div>

        <div v-if="showSubscribePrompt" class="text-md-end">
          <p class="small text-danger mb-2" v-if="subscription.plan === 'expired'">
            Your subscription has ended. Subscribe to keep receiving leads.
          </p>
          <p class="small text-warning mb-2" v-else>
            Your free trial is ending soon. Subscribe to keep receiving leads.
          </p>
          <router-link to="/contact-us" class="btn btn-primary btn-sm">
            Subscribe
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {userService} from "@/apis/user.service";

export default {
  name: 'SubscriptionCard',
  data() {
    return {
      loading: true,
      subscription: null,
    };
  },
  computed: {
    planLabel() {
      if (!this.subscription) return '—';
      return this.subscription.label || this.subscription.plan;
    },
    formattedExpiry() {
      return this.subscription && this.subscription.expires_at
        ? new Date(this.subscription.expires_at).toLocaleDateString()
        : '';
    },
    showSubscribePrompt() {
      if (!this.subscription) return false;
      if (this.subscription.plan === 'expired') return true;
      if (this.subscription.plan === 'trial') {
        return Number(this.subscription.days_remaining) <= 14;
      }
      return false;
    },
    planPillStyle() {
      if (!this.subscription) return {};
      switch (this.subscription.plan) {
        case 'founding':
          return {backgroundColor: '#F5A623', color: '#1a1a1a'};
        case 'trial':
          return {backgroundColor: '#00A7AC', color: '#ffffff'};
        case 'monthly':
        case 'annual':
          return {backgroundColor: 'transparent', color: '#13452E', border: '1px solid #13452E'};
        case 'expired':
          return {backgroundColor: '#adb5bd', color: '#ffffff'};
        default:
          return {backgroundColor: '#e9ecef', color: '#495057'};
      }
    },
  },
  methods: {
    fetchSubscription() {
      this.loading = true;
      userService.getMySubscription().then((res) => {
        this.loading = false;
        const {status, extra} = res;
        if (status) {
          this.subscription = extra;
        }
      });
    },
  },
  created() {
    this.fetchSubscription();
  },
};
</script>

<style scoped>
.plan-pill {
  padding: 0.35em 0.75em;
  font-weight: 600;
  font-size: 0.8rem;
  display: inline-block;
}
</style>
