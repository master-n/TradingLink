<template>
  <div>
    <topHeader></topHeader>
    <div class="login-area mt-50 mb-120">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">

            <div class="d-flex align-items-center justify-content-between mb-4">
              <h1 class="fw-bold mb-0">Work Details</h1>

              <div class="ms-auto">
                <a href="#" class="text-decoration-underline me-2">Cancel</a>
                <a href="#" aria-label="Close"><i class="fa fa-times"></i></a>
              </div>
            </div>

            <div class="progress">
              <div class="progress-bar w-25 bg-primary-1" role="progressbar"></div>
            </div>

            <div class="d-flex align-items-center justify-content-between mt-3">
              <h6 class=" mb-0">Step 1/5</h6>
              <div class="ms-auto cursor-pointer">
                <a @click="showModal = true" class="me-2" aria-label="Close"><i class="fa fa-info-circle"></i></a>
                <a @click="showModal = true" class="text-decoration-underline" >All Steps</a>
              </div>

            </div>
            <div v-if="step===1" class="form-wrapper mt-5">
              <div class="form-title mb-25">
                <h3 class="text-start">Tell us about yourself</h3>
              </div>
              <p class="mb-4 font-weight-lighter"> Welcome, Samuel! Let's get started.</p>
              <p class="mb-4 font-weight-lighter">We want to know our tradespeople better so we can send you the right local leads, matched to your skills.</p>
              <p class="font-weight-lighter">In this step, we'll ask you about the work you undertake, your professional status, and location.</p>
              <div class="row mt-5">
                <div class="col-12">
                  <button class="btn btn-outline-dark me-3 big-button" @click="$router.go(-1)">Back</button>
                  <button class="btn btn-outline-primary-1 big-button" @click="step++">Continue</button>
                </div>
              </div>

            </div>
            <div v-if="step===2" class="form-wrapper mt-5">
              <h3 class="font-weight-bold mb-4">Select up to 5 professions</h3>
              <p class="font-weight-lighter">Tell us what you do so we can send you the most relevant leads.</p>

              <div class="mb-3">
                <label for="searchTrades" class="form-label font-weight-bold">Search trades</label>
                <div class="input-group">
                  <input type="text" class="form-control py-2" id="searchTrades" placeholder="i.e Gardener">
                  <button class="btn btn-outline-secondary" type="button">×</button>
                </div>
              </div>

              <div class="d-flex justify-content-between align-items-center my-4">
                <h6 class="mb-0 font-weight-bold">Selected</h6>
                <div class="selected-count">1</div>
              </div>

              <div class="profession-list">
                <div class="profession-item">
                  <label for="design">Architectural Designer</label>
                  <input id="design" type="checkbox" class="form-check-input">
                </div>
                <div class="profession-item">
                  <label for="technician">Architectural Technician</label>
                  <input id="technician" type="checkbox" class="form-check-input">
                </div>
                <div class="profession-item">
                  <label for="fitter">Bathroom Fitter</label>
                  <input id="fitter" type="checkbox" class="form-check-input">
                </div>
                <div class="profession-item">
                  <label for="bricklayer">Bricklayer</label>
                  <input id="bricklayer" type="checkbox" class="form-check-input">
                </div>
              </div>

              <div class="row my-5">
                <div class="col-12">
                  <button class="btn btn-outline-dark me-3 big-button" @click="step--">Back</button>
                  <button class="btn btn-outline-primary-1 big-button" @click="$router.push('/travel-to-work')">Continue</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
<!--    steps modal-->
    <div v-if="showModal" class="modal fade show" data-backdrop="true">
      <div class="modal-dialog modal-dialog-scrollable" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Complete your registration</h5>
            <button type="button" class="btn-close" @click="showModal = false" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="registration-steps">
              <div class="step completed">
                <span class="step-icon">✓</span>
                <span class="step-text">Work details</span>
              </div>
              <div class="step completed">
                <span class="step-icon">✓</span>
                <span class="step-text">ID Check</span>
              </div>
              <div class="step completed">
                <span class="step-icon">✓</span>
                <span class="step-text">Safety & Quality</span>
              </div>
              <div class="step">
                <span class="step-icon">4</span>
                <span class="step-text">Profile Setup</span>
              </div>
            </div>
          </div>
          <div class="modal-footer mb-5">
            <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Backdrop -->
    <div v-if="showModal" class="modal-backdrop fade show" @click="showModal=false"></div>

  </div>
</template>

<script>
import Auth from "../../layouts/auth";
import appConfig from "../../../../app.config";
import topHeader from '../../base-layout/header-1'

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
      showModal:false,
      step:1,
      email: "",
      password: "",
      submitted: false,
      tryingToLogIn: false,
      obscurePassword: true,
      verificationStage: false,
      success: false,
      error: false,
      errorMessage: ''
    };
  },
  components: {
    Auth,
    topHeader
  },

  watch: {
    verificationStage: function (data) {
      if (!data) {
        this.password = '';
        this.error = false;
        this.errorMessage = '';
      }

    }
  },
  computed: {
    notification() {
      return this.$store ? this.$store.getters.notification : null;
    },
    notificationAutoCloseDuration() {
      return this.$store && this.$store.getters.notification ? 10 : 0;
    },
  },
  created() {
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  },
  methods: {
    tryToLogIn() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      }).then(() => {
        const loggedUser = store.getters.GET_USER_INFO;
        const userRole = loggedUser.roles?.[0] || '';
        if (userRole === 'admin') {
          this.$router.push('/admin');
        } else if (userRole === 'branch') {
          this.$router.push('/branch/home');
        } else if (userRole === 'customer' || userRole === 'vendor_manager') {
          this.$router.push('/');
        } else if (userRole === 'customer_service') {
          this.$router.push('/customer-service');
        } else {
          this.$router.push('/');
        }
      }).catch(() => {
      });
      this.$store.dispatch("clear");
    },
  },
};
</script>

<style scoped>
/* Ensure the modal is displayed */
.modal.show {
  display: block;
}

.modal-dialog {
  position: relative;
  max-width: 500px !important;
}

.registration-steps {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.step {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 5px;
}

.step.completed {
  background-color: #e9f7ef;
  color: #28a745;
}

.step-icon {
  font-weight: bold;
}


.progress-bar {
  height: 100%;
  background-color: var(--primary-color1);
  width: 20%; /* Adjust based on step */
}

.selected-count {
  background-color: var(--primary-color1);
  color: white;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
}

.profession-item {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px 15px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profession-item label{
  font-weight: lighter;
  cursor: pointer;
}
</style>
