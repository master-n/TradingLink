<template>
  <div>
    <topHeader></topHeader>
    <div class="container">
      <div class="row">
        <!-- Job Description Section -->
        <div class="col-md-8 offset-md-2">
          <div class="mt-4 text-end pe-4">
            <a @click="$router.go(-1)" class="cursor-pointer mb-4">
              <i class="bi bi-chevron-left"></i> Go Back
            </a>
          </div>

          <div v-if="isJobComplete" class="alert alert-primary mt-4">
            <i class="bi bi-envelope"></i> Job has been completed. You can no longer send messages.
          </div>

          <div v-else>
            <div v-if="project.invite && !isLoading">
              <div v-if="project.invite.status ==='pending'" class="alert alert-primary mt-4">
                <i class="bi bi-envelope"></i> You have sent an invite to this job. Waiting for the homeowner to
                respond.
              </div>
              <div v-else-if="project.invite.status === 'accepted'">
                <router-link class="btn btn-primary"
                             :to="`/chat?job=${project.invite.service.headline}&id=${project.invite.id}`"><i
                    class="bi bi-chat-dots"></i> Send a message to the homeowner to discuss the job.
                </router-link>
                <button class="btn btn-outline-primary ms-2" :disabled="completeLoader" @click="markJobComplete()">
                  <i class="bi bi-check2-circle"></i> Mark job complete
                </button>
              </div>
            </div>


            <div class="d-flex align-items-center mt-4" v-if="!project.invite && !isLoading">
              <h6 class="text-muted mb-0 me-3">Are you interested in this job?</h6>
              <button class="btn btn-primary flex-shrink-1" @click="sendInvite()">
                <i class="bi bi-envelope"></i> I'm interested in this job
              </button>
            </div>
          </div>


          <h4 class="title mb-3 font-weight-bold ps-4 mt-4">Job Details: <span
              class="text-capitalize">{{ project?.headline }}</span></h4>

          <div
              class="alert d-flex justify-content-between align-items-center"
              style="background-color: #FFA500; color: white; border-radius: 0.375rem;"
          >
            <div>
              ⚠ Contract Required Before Work — Please ensure it’s signed before starting.
            </div>
            <a href="/frontend/assets/docs/Tradelink_Modern_Service_Agreement_Logo.docx" target="_blank" class="btn btn-sm btn-light text-dark">
              Download Contract
            </a>
          </div>

          <div class="card mb-4" v-if="!isLoading">
            <div class="card-header d-flex justify-content-between align-items-center">
              <div><i class="bi bi-chat-right"></i> {{ project.responses || 0 }} responses</div>
              <div>
                <span class="text-capitalize">{{ project.created_at | toHumanDate }}</span>
              </div>
            </div>
            <div class="card-body">
              <h4 class="card-title">Job Description</h4>
              <div class="text-muted">
                <div class="row mt-3">
                  <div class="col-md-4">Job ID:</div>
                  <div class="col-md-8 text-left">{{ project.id }}</div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-4">Job Reference:</div>
                  <div class="col-md-8 text-left">{{ project.job_reference || 'N/A' }}</div>
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
                  <div class="col-md-8 text-left"><i class="bi bi-pin-map"></i> {{ project.city_name }}
                    {{ project.parish_name ? '~ ' + project.parish_name : '' }}
                  </div>
                </div>
              </div>
              <hr/>
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
                        <h6>{{ question.formLabel }}</h6>
                        <p class="fw-light">{{ question.answers?.toString().toLowerCase()==='other'?question.other_answer:question.answers }}</p>
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
              <div class="text-muted">
                <div class="lines shine"></div>
                <div class="lines shine"></div>
                <div class="lines shine"></div>
                <div class="lines shine"></div>
                <div class="lines shine"></div>
                <div class="lines shine"></div>
              </div>
              <hr/>
              <div class="row mt-3">
                <div class="col-md-12 text-muted">Customer description:</div>
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
    <!-- Footer -->
    <div v-show="!isMobile">
      <HomeFooter></HomeFooter>
    </div>
    <MobileFooter></MobileFooter>

  </div>
</template>

<script>
import HomeFooter from '../base-layout/footer';
import topHeader from '../base-layout/header-2';
import SideBar from '../base-layout/navigation/tradesperson-sidebar';
import MobileFooter from '../../components/mobile-nav';
import appConfig from "../../../app.config.json";
import {userService} from "@/apis/user.service";
import {confirm} from "@/utils/functions";

export default {
  page: {
    title: "Job Leads",
    meta: [{name: "description", content: appConfig.description}]
  },
  data() {
    return {
      isMobile: false,
      isLoading: false,
      inviteLoader: false,
      completeLoader: false,
      project_id: null,
      project: {},
    };
  },
  components: {
    HomeFooter,
    topHeader,
    SideBar,
    MobileFooter
  },
  computed: {
    loggedIn() {
      return this.$store.getters.GET_USER_INFO;
    },
    isJobComplete() {
      return ['complete', 'completed'].includes(this.project.status);
    },
  },
  methods: {
    checkScreenSize() {
      this.isMobile = window.innerWidth < 992;
      this.showSidebar = !this.isMobile;
    },
    getProjectDetails(project_id) {
      this.isLoading = true;
      userService.jobDetails(project_id).then((res) => {
        this.isLoading = false;
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.project = extra;
      });
    },

    sendInvite() {
      this.inviteLoader = true;
      const payload = {
        request_id: this.project.id,
      };
      userService.sendInvite(payload).then((res) => {
        this.inviteLoader = false;
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          this.$router.push('/error/404');
          return;
        }
        this.$store.dispatch('success', {message: 'Invite sent successfully!', showSwal: true});
        this.getProjectDetails(this.project_id)
      });

    },

    markJobComplete() {
      confirm("This action cannot be reverted", () => {
        this.completeLoader = true;
        const payload = {
          request_id: this.project.id,
        };
        userService.completeJob(payload).then((res) => {
          this.completeLoader = false;
          const {status, message} = res;
          if (!status) {
            this.$store.dispatch('error', {message: message, showSwal: true});
            return;
          }
          this.$store.dispatch('success', {message: 'Job marked as complete!', showSwal: true});
          this.getProjectDetails(this.project_id);
        });
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
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize);
  },
};
</script>

<style scoped>

</style>
