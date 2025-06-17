<template>
  <div class="single-widget mb-60" style="overflow-y: auto;">
    <!-- Profile Section -->
    <div class="">
      <div class="d-flex align-items-center mb-4">
        <div class="profile-image">
          <i class="bi bi-person-fill"></i>
          <div class="edit-icon">
            <i class="bi bi-pencil-fill"></i>
          </div>
        </div>
        <div class="flex-grow-1">
          <h4 class="profile-name">{{ user.name }}</h4>
          <h5 class="card-title mb-1">{{ user.parish }} ~ <small>{{ user.city }}</small></h5>
        </div>
      </div>
      <a href="#" class="btn btn-outline-dark btn-block" style="border-color: #bebebe;">
        <i class="bi bi-eye me-2"></i> View profile
      </a>
    </div>

    <!-- Complete Registration -->
    <a @click="completeRegistration" v-if="!isRegistrationComplete"
       class="d-flex justify-content-between align-items-center mb-4 mt-5 cursor-pointer">
      <div>
        <i class="bi bi-person-lines-fill mr-2"></i> Complete registration
      </div>
      <span class="badge bg-secondary rounded-pill">{{ registrationSteps }} steps left</span>
      <i class="bi bi-chevron-right d-lg-none"></i>
    </a>

    <!-- List Groups -->
    <div class="list-group">
      <router-link to="/company-description"
                   class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                   id="company-description">
        <div>
          <i class="bi bi-building mr-2"></i> Company description
        </div>
        <i class="bi bi-chevron-right d-lg-none"></i>
      </router-link>
      <router-link to="/reviews"
                   class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                   id="reviews">
        <div>
          <i class="bi bi-star mr-2"></i> Reviews
        </div>
        <i class="bi bi-chevron-right d-lg-none"></i>
      </router-link>
      <router-link to="/portfolio" id="portfolio"
                   class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
        <div>
          <i class="bi bi-camera mr-2"></i> Portfolio
        </div>
        <i class="bi bi-chevron-right d-lg-none"></i>
      </router-link>
    </div>

    <!-- Account Section -->
    <div class="list-group">
      <h6 class="font-weight-bold">Account</h6>
      <router-link to="/contact-details" id="contact-details"
                   class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
        <div>
          <i class="bi bi-file-text mr-2"></i> Contact details
        </div>
        <span class="badge action-required rounded-pill" v-if="!user.identity_verified || user.identity_verified ==='rejected'">Action required</span>

        <span class="badge bg-secondary text-white rounded-pill" v-if="user.identity_verified ==='pending'">Pending</span>
        <i class="bi bi-chevron-right d-lg-none"></i>
      </router-link>
      <router-link to="manage-account" id="manage-account"
                   class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
        <div>
          <i class="bi bi-person-circle mr-2"></i> Manage account
        </div>
        <i class="bi bi-chevron-right d-lg-none"></i>
      </router-link>
      <router-link to="saved-leads" id="saved-leads"
                   class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
        <div>
          <i class="bi bi-bookmark mr-2"></i> Saved leads
        </div>
        <i class="bi bi-chevron-right d-lg-none"></i>
      </router-link>
    </div>

    <div class="list-group mt-4">
      <h6 class="font-weight-bold">Lead settings</h6>
      <router-link to="/work-area" id="work-area"
                   class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
        <div>
          <i class="bi bi-briefcase mr-2"></i> Work area
        </div>
        <i class="bi bi-chevron-right d-lg-none"></i>
      </router-link>
      <router-link to="/services" id="services"
                   class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
        <div>
          <i class="bi bi-tools mr-2"></i> Services
        </div>
        <i class="bi bi-chevron-right d-lg-none"></i>
      </router-link>
      <router-link to="/notifications" id="notifications"
                   class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
        <div>
          <i class="bi bi-bell mr-2"></i> Notifications
        </div>
        <i class="bi bi-chevron-right d-lg-none"></i>
      </router-link>
    </div>

    <div class="list-group mt-4">
      <h6 class="font-weight-bold">Support</h6>
      <router-link to="/support" id="support"
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
  name: "Tradesperson-sidebar",
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
          this.$router.push('/create-auth');
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
