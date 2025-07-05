<template>
  <div class="single-widget mb-60" style="overflow-y: auto;">
    <!-- Profile Section -->
    <div class="mb-4">
      <div class="d-flex align-items-center mb-4">
        <div class="profile-image">
          <i class="bi bi-person-fill"></i>
          <div class="edit-icon">
            <i class="bi bi-pencil-fill"></i>
          </div>
        </div>
        <div class="flex-grow-1">
          <h4 class="profile-name">{{ user.name }}</h4>
        </div>
      </div>
    </div>

    <!-- Account Section -->
    <div class="list-group">
      <h6 class="font-weight-bold">Account</h6>
      <router-link to="/homeowner/my-contact-details" id="contact-details"
                   class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
        <div>
          <i class="bi bi-file-text mr-2"></i> Contact details
        </div>

      </router-link>
      <router-link to="/homeowner/manage-account" id="manage-account"
                   class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
        <div>
          <i class="bi bi-person-circle mr-2"></i> Manage account
        </div>
        <i class="bi bi-chevron-right d-lg-none"></i>
      </router-link>
    </div>

    <div class="list-group mt-4">
      <h6 class="font-weight-bold">Settings</h6>
      <router-link to="/homeowner/notification-settings" id="notifications"
                   class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
        <div>
          <i class="bi bi-bell mr-2"></i> Notifications
        </div>
        <i class="bi bi-chevron-right d-lg-none"></i>
      </router-link>
    </div>

    <div class="list-group mt-4">
      <h6 class="font-weight-bold">Support</h6>
      <router-link to="/homeowner/support" id="support"
                   class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
        <div>
          <i class="bi bi-info-circle mr-2"></i> Support centre
        </div>
        <i class="bi bi-chevron-right d-lg-none"></i>
      </router-link>
    </div>

    <div>
      <router-link to="/logout" class="text-danger d-flex justify-content-between align-items-center">
        <div>
          <i class="bi bi-box-arrow-right mr-2"></i> Logout
        </div>
        <i class="bi bi-chevron-right d-lg-none"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeOwnerSidebar",
  data() {
    return {
      user: this.$store.getters.GET_USER_INFO || {},
    };
  },
  computed: {
    registrationSteps() {
      // Calculate the number of steps left in the registration process
      return 8 - this.user.registration_step;
    },
    isRegistrationComplete() {
      // Check if the registration is complete
      return this.user.registration_status ==='complete'
    }
  },
  watch: {
    '$store.getters.GET_USER_INFO': {
      handler(newUser) {
        this.user = newUser || {};
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    completeRegistration() {
      // Check the registration step and route accordingly
      switch (this.user.registration_step) {
        case 1:
          this.$router.push('/create-account');
          break;
        case 2:
          this.$router.push('/professions');
          break;
        case 3:
          this.$router.push('/travel-to-work');
          break;
        case 4:
          this.$router.push('/business-type');
          break;
        case 5:
          this.$router.push('/business-details');
          break;
        case 6:
          this.$router.push('/verify-identity');
          break;
        case 7:
          this.$router.push('/verify-skills');
          break;
        default:
          console.log('Unknown registration step');
      }
    }
  }
};
</script>

<style scoped>
.list-group-item {
  border-left: none;
  border-right: none;
}

.list-group {
  margin-bottom: 20px;
}

.badge {
  margin-left: auto;
}

.action-required {
  color: #dc3545;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}

.list-group-item.active {
  background-color: var(--primary-color1);
  border-color: var(--primary-color1);
  color: var(--white);
}

.list-group-item {
  padding: 1rem 1.5rem;
  font-weight: lighter;
  font-size: 14px;
  border-radius: 0;
}
</style>
