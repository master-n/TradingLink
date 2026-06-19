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
              <div v-if="responseLoader" class="lines shine mt-0 w-50"></div>
              <router-link :to="`/homeowner/chat/${project_id}`" v-else><i class="bi bi-chat-right"></i> {{ responseCount }} responses</router-link>
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
                <div class="row mt-3" v-if="project.questions?.length>0">
                  <div class="col-md-4">Category:</div>
                  <div class="col-md-8 text-left">{{ project.questions[0]['answers'] }}</div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-4">Location:</div>
                  <div class="col-md-8 text-left"><i class="bi bi-pin-map"></i> {{ project.city_name}} {{ project.parish_name ? '~ ' + project.parish_name : '' }}</div>
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

              <div class="text-center" v-if="!isJobComplete">
                <button class="btn btn-primary mt-3" @click="completeJob">Mark job as done</button>
              </div>

              <div v-if="isJobComplete && !ratingSubmitted" class="mt-4">
                <form @submit.prevent="submitRating">
                  <h5>Rate the professional who completed this job</h5>

                  <div class="mb-3">
                    <label for="professional" class="form-label">Professional:</label>
                    <select v-model="user_id" id="professional" class="form-select" required>
                      <option disabled value="">Select professional</option>
                      <option v-for="(invite,i) in invites" :key="i" :value="invite.invited_user.id">
                        {{ invite.invited_user.name }}
                      </option>
                    </select>
                  </div>

                  <div class="mb-3">
                    <label for="ratingSelect" class="form-label">Rating (1-5):</label>
                    <select v-model="rating" id="ratingSelect" class="form-select" required>
                      <option disabled value="">Select rating</option>
                      <option v-for="n in 5" :key="n" :value="n">{{ n }} Star{{ n > 1 ? 's' : '' }}</option>
                    </select>
                  </div>

                  <div class="mb-3">
                    <label for="reviewText" class="form-label">Leave a short review:</label>
                    <textarea v-model="reviewText" id="reviewText" class="form-control" rows="3"
                              placeholder="Write your feedback..."></textarea>
                  </div>

                  <button class="btn btn-primary" :disabled="!rating" type="submit">
                    Submit Rating
                  </button>
                </form>
              </div>

              <div v-else-if="ratingSubmitted" class="alert alert-success mt-4">
                Thank you for rating the professional!
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
  </BaseDashboardLayout>
</template>

<script>
import BaseDashboardLayout from '../../base-layout/homeowner-dashboard';
import appConfig from "../../../../app.config.json";
import {userService} from "@/apis/user.service";
import {confirm} from "@/utils/functions";
import {getDatabase, onValue, ref} from "firebase/database";

export default {
  page: {
    title: "Project Details",
    meta: [{name: "description", content: appConfig.description}]
  },
  data() {
    return {
      isLoading: false,
      responseLoader: false,
      project_id: null,
      project: {},
      responseCount: 0,
      rating: null,
      reviewText: '',
      ratingSubmitted: false,
      invites: [],
      user_id: ''
    };
  },
  components: {
    BaseDashboardLayout
  },
  computed: {
    isJobComplete() {
      return ['complete', 'completed'].includes(this.project.status);
    },
  },
  methods: {
    getProjectDetails() {
      this.isLoading = true;
      userService.getProjectDetails(this.project_id).then((res) => {
        this.isLoading = false;
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.project = extra;
        if(this.project.rating){
          this.ratingSubmitted = true
        }
      });
    },
    countMessages() {
      const db = getDatabase();
      const userId = this.$store.getters.GET_USER_INFO.id;
      const jobId = this.project_id;
      this.responseLoader = true;

      const messagesRef = ref(db, `chat_channels/${jobId}`);

      onValue(messagesRef, (snapshot) => {
        let totalResponses = 0;

        if (snapshot.exists()) {
          const conversations = snapshot.val();

          for (let participantId in conversations) {
            const userMessages = conversations[participantId]?.messages || {};

            for (let msgKey in userMessages) {
              const msg = userMessages[msgKey];

              if (msg.from !== userId) {
                totalResponses++;
              }
            }
          }
        }
        this.responseLoader = false;
        this.responseCount = totalResponses;
      });
    },
    submitRating() {
      const payload = {
        service_request_id: this.project_id,
        rating: this.rating,
        rated_user_id: this.user_id,
        comment: this.reviewText,
      };

      userService.submitRating(payload).then((res) => {
        const {status, message} = res;
        if (!status) {
          this.$store.dispatch('error', {message, showSwal: true});
          return;
        }

        this.ratingSubmitted = true;
        this.$store.dispatch('success', {message: "Rating submitted successfully!"});
      });
    },

    completeJob() {
      confirm("This action cannot be reverted", () => {
        this.markJobAsDone();
      });
    },
    markJobAsDone() {
      this.isLoading = true;
      const payload = {
        request_id: this.project_id,
      };
      userService.completeJob(payload).then((res) => {
        this.isLoading = false;
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.project = extra;
      });
    },
    getAcceptInterest() {
      this.isLoading = true;
      userService.getAcceptedInterest(this.project_id).then((res) => {
        this.isLoading = false;
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.invites = extra;
      });
    },
  },
  created() {
    this.project_id = this.$route.params.id
    if (!this.project_id) {
      this.$router.push('/unauthorized');
    }
    this.getProjectDetails();
    this.getAcceptInterest();
    this.countMessages();
  },
  mounted() {
    this.$nextTick(() => {
      $('.sidebar-button').on("click", function () {
        $('.main-menu').addClass('show-menu');
      });
      $('.menu-close-btn').on("click", function () {
        $('.main-menu').removeClass('show-menu');
      });
      $('.search-btn').on("click", function () {
        $('.mobile-search').addClass('slide');
      });
      $('.search-cross-btn').on("click", function () {
        $('.mobile-search').removeClass('slide');
      });
    });
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
