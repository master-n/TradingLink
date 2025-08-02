<template>
  <div>
    <RoleBasedHeader :userRole="userRole" />

    <section class="container my-5 py-4">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="alert alert-info d-flex align-items-center mb-4" role="alert">
            <i class="bi bi-info-circle-fill me-2"></i>
            We respond quickly to your queries.
          </div>
          <p class="mb-4">
            For general questions, please visit our
            <a :href="'/faq'" class="text-primary-1 text-decoration-underline" rel="noopener noreferrer">FAQ page</a>
            or
            <a :href="'/ask-a-trade'" class="text-primary-1 text-decoration-underline" rel="noopener noreferrer">Ask a
              Tradesperson</a>.
          </p>
          <h2 class="mb-4 d-flex align-items-center">
            <i class="bi bi-envelope-fill text-primary-1 me-2"></i>
            Contact Us
          </h2>

          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <label for="name" class="form-label">Your Name</label>
              <input v-model="form.name" type="text" id="name" class="form-control"/>
            </div>

            <div class="mb-3">
              <label for="email" class="form-label">Email Address</label>
              <input v-model="form.email" type="email" id="email" class="form-control" required/>
            </div>

            <div class="mb-3">
              <label for="message" class="form-label">Message</label>
              <textarea v-model="form.message" id="message" class="form-control" rows="5" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary" :disabled="isLoading">
              <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status"
                    aria-hidden="true"></span>
              <span v-if="!isLoading">Send Message</span>
              <span v-else>Sending...</span>
            </button>

          </form>
        </div>
      </div>
    </section>

    <HomeFooter/>
  </div>
</template>

<script>
import HomeFooter from '../../base-layout/footer'
import store from '@/store/store'
import {userService} from "@/apis/user.service";
import appConfig from "../../../../app.config.json";
import RoleBasedHeader from "@/views/base-layout/roleBasedHeader";

export default {
  name: "ContactFormOnly",
  page: {
    title: "Contact Us",
    meta: [{name: "description", content: appConfig.pageDescriptions.contact}]
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: ''
      },
      isLoading: false
    }
  },
  components: {
    HomeFooter,
    RoleBasedHeader
  },
  computed: {
    userRole() {
      const loggedUser = store.getters.GET_USER_INFO;
      if(!loggedUser){
        return '';
      }
      return loggedUser?.roles?.[0] || '';
    },
  },
  methods: {
    submitForm() {
      this.isLoading = true;
      userService.contactFormSubmit(this.form).then((res) => {
        this.isLoading = false;
        const {extra, status, message} = res;
        if (!status) {
          this.$store.dispatch('error', {message, showSwal: true});
          return;
        }
        this.$store.dispatch('success', {message: extra, showSwal: true});
      });

    }
  },
  mounted() {
    this.$nextTick(() => {
      $('.sidebar-button').on("click", function () {
        $('.main-menu').addClass('show-menu');
      });

      $('.menu-close-btn').on("click", function () {
        $('.main-menu').removeClass('show-menu');
      });
    });
  },

}
</script>

<style scoped>
h2 {
  font-weight: 600;
}

.form-label {
  font-weight: 500;
}
</style>
