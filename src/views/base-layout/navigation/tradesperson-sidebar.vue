<template>
  <div class="single-widget mb-60" style="overflow-y: auto;">
    <!-- Profile Section -->
    <div class="mb-4">
      <div class="d-flex align-items-center mb-4">
        <div class="profile-image cursor-pointer" @click="triggerImageUpload">
          <img v-if="user.photo" :src="user.photo" alt="Profile" class="" style="width: 50px; height: 50px; object-fit: cover; border-radius: 10px;" />
          <i v-else class="bi bi-person-fill"></i>
          <div class="edit-icon">
            <i class="bi bi-pencil-fill"></i>
          </div>
        </div>
        <div class="flex-grow-1 cursor-pointer" @click="$router.push(`/user-profile/${user.id}`)">
          <h4 class="profile-name">{{ user.name }}</h4>
          <h5 class="card-title my-1 small">{{ user.city_name }} ~ {{ user.parish_name }}</h5>
        </div>
      </div>
      <input type="file" ref="profileImageInput" class="d-none" @change="handleImageUpload" accept="image/*"/>

    </div>

    <div class="card mb-4">
      <router-link to="/who-viewed-my-profile">
        <div class="card-body py-1 d-flex justify-content-between align-items-center cursor-pointer">
          <div class="d-flex align-items-center">
            <i class="bi bi-person-circle me-2" style="font-size: 1.5rem;"></i>
            <small class="mr-3">Profile Views</small>
          </div>
          <div class="text-primary-1 fw-bold">46</div>
        </div>
      </router-link>
    </div>


    <!-- Complete Registration -->
    <a @click="completeRegistration" v-if="!isRegistrationComplete"
       class="d-flex justify-content-between align-items-center mb-4 cursor-pointer">
      <div>
        <i class="bi bi-person-lines-fill mr-2"></i> Complete registration
      </div>
      <span class="badge bg-secondary rounded-pill">{{ registrationSteps }} steps left</span>
      <i class="bi bi-chevron-right d-lg-none"></i>
    </a>

    <!-- List Groups -->
    <div class="list-group mb-4">
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
      <router-link to="/inbox" id="inbox"
                   class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
        <div>
          <i class="bi bi-envelope mr-2"></i> Inbox
        </div>
        <span class="badge bg-danger text-white rounded-pill">{{ inboxCount }}</span>
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
      <router-link to="/manage-account" id="manage-account"
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
import {userService} from "@/apis/user.service";

export default {
  name: "Tradesperson-sidebar",
  data() {
    return {
      user: this.$store.getters.GET_USER_INFO || {},
      inboxCount: this.$store.getters.GET_INBOX_COUNT || 0,
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

    }
  },
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
