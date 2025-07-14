<template>
  <BaseDashboardLayout>
    <template v-slot:title>
      <h4 class="title mb-5 font-weight-bold">Contact details</h4>
    </template>
    <div class="row mt-4 mb-5">
      <div class="col-md-8">
        <div v-if="errorMessage" class="alert alert-danger">
          <ul class="mb-0">
            <li>{{ errorMessage }}</li>
          </ul>
        </div>

        <div class="card" v-if="!loggedIn">
          <div class="card-body d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
              <div class="icon-circle bg-light rounded-circle d-flex align-items-center justify-content-center me-3">
                <i class="bi bi-lock-fill text-primary-1"></i>
              </div>
              <div>
                <h6 class="font-weight-bold">Verify account to access</h6>
                <p class="font-weight-lighter">To access your information, please authenticate your account.</p>
              </div>
            </div>
            <button class="btn btn-primary" @click="login">Verify account</button>
          </div>
        </div>
        <div class="border-top pt-3">
          <div v-if="!edit">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div><strong>Name</strong></div>
              <a @click="editUser" class="text-decoration-none cursor-pointer">
                <i class="bi bi-pencil"></i> Edit
              </a>
            </div>

            <div class="mb-3">
              <div class="font-weight-lighter">{{ userInfo.name }}</div>
            </div>
            <div class="mb-4">
              <div class="mb-2"><strong>Work Area</strong></div>
              <div class="mb-2 font-weight-lighter">{{ userInfo.parish }}</div>
              <div class="font-weight-lighter">{{ userInfo.city }}</div>
            </div>
          </div>

          <form @submit.prevent="updatePersonalInfo" v-if="edit" class="mt-3 mb-5">
            <div class="mb-3">
              <label for="name" class="font-weight-bold mb-2">Name</label>
              <input type="text" id="name" v-model="userInfo.name" class="form-control" placeholder="Enter your name">
            </div>
            <button class="btn btn-outline-primary-1 me-2" @click="edit = false">Cancel</button>
            <button class="btn btn-primary" type="submit" :disabled="editLoader">
              <b-spinner small v-if="editLoader"></b-spinner>
              {{ editLoader ? 'Loading...' : 'Save' }}
            </button>
          </form>


          <hr/>

          <div v-if="!idVerificationLoader">
            <div class="mb-3">
              <div class="d-flex align-items-center gap-2">
                <strong>ID Status</strong>
                <span v-if="!id_verification_status" class="badge bg-danger text-white">Action required</span>
                <span
                    v-else
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

            <!-- Upload form -->
            <div v-if="id_verification_status === 'rejected' || !id_verification_status">
              <p>
                Identity verification is one of the ways we keep Trading Link secure. Upload a copy of your ID so we
                can check it's really you.
              </p>

              <p><strong>Types of ID we accept:</strong></p>
              <ul>
                <li>Passport</li>
                <li>Driving licence</li>
                <li>National ID card</li>
              </ul>

              <p class="small text-muted">
                We're committed to respecting your privacy and will always handle your data fairly and legally.
                Please see our <a href="#" class="text-decoration-none text-purple">privacy policy</a> for more
                information.
              </p>

              <button class="btn btn-primary" type="button" @click="showIdVerificationForm= true">Upload ID</button>
            </div>
          </div>
          <div v-else>
            <div class="lines shine"></div>
            <div class="lines shine"></div>
            <div class="lines shine w-75"></div>
            <div class="lines shine w-75"></div>
            <div class="lines shine w-75"></div>
          </div>
        </div>
      </div>
    </div>

    <b-modal v-model="showIdVerificationForm" title="Upload Your ID" hide-footer>
      <form @submit.prevent="submitIdVerification">
        <div class="mb-3">
          <label for="idType" class="form-label">Select ID type</label>
          <select class="form-control" v-model="idType" id="idType" required>
            <option v-for="(option,i) in idOptions" :value="option.value">
              {{ option.text }}
            </option>
          </select>

        </div>

        <div class="mb-3">
          <label for="idFile" class="form-label">Upload your ID</label>
          <input type="file" id="idFile" @change="handleFileChange" class="form-control" required>
        </div>

        <p class="small font-weight-lighter">
          Verifying your identity prevents people from setting up fraudulent accounts.
          We will handle your personal data securely and in accordance with our
          <a href="#" class="text-decoration-underline">privacy policy</a>.
        </p>

        <div class="d-flex justify-content-end gap-2 mt-4">
          <b-button variant="secondary" @click="showIdVerificationForm = false">Close</b-button>
          <b-button class="btn bg-primary-1 text-light" type="submit" :disabled="isLoading">
            <b-spinner small v-if="isLoading"></b-spinner>
            {{ isLoading ? 'Loading...' : 'Submit' }}
          </b-button>
        </div>
      </form>
    </b-modal>


  </BaseDashboardLayout>
</template>

<script>
import BaseDashboardLayout from '../../base-layout/tradesperson-dashboard';
import appConfig from "../../../../app.config.json";
import {userService} from "@/apis/user.service";

export default {
  name: "ContactDetails",
  page: {
    title: "Contact Details",
    meta: [{name: "description", content: appConfig.description}]
  },
  data() {
    return {
      isLoading: false,
      editLoader: false,
      edit: false,
      userInfo: this.$store.getters.GET_USER_INFO || {},
      idVerificationLoader: false,
      errorMessage: '',
      id_verification_status: null,
      showIdVerificationForm: false,
      idOptions: [
        {value: null, text: 'Please select an ID type'},
        {value: 'Passport', text: 'Passport'},
        {value: 'Identity Card', text: 'Identity Card'},
        {value: 'Drivers Licence', text: 'Driver’s Licence'}
      ],
      idType: null,
      idFile: null,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters.GET_USER_INFO && this.$store.getters.GET_USER_INFO.access_token;
    },
  },
  components: {
    BaseDashboardLayout
  },
  methods: {
    editUser() {
      this.edit = true;
    },
    login() {
      this.$router.push("/auth-login?redirect-to=/contact-details");
    },
    handleFileChange(event) {
      this.idFile = event.target.files[0];
    },
    checkIdVerified() {
      this.idVerificationLoader = true;
      userService.checkIdVerified().then((res) => {
        this.idVerificationLoader = false;
        const {status, message, extra} = res;
        if (!status) {
          this.errorMessage = message;
          return;
        }
        this.$store.dispatch('updateUserInfo', {identity_verified: extra.identity_verified});
        this.id_verification_status = extra['identity_verified'];
      });
    },

    async submitIdVerification() {
      this.isLoading = true
      const formData = new FormData();
      formData.append("identity_type", this.idType);
      formData.append("identity_file", this.idFile);

      userService.idVerification(formData).then((res) => {
        this.isLoading = false
        this.showIdVerificationForm = false;

        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true})
          return;
        }
        this.$store.dispatch('updateUserInfo', {identity_verified: extra.identity_verified});
        this.id_verification_status = extra['identity_verified'];
      });
    },

    async updatePersonalInfo() {
      this.editLoader = true
      await this.$store.dispatch('showLoader')
      userService.updatePersonalInfo({
        name: this.userInfo.name,
      }).then((res) => {
        this.$store.dispatch('hideLoader')
        this.editLoader = false
        this.edit = false
        const {status, message, extra} = res;
        if (!status) {
          this.errorMessage = message;
          return;
        }
        this.$store.dispatch('updateUserInfo', extra)
      });
    },

  },
  created() {
    this.checkIdVerified();
  },
  mounted() {
    $('#contact-details').addClass('active')
  },
};
</script>

<style scoped>

</style>