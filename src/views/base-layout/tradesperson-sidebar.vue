<template>
  <div class="single-widget mb-60">
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
    <a href="#" class="d-flex justify-content-between align-items-center mb-4 mt-5">
      <div>
        <i class="bi bi-person-lines-fill mr-2"></i> Complete registration
      </div>
      <span class="badge bg-secondary rounded-pill">8 steps left</span>
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
        <span class="badge action-required rounded-pill">Action required</span>
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
      <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
        <div>
          <i class="bi bi-briefcase mr-2"></i> Work area
        </div>
        <i class="bi bi-chevron-right d-lg-none"></i>
      </a>
      <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
        <div>
          <i class="bi bi-tools mr-2"></i> Services
        </div>
        <i class="bi bi-chevron-right d-lg-none"></i>
      </a>
      <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
        <div>
          <i class="bi bi-bell mr-2"></i> Notifications
        </div>
        <i class="bi bi-chevron-right d-lg-none"></i>
      </a>
    </div>

    <div class="list-group mt-4">
      <h6 class="font-weight-bold">Payments</h6>
      <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
        <div>
          <i class="bi bi-currency-exchange mr-2"></i> Balance
        </div>
        <i class="bi bi-chevron-right d-lg-none"></i>
      </a>
      <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
        <div>
          <i class="bi bi-file-earmark-text mr-2"></i> Payments
        </div>
        <i class="bi bi-chevron-right d-lg-none"></i>
      </a>
    </div>

    <div class="list-group mt-4">
      <h6 class="font-weight-bold">Support</h6>
      <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
        <div>
          <i class="bi bi-info-circle mr-2"></i> Support centre
        </div>
        <i class="bi bi-chevron-right d-lg-none"></i>
      </a>
    </div>

    <div>
      <router-link to="/logout" class="text-danger d-flex justify-content-between align-items-center"
                   @click.native.prevent="toggleSidebar">
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
  name: "TradespersonSidebar",
  data() {
    return {
      user: this.$store.getters.GET_USER_INFO || {},
    };
  },
  methods: {
    toggleSidebar() {
      this.$emit('link-clicked');
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
