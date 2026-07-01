<template>
  <div>

    <RoleBasedHeader :userRole="userRole" />
    <div class="container cursor-pointer">
      <div class="mt-4 text-end pe-4">
        <a @click="$router.go(-1)" class="mb-4">
          <i class="bi bi-chevron-left"></i> Go Back
        </a>
      </div>

    </div>


    <div class="inner-banner">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="banner-content text-center">
              <h1>FAQ’s</h1>
              <span></span>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
                  <li class="breadcrumb-item active" aria-current="page">FAQ</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ========== Inner Banner end============= -->
    <!-- ========== Faq Start============= -->
    <div class="faq-page pt-120 mb-120">
      <div class="container">
        <div class="row g-lg-4 gy-5">
          <div class="col-lg-6">
            <div class="genarel-qustions-area">
              <h4>🏠 Customer FAQ</h4>

              <div class="accordion" id="accordionExample">
                <div class="accordion-item mb-20">
                  <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      1. What is Tradelink?
                    </button>
                  </h2>
                  <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      Tradelink is an online platform that helps you find certified, reliable tradespeople in Jamaica. Whether it’s plumbing, electrical work, or general repairs — we’ve got you covered.
                    </div>
                  </div>
                </div>
                <div class="accordion-item mb-20">
                  <h2 class="accordion-header" id="headingTwo">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      2. How do I post a job?
                    </button>
                  </h2>
                  <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      Click "Post a Job", describe the work, and enter your location. Tradespeople will respond directly to your request.
                    </div>
                  </div>
                </div>
                <div class="accordion-item mb-20">
                  <h2 class="accordion-header" id="headingThree">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      3. Is it free to use?
                    </button>
                  </h2>
                  <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      Yes. Posting jobs and reviewing tradespeople is completely free for customers.
                    </div>
                  </div>
                </div>
                <div class="accordion-item mb-20">
                  <h2 class="accordion-header" id="headingFour">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                      4. How do I know the tradesperson is qualified?
                    </button>
                  </h2>
                  <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      Tradespeople can display badges from HEART/NSTA Trust, BSJ, or other verified certifications. You can also view their reviews and portfolios.

                    </div>
                  </div>
                </div>
                <div class="accordion-item mb-20">
                  <h2 class="accordion-header" id="headingFive">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                      5. What happens after a trade responds?
                    </button>
                  </h2>
                  <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      You can chat, call, or negotiate terms directly. Choose the one that best suits your needs.
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingSix">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                      6. Does Tradelink manage the job or payment?
                    </button>
                  </h2>
                  <div id="collapseSix" class="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      No. Tradelink connects you to tradespeople — all payments and agreements are handled directly between you and the worker.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="genarel-qustions-area">
              <h4>🧰 Tradesperson FAQ</h4>

              <div class="accordion" id="accordionExample2">
                <div class="accordion-item mb-20">
                  <h2 class="accordion-header" id="headingOne2">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne2" aria-expanded="true" aria-controls="collapseOne2">
                      1. How do I join?
                    </button>
                  </h2>
                  <div id="collapseOne2" class="accordion-collapse collapse show" aria-labelledby="headingOne2" data-bs-parent="#accordionExample2">
                    <div class="accordion-body">
                      Click "Join as a Tradesperson" and create your profile. Add your trade, contact info, and (if available) certifications.
                    </div>
                  </div>
                </div>
                <div class="accordion-item mb-20">
                  <h2 class="accordion-header" id="headingTwo2">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo2" aria-expanded="false" aria-controls="collapseTwo2">
                      2. Is there a cost?
                    </button>
                  </h2>
                  <div id="collapseTwo2" class="accordion-collapse collapse" aria-labelledby="headingTwo2" data-bs-parent="#accordionExample2">
                    <div class="accordion-body">
                      Yes — Tradelink charges $1,200/month for access to unlimited job leads and customer contact.
                    </div>
                  </div>
                </div>
                <div class="accordion-item mb-20">
                  <h2 class="accordion-header" id="headingThree2">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree2" aria-expanded="false" aria-controls="collapseThree2">
                      3. How do I get jobs?
                    </button>
                  </h2>
                  <div id="collapseThree2" class="accordion-collapse collapse" aria-labelledby="headingThree2" data-bs-parent="#accordionExample2">
                    <div class="accordion-body">
                      Once you’re signed up, you can view nearby job posts and apply with a message or quote.
                    </div>
                  </div>
                </div>
                <div class="accordion-item mb-20">
                  <h2 class="accordion-header" id="headingFour2">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour2" aria-expanded="false" aria-controls="collapseFour2">
                      4. Can I show my qualifications?
                    </button>
                  </h2>
                  <div id="collapseFour2" class="accordion-collapse collapse" aria-labelledby="headingFour2" data-bs-parent="#accordionExample2">
                    <div class="accordion-body">

                      Yes! Upload certificates from HEART/NSTA, BSJ, or other recognised bodies to earn a “Verified” badge.
                    </div>
                  </div>
                </div>
                <div class="accordion-item mb-20">
                  <h2 class="accordion-header" id="headingFive2">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive2" aria-expanded="false" aria-controls="collapseFive2">
                      5. How do I get paid?
                    </button>
                  </h2>
                  <div id="collapseFive2" class="accordion-collapse collapse" aria-labelledby="headingFive2" data-bs-parent="#accordionExample2">
                    <div class="accordion-body">
                      You handle payments directly with the customer. Tradelink does not hold or process money.
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingSix2">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix2" aria-expanded="false" aria-controls="collapseSix2">
                      6. Can I pause or cancel my account?
                    </button>
                  </h2>
                  <div id="collapseSix2" class="accordion-collapse collapse" aria-labelledby="headingSix2" data-bs-parent="#accordionExample2">
                    <div class="accordion-body">
                      Yes. You can manage or pause your subscription anytime from your dashboard.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <HomeFooter></HomeFooter>

  </div>

</template>

<script>
import HomeFooter from '../../base-layout/footer'
import RoleBasedHeader from '../../base-layout/roleBasedHeader'
import appConfig from "../../../../app.config.json";
import store from "@/store/store";

export default {
  name: "FaqPage",
  page: {
    title: "Faq",
    meta: [{name: "description", content: appConfig.description}]
  },
  data() {
    return {
      trades: [],
      tradesLoader: false,
      categoryLoader: false,
      user: this.$store.getters.GET_USER_INFO || {},
      searchQuery: '',
      showDropdown: false,
      filteredCategories: []
    };
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
    RoleBasedHeader
  },
  methods: {

  },
  created() {
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
