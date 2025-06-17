<template>
  <BaseDashboardLayout>
    <template v-slot:title>
      <h5 class="title mb-5 font-weight-bold">Manage account</h5>
    </template>
    <div class="row mt-4 mb-5">
      <div class="col-md-8">
        <div v-if="loggedIn">
          <ul class="list-group list-group-flush" v-if="!showDeletePage">
            <li @click="showDeletePage = true;"
                class="list-group-item border-bottom d-flex justify-content-between align-items-center text-danger cursor-pointer">
              <a class="d-flex align-items-center gap-2 ">
                <i class="bi bi-person-x-fill"></i>
                Delete Account
              </a>
              <i class="bi bi-chevron-right"></i>
            </li>
          </ul>
          <div v-else>
            <h4 class="mb-4 fw-bold">Are you sure you want to delete your account?</h4>

            <form>
              <div class="form-check mb-4">
                <input class="form-check-input" type="radio" v-model="deleteType" name="accountAction" id="keepAccount"
                       value="keep">
                <label class="form-check-label" for="keepAccount">
                  <div class="fw-bold">Keep my account but stop notifications</div>
                  <small class="fw-lighter">
                    Got enough work at the moment? You can turn off notifications and come back when you need us later.
                  </small>
                </label>
              </div>

              <div class="form-check mb-4">
                <input class="form-check-input" type="radio" name="accountAction" v-model="deleteType"
                       id="deleteAccount" value="delete">
                <label class="form-check-label" for="deleteAccount">
                  <div class="fw-bold">Delete my account</div>
                  <small class="fw-lighter">
                    Your profile and personal information will be deleted permanently and you will no longer be able to
                    access your account.<br>
                    For more information about how we handle your data, please read our
                    <a href="#" class="text-decoration-underline">Privacy Policy</a>.
                  </small>
                </label>
              </div>

              <button class="btn btn-outline-secondary me-3" @click="showDeletePage= false">Cancel</button>
              <button type="submit" class="btn btn-primary" :disabled="!deleteType">Next</button>
            </form>

          </div>
        </div>

        <div class="card mt-4" v-else>
          <div class="card-body d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
              <div class="icon-circle bg-light rounded-circle d-flex align-items-center justify-content-center me-3">
                <i class="bi bi-lock-fill text-primary-1"></i>
              </div>
              <div>
                <h5 class="font-weight-bold">Verify account to access</h5>
                <p class="font-weight-lighter">To access your information, please authenticate your account.</p>
              </div>
            </div>
            <button class="btn btn-primary" @click="login">Verify account</button>
          </div>
        </div>
      </div>
    </div>
  </BaseDashboardLayout>
</template>

<script>
import BaseDashboardLayout from '../../base-layout/tradesperson-dashboard';
import appConfig from "../../../../app.config.json";

export default {
  name: "ManageAccount",
  page: {
    title: "Manage Account",
    meta: [{name: "description", content: appConfig.description}]
  },
  data() {
    return {
      showDeletePage: false,
      deleteType: ''
    };
  },
  components: {
    BaseDashboardLayout
  },
  computed: {
    loggedIn() {
      return this.$store.getters.GET_USER_INFO && this.$store.getters.GET_USER_INFO.access_token;
    }
  },
  methods: {
    deleteAccount() {
      this.$router.push("/delete-account");
    },
    login() {
      this.$router.push("/auth-login?redirect-to=/manage-account");
    }
  },

  mounted() {
    $('#manage-account').addClass('active')
  },
};
</script>

<style scoped>


</style>