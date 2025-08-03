<template>
  <div>
    <RoleBasedHeader :userRole="userRole" />

    <div class="py-5">

      <div class="container">
        <h1>This page isn't available</h1>
        <p>You can't view this page whilst logged in with this account.</p>
        <p>
          To post a job, please <router-link to="/logout" class="text-decoration-underline">log out</router-link>
          and sign in with a client account.
        </p>

      </div>
    </div>


    <div class="py-5 iJZMjH">
      <div class="container">
        <router-link to="/post-a-job" class="hOqzfX kFPtkB">
          <h2 class="text-light fw-bold">Post your job now</h2>
          <svg aria-hidden="true" focusable="false" data-prefix="fass" data-icon="circle-arrow-right"
               class="svg-inline--fa fa-circle-arrow-right " role="img" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 512 512" fill="currentColor" color="#FFFFFF" style="width: 1.5rem; height: 1.5rem;">
            <path fill="currentColor"
                  d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zm409 17L297 385l-17 17L246.1 368l17-17 71-71L120 280l-24 0 0-48 24 0 214.1 0-71-71-17-17L280 110.1l17 17L409 239l17 17-17 17z"></path>
          </svg>
        </router-link>
      </div>
    </div>

    <HomeFooter></HomeFooter>

  </div>

</template>

<script>
import HomeFooter from '../../base-layout/footer'
import appConfig from "../../../../app.config.json";
import store from "@/store/store";
import RoleBasedHeader from "@/views/base-layout/roleBasedHeader";

export default {
  name: "Unauthorized",
  page: {
    title: "Unauthorized | " + appConfig.name,
    meta: [{name: "description", content: appConfig.description}]
  },
  data() {
    return {
      trades: [],
      tradesLoader: false
    };
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
  methods: {
  },
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      $('.sidebar-button').on("click", function () {
        $('.main-menu').addClass('show-menu');
      });

      $('.menu-close-btn').on("click", function () {
        $('.main-menu').removeClass('show-menu');
      });
// mobile-search-area

      $('.search-btn').on("click", function () {
        $('.mobile-search').addClass('slide');
      });


      $('.search-cross-btn').on("click", function () {
        $('.mobile-search').removeClass('slide');
      });
    });
  }
}
</script>

<style scoped>
.kFPtkB {
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.iJZMjH {
  background-color: var(--primary-color1);
  color: rgb(255, 255, 255);
}
</style>