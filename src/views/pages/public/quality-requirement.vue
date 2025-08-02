<template>
  <div>
    <RoleBasedHeader :userRole="userRole" />


    <div class="container my-5">
      <div class="text-center mb-5">
        <h1 class="display-5 fw-bold mb-3">Tradespeople Quality Requirements</h1>
        <p class="lead text-muted fw-lighter text-center">
          At Tradelink, we're raising the bar for trades in Jamaica. Every tradesperson must meet essential standards to
          ensure trust, safety, and quality in every job.
        </p>
      </div>

      <div class="accordion" id="requirementsAccordion">
        <div class="accordion-item mb-20" v-for="(item, index) in requirements" :key="index">
          <h2 class="accordion-header" :id="`heading${index}`">
            <button
                :class="['accordion-button']"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="`#collapse${index}`"
                :aria-expanded="index < 4 ? 'true' : 'false'"
                :aria-controls="`collapse${index}`"
            >
              {{ index + 1 }}. {{ item.title }}
            </button>
          </h2>
          <div
              :id="`collapse${index}`"
              :class="['accordion-collapse collapse show']"
              :aria-labelledby="`heading${index}`"
          >

          <div class="accordion-body">
              <p v-html="item.content"></p>
            </div>
          </div>
        </div>
      </div>

    </div>

    <HomeFooter/>
  </div>
</template>

<script>
import HomeFooter from '../../base-layout/footer'
import store from '@/store/store'
import appConfig from "../../../../app.config.json";
import RoleBasedHeader from "@/views/base-layout/roleBasedHeader";

export default {
  name: "QualityRequirements",

  page: {
    title: "QualityRequirements",
    meta: [{name: "description", content: appConfig.pageDescriptions.reviewPolicy}]
  },

  data() {
    return {
      requirements: [
        {
          title: "Verified Qualifications",
          content: `All tradespeople must provide proof of their qualifications (e.g., NVQ, City & Guilds, HEART/NSTA). Additional certifications like Gas Safe Register or NWC approval are encouraged for specialised work.`
        },
        {
          title: "Proof of Experience",
          content: `We require a minimum of 2 years of hands-on experience. Portfolios or references may be requested to verify workmanship.`
        },
        {
          title: "Identity and Legal Compliance",
          content: `A valid government-issued ID is mandatory. Any trade-specific licences must be current and verifiable.`
        },
        {
          title: "Insurance (Strongly Encouraged)",
          content: `While not mandatory, public liability insurance is highly recommended. Some jobs may require proof of insurance depending on the risk.`
        },
        {
          title: "Code of Conduct",
          content: `<ul>
            <li>Be respectful, professional, and punctual.</li>
            <li>Communicate clearly and honestly with clients.</li>
            <li>No overcharging, unsafe work, or misleading claims.</li>
            <li>Maintain a clean and safe work environment.</li>
          </ul>`
        },
        {
          title: "Performance Monitoring",
          content: `All tradespeople are rated by clients. Repeated poor performance, complaints, or rule violations may result in suspension or removal.`
        },
        {
          title: "Ongoing Learning",
          content: `We encourage continuous learning through HEART/NSTA Trust, BSJ, and other institutions. Staying current with tools and safety standards is essential.`
        }
      ]
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
}

.card-body p {
  font-size: 1rem;
  line-height: 1.6;
}

ul li {
  padding: 4px 0;
  font-size: 0.95rem;
}

.accordion-button {
  border: 1px solid #EEE;
  border-radius: 5px;
  font-family: var(--font-exo2);
  font-weight: 500;
  font-size: 1.125rem;
  color: var(--title-color1);
  padding: 13px 20px;
}

</style>
