<template>
  <div>
    <RoleBasedHeader :userRole="userRole" />
    <div class="container">
      <div class="mt-4 text-end pe-4">
        <a @click="$router.go(-1)" class="mb-4">
          <i class="bi bi-chevron-left"></i> Go Back
        </a>
      </div>

    </div>

    <section class="container my-5">
      <h2 class="mb-4 d-flex align-items-center justify-content-center">
        <i class="bi bi-shield-check text-primary me-2" aria-hidden="true"></i>
        Review Policy
      </h2>
      <div class="card shadow-sm text-center">
        <div class="card-body">
          <p>
            At <strong>Tradelink</strong>, we value transparency, honesty, and the trust of our community. Reviews
            help others make informed decisions and uphold high standards.
          </p>

          <h5 class="mt-4 d-flex align-items-center justify-content-start">
            <i class="bi bi-person-check me-2 text-success" aria-hidden="true"></i>
            1. Who Can Leave a Review
          </h5>
          <ul class="list-unstyled ps-3">
            <li><i class="bi bi-dot text-secondary"></i> Only verified users (e.g., completed jobs) may leave reviews.</li>
            <li><i class="bi bi-dot text-secondary"></i> Submit reviews within 30 days of job completion.</li>
          </ul>

          <h5 class="mt-4 d-flex align-items-center justify-content-start">
            <i class="bi bi-pencil-square me-2 text-warning" aria-hidden="true"></i>
            2. Review Guidelines
          </h5>
          <ul class="list-unstyled ps-3">
            <li><i class="bi bi-dot text-secondary"></i> Base reviews on genuine experiences.</li>
            <li><i class="bi bi-dot text-secondary"></i> Keep feedback respectful and professional.</li>
            <li><i class="bi bi-dot text-secondary"></i> Avoid personal info or promotions.</li>
          </ul>

          <h5 class="mt-4 d-flex align-items-center justify-content-start">
            <i class="bi bi-x-circle me-2 text-danger" aria-hidden="true"></i>
            3. Moderation and Removal
          </h5>
          <ul class="list-unstyled ps-3">
            <li><i class="bi bi-dot text-secondary"></i> No hate speech, threats, or harassment.</li>
            <li><i class="bi bi-dot text-secondary"></i> Respect user privacy.</li>
            <li><i class="bi bi-dot text-secondary"></i> Fake or biased reviews will be removed.</li>
            <li><i class="bi bi-dot text-secondary"></i> No unsupported criminal accusations.</li>
          </ul>

          <h5 class="mt-4 d-flex align-items-center justify-content-start">
            <i class="bi bi-reply me-2 text-info" aria-hidden="true"></i>
            4. Responding to Reviews
          </h5>
          <ul class="list-unstyled ps-3">
            <li><i class="bi bi-dot text-secondary"></i> Tradespeople and clients may respond publicly.</li>
            <li><i class="bi bi-dot text-secondary"></i> Responses must be respectful and professional.</li>
          </ul>

          <h5 class="mt-4 d-flex align-items-center justify-content-start">
            <i class="bi bi-star-fill me-2 text-warning" aria-hidden="true"></i>
            5. Review Score System
          </h5>
          <ul class="list-unstyled ps-3">
            <li><i class="bi bi-dot text-secondary"></i> Star rating from 1 to 5.</li>
            <li><i class="bi bi-dot text-secondary"></i> Average score shown on profiles in real-time.</li>
          </ul>

          <h5 class="mt-4 d-flex align-items-center justify-content-start">
            <i class="bi bi-question-circle me-2 text-primary" aria-hidden="true"></i>
            6. Dispute Process
          </h5>
          <ul class="list-unstyled ps-3">
            <li>
              <i class="bi bi-dot text-secondary"></i>
              Use
              <a href="/contact-us" class="link-primary">Contact Us</a> to raise concerns.
            </li>
            <li><i class="bi bi-dot text-secondary"></i> We'll review both sides before making a final decision.</li>
          </ul>

          <h5 class="mt-4 d-flex align-items-center justify-content-start">
            <i class="bi bi-lock-fill me-2 text-dark" aria-hidden="true"></i>
            7. Integrity Promise
          </h5>
          <ul class="list-unstyled ps-3">
            <li><i class="bi bi-dot text-secondary"></i> No buying, selling, or incentivising reviews.</li>
            <li><i class="bi bi-dot text-secondary"></i> Violations may lead to account suspension or removal.</li>
          </ul>
        </div>
      </div>
    </section>

    <HomeFooter />
  </div>
</template>

<script>
import HomeFooter from '../../base-layout/footer'
import topHeader from '../../base-layout/navigation/home-menu'
import homeOwnerHeader from '../../base-layout/navigation/homeowner-menu'
import store from '@/store/store'
import appConfig from "../../../../app.config.json";
import RoleBasedHeader from "@/views/base-layout/roleBasedHeader";

export default {
  name: "ReviewPolicy",
  page: {
    title: "ReviewPolicy",
    meta: [{ name: "description", content: appConfig.pageDescriptions.reviewPolicy }]
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
  components: {
    HomeFooter,
    RoleBasedHeader,

  },
  mounted() {
    $('.sidebar-button').on("click", function () {
      $('.main-menu').addClass('show-menu');
    });

    $('.menu-close-btn').on("click", function () {
      $('.main-menu').removeClass('show-menu');
    });
  }

}
</script>

<style scoped>
h2, h5 {
  font-weight: 600;
  text-align: left;
}

.card {
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 12px;
}

.card-body {
  text-align: left;
  padding: 2rem;
}

.card-body p {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

ul li {
  padding: 4px 0;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
}

ul li i.bi-dot {
  margin-right: 8px;
  font-size: 1.1rem;
  vertical-align: middle;
  flex-shrink: 0;
}

a.link-primary {
  color: #0d6efd;
  text-decoration: none;
}

a.link-primary:hover {
  text-decoration: underline;
}
</style>
