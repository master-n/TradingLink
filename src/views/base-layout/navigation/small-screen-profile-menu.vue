<template>
  <div class="settings-container container">
    <div class="settings-widget">
      <!-- Profile Section -->
      <div class="profile-section d-flex align-items-center p-3">
        <div class="profile-image cursor-pointer" @click="triggerImageUpload">
          <img v-if="user.photo" :src="user.photo" alt="Profile" class="" style="width: 50px; height: 50px; object-fit: cover; border-radius: 10px;" />
          <i v-else class="bi bi-person-fill"></i>
        </div>
        <div class="flex-grow-1 ms-3" @click="$router.push(`/user-profile/${user.id}`)">
          <h5 class="profile-name mb-0">{{ user.name }} <i v-if="user.qualification_status ==='approved'" class="bi bi-patch-check-fill text-primary-1"></i></h5>
          <div class="text-muted mb-0 small">{{ user.email }}</div>

          <small class="text-muted">{{ user.city_name ? `${user.city_name} ${user.parish_name}` : '' }}
          </small>
        </div>
      </div>
      <input type="file" ref="profileImageInput" class="d-none" @change="handleImageUpload" accept="image/*"/>


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
        <router-link to="/inbox" class="settings-item d-flex justify-content-between align-items-center p-3">
          <div>
            <i class="bi bi-file-text me-3"></i> Inbox
          </div>
          <div>
            <span class="badge bg-danger text-white rounded-pill">{{inboxCount}}</span>
            <i class="bi bi-chevron-right text-muted"></i>
          </div>
        </router-link>
        <router-link to="/new-leads" class="settings-item d-flex justify-content-between align-items-center p-3">
          <div>
            <i class="bi bi-file-text me-3"></i> New leads
          </div>
          <div>
            <span class="badge bg-primary-1 text-white rounded-pill">{{ userStats ? userStats.new_leads : '' }}</span>
            <i class="bi bi-chevron-right text-muted"></i>
          </div>
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
        <router-link to="/who-viewed-my-profile" class="settings-item d-flex justify-content-between align-items-center p-3">
          <div>
            <i class="bi bi-eye me-3"></i> Profile Views
          </div>
          <div>
            <span class="badge bg-info text-white rounded-pill">{{ userStats?userStats.profile_views:'' }}</span>
            <i class="bi bi-chevron-right text-muted"></i>
          </div>
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
        <router-link to="/contact-us" class="settings-item d-flex justify-content-between align-items-center p-3">
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
import {userService} from "@/apis/user.service";

export default {
  name: "TradespersonSidebar",
  data() {
    return {
      user: this.$store.getters.GET_USER_INFO || {},
      isMobile: false,
      inboxCount: this.$store.getters.GET_INBOX_COUNT || 0,
      userStats: null
    };
  },
  computed: {
    registrationSteps() {
      return 8 - (Number(this.user.registration_step) || 0);
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
    },
    '$store.getters.GET_INBOX_COUNT': {
      handler(count) {
        this.inboxCount = count || 0;
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
    },
    triggerImageUpload() {
      this.$refs.profileImageInput.click();
    },
    async handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('photo', file);
      userService.updatePersonalInfo(formData).then((res) => {
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.$store.dispatch('updateUserInfo', extra);
      });

    },
    getUserStats() {
      userService.userStats().then((res) => {
        const {status, extra} = res;
        if (status) {
          this.userStats = extra
        }
      });
    },
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
    this.getUserStats();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize);
  }
};
</script>

<style scoped>

</style>
