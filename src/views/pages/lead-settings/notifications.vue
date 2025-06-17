<template>
  <BaseDashboardLayout>
    <template v-slot:title>
      <h4 class="title mb-5">Notifications</h4>
    </template>

    <div class="row">
      <div class="col-md-8">
        <h5 class="fw-bold">Lead and job updates</h5>

        <!-- New Leads -->
        <div class="d-flex justify-content-between align-items-center border-bottom py-3">
          <div>
            <div class="fw-bold mb-3">New leads</div>
            <div class="fw-lighter small">Relevant leads as soon as they are posted.</div>
            <div class="mt-2">Email</div>
          </div>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" v-model="notifications.newLeads">
          </div>
        </div>

        <!-- Daily Lead Summary -->
        <div class="d-flex justify-content-between align-items-center border-bottom py-3">
          <div>
            <div class="fw-bold mb-3">Daily lead summary</div>
            <div class="fw-lighter small">Summary of relevant leads in the last 24 hours.</div>
            <div class="mt-2">Email</div>
          </div>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" v-model="notifications.dailySummary">
          </div>
        </div>

        <!-- Invites from customers -->
        <div class="border-bottom py-3">
          <div class="fw-bold mb-3 mb-1">Invites from customers</div>
          <div class="fw-lighter small mb-2">A customer invites you to talk about a lead.</div>

          <div class="d-flex justify-content-between align-items-center mb-2">
            <div>Email</div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" v-model="notifications.inviteEmail">
            </div>
          </div>

        </div>

        <!-- Messages and job status -->
        <div class="py-3">
          <div class="fw-bold mb-3 mb-1">Messages and job status</div>
          <div class="fw-lighter small mb-2">New messages, new contacts, being hired, job completion and reviews.</div>

          <div class="d-flex justify-content-between align-items-center">
            <div>Email</div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" v-model="notifications.messages">
            </div>
          </div>
        </div>

        <!-- Marketing -->
        <div class="py-3">
          <div class="fw-bold mb-3 mb-1">Marketing communications</div>
          <div class="fw-lighter small mb-2">Receive marketing communications.</div>

          <div class="d-flex justify-content-between align-items-center">
            <div>Email</div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" v-model="notifications.marketing">
            </div>
          </div>
        </div>

      </div>
    </div>
  </BaseDashboardLayout>
</template>

<script>
import BaseDashboardLayout from '../../base-layout/tradesperson-dashboard';
import appConfig from "../../../../app.config.json";

export default {
  name: "Notifications",
  page: {
    title: "Notifications",
    meta: [{ name: "description", content: appConfig.description }]
  },
  data() {
    return {
      notifications: {
        newLeads: true,
        dailySummary: true,
        inviteEmail: false,
        inviteSms: true,
        messages: false,
        marketing: true
      }
    };
  },
  components: {
    BaseDashboardLayout,
  },
  mounted() {
    $('#notifications').addClass('active')
  },
};
</script>
