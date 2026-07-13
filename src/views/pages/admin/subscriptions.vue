<template>
  <div>
    <topHeader/>
    <div class="container mt-4 mb-5">
      <h4 class="fw-bold mb-4">Subscriptions</h4>

      <div class="btn-group mb-3">
        <button
          v-for="option in filterOptions"
          :key="option.value"
          class="btn"
          :class="filter === option.value ? 'btn-primary-1' : 'btn-outline-secondary'"
          @click="setFilter(option.value)"
        >
          {{ option.label }}
        </button>
      </div>

      <div v-if="loading" class="text-center py-5">Loading...</div>

      <table v-else class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Plan</th>
            <th>Status</th>
            <th>Trial ends</th>
            <th>Subscribed since</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <span
                v-if="user.subscription_state"
                class="badge rounded-pill plan-pill"
                :style="planPillStyle(user.subscription_state)"
              >
                {{ planPillLabel(user.subscription_state) }}
              </span>
              <span v-else>—</span>
            </td>
            <td>{{ user.status }}</td>
            <td>{{ user.trial_ends_at ? formatDate(user.trial_ends_at) : '—' }}</td>
            <td>{{ user.subscribed_at ? formatDate(user.subscribed_at) : '—' }}</td>
            <td>
              <button
                v-if="!user.subscribed_at"
                class="btn btn-sm btn-success"
                :disabled="marking === user.id"
                @click="markPaid(user)"
              >
                Mark as paid
              </button>
            </td>
          </tr>
          <tr v-if="users.length === 0">
            <td colspan="7" class="text-center text-muted">No subscriptions match this filter.</td>
          </tr>
        </tbody>
      </table>

      <div v-if="!loading && lastPage > 1" class="d-flex align-items-center justify-content-between">
        <button
          class="btn btn-outline-secondary btn-sm"
          :disabled="currentPage <= 1"
          @click="goToPage(currentPage - 1)"
        >
          Previous
        </button>
        <span class="text-muted small">Page {{ currentPage }} of {{ lastPage }}</span>
        <button
          class="btn btn-outline-secondary btn-sm"
          :disabled="currentPage >= lastPage"
          @click="goToPage(currentPage + 1)"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import topHeader from '../../base-layout/admin-header';
import { userService } from '@/apis/user.service';

export default {
  name: 'AdminSubscriptions',
  components: { topHeader },
  data() {
    return {
      filter: 'all',
      users: [],
      loading: true,
      marking: null,
      currentPage: 1,
      lastPage: 1,
      filterOptions: [
        { value: 'all', label: 'All' },
        { value: 'trial', label: 'On trial' },
        { value: 'paid', label: 'Paid' },
        { value: 'expired', label: 'Expired' },
      ],
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    setFilter(value) {
      this.filter = value;
      this.currentPage = 1;
      this.fetchUsers();
    },
    goToPage(page) {
      this.currentPage = page;
      this.fetchUsers();
    },
    fetchUsers() {
      this.loading = true;
      userService.listSubscriptions(this.filter, this.currentPage).then((res) => {
        this.loading = false;
        if (res.status) {
          const paginator = res.extra || {};
          this.users = paginator.data || (Array.isArray(paginator) ? paginator : []);
          this.currentPage = paginator.current_page || 1;
          this.lastPage = paginator.last_page || 1;
          // If a mutation (e.g. mark-as-paid under a filter) shrank the result
          // set below the page we requested, we'd be stranded on an empty
          // out-of-range page. Step back to the real last page and refetch.
          if (this.currentPage > this.lastPage) {
            this.currentPage = this.lastPage;
            this.fetchUsers();
          }
        } else {
          this.$store.dispatch('error', { message: res.message, showSwal: true });
        }
      });
    },
    markPaid(user) {
      this.marking = user.id;
      userService.markSubscribed(user.id).then((res) => {
        this.marking = null;
        if (res.status) {
          this.fetchUsers();
        } else {
          this.$store.dispatch('error', { message: res.message, showSwal: true });
        }
      });
    },
    formatDate(value) {
      return new Date(value).toLocaleDateString();
    },
    planPillLabel(state) {
      if (!state) return '—';
      if (state.plan === 'trial') {
        const days = Number(state.days_remaining);
        return `${state.label || 'Trial'} (${Number.isFinite(days) ? days : 0}d left)`;
      }
      if (state.plan === 'monthly' || state.plan === 'annual') {
        return 'Active';
      }
      return state.label || '—';
    },
    planPillStyle(state) {
      if (!state) return {};
      switch (state.plan) {
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
