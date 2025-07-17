<template>
  <BaseDashboardLayout>
    <template v-slot:title>
      <h4 class="title mb-5 font-weight-bold">Profile Views</h4>
    </template>
    <div class="row mt-4 mb-5">
      <div class="col-md-8">
        <div v-if="guaranteeLoader">
          <div v-for="i in 2" :key="i">
            <div class="card mb-3">
              <div class="card-body">
                <div class="lines shine"></div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="text-capitalize">Howdens Joinery</h5>
              <p class="fw-light"><i class="bi bi-pin-map"></i> Cheltenham</p>
              <div class="d-flex justify-content-between align-items-center">
                <button class="btn btn-primary">View leads</button>
                <div class="fw-light"><small>Viewed on 12th Jan 2024</small></div>
              </div>
            </div>
          </div>
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="text-capitalize">Capital Holdings</h5>
              <p class="fw-light"><i class="bi bi-pin-map"></i> Cheltenham</p>
              <div class="d-flex justify-content-between align-items-center">
                <button class="btn btn-primary">View leads</button>
                <div class="fw-light"><small>Viewed on 12th Jan 2024</small></div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseDashboardLayout>
</template>

<script>
import BaseDashboardLayout from '../base-layout/tradesperson-dashboard';
import appConfig from "../../../app.config.json";
import {userService} from "@/apis/user.service";

export default {
  page: {
    title: "Company Description",
    meta: [{name: "description", content: appConfig.description}]
  },
  data() {
    return {
      guarantee: '',
      isLoading: false,
      guaranteeLoader: false,
    };
  },
  components: {
    BaseDashboardLayout
  },
  methods: {
    async save() {
      this.isLoading = true;
      userService.updateGuarantee({
        guarantee: this.guarantee,
      }).then((res) => {
        this.isLoading = false;
        const {status, message} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.$store.dispatch('success', {message, showSwal: true});
      });
    },
    getProfileViews() {
      this.guaranteeLoader = true;
      userService.getGuarantee().then((res) => {
        this.guaranteeLoader = false;
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.guarantee = extra.guarantee;
      });
    }
  },
  created() {
  },
  mounted() {
    $('#company-description').addClass('active')
  },
};
</script>

<style scoped>

</style>
