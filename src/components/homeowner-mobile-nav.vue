<template>
  <nav class="bottom-nav navbar navbar-expand navbar-light bg-light justify-content-around d-md-none"
       v-if="isMobile && loggedIn">
    <router-link class="nav-link" to="/post-a-job">
      <i class="bi bi-house-door-fill d-block"></i>
      <small>Post a job</small>
    </router-link>
    <router-link class="nav-link" to="/homeowner/my-projects">
      <i class="bi bi-briefcase d-block"></i>
      <small>My jobs</small>
    </router-link>
  </nav>
</template>

<script>

export default {
  name: "homeowner-mobile-nav",
  data() {
    return {
      isMobile: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters.GET_USER_INFO;
    }
  },
  methods: {
    checkScreenSize() {
      this.isMobile = window.innerWidth < 768;
    },
  },
  created() {

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