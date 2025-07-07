<template>
  <BaseDashboardLayout>
    <template v-slot:title>
      <h4 class="title mb-5 font-weight-bold">Inbox</h4>
    </template>

    <div class="row mt-5">
      <div class="col-lg-12" v-if="isLoading">
        <div class="job-listing-card mb-30" v-for="(item,i) in 4" :key="i">
          <div class="job-list-content">
            <div class="company-area">
              <div class="company-details">
                <div class="lines shine"></div>
                <div class="lines shine"></div>
                <div class="lines shine"></div>
                <div class="lines shine"></div>
                <div class="lines shine"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-12 mb-30" v-for="(invite, i) in services" :key="i">
        <div class="job-listing-card">
          <div class="job-list-content">
            <div class="company-area">
              <div class="company-details">
                <div class="name-location">
                  <h5 class="text-capitalize mb-2"><router-link :to="`/job-lead-details/${invite.service.city_name}/${invite.service.id}`">{{ invite.service.headline }}</router-link></h5>
                  <small class="fw-light">{{invite.service.trade.name}} ~ #{{invite.service.id}}</small>
                  <p class="fw-light mt-3"><i class="bi bi-pin-map"></i> {{ invite.service.city_name }} ({{invite.service.distance}} miles), <small
                      class="fw-light">{{invite.service.created_at | toHumanDate()}}</small></p>
                    <div class="alert alert-primary mt-4" v-if="invite.status ==='pending'">
                      <i class="bi bi-envelope"></i> You have sent an invite to this job. Waiting for the homeowner to respond.
                    </div>

                    <div v-else-if="invite.status === 'accepted'">
                      <router-link class="btn btn-primary" :to="`/chat?job=${invite.service.headline}&id=${invite.id}`"><i class="bi bi-chat-dots"></i> Send a message to the homeowner to discuss the job.</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h4 v-if="!services.length && !isLoading">
        <router-link to="/new-leads">send an invite to a job lead to start chatting</router-link>
      </h4>
    </div>

  </BaseDashboardLayout>
</template>

<script>
import BaseDashboardLayout from '../base-layout/tradesperson-dashboard';
import appConfig from "../../../app.config.json";
import {userService} from "@/apis/user.service";

export default {
  name: "InboxPage",
  page: {
    title: "Inbox",
    meta: [{name: "description", content: appConfig.description}]
  },
  data() {
    return {
      isLoading: false,
      services: [],
      newMessage: '',
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
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.$store.dispatch('success', {message, showSwal: true});
      });
    },
    getServiceInvites() {
      this.isLoading = true;
      userService.getServiceInvites().then((res) => {
        this.isLoading = false;
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.services = extra;
      });
    },
  },
  created() {
    this.getServiceInvites();
  },
  mounted() {
    $('#inbox').addClass('active')
  },
};
</script>

<style scoped>
.card-body {
  background: #f8f9fa;
}
</style>
