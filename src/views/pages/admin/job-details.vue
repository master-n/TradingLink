<template>
  <div>
    <topHeader/>
    <div class="container">
      <div class="row">
        <!-- Job Description Section -->
        <div class="col-md-8 offset-md-2">
          <div class="mt-4 text-end pe-4">
            <router-link :to="'/admin/job-posts'" class="mb-4">
              <i class="bi bi-chevron-left"></i> Back to Jobs
            </router-link>
          </div>
          <h4 class="title mb-3 font-weight-bold ps-4">Job Details: <span
              class="text-capitalize">{{ project?.headline }}</span></h4>
          <div class="card mb-4" v-if="!isLoading">
            <div class="card-header d-flex justify-content-between align-items-center">
              <div><i class="bi bi-chat-right"></i> {{ project.responses || 0 }} responses</div>
              <div class="d-flex align-items-center gap-2">
                <button @click="openEditModal(project)" class="btn btn-sm btn-outline-primary">
                  <i class="bi bi-pencil"></i> Edit
                </button>
                <button @click="confirmDelete" class="btn btn-sm btn-outline-danger">
                  <i class="bi bi-trash"></i> Delete
                </button>
                <span class="text-capitalize ms-3">{{ project.created_at | toHumanDate }}</span>
              </div>
            </div>

            <div class="card-body">
              <h4 class="card-title">Job Description</h4>
              <div class="fw-lighter">
                <div class="row mt-3">
                  <div class="col-md-4">Job ID:</div>
                  <div class="col-md-8 text-left">{{ project.id}}</div>
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
                        <p class="fw-light">{{
                            question.answers?.toString().toLowerCase() === 'other' ? question.other_answer : question.answers
                          }}</p>
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

    <b-modal id="edit-job-modal" title="Edit Job" v-model="showEditModal" @ok="updateJob" v-if="editJob">
      <b-form @submit.stop.prevent>
        <b-form-group label="Headline">
          <b-form-input v-model="editJob.headline" required/>
        </b-form-group>


        <b-form-group label="Job location">
          <GmapAutocomplete
              @place_changed="setPlace"
              @click="locationError =''"
              :options="{types: ['(cities)'],componentRestrictions: {country: 'JM'}}"
              ref="autocomplete"
              id="citySearch"
              type="text"
              :value="cityName"
              required
              class="form-control"
              placeholder="Eg. Albion"
              style="flex: 1;"
          >
          </GmapAutocomplete>
          <div v-if="locationError" class="text-danger mt-2"><i class="bi bi-info-circle"/> {{ locationError }}
          </div>
        </b-form-group>


        <b-form-group label="Trade">
          <b-form-select class="form-control"
                         v-model="editJob.trade_id"
                         :options="trades.map(t => ({ value: t.id, text: t.name }))"
                         required
          />
        </b-form-group>

        <div v-if="editJob.questions && editJob.questions.length">
          <h5 class="mt-4">Additional Questions</h5>
          <div
              v-for="(question, index) in editJob.questions"
              :key="`q-${index}`"
              class="mb-3 p-3 border rounded"
          >
            <label class="fw-bold">{{ question.formLabel }}</label>

            <b-form-input
                v-if="question.answers?.toString().toLowerCase()==='other'"
                v-model="question.other_answer"
                class="mt-2"
                placeholder="Please specify"
            />
            <b-form-input
                v-else
                v-model="question.answers"
                class="mt-2"
                placeholder="Please specify"
            />
          </div>
        </div>
      </b-form>
    </b-modal>


  </div>
</template>

<script>
import HomeFooter from '../../base-layout/footer';
import topHeader from '../../base-layout/admin-header'
import SideBar from '../../base-layout/navigation/tradesperson-sidebar';
import MobileFooter from '../../../components/mobile-nav';
import appConfig from "../../../../app.config.json";
import {userService} from "@/apis/user.service";
import {confirm} from "@/utils/functions";

export default {
  page: {
    title: "Admin My Projects",
    meta: [{name: "description", content: appConfig.description}]
  },
  data() {
    return {
      isLoading: false,
      project_id: null,
      editJob: null,
      project: {},
      showEditModal: false,
      trades: [],
      locationError: '',
      cityName: '',
      parishName: '',
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
  },
  methods: {
    getProjectDetails(project_id) {
      this.isLoading = true;
      userService.adminJobDetails(project_id).then((res) => {
        this.isLoading = false;
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.project = extra;
      });
    },
    openEditModal(job) {
      this.editJob = { ...job };
      this.cityName = this.editJob.city_name;
      this.parishName = this.editJob.parish_name;
      this.showEditModal = true;
    },
    confirmDelete() {
      confirm("Are you sure you want to delete this job? This action cannot be undone.", () => {
        userService.deleteJob(this.project.id).then((res) => {
          const {status, message} = res;
          if (!status) {
            this.$store.dispatch("error", {message, showSwal: true});
          }
          this.$store.dispatch("success", {message, showSwal: true});
          this.$router.push("/admin/job-posts");
        })
      });
    },
    updateJob() {
      if (!this.editJob.latitude || !this.editJob.longitude) {
        this.locationError = 'Please select a location for the job.'
        return;
      }
      const payload = {
        trade_id: this.editJob.trade_id,
        headline: this.editJob.headline,
        city_name: this.cleanLocationName(this.cityName),
        parish_name: this.parishName,
        latitude: this.editJob.latitude,
        longitude: this.editJob.longitude,
        questions: this.editJob.questions,
      };

      userService.updateJob(this.project.id, payload).then((res) => {
        const {status, message} = res;
        if (!status) {
          this.$store.dispatch('error', {message, showSwal: true});
          return;
        }
        this.$store.dispatch('success', {message: 'Job updated successfully', showSwal: true});
        this.getProjectDetails(this.project_id);
        this.showEditModal = false;
      });
    },

    setPlace() {
      const autocomplete = this.$refs.autocomplete.$autocomplete;
      if (autocomplete) {
        const place = autocomplete.getPlace();
        this.editJob.latitude = place.geometry.location.lat();
        this.editJob.longitude = place.geometry.location.lng();
        this.reverseGeocode(this.editJob.latitude, this.editJob.longitude);
      }
    },

    reverseGeocode(lat, lng) {
      this.$gmapApiPromiseLazy().then(() => {
        const geocoder = new google.maps.Geocoder();
        const latlng = {lat, lng};

        geocoder.geocode({location: latlng}, (results, status) => {
          if (status === 'OK' && results[0]) {
            const addressComponents = results[0].address_components;

            const cityComponent = addressComponents.find(comp =>
                comp.types.includes('locality')
            );

            const parishComponent = addressComponents.find(comp =>
                comp.types.includes('administrative_area_level_1')
            );

            this.cityName = cityComponent ? cityComponent.long_name : '';

            this.parishName = parishComponent ? parishComponent.long_name : '';

          } else {
            console.log('Reverse geocoding failed:', status);
          }
        });
      });
    },

    cleanLocationName(name) {
      if (!name) return '';
      return name.replace(/,\s*Jamaica$/i, '');
    },


    async getTrades() {
      userService.getTrades().then((res) => {
        this.trades = res.extra;
      });
    },

  },
  created() {
    this.project_id = this.$route.params.id
    if (!this.project_id) {
      this.$router.push('/unauthorized');
    }

    this.getProjectDetails(this.project_id);

    this.getTrades();
  },
  mounted() {
    $('#job-posts').addClass('active')
  },
};
</script>

