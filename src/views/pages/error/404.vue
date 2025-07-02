<script>
import Auth from "../../layouts/auth";
import appConfig from "../../../../app.config";
import topHeader from '../../base-layout/header-2';
import homeOwnerHeader from '../../base-layout/navigation/homeowner-menu'
import store from "@/store/store";
/**
 * Error-404 component
 */
export default {
  page: {
    title: "Error-404",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
    return {};
  },
  computed: {
    isHomeOwner() {
      const loggedUser = store.getters.GET_USER_INFO;
      if(!loggedUser){
        return false
      }
      const userRole = loggedUser.roles?.[0] || '';
      return userRole === 'homeowner';
    }
  },
  components: {
    Auth,
    topHeader,
    homeOwnerHeader
  },
};
</script>

<template>
  <div>
    <homeOwnerHeader v-if="isHomeOwner"/>

    <topHeader v-else/>
    <div class="error-page">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="error-wrapper">
              <div class="error-img">
                <img class="img-fluid" src="../../../../public/frontend/assets/images/bg/404.svg" alt="">
              </div>
              <div class="error-content-area text-center">
                <h2>Opps... Page Not Found</h2>
                <p>Something went wrong, web page that is displayed to the user when the server cannot find the requested page.</p>
                <div class="error-btn">
                  <router-link class="primry-btn-2 lg-btn" to="/">Back Homepage</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>
