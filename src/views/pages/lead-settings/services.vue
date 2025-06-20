<template>
  <BaseDashboardLayout>
    <template v-slot:title>
      <h4 class="title mb-5">Services</h4>
    </template>

    <div class="row">
      <div class="col-md-8">
        <p class="fw-lighter">We'll show you leads based on the services you offer.</p>
        <small class="fw-bold">Main Trade</small>
        <h5 class="my-4 fw-bold">{{user.main_trade}}</h5>
        <hr>
        <p class="fw-lighter">To change or add trades, <a href="#" class="text-decoration-underline text-primary-1">contact us</a>.</p>
      </div>
    </div>

  </BaseDashboardLayout>
</template>

<script>
import BaseDashboardLayout from '../../base-layout/tradesperson-dashboard';
import appConfig from "../../../../app.config.json";
import {userService} from "@/apis/user.service";

export default {
  name: "Services",
  page: {
    title: "Services",
    meta: [{ name: "description", content: appConfig.description }]
  },
  data() {
    return {
      user:{}
    };
  },
  components: {
    BaseDashboardLayout,
  },
  methods: {
    getUserInfo() {
      userService.getUserInfo().then((res) => {
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.user = extra;
      });
    },
  },
  created() {
    this.getUserInfo();
  },
  mounted() {
    $('#services').addClass('active')
  },
};
</script>
