<template>
  <div>
    <topHeader></topHeader>
    <div class="login-area mt-50 mb-120">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div v-if="generalError" class="alert alert-danger">
              <ul>
                <li>{{ generalError }}</li>
              </ul>
            </div>

            <div class="d-flex align-items-center justify-content-between mb-4">
              <h1 class="fw-bold mb-0">Work Details</h1>

              <router-link to="/business-type" class="ms-auto">
                <a href="#" class="text-decoration-underline me-2">Cancel</a>
                <a href="#" aria-label="Close"><i class="fa fa-times"></i></a>
              </router-link>
            </div>

            <div class="progress">
              <div class="progress-bar w-25 bg-primary-1" role="progressbar"></div>
            </div>

            <div class="d-flex align-items-center justify-content-between mt-3">
              <h6 class=" mb-0">Step 1/5</h6>
              <div class="ms-auto cursor-pointer">
                <a @click="showModal = true" class="me-2" aria-label="Close"><i class="fa fa-info-circle"></i></a>
                <a @click="showModal = true" class="text-decoration-underline">All Steps</a>
              </div>

            </div>
            <form @submit.prevent="submitBusinessDetails">
              <div class="form-wrapper mt-5">
                <h3 class="font-weight-bold mb-5">Enter your business details?</h3>

                <div class="form-inner mb-20">
                  <label class="large-font mb-2 font-weight-bold" for="name">Trading name <span
                      class="text-danger">*</span></label>
                  <input type="text" class="form-control form-input" id="name" v-model="business_name"
                         placeholder="Enter your trading name" required>
                </div>

                <div class="form-inner mb-20">
                  <label class="large-font mb-2 font-weight-bold" for="work-address">Work address <span
                      class="text-danger">*</span></label>
                  <input type="text" class="form-control form-input" id="work-address" v-model="work_address"
                         placeholder="Enter your company address" required>
                </div>

                <div class="button-container mt-5">
                  <div class="col-12">
                    <button class="btn btn-outline-primary-1 me-3 big-button" @click="$router.go(-1)">Back</button>
                    <button class="btn primry-btn-2 d-inline-block text-light big-button" type="submit"
                            :disabled="isLoading">
                      <b-spinner small v-if="isLoading"></b-spinner>
                      {{ isLoading ? 'Saving' : 'Continue' }}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Steps Modal -->
    <b-modal v-model="showModal" title="Complete your registration">
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
      <template #modal-footer>
        <b-button variant="secondary" @click="showModal = false">Close</b-button>
        <b-button class="btn bg-primary-1 text-light ">Save changes</b-button>
      </template>
    </b-modal>

  </div>
</template>

<script>
import Auth from "../../layouts/auth";
import appConfig from "../../../../app.config.json";
import topHeader from '../../base-layout/header-1'

import {required, email} from "vuelidate/lib/validators";
import store from "@/store/store";
import {userService} from "@/apis/user.service";

/**
 * Login component
 */
export default {
  page: {
    title: "Business Details",
    meta: [{name: "description", content: appConfig.description}],
  },
  data() {
    return {
      showModal: false,
      isLoading: false,
      business_name: '',
      work_address: '',
      generalError: '',
    };
  },
  components: {
    Auth,
    topHeader
  },

  created() {
    this.getBusinessDetails();
  },
  methods: {
    submitBusinessDetails() {
      this.isLoading = true
      userService.businessDetails({
        business_name: this.business_name,
        work_address: this.work_address,
      }).then((res) => {
        this.isLoading = false
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true})
          return;
        }
        this.$store.dispatch('updateUserInfo', extra)
        this.$router.push('/verify-identity')
      });
    },
    getBusinessDetails() {
      userService.getBusinessDetails().then((res) => {
        const {status, message, extra} = res;
        if (!status) {
          this.generalError = message
          return;
        }
        this.business_name = extra.business_name
        this.work_address = extra.work_address
      });
    },


  },
  mounted() {
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
