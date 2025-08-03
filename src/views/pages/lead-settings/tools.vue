<template>
  <BaseDashboardLayout>
    <template v-slot:title>
      <h4 class="title mb-5">Tools</h4>
    </template>

    <div class="row">
      <div class="col-md-8">
        <p class="fw-light">Download essential tools to manage your business.</p>
        <ul class="list-group">
          <li
              class="list-group-item d-flex justify-content-between align-items-center"
              v-for="tool in tools"
              :key="tool.name"
          >
            <div class="d-flex align-items-center gap-2">
              <i class="bi bi-file-earmark-text fs-4 text-primary-1"></i>
              <span>{{ tool.name }}</span>
            </div>
            <a
                :href="tool.url"
                class="btn btn-sm btn-outline-primary-1"
                target="_blank"
                download
            >
              Download
            </a>
          </li>
        </ul>
      </div>
    </div>
  </BaseDashboardLayout>
</template>

<script>
import BaseDashboardLayout from '../../base-layout/tradesperson-dashboard';
import appConfig from "../../../../app.config.json";

export default {
  name: "Tools",
  page: {
    title: "Tools",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: {
    BaseDashboardLayout,
  },
  data() {
    return {
      tools: [
        {
          name: 'Client Contract Form (DOCX)',
          url: '/frontend/assets/docs/Tradelink_Modern_Service_Agreement_Logo.docx'
        },
      ],
    };
  },
  mounted() {
    $('#tools').addClass('active');
  },
};
</script>
