<template>
  <div>
    <topHeader></topHeader>
    <div class="login-area mt-50 mb-120">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">

            <div class="d-flex align-items-center justify-content-between mb-4">
              <h1 class="fw-bold mb-0">Work Details</h1>

<!--              <router-link to="/create-account" class="ms-auto">-->
<!--                <a href="#" class="text-decoration-underline me-2">Cancel</a>-->
<!--                <a href="#" aria-label="Close"><i class="fa fa-times"></i></a>-->
<!--              </router-link>-->
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
            <div class="form-wrapper mt-5">
              <div class="form-title mb-25">
                <h3 class="text-start">Tell us about yourself</h3>
              </div>
              <p class="mb-4 font-weight-lighter"> Welcome, <span class="text-capitalize">{{ name }}</span>! Let's get started.</p>
              <p class="mb-4 font-weight-lighter">We want to know our tradespeople better so we can send you the right local leads, matched to your skills.</p>
              <p class="font-weight-lighter">In this step, we'll ask you about the work you undertake, your professional status, and location.</p>
              <div class="button-container">
                  <div class="col-12">
                    <button class="btn btn-outline-primary-1 me-3 big-button" @click="$router.go(-1)">Back</button>
                    <button class="btn primry-btn-2 d-inline-block text-light big-button" @click="$router.push('/professions')">
                      Continue
                    </button>
                  </div>
              </div>

            </div>
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

/**
 * About You component
 */
export default {
  page: {
    title: "About You",
    meta: [{name: "description", content: appConfig.description}],
  },
  data() {
    return {
      showModal:false,
      name: '',
      step:1,
      submitted: false,
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
