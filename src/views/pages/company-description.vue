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
        <p class="fw-lighter small">{{ user.description }}</p>
      </div>
    </div>

    <h5>Guarantee</h5>
    <p class="font-weight-lighter">Increase your chances of getting hired by offering a guarantee.</p>
    <small class="font-weight-lighter">
      <i class="bi bi-info-circle"></i> Homeowners are aware guarantees vary and should discuss the terms in advance.
    </small>
    <div class="row mt-4 mb-5">
      <div class="col-md-8">
        <div v-if="guaranteeLoader">
          <div v-for="(item,i) in 2" :key="i">
            <div class="card mb-3">
              <div class="card-body">
                <div class="lines shine"></div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="card mb-3">
            <div class="card-body d-flex align-items-center justify-content-start">
              <label for="yes" class="form-check-label cursor-pointer">
                <input type="radio" id="yes" v-model="guarantee" :value="true" class="form-check-input" name="guarantee"> Yes, I offer a
                guarantee
              </label>
            </div>
          </div>
          <div class="card mb-3">
            <div class="card-body d-flex align-items-center justify-content-start">
              <label for="no" class="form-check-label cursor-pointer">
                <input type="radio" id="no" v-model="guarantee" :value="false" class="form-check-input" name="guarantee"> No, I do not offer a
                guarantee
              </label>
            </div>
          </div>
        </div>
        <div class="button mt-4">
          <button class="btn primry-btn-2 d-inline-block text-light big-button" @click="save"
                  :disabled="guaranteeLoader || isLoading">Save
          </button>
        </div>
      </div>
    </div>

    <!--    edit description modal-->
    <b-modal v-model="showModal" title="Edit your company description" hide-footer>
      <div class="d-flex justify-content-center align-items-start mb-2">
        <i class="bi bi-info-circle me-1"/>
        <p class="fw-lighter">
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
      description: '',
      isLoading: false,
      guaranteeLoader: false,
      showModal: false,
      user: this.$store.getters.GET_USER_INFO,
    };
  },
  components: {
    BaseDashboardLayout
  },
  methods: {
    async save() {
      this.isLoading = true;
      userService.updateGuarantee({
        guarantee: this.guarantee,
      }).then((res) => {
        this.isLoading = false;
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.$store.dispatch('success', {message, showSwal: true});
      });
    },

    async editDescription() {
      this.isLoading = true
      userService.updatePersonalInfo({
        description: this.user.description,
      }).then((res) => {
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

    getGuarantee() {
      this.guaranteeLoader = true;
      userService.getGuarantee().then((res) => {
        this.guaranteeLoader = false;
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.guarantee = extra.guarantee;
      });
    }
  },
  created() {
    this.getGuarantee();
  },
  mounted() {
    $('#company-description').addClass('active')
  },
};
</script>

<style scoped>

</style>
