<template>
  <div>
    <RoleBasedHeader :userRole="userRole" />

    <section class="container my-5 py-4">
      <div class="row align-items-center">
        <div class="col-md-6 mb-4 mb-md-0">
          <img
              src="../../../../public/frontend/assets/images/header1-logo.svg"
              alt="About Tradelink"
              id="about"
              class="img-fluid rounded shadow"
          />
        </div>
        <div class="col-md-6">
          <h2 class="mb-4 d-flex align-items-center">
            <i class="bi bi-house-check text-primary me-2"></i>
            About Tradelink
          </h2>
          <p class="lead fw-lighter">
            Tradelink was founded with a clear purpose: to raise the standard of workmanship across Jamaica and bring
            greater trust to the trades industry.
          </p>
          <p>
            We believe homeowners deserve more than just a quick fix—they deserve skilled professionals, transparent
            pricing, and peace of mind from start to finish.
          </p>
          <p>
            Our platform is built to make the entire process simple and reliable. Whether you're looking for a plumber,
            electrician, builder, or any other skilled tradesperson, Tradelink connects you with certified professionals
            committed to quality.
          </p>
          <p>
            We verify that every tradesperson meets the required standards within their trade. No shortcuts, no
            surprises—just honest, high-quality work.
          </p>
          <p>
            At Tradelink, we’re not just helping people find the right tradesman—we’re building a better system for
            everyone involved.
          </p>
        </div>
      </div>
    </section>

    <HomeFooter/>
  </div>
</template>

<script>
import HomeFooter from '../../base-layout/footer'
import store from '@/store/store'
import appConfig from "../../../../app.config.json";
import RoleBasedHeader from "@/views/base-layout/roleBasedHeader";

export default {
  name: "AboutTradelink",
  page: {
    title: "Services",
    meta: [{ name: "description", content: appConfig.pageDescriptions.about }]
  },
  computed: {
    userRole() {
      const loggedUser = store.getters.GET_USER_INFO;
      if(!loggedUser){
        return '';
      }
      return loggedUser?.roles?.[0] || '';
    },

  },
  components: {
    HomeFooter,
    RoleBasedHeader
  },
  mounted() {
    $('.sidebar-button').on("click", function () {
      $('.main-menu').addClass('show-menu');
    });

    $('.menu-close-btn').on("click", function () {
      $('.main-menu').removeClass('show-menu');
    });
  }

}
</script>

<style scoped>
#about {
  width: 500px;
}

h2 {
  font-weight: 600;
}

p {
  font-size: 1rem;
  line-height: 1.6;
}
</style>
