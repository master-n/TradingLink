<template>
  <BaseDashboardLayout>
    <template v-slot:title>
      <h4 class="title mb-3 font-weight-bold ps-4">Responses to your job: <span
          class="text-capitalize">{{ project?.headline }}</span></h4>
    </template>
    <div class="container">
      <div class="row">
        <!-- Job Description Section -->
        <div class="col-md-8">
          <div class="card mb-4" v-if="!isLoading">
            <div class="card-header d-flex justify-content-between align-items-center">
              <div><i class="bi bi-chat-right"></i> {{ project.responses || 0 }} responses</div>
              <div>
                <span class="text-capitalize">{{ project.created_at | toHumanDate }}</span>
              </div>
            </div>
            <div class="card-body">
              <h4 class="card-title">Job Description</h4>
              <div class="fw-lighter">
                <div class="row mt-3">
                  <div class="col-md-4">Job ID:</div>
                  <div class="col-md-8 text-left">{{ project.id }}</div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-4">Job type:</div>
                  <div class="col-md-8 text-left">{{ project.trade ? project.trade.name : 'N/A' }}</div>
                </div>
                <div class="row mt-3" v-if="project.questions.length>0">
                  <div class="col-md-4">Category:</div>
                  <div class="col-md-8 text-left">{{ project.questions[0]['answers'] }}</div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-4">Location:</div>
                  <div class="col-md-8 text-left"><i class="bi bi-pin-map"></i> {{ project.city_name}} {{ project.parish_name ? '~ ' + project.parish_name : '' }}</div>
                </div>

              </div>
              <hr/>
<!--              <div class="row mt-3">-->
<!--                <div class="col-md-12 fw-lighter">Customer description:</div>-->
<!--                <div class="col-md-12">-->
<!--                  <p>We need a complete rewire of our 3-bedroom house. The wiring is old and needs to be replaced.</p>-->
<!--                </div>-->
<!--              </div>-->
<!--accordion-->
              <div class="accordion mt-3" id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      <span class="text-primary-1">Additional Information</span>
                    </button>
                  </h2>
                  <div id="collapseOne" class="accordion-collapse collapse show"
                       aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      <div v-for="(question,i) in project.questions" :key="i">
                      <h6>{{question.formLabel}}</h6>
                      <p class="fw-light">{{question.answers}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card mb-4" v-else>
            <div class="card-header d-flex justify-content-between align-items-center">
              <div class="lines shine"></div>
            </div>
            <div class="card-body">
              <h4 class="card-title">Job Description</h4>
              <div class="fw-lighter">
                <div class="lines shine"></div>
                <div class="lines shine"></div>
                <div class="lines shine"></div>
                <div class="lines shine"></div>
                <div class="lines shine"></div>
                <div class="lines shine"></div>
              </div>
              <hr/>
              <div class="row mt-3">
                <div class="col-md-12 fw-lighter">Customer description:</div>
                <div class="col-md-12">
                  <p class="lines shine"></p>
                  <p class="lines shine"></p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  </BaseDashboardLayout>
</template>

<script>
import BaseDashboardLayout from '../../base-layout/homeowner-dashboard';
import appConfig from "../../../../app.config.json";
import {userService} from "@/apis/user.service";

export default {
  page: {
    title: "Project Details",
    meta: [{name: "description", content: appConfig.description}]
  },
  data() {
    return {
      isLoading: false,
      project_id: null,
      project: {},
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
    getProjectDetails(project_id) {
      this.isLoading = true;
      userService.getProjectDetails(project_id).then((res) => {
        this.isLoading = false;
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.project = extra;
      });
    }
  },
  created() {
    this.project_id = this.$route.params.id
    if (!this.project_id) {
      this.$router.push('/unauthorized');
    }
    this.getProjectDetails(this.project_id);
  },
  mounted() {
  }
};
</script>

<style scoped>
.card {
  margin-bottom: 20px;
}

/*.accordion-button:not(.collapsed) {*/
/*  color: var(--primary-color1) !important;*/
/*}*/
</style>
