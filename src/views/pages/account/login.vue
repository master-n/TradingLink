<template>
  <div>
    <topHeader></topHeader>
    <div class="login-area mt-50 mb-120">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="form-wrapper">
              <div class="form-title mb-25">
                <h3>Log to TradeLink</h3>
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
                      <label for="email">Email*</label>
                      <div class="input-area">
                        <img src="../../../../public/frontend/assets/images/icon/email-2.svg" alt="">
                        <input type="email" id="email" v-model="email" placeholder="Email" required>
                      </div>
                    </div>
                    <div class="form-inner mb-20">
                      <label class="large-font" for="email">Password</label>
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
                  <hr/>
                  <h6 class="mb-3 mt-2">New to TradeLink?</h6>
                  <p style="font-size: 14px" class="mb-1"><a class="text-decoration-underline" href="/post-a-job">Post
                    your job</a> to find a
                    tradesperson</p>
                  <p style="font-size: 14px" class=""><a class="text-decoration-underline" href="/post-a-job">Sign
                    up</a> to join a tradesperson</p>
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
import Auth from "../../layouts/auth";
import appConfig from "../../../../app.config";
import topHeader from '../../base-layout/header-2'

import {required, email} from "vuelidate/lib/validators";
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
    Auth,
    topHeader
  },

  created() {
  },

  methods: {
    login() {
      this.isLoading = true
      this.errorMessage = ''
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      }).then(() => {
        this.$router.push('/profile');
      }).catch((message) => {
        this.errorMessage = message;
      }).finally(() => {
        this.isLoading = false;
      });
      this.$store.dispatch("clear");
    }
  },
};
</script>
