<template>
  <BaseDashboardLayout>
    <template v-slot:title>
      <h4 class="title mb-5 font-weight-bold">Company Description</h4>
    </template>
    <div class="row mb-4">
      <div class="col-md-8">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="font-weight-bold">About your company</h5>
          <button class="btn btn-outline-primary-1" @click="showModal=true;">
            <i class="bi bi-pencil-square"></i> Edit
          </button>
        </div>
        <p class="text-muted small">{{ user.description }}</p>
      </div>
    </div>

    <h5 class="fw-bolder">Guarantee</h5>
    <hr/>

    <p class="font-weight-lighter mb-2">Increase your chances of getting hired by offering a guarantee.</p>
    <small class="font-weight-lighter">
      <i class="bi bi-info-circle"></i> Homeowners are aware guarantees vary and should discuss the terms in advance.
    </small>
    <div class="row mt-4 mb-5">
      <div class="col-md-8">
        <div v-if="guaranteeLoader">
          <div v-for="i in 2" :key="i">
            <div class="card mb-3">
              <div class="card-body">
                <div class="lines shine"></div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="d-flex justify-content-between align-items-center mb-3" v-if="!showGuaranteeForm">
            <div>
              <i class="bi bi-shield-check me-2"></i>
              {{ guaranteeStatus ? 'You offer warranty' : 'You do not offer warranty' }}
            </div>
            <button class="btn btn-outline-primary-1" @click="showGuaranteeForm=true;">
              <i class="bi bi-pencil-square"></i> Edit
            </button>
          </div>
          <div v-else>
            <h6>Edit Guarantee</h6>
            <div class="card mb-3">
              <div class="card-body d-flex align-items-center justify-content-start">
                <label for="yes" class="form-check-label cursor-pointer">
                  <input type="radio" id="yes" v-model="guarantee" :value="true" class="form-check-input"
                         name="guarantee"> Yes, I offer a
                  guarantee
                </label>
              </div>
            </div>
            <div class="card mb-3">
              <div class="card-body d-flex align-items-center justify-content-start">
                <label for="no" class="form-check-label cursor-pointer">
                  <input type="radio" id="no" v-model="guarantee" :value="false" class="form-check-input"
                         name="guarantee"> No, I do not offer a
                  guarantee
                </label>
              </div>
            </div>
            <div class="button mt-4">
              <button class="btn btn-danger me-3" @click="resetGuarantee">Close
              </button>
              <button class="btn btn-primary" @click="save"
                      :disabled="isLoading">Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h5 class="fw-bolder">Qualifications</h5>
    <hr/>

    <!-- Upload Qualifications -->
    <div class="row mt-4 mb-5">
      <div class="col-md-8">
        <h6 class="fw-bold mb-2">Upload your qualifications</h6>
        <p class="small">
          Upload and get your qualifications approved to <strong>earn a verified badge</strong> on your profile.

        </p>

        <div v-if="qualification.status ==='approved'" class="alert alert-success d-flex align-items-center gap-2" role="alert">
          <i class="bi bi-patch-check-fill text-primary-1"></i>
          <span>Qualifications approved</span>
        </div>

        <div v-if="qualification.status ==='rejected'" class="alert alert-danger d-flex align-items-center gap-2" role="alert">
          <i class="bi bi-x-circle-fill text-danger"></i>
          <span>Qualifications rejected.</span>
        </div>

        <div v-if="qualification.status === 'pending'" class="alert alert-warning d-flex align-items-center gap-2" role="alert">
          <i class="bi bi-hourglass-split text-warning"></i>
          <span>Qualifications pending review.</span>
        </div>


        <div v-if="qualification.documents.length">
          <ul class="list-group mb-3">
            <li v-for="(doc, index) in qualification.documents" :key="index"
                class="list-group-item d-flex justify-content-between align-items-center">
              {{ doc.name }}
              <a :href="doc.full_path" target="_blank" class="btn btn-sm btn-outline-primary">
                <i class="bi bi-download"></i> View
              </a>
            </li>
          </ul>
        </div>

        <div v-if="qualification.status !=='approved'">
          <div class="mb-3">
            <input type="file" class="form-control" ref="fileInput" multiple @change="handleFileUpload">
          </div>
          <button class="btn btn-primary" :disabled="isUploading || !newQualifications.length"
                  @click="submitQualifications">
            <b-spinner small v-if="isUploading"></b-spinner>
            {{ isUploading ? 'Uploading...' : 'Submit for Approval' }}
          </button>
        </div>
      </div>
    </div>


    <!--    edit description modal-->
    <b-modal v-model="showModal" title="Edit your company description" hide-footer>
      <div class="d-flex justify-content-center align-items-start mb-2">
        <i class="bi bi-info-circle me-1"/>
        <p class="text-muted">
          Please do not include contact details, such as your phone number, email or website.
        </p>
      </div>

      <form @submit.prevent="editDescription">
        <div class="form-group">
      <textarea id="description" required v-model="user.description" class="form-control" rows="10"
                placeholder="Tell us about yourself in a few sentences. This is your chance to make a great first impression.">
      </textarea>
        </div>

        <div class="d-flex justify-content-end mt-3">
          <b-button variant="secondary" @click="showModal = false">Close</b-button>
          <button class="btn btn-primary ms-2" type="submit" :disabled="isLoading">
            <b-spinner small v-if="isLoading"></b-spinner>
            {{ isLoading ? 'Saving..' : 'Save changes' }}
          </button>
        </div>
      </form>
    </b-modal>


  </BaseDashboardLayout>
