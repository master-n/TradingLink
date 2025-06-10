<template>
  <div>
    <topHeader></topHeader>
    <div class="login-area mt-50 mb-120">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="form-wrapper">
              <div class="form-title mb-25">
                <h3>Create your account</h3>
                <span></span>
              </div>
              <form @submit.prevent="createAccount">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-inner mb-20">
                      <label class="large-font" for="name">Name *</label>
                      <input type="text" id="name" v-model="name">
                    </div>

                    <div class="form-inner mb-20">
                      <label class="large-font" for="phone">Phone number *</label>
                      <input type="text" v-model="phone" id="phone" placeholder=""/>
                    </div>

                    <div class="form-inner mb-20">
                      <label class="large-font" for="email">Password (6 characters minimum) *</label>
                      <input v-model="password"
                             :type="obscurePassword ? 'password': 'text'"
                             id="password"/>
                      <i class="bi bi-eye-slash" id="togglePassword" @click="obscurePassword = !obscurePassword"
                         v-if="!obscurePassword"></i>
                      <i class="bi bi-eye" id="togglePassword" @click="obscurePassword = !obscurePassword" v-else></i>
                    </div>

                    <div class="form-group form-check mb-20">
                      <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="marketing_consent">
                      <label class="form-check-label" for="exampleCheck1">I would like to receive marketing communications about MyBuilder services and offers by email, SMS and/or phone and understand that I can unsubscribe at any time.</label>
                    </div>

                  </div>
                  <div class="col-lg-6 mb-4">
                    <div class="button-container">
                      <div class="col-12">
                        <button class="btn primry-btn-2 text-light big-button" type="submit">
                          Continue
                        </button>
                      </div>
                    </div>
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
import Auth from "../../layouts/auth";
import appConfig from "../../../../app.config";
import topHeader from '../../base-layout/header-1'

/**
 * Create Account component
 */
export default {
  page: {
    title: "Create Account",
    meta: [{name: "description", content: appConfig.description}],
  },
  data() {
    return {
      password: "",
      marketing_consent: false,
      name: '',
      phone: '',
      obscurePassword: true,
      success: false,
      error: false,
      errorMessage: ''
    };
  },
  components: {
    Auth,
    topHeader
  },

  created() {
    const user = this.$store.getters.GET_USER_INFO;
    this.name = user.name || '';
    this.phone = user.phone || '';
  },

  methods: {
    async createAccount() {
      const user = this.$store.getters.GET_USER_INFO
      if (!user.email) {
        alert('Please login to create an account');
        this.$router.push('/login');
        return;
      }
      this.emailError = false;
      this.generalError = '';
      this.isLoading = true;
      this.$store.dispatch("createAccount", {
        name: this.name,
        email: user.email,
        phone: this.phone,
        password: this.password,
        marketing_consent: this.marketing_consent
      }).then((response) => {
        const {status, message} = response;
        this.isLoading = false;
        if (!status) {
          this.generalError = message;
          return;
        }
        this.$router.push('/about-you')
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      $('.sidebar-button').on("click", function(){
        $('.main-menu').addClass('show-menu');
      });

      $('.menu-close-btn').on("click", function(){
        $('.main-menu').removeClass('show-menu');
      });

    });
  }
};
</script>
