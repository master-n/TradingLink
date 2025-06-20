<template>
  <div>
    <topHeader></topHeader>
    <div class="login-area mt-50 mb-120">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">

            <div class="d-flex align-items-center justify-content-between mb-4">
              <h1 class="fw-bold mb-0">Work Details</h1>

              <router-link to="/verify-identity" class="ms-auto">
                <a href="#" class="text-decoration-underline me-2">Cancel</a>
                <a href="#" aria-label="Close"><i class="fa fa-times"></i></a>
              </router-link>
            </div>

            <div class="progress">
              <div class="progress-bar w-25 bg-primary-1" role="progressbar"></div>
            </div>

            <div class="d-flex align-items-center justify-content-between mt-3">
              <h6 class=" mb-0">Step 2/5</h6>
              <div class="ms-auto cursor-pointer">
                <a @click="showModal = true" class="me-2" aria-label="Close"><i class="fa fa-info-circle"></i></a>
                <a @click="showModal = true" class="text-decoration-underline">All Steps</a>
              </div>

            </div>

            <div class="row" v-if="id_verification_status">
              <div class="col-md-8">
                <div class="my-5">
                  <div class="d-flex align-items-center gap-2 mb-3">
                    <strong>ID Status</strong>
                    <span
                        :class="[
          'badge',
          {
            'bg-secondary': id_verification_status === 'pending',
            'bg-success': id_verification_status === 'verified',
            'bg-danger': id_verification_status === 'rejected',
          }
        ]"
                    >
        {{ id_verification_status }}
      </span>
                  </div>

                  <!-- Verified message and icon -->
                  <div v-if="id_verification_status === 'verified'"
                       class="alert alert-success d-flex align-items-center gap-2">
                    <i class="bi bi-patch-check-fill fs-4"></i>
                    <div>Your identity has been successfully verified.</div>
                  </div>

                  <!-- Pending message -->
                  <div v-else-if="id_verification_status === 'pending'" class="alert alert-secondary">
                    Your ID has been submitted and is currently under review. We’ll notify you once verification is complete.
                  </div>

                  <router-link to="/verify-skills" class="btn btn-primary">Next</router-link>
                </div>

              </div>
            </div>


            <form @submit.prevent="dropzoneModal" v-else>
              <div class="form-wrapper mt-5">
                <h3 class="font-weight-bold mb-4">Which ID do you have?</h3>

                <div class="profession-list">
                  <div class="profession-item">
                    <label for="passport" class="form-check-label">
                      <img src="../../../../public/frontend/assets/images/icon/envlop-5.svg" alt=""
                           style="height: 10px">
                      Passport
                    </label>
                    <input type="radio" id="passport" value="Passport" v-model="identity_type" class="form-check-input">
                  </div>
                  <div class="profession-item">
                    <label for="identitiy-card" class="form-check-label">
                      <img src="../../../../public/frontend/assets/images/icon/user-2.svg" alt="" style="height: 20px">
                      Identity Card
                    </label>
                    <input type="radio" id="identitiy-card" value="Identity Card" v-model="identity_type"
                           class="form-check-input">
                  </div>
                  <div class="profession-item">
                    <label for="drivers-licence" class="form-check-label">
                      <img src="../../../../public/frontend/assets/images/icon/car-driving.svg" alt=""
                           style="height: 20px">
                      Drivers Licence
                    </label>
                    <input type="radio" id="drivers-licence" value="Drivers Licence" v-model="identity_type"
                           class="form-check-input">
                  </div>
                </div>

                <div class="button-container mt-5">
                  <div class="col-12">
                    <button class="btn btn-outline-primary-1 me-3 big-button" @click="skipIdVerification" type="button">
                      Upload later
                    </button>
                    <button class="btn primry-btn-2 d-inline-block text-light big-button" type="submit">
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

    <!-- BootstrapVue Dropzone Modal -->
    <b-modal v-model="showDropzoneModal" title="Upload Your ID">
      <vue-dropzone
          id="identityFile"
          ref="identityFile"
          :use-custom-slot="true"
          :options="identityFileDropzoneOptions"
          @vdropzone-max-files-exceeded="identityFileMaxFileExceeded"
      >
        <div class="dz-message needsclick">
          <i class="bi bi-upload h1 text-muted"></i>
          <h3>Upload {{this.identity_type}} file</h3>
        </div>
      </vue-dropzone>
      <template #modal-footer>
        <b-button variant="secondary" @click="showDropzoneModal = false">Close</b-button>
        <b-button class="btn bg-primary-1 text-light" @click="submitIdVerification" :disabled="isLoading">
          <b-spinner small v-if="isLoading"></b-spinner>
          {{ isLoading ? 'Loading...' : 'Submit' }}
        </b-button>
      </template>
    </b-modal>

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
import vue2Dropzone from "vue2-dropzone";
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import {confirm} from "@/utils/functions";


import {userService} from "@/apis/user.service";

/**
 * Id Verification component
 */
export default {
  page: {
    title: "Id Verification",
    meta: [{name: "description", content: appConfig.description}],
  },
  data() {
    return {
      showModal: false,
      isLoading: false,
      identity_type: 'Passport',
      showDropzoneModal: false,
      id_verification_status: '',
      identityFile: [],
      identityFileDropzoneOptions: {
        url: '#',
        maxFilesize: 20.0,
        addRemoveLinks: true,
        autoProcessQueue: false,
        maxFiles: 1
      }
    };
  },
  components: {
    Auth,
    topHeader,
    vueDropzone: vue2Dropzone,
  },
  methods: {
    dropzoneModal(event) {
      event.preventDefault(); // Prevent form submission
      this.showDropzoneModal = true;
    },
    identityFileMaxFileExceeded(file) {
      this.$refs.identityFile.removeFile(file);
      alert('You can only upload one file at a time.');
    },

    skipIdVerification() {
      confirm("Would you like to upload your identity verification later? This helps keep TradeLink secure", () => {
        this.$router.push('/profile')
      })
    },

    async submitIdVerification() {
      this.isLoading = true
      this.identityFile = this.$refs.identityFile.getAcceptedFiles();

      if (this.identityFile.length === 0) {
        this.$store.dispatch('error', {
          message: `Please upload the ${this.identity_type}'s image`,
          showSwal: true
        })
        return;
      }

      let identityFile = this.identityFile[0];

      const formData = new FormData();
      formData.append("identity_file", identityFile);
      formData.append("identity_type", this.identity_type);

      userService.idVerification(formData).then((res) => {
        this.isLoading = false
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true})
          return;
        }
        this.$store.dispatch('updateUserInfo', extra)
        this.$router.push('/verify-skills')
      });
    },
    getIdStatus() {
      userService.getIdStatus().then((res) => {
        const {status, message, extra} = res;
        if (!status) {
          this.generalError = message
          return;
        }
        this.id_verification_status = extra.identity_verified

      });
    },


  },
  created() {
    this.getIdStatus()
  },
  mounted() {
  },
};
</script>

<style scoped>
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

.profession-list {
  height: auto !important;
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
