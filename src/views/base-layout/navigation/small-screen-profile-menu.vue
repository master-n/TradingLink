<template>
  <div class="settings-container container">
    <div class="settings-widget">
      <!-- Profile Section -->
      <div class="profile-section d-flex align-items-center p-3">
        <div class="profile-image">
          <i class="bi bi-person-fill"></i>
        </div>
        <div class="flex-grow-1 ms-3">
          <h5 class="profile-name mb-0">{{ user.name }}</h5>
          <small class="text-muted">{{ user.parish_name }} ~ {{ user.city_name }}</small>
        </div>
      </div>

      <!-- Complete Registration -->
      <div v-if="!isRegistrationComplete" class="registration-section">
        <a @click="completeRegistration" class="registration-link d-flex justify-content-between align-items-center p-3">
          <div>
            <i class="bi bi-person-lines-fill me-3"></i> Complete Registration
          </div>
          <div>
            <span class="badge bg-secondary rounded-pill me-2">{{ registrationSteps }} steps left</span>
            <i class="bi bi-chevron-right"></i>
          </div>
        </a>
      </div>

      <!-- List Groups -->
      <div class="settings-group">
        <router-link to="/company-description" class="settings-item d-flex justify-content-between align-items-center p-3" @click.native="handleNavigation">
          <div>
            <i class="bi bi-building me-3"></i> Company Description
          </div>
          <i class="bi bi-chevron-right text-muted"></i>
        </router-link>
        <router-link to="/reviews" class="settings-item d-flex justify-content-between align-items-center p-3">
          <div>
            <i class="bi bi-star me-3"></i> Reviews
          </div>
          <i class="bi bi-chevron-right text-muted"></i>
        </router-link>
        <router-link to="/portfolio" class="settings-item d-flex justify-content-between align-items-center p-3">
          <div>
            <i class="bi bi-camera me-3"></i> Portfolio
          </div>
          <i class="bi bi-chevron-right text-muted"></i>
        </router-link>
      </div>

      <!-- Account Section -->
      <div class="settings-group">
        <div class="settings-header p-3">Account</div>
        <router-link to="/contact-details" class="settings-item d-flex justify-content-between align-items-center p-3">
          <div>
            <i class="bi bi-file-text me-3"></i> Contact Details
          </div>
          <div>
            <span class="badge action-required rounded-pill me-2" v-if="!user.identity_verified || user.identity_verified ==='rejected'">Action required</span>
            <span class="badge bg-secondary text-white rounded-pill me-2" v-if="user.identity_verified ==='pending'">Pending</span>
            <i class="bi bi-chevron-right text-muted"></i>
          </div>
        </router-link>
        <router-link to="/manage-account" class="settings-item d-flex justify-content-between align-items-center p-3">
          <div>
            <i class="bi bi-person-circle me-3"></i> Manage Account
          </div>
          <i class="bi bi-chevron-right text-muted"></i>
        </router-link>
        <router-link to="/saved-leads" class="settings-item d-flex justify-content-between align-items-center p-3">
          <div>
            <i class="bi bi-bookmark me-3"></i> Saved Leads
          </div>
          <i class="bi bi-chevron-right text-muted"></i>
        </router-link>
      </div>

      <!-- Lead Settings Section -->
      <div class="settings-group">
        <div class="settings-header p-3">Lead Settings</div>
        <router-link to="/work-area" class="settings-item d-flex justify-content-between align-items-center p-3">
          <div>
            <i class="bi bi-briefcase me-3"></i> Work Area
          </div>
          <i class="bi bi-chevron-right text-muted"></i>
        </router-link>
        <router-link to="/services" class="settings-item d-flex justify-content-between align-items-center p-3">
          <div>
            <i class="bi bi-tools me-3"></i> Services
          </div>
          <i class="bi bi-chevron-right text-muted"></i>
        </router-link>
        <router-link to="/notifications" class="settings-item d-flex justify-content-between align-items-center p-3">
          <div>
            <i class="bi bi-bell me-3"></i> Notifications
          </div>
          <i class="bi bi-chevron-right text-muted"></i>
        </router-link>
      </div>

      <!-- Support Section -->
      <div class="settings-group">
        <div class="settings-header p-3">Support</div>
        <router-link to="/support" class="settings-item d-flex justify-content-between align-items-center p-3">
          <div>
            <i class="bi bi-info-circle me-3"></i> Support Centre
          </div>
          <i class="bi bi-chevron-right text-muted"></i>
        </router-link>
      </div>

      <!-- Logout -->
      <div class="settings-group">
        <router-link to="/logout" class="settings-item text-danger d-flex justify-content-between align-items-center p-3">
          <div>
            <i class="bi bi-box-arrow-right me-3"></i> Logout
          </div>
          <i class="bi bi-chevron-right text-muted"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TradespersonSidebar",
  data() {
    return {
      user: this.$store.getters.GET_USER_INFO || {},
      isMobile: false
    };
  },
  computed: {
    registrationSteps() {
      return 8 - this.user.registration_step;
    },
    isRegistrationComplete() {
      return this.user.registration_status === 'complete';
    }
  },
  watch: {
    // Watch the Vuex store getter directly and update local user data
    '$store.getters.GET_USER_INFO': {
      handler(newUser) {
        this.user = newUser || {};
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handleNavigation() {
      this.$emit('navigate');
    },
    completeRegistration() {
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
    },
    checkScreenSize() {
      this.isMobile = window.innerWidth < 768;
      if (!this.isMobile) {
        this.$router.push('/profile');
      }
    }
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize);
  }
};
</script>

<style scoped>

</style>
