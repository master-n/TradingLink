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
            <td colspan="6" class="text-center text-muted">No subscriptions match this filter.</td>
          </tr>
        </tbody>
      </table>
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
      this.fetchUsers();
    },
    fetchUsers() {
      this.loading = true;
      userService.listSubscriptions(this.filter).then((res) => {
        this.loading = false;
        if (res.status) {
          this.users = res.extra.data || res.extra;
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
  },
};
</script>
