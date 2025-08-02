<template>
  <div>
    <topHeader></topHeader>
    <div class="login-area mt-50 mb-120">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="form-wrapper">
              <div class="form-title mb-25">
                <h3>Admin Login</h3>
                <span></span>
              </div>

              <div v-if="errorMessage" class="alert alert-danger">
                <ul class="mb-0">
                  <li>{{ errorMessage }}</li>
                </ul>
              </div>

              <form @submit.prevent="login">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-inner mb-20">
                      <label for="email">Email</label>
                      <input type="email" id="email" v-model="email" placeholder="" required>

                    </div>
                    <div class="form-inner mb-20">
                      <label class="large-font" for="password">Password</label>
                      <input v-model="password"
                             :type="obscurePassword ? 'password': 'text'"
                             id="password"/>
                      <i class="bi bi-eye-slash" id="togglePassword" @click="obscurePassword = !obscurePassword"
                         v-if="!obscurePassword"></i>
                      <i class="bi bi-eye" id="togglePassword" @click="obscurePassword = !obscurePassword" v-else></i>
                    </div>

                  </div>
                  <div class="col-lg-12 mb-4">
                    <div class="form-inner">
                      <button class="btn bg-primary-1 text-light" type="submit" :disabled="isLoading">
                        <b-spinner small v-if="isLoading"></b-spinner>
                        {{ isLoading ? 'Submitting..' : 'LogIn' }}
                      </button>
                    </div>
                  </div>

                  <div class="text-center mb-4">
                    <router-link to="/forgot-password" class="text-primary-1 text-decoration-underline mb-3"
                                 style="font-size: 14px">Forgot your password?
                    </router-link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appConfig from "../../../../app.config.json";
import topHeader from '../../base-layout/header-2'

import store from "@/store/store";

/**
 * Login component
 */
export default {
  page: {
    title: "Login",
    meta: [{name: "description", content: appConfig.description}],
  },
  data() {
    return {
      email: "",
      password: "",
      obscurePassword: true,
      isLoading: false,
      error: false,
      errorMessage: ''
    };
  },
  components: {
    topHeader
  },

  created() {
  },

  methods: {
    login() {
      this.isLoading = true
      this.errorMessage = ''
      this.$store.dispatch("adminLogin", {
        email: this.email,
        password: this.password,
      }).then(() => {
        const loggedUser = store.getters.GET_USER_INFO;
        const userRole = loggedUser.roles?.[0] || '';
        if (userRole === 'admin') {
          this.$router.push('/admin');
        }else {
          this.$router.push('/');
        }
      }).catch((message) => {
        this.errorMessage = message;
      }).finally(() => {
        this.isLoading = false;
      });
      this.$store.dispatch("clear");
    }
  },
  mounted() {
    $('.sidebar-button').on("click", function () {
      $('.main-menu').addClass('show-menu');
    });

    $('.menu-close-btn').on("click", function () {
      $('.main-menu').removeClass('show-menu');
    });

    $('body').removeClass('bg-wight');


  }
};
</script>

<style scoped>
.bg-wight {
  background: #F8F8F8 !important;
}
</style>