</template>

<script>
import BaseDashboardLayout from '../base-layout/tradesperson-dashboard';
import appConfig from "../../../app.config.json";
import {userService} from "@/apis/user.service";

export default {
  page: {
    title: "Company Description",
    meta: [{name: "description", content: appConfig.description}]
  },
  data() {
    return {
      guarantee: '',
      guaranteeStatus: '',
      description: '',
      isLoading: false,
      guaranteeLoader: false,
      showModal: false,
      showGuaranteeForm: false,
      user: this.$store.getters.GET_USER_INFO,
      isUploading: false,
      newQualifications: [],
      qualification: {
        documents: [],
        status: false
      },

    };
  },
  components: {
    BaseDashboardLayout
  },
  methods: {
    // Qualifications
    async getQualifications() {
      await userService.getQualifications().then((res) => {
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message, showSwal: true});
          return;
        }
        this.qualification.documents = extra.documents;
        this.qualification.status = extra.status;
      });

    },

    handleFileUpload(event) {
      this.newQualifications = Array.from(event.target.files);
    },

    submitQualifications() {
      this.isUploading = true;
      const formData = new FormData();
      this.newQualifications.forEach((file, index) => {
        formData.append(`documents[${index}]`, file);
      });

      userService.uploadQualifications(formData).then((res) => {
        const {status, message} = res;
        if (!status) {
          this.$store.dispatch('error', {message, showSwal: true});
          return;
        }

        this.$store.dispatch('success', {message, showSwal: true});
        this.getQualifications();
        this.newQualifications = [];
        this.$refs.fileInput.value = '';
      }).catch((error) => {
        this.$store.dispatch('error', {
          message: typeof error === 'string' ? error : 'Upload failed. Please try again.',
          showSwal: true
        });
      }).finally(() => {
        this.isUploading = false;
      });

    },

    // end of qualifications
    async save() {
      this.isLoading = true;
      userService.updateGuarantee({
        guarantee: this.guarantee,
      }).then((res) => {
        this.isLoading = false;
        const {status, message} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.getGuarantee();
        this.$store.dispatch('success', {message, showSwal: true});
      });
    },

    async editDescription() {
      this.isLoading = true
      const formData = new FormData();
      formData.append('description', this.user.description);

      userService.updatePersonalInfo(formData).then((res) => {
        this.isLoading = false
        this.showModal = false
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.$store.dispatch('success', {message, showSwal: true});
        this.$store.dispatch('updateUserInfo', extra)
      });
    },

    resetGuarantee() {
      this.getGuarantee();
    },

    getGuarantee() {
      this.guaranteeLoader = true;
      userService.getGuarantee().then((res) => {
        this.guaranteeLoader = false;
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.guaranteeStatus = extra.guarantee;
        this.guarantee = extra.guarantee;
        this.showGuaranteeForm = false;
      });
    }
  },
  created() {
    this.getGuarantee();
    this.getQualifications();
  },
  mounted() {
    $('#company-description').addClass('active')
  },
};
</script>

<style scoped>

</style>
