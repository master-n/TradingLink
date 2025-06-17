<template>
  <BaseDashboardLayout>
    <template v-slot:title>
      <h4 class="title mb-5">Support</h4>
    </template>

    <div class="row">
      <div class="col-md-8">
      </div>
    </div>

  </BaseDashboardLayout>
</template>

<script>
import BaseDashboardLayout from '../../base-layout/tradesperson-dashboard';
import appConfig from "../../../../app.config.json";

export default {
  name: "Support",
  page: {
    title: "Support",
    meta: [{name: "description", content: appConfig.description}]
  },
  data() {
    return {};
  },
  components: {
    BaseDashboardLayout,
  },
  mounted() {
    $('#support').addClass('active')
  },
};
</script>
