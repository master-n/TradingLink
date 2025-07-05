<template>
  <BaseDashboardLayout>
    <template v-slot:title>
      <h4 class="title mb-5">Notifications</h4>
    </template>

    <div class="row" style="margin-bottom: 7rem">
      <div class="col-md-8">
        <h5 class="fw-bold">Lead and job updates</h5>

        <!-- New Leads -->
        <div class="d-flex justify-content-between align-items-center border-bottom py-3">
          <div>
            <div class="fw-bold mb-3">Responses from tradespeople</div>
            <div class="fw-lighter small">When a tradesperson sends you a message..</div>
            <div class="mt-2">Email</div>
          </div>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" v-model="notifications.newLeads">
          </div>
        </div>

        <!-- Daily Lead Summary -->
        <div class="d-flex justify-content-between align-items-center border-bottom py-3">
          <div>
            <div class="fw-bold mb-3">Job Reviews</div>
            <div class="fw-lighter small">Reminders to review the tradesperson on our platform.</div>
            <div class="mt-2">Email</div>
          </div>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" v-model="notifications.dailySummary">
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
import BaseDashboardLayout from '../../base-layout/homeowner-dashboard-2';
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
