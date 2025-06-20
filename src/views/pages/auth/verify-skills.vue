<template>
  <div>
    <topHeader></topHeader>
    <div class="login-area mt-50 mb-120">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">

            <div class="d-flex align-items-center justify-content-between mb-4">
              <h1 class="fw-bold mb-0">Work Details</h1>

              <router-link to="/id-verification" class="ms-auto">
                <a href="#" class="text-decoration-underline me-2">Cancel</a>
                <a href="#" aria-label="Close"><i class="fa fa-times"></i></a>
              </router-link>
            </div>

            <div class="progress">
              <div class="progress-bar w-25 bg-primary-1" role="progressbar"></div>
            </div>

            <div class="d-flex align-items-center justify-content-between mt-3">
              <h6 class=" mb-0">Step 3/5</h6>
              <div class="ms-auto cursor-pointer">
                <a @click="showModal = true" class="me-2" aria-label="Close"><i class="fa fa-info-circle"></i></a>
                <a @click="showModal = true" class="text-decoration-underline" >All Steps</a>
              </div>

            </div>
            <div class="form-wrapper mt-5">
              <div class="form-title mb-25">
                <h3 class="text-start">Verify your skills</h3>
              </div>
              <p class="mb-4 font-weight-lighter">Trade Link supports quality tradespeople.</p>
              <p class="mb-4 font-weight-lighter">In this step, we check the skills of all tradespeople joining so
                customers use Trade Link with confidence.</p>
              <p class="mb-4 font-weight-lighter">Our application process is thorough, and only those who meet our high standards are accepted.</p>
              <div class="button-container mt-5">
                <div class="col-12">
                  <button class="btn btn-outline-primary-1 me-3 big-button" @click="$router.go(-1)">Back</button>
                  <button class="btn primry-btn-2 d-inline-block text-light big-button"
                          @click="showDropzoneModal = true">
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- BootstrapVue Dropzone Modal -->
    <b-modal v-model="showDropzoneModal" title="Upload Your Certificate">
      <vue-dropzone
          id="certificateDropzone"
          ref="certificateDropzone"
          :use-custom-slot="true"
          :options="certificateDropzoneDropzoneOptions"
          @vdropzone-max-files-exceeded="certificateDropzoneMaxFileExceeded"
      >
        <div class="dz-message needsclick">
          <i class="bi bi-upload h1 text-muted"></i>
          <h5>Upload your certificate or proof of skills</h5>
        </div>
      </vue-dropzone>
      <template #modal-footer>
        <b-button class="btn btn-outline-primary-1 text-light" @click="proofOfSkills">Upload later</b-button>
        <b-button class="btn bg-primary-1 text-light" @click="proofOfSkills" :disabled="isLoading">
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

    <b-modal v-model="successModal" hide-footer
             hide-header
             centered
             no-close-on-backdrop
             no-close-on-esc>
      <div class="text-center p-4">
        <i class="fa fa-check-circle text-success mb-3" style="font-size: 5rem;"></i>
        <h3 class="mb-3">Profile Setup Complete!</h3>
        <p>Your profile has been successfully set up. You're ready to go!</p>
        <b-button class="btn btn-primary mt-2" @click="$router.push('/profile')">
          Proceed to Profile
        </b-button>
      </div>
    </b-modal>


  </div>
</template>

<script>
import Auth from "../../layouts/auth";
import appConfig from "../../../../app.config.json";
import topHeader from '../../base-layout/header-1'
import vue2Dropzone from "vue2-dropzone";
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import {userService} from "@/apis/user.service";

/**
 * Verify skills component
 */
export default {
  name: 'Verify Skills',
  page: {
    title: "Verify Skills",
    meta: [{name: "description", content: appConfig.description}],
  },
  data() {
    return {
      showModal: false,
      successModal: false,
      showDropzoneModal: false,
      isLoading: false,
      certificateDropzoneDropzoneOptions: {
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
    certificateDropzoneMaxFileExceeded(file) {
      this.$refs.certificateDropzone.removeFile(file);
      alert('You can only upload one file at a time.');
    },

    async proofOfSkills() {
      this.isLoading = true
      await this.$store.dispatch('showLoader')
      this.certificateDropzone = this.$refs.certificateDropzone.getAcceptedFiles();

      const formData = new FormData();

      if (this.certificateDropzone.length > 0) {
        let certificateDropzone = this.certificateDropzone[0];
        formData.append("skill_verification_file", certificateDropzone);
      }

      userService.proofOfSkills(formData).then((res) => {
        this.$store.dispatch('hideLoader')
        this.isLoading = false
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true})
          return;
        }
        this.$store.dispatch('updateUserInfo', extra)
        this.successModal = true

      });
    },

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

.fa-check-circle {
  animation: pop 0.5s ease;
}

@keyframes pop {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

</style>
