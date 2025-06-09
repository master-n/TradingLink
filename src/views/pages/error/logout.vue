<script>
import appConfig from "../../../../app.config";

/**
 * Logout component
 */
export default {
  page: {
    title: "Logout",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
    return {};
  },
  components: {
  },
  created() {
    this.$store.dispatch("logout");
  }
};
</script>

<template>
</template>
