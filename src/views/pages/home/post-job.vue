<template>
  <div>
    <homeOwnerHeader v-if="isHomeOwner"/>
    <topHeader v-else/>
    <div class="container mt-5" style="margin-bottom: 7rem">
      <div class="row">
        <div class="col-md-8">
          <div class="fm-margin">
            <!-- Step 0: Select trade -->
            <div class="mb-5">
              <h2 class="mb-4">Post a {{ selectedTradeName }} job</h2>
              <p class="fw-lighter mb-4">Get responses from Trade Link's vetted tradespeople near you</p>
              <h5 class="fw-bold mb-2">What would you like to have done?</h5>
              <select v-model="selectedTrade" class="form-control" @change="resetForms" :disabled="isLoading">
                <option value="" v-if="isLoading">Please wait...</option>
                <option disabled value="">Please select</option>
                <option v-for="(trade, i) in trades" :key="i" :value="trade.id">
                  {{ trade.name }}
                </option>
              </select>
              <div class="button-container mt-4" v-if="!questions.length">
                <button class="btn primry-btn-2 d-inline-block text-light big-button"
                        :disabled="!selectedTrade"
                        @click.prevent="loadFirstStep">
                  Next
                </button>
              </div>
            </div>

            <form class="dynamic-questions" @submit.prevent="nextQuestion">
              <div class="question-section" v-for="(question, i) in questions" :key="i">
                <h5 class="fw-bold mb-2" :id="'question-' + i" :ref="'question-' + i">{{ question.formLabel }}</h5>
                <div v-if="question.options && question.options.length">
                  <div v-for="(option, index) in question.options" :key="index">
                    <!-- Radio Option -->
                    <label class="option-box" v-if="option.type === 'StandardChoiceOption'">
                      <input type="radio"
                             class="me-2"
                             :id="'option-' + question.id + '-' + index"
                             :name="'question-' + question.id"
                             :value="option.formLabel"
                             :required="question.required"
                             v-model="question.answers"
                             @change="onOptionSelected(option,i)">
                      <span>{{ option.formLabel }}</span>
                      <div v-if="isOtherSelected(option)">
                        <input type="text"
                               class="form-control mt-2"
                               v-model="question.answers"
                               placeholder="Please specify"/>
                      </div>
                    </label>
                    <!-- Checkbox Option -->
                    <label class="option-box" v-else-if="option.type === 'StandardCheckOption'">
                      <input type="checkbox"
                             class="me-2"
                             :id="'checkbox-' + question.id + '-' + index"
                             :value="option.formLabel"
                             v-model="question.answers"
                             :required="index === 0 && question.required && !question.answers.length"
                             @change="onOptionSelected(option,i)">
                      <span>{{ option.formLabel }}</span>
                      <div v-if="isCheckboxOtherSelected(option, i)">
                        <input type="text"
                               class="form-control mt-2"
                               v-model="question.answers"
                               placeholder="Please specify"/>
                      </div>
                    </label>
                    <!-- Textarea Option -->
                    <div v-else-if="option.type === 'StandardTextAreaOption'">
                      <p class="fw-lighter">{{ option.formLabel }}</p>
                      <textarea :id="'textarea-' + question.id + '-' + index"
                                class="form-control mt-2"
                                v-model="question.answers"
                                :required="question.required"
                                @input="onOptionSelected(option, i)"
                                placeholder="Type your response here"></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div class="button-container mt-4" v-if="!lastQuestion && questions.length">
                <button class="btn btn-outline-primary-1 d-inline-block text-dark big-button"
                        @click.prevent="prevQuestion" type="button">
                  Back
                </button>
                <button class="btn primry-btn-2 d-inline-block text-light big-button">
                  Next
                </button>
              </div>
            </form>

            <div v-if="lastQuestion" class="mt-5">
              <form v-if="showHeadline" @submit.prevent="showHeadlineNextBtn">
                <h5 class="fw-bold mb-2" ref="showHeadline">Give your job a headline</h5>
                <p class="fw-lighter">More tradespeople express interest in jobs that have a descriptive name.</p>
                <input type="text" class="form-control" v-model="headline"
                       @click="showSection('showHeadline')" required>

                <div class="button-container mt-4" v-if="navButtonPosition ==='showHeadline'">
                  <button class="btn btn-outline-primary-1 d-inline-block text-dark big-button" type="button"
                          @click.prevent="showHeadlineBackBtn">
                    Back
                  </button>
                  <button class="btn primry-btn-2 d-inline-block text-light big-button" type="submit">
                    Next
                  </button>
                </div>

              </form>
              <form v-if="showAddPhoto" ref="showAddPhoto" class="mt-5" @submit.prevent="showAddPhotoNextBtn">
                <h5 class="fw-bold mb-2">Would you like to add any photos or plans? (Optional)</h5>
                <p class="fw-lighter">Photos give tradespeople more context and details to understand the job and
                  provide a more accurate quote.</p>
                <label class="option-box">
                  <input type="radio"
                         @change="showSection('showAddPhoto')"
                         class="me-2"
                         id="yes"
                         required
                         name="photo"
                         value="Yes"
                         v-model="photo">
                  <span>Yes</span>
                </label>

                <div v-if="photo ==='Yes'">
                  <p class="fw-lighter">Add up to 25 files up to 15 MB each</p>
                  <vue-dropzone
                      id="certificateDropzone"
                      ref="dropzone"
                      :use-custom-slot="true"
                      :options="dropzoneOptions"
                      @vdropzone-max-files-exceeded="dropzoneMaxFileExceeded"
                  >
                    <div class="dz-message needsclick">
                      <i class="bi bi-upload h1 text-muted"></i>
                      <h5>Select files, drag and drop, or take a photo with your camera.</h5>
                    </div>
                  </vue-dropzone>
                </div>

                <label class="option-box">
                  <input type="radio"
                         @change="showSection('showAddPhoto')"
                         class="me-2"
                         id="no"
                         required
                         name="photo"
                         value="No"
                         v-model="photo">
                  <span>No, maybe later</span>
                </label>

                <div class="button-container mt-4" v-if="navButtonPosition ==='showAddPhoto'">
                  <button class="btn btn-outline-primary-1 d-inline-block text-dark big-button"
                          @click.prevent="showAddPhotoBackBtn" type="button">
                    Back
                  </button>
                  <button class="btn primry-btn-2 d-inline-block text-light big-button" type="submit">
                    Next
                  </button>
                </div>

              </form>
              <form v-if="showLocationView" ref="showLocationView" class="mt-5"
                    @submit.prevent="showLocationViewNextBtn">
                <h5 class="fw-bold mb-2">Location for the job</h5>
                <p class="fw-lighter">To find {{ selectedTradeName }}s near you we need to know where the job is.</p>
                <GmapAutocomplete
                    @place_changed="setPlace"
                    @click="showSection('showLocationView'); locationError =''"
                    :options="{types: ['(cities)'],componentRestrictions: {country: 'JM'}}"
                    ref="autocomplete"
                    id="citySearch"
                    :value="cityName"
                    type="text"
                    required
                    class="form-control"
                    placeholder="Eg. Albion"
                    style="flex: 1;"
                >
                </GmapAutocomplete>
                <div v-if="locationError" class="text-danger mt-2"><i class="bi bi-info-circle"/> {{ locationError }}
                </div>
                <div class="button-container mt-5" v-if="navButtonPosition ==='showLocationView'">
                  <button class="btn btn-outline-primary-1 d-inline-block text-dark big-button" type="button"
                          @click.prevent="showLocationViewBackBtn">
                    Back
                  </button>
                  <button class="btn primry-btn-2 d-inline-block text-light big-button" type="submit">
                    Next
                  </button>
                </div>
              </form>
              <form v-if="showAuthView" ref="showAuthView" style="margin-top: 4rem"
                    @submit.prevent="verifyHomeOwnerEmail">
                <h5 class="fw-bold mb-2">Get responses from tradespeople near you</h5>
                <p class="fw-lighter">We will only share your contact details with tradespeople you choose to talk
                  to.</p>
                <label for="email">Email</label>
                <input type="text" @click="showSection('showAuthView');" id="email" class="form-control" v-model="email" required>
                <div class="text-danger mt-2" v-if="verificationError"><i
                    class="bi bi-info-circle"/>{{ verificationError }}
                </div>

                <div class="button-container mt-4" v-if="navButtonPosition ==='showAuthView'">
                  <button class="btn btn-outline-primary-1 d-inline-block text-dark big-button" type="button"
                          @click.prevent="showAuthViewBackBtn">
                    Back
                  </button>
                  <button class="btn primry-btn-2 d-inline-block text-light big-button" type="submit"
                          :disabled="submitLoading">
                    <b-spinner small v-if="submitLoading"></b-spinner>
                    {{ submitLoading ? 'Next..' : 'Next' }}
                  </button>
                </div>
              </form>

              <form v-if="showLoginView" ref="showLoginView" style="margin-top: 4rem" @submit.prevent="loginHomeOwner">
                <div class="row">
                  <div class="col-md-6">
                    <h5 class="fw-bold mb-2">Log in</h5>
                    <p class="fw-lighter">{{ email }} <span class="text-decoration-underline cursor-pointer"
                                                            @click="goToAuthView">Change</span></p>
                    <label for="password">Password</label>
                    <input type="password" id="password" class="form-control" v-model="password" required @click="showSection('showLoginView');">

                    <div class="button-container mt-4" v-if="navButtonPosition ==='showLoginView'">
                      <button class="btn btn-block btn-primary" type="submit"
                              :disabled="submitLoading">
                        <b-spinner small v-if="submitLoading"></b-spinner>
                        {{ submitLoading ? 'Next..' : 'Login' }}
                      </button>
                    </div>
                  </div>
                </div>

              </form>

              <form v-if="showRegisterView" ref="showRegisterView" style="margin-top: 4rem"
                    @submit.prevent="registerHomeOwner">
                <div class="row">
                  <div class="col-md-12">
                    <h5 class="fw-bold mb-2">Create an account to track your job</h5>
                    <p class="fw-lighter">We will only share your contact details with tradespeople you choose to talk
                      to.</p>

                    <div class="form-group">
                      <label for="name">Name</label>
                      <input type="text" @click="showSection('showRegisterView')" class="form-control mt-1" id="name" v-model="name" required>
                    </div>
                    <div class="form-group mt-3">
                      <label for="phone">Phone Number</label>
                      <input type="text" @click="showSection('showRegisterView')" class="form-control mt-1" id="phone" v-model="phoneNumber" required>
                    </div>
                    <div class="form-group mt-3">
                      <label for="password">Password</label>
                      <input type="password" @click="showSection('showRegisterView')" class="form-control mt-1" id="password" v-model="password" required>
                    </div>

                    <div class="form-group form-check mt-3">
                      <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="marketing_consent" @click="showSection('showRegisterView')">
                      <label class="form-check-label fw-lighter cursor-pointer font-14" for="exampleCheck1">I would like
                        to receive marketing
                        communications about Trade Link's services by email, SMS and/or phone and understand that I can
                        unsubscribe at any time.</label>
                    </div>

                    <div class="button-container mt-4" v-if="navButtonPosition ==='showRegisterView'">
                      <button class="btn btn-outline-primary-1 d-inline-block text-dark big-button" type="button"
                              @click.prevent="registerBackBtn">
                        Back
                      </button>
                      <button class="btn btn-primary big-button" type="submit"
                              :disabled="submitLoading">
                        <b-spinner small v-if="submitLoading"></b-spinner>
                        {{ submitLoading ? 'Next..' : 'Next' }}
                      </button>
                    </div>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import topHeader from '../../base-layout/header-2';
import homeOwnerHeader from '../../base-layout/navigation/homeowner-menu'

import QuestionRenderer from '../../../components/QuestionRenderer.vue';
import {userService} from "@/apis/user.service";
import vue2Dropzone from "vue2-dropzone";
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import appConfig from "../../../../app.config.json";
import store from "@/store/store";

export default {
  name: "PostAJob",
  page: {
    title: "Post a Job | " + appConfig.name,
    meta: [{name: "description", content: appConfig.description}]
  },
  components: {
    topHeader,
    homeOwnerHeader,
    QuestionRenderer,
    vueDropzone: vue2Dropzone,
  },

  data() {
    return {
      place: null,
      user: this.$store.getters.GET_USER_INFO,
      trades: [],
      selectedTradeName: '',
      selectedTrade: '',
      rootQuestions: [],
      questions: [],
      currentQuestionIndex: 0,
      answers: {},
      selectedOption: null,
      nextButton: true,
      isLoading: false,
      headline: '',
      lastQuestion: false,
      showHeadline: true,
      showAddPhoto: false,
      showLocationView: false,
      showAuthView: false,
      submitLoading: false,
      showLoginView: false,
      showRegisterView: false,
      navButtonPosition: '',
      photo: '',
      dropzoneOptions: {
        url: '#',
        maxFilesize: 20.0,
        addRemoveLinks: true,
        autoProcessQueue: false,
        maxFiles: 1
      },
      cityName: '',
      parishName: '',
      email: '',
      password: '',
      marketing_consent: '',
      name: '',
      phoneNumber: '',
      verificationError: '',
      locationError: '',
      latlng: null
    };
  },

  computed: {
    loggedInUser() {
      return this.$store.getters.GET_USER_INFO;
    },
    isHomeOwner() {
      const loggedUser = store.getters.GET_USER_INFO;
      if(!loggedUser){
        return false
      }
      const userRole = loggedUser.roles?.[0] || '';
      return userRole === 'homeowner';
    }
  },
  methods: {
    setPlace() {
      const autocomplete = this.$refs.autocomplete.$autocomplete;
      if (autocomplete) {
        const place = autocomplete.getPlace();
        this.latlng = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        this.reverseGeocode(this.latlng.lat, this.latlng.lng);
      }
    },
    dropzoneMaxFileExceeded(file) {
      this.$refs.dropzone.removeFile(file);
      alert('You can only upload one file at a time.');
    },
    resetForms() {
      this.selectedTradeName = '';
      this.rootQuestions = [];
      this.answers = {};
      this.currentQuestionIndex = 0;
    },
    getTrades() {
      this.isLoading = true;
      userService.getTrades().then((res) => {
        this.isLoading = false;
        this.trades = res.extra;
      });
    },
    loadFirstStep() {
      const tradeObj = this.trades.find(t => t.id === this.selectedTrade);
      if (tradeObj) this.selectedTradeName = tradeObj.name;
      this.fetchQuestions();
    },
    fetchQuestions() {
      userService.getTradeQuestion(this.selectedTrade).then((res) => {
        this.questions = Array.isArray(res.extra) ? res.extra : [res.extra];
        this.currentQuestionIndex = 0;
        setTimeout(() => {
          const el = this.$refs['question-' + this.currentQuestionIndex];
          if (el && el[0]) {
            el[0].scrollIntoView({behavior: 'smooth', block: 'start'});
          }
        }, 200);
      });
    },
    isOtherSelected(option) {
      return option.formLabel.toLowerCase() === 'other' &&
          this.answers[this.question.id] === option.formLabel;
    },
    isCheckboxOtherSelected(option) {
      return option.formLabel.toLowerCase() === 'other' &&
          this.answers[this.question.id]?.includes(option.formLabel);
    },
    onOptionSelected(option, questionIndex) {
      this.lastQuestion = false;
      if (this.questions.length - 1 !== questionIndex) {
        this.questions.splice(questionIndex + 1);
      }
      this.selectedOption = option;
    },
    nextQuestion() {
      this.lastQuestion = false;
      const questionOptions = this.questions[this.currentQuestionIndex].options
      if (questionOptions.length < 2 && !questionOptions[0].next) {
        this.lastQuestion = true;
        this.showSection('showHeadline')
        this.scrollToView('showHeadline')
        return;
      }
      if (this.selectedOption && this.selectedOption.next) {
        const nextId = this.selectedOption.next.id;
        const alreadyExists = this.questions.some(q => q.id === nextId);
        if (!alreadyExists) {
          this.selectedOption.next.answers = null
          const nxtQuestion = {
            ...this.selectedOption.next,
            next_question_id: nextId,
          };
          this.questions.push(nxtQuestion);
          this.currentQuestionIndex++;

          setTimeout(() => {
            const el = this.$refs['question-' + this.currentQuestionIndex];
            if (el && el[0]) {
              el[0].scrollIntoView({behavior: 'smooth', block: 'start'});
            }
          }, 200);
        }
      }

      if (this.selectedOption && !this.selectedOption.next) {
        this.lastQuestion = true;
        this.showSection('showHeadline')
        this.scrollToView('showHeadline')
      }
    },
    prevQuestion() {
      this.currentQuestionIndex--;
      this.questions.pop();
      this.selectedOption = this.questions[this.currentQuestionIndex]?.options?.find(
          option => option.formLabel === this.questions[this.currentQuestionIndex].answers)
    },

    scrollToView(reference) {
      this.$nextTick(() => {
        const el = this.$refs[reference];
        if (!el) return
        setTimeout(() => {
          el.scrollIntoView({behavior: 'smooth', block: 'start'});
        }, 200);
      });
    },
    showHeadlineNextBtn() {
      this.showAddPhoto = true;
      this.navButtonPosition = 'showAddPhoto';
      this.scrollToView('showAddPhoto');
    },
    showHeadlineBackBtn() {
      this.lastQuestion = false;
    },
    showAddPhotoNextBtn() {
      this.showLocationView = true;
      this.navButtonPosition = 'showLocationView';
      this.scrollToView('showLocationView');
    },

    showAddPhotoBackBtn() {
      this.showHeadline = true;
      this.navButtonPosition = 'showHeadline';
      this.showAddPhoto = false;
      this.scrollToView('showHeadline');
    },
    showLocationViewBackBtn() {
      this.showAddPhoto = true;
      this.navButtonPosition = 'showAddPhoto';
      this.showLocationView = false;
      this.scrollToView('showAddPhoto');
    },
    registerBackBtn() {
      this.showRegisterView = false;
      this.showAuthView = true;
    },

    showSection(section) {
      this[section] = true;
      this.navButtonPosition = section;

      const sections = [
        'showHeadline',
        'showAddPhoto',
        'showLocationView',
        'showAuthView',
        'showLoginView',
        'showRegisterView'
      ];


      const currentIndex = sections.indexOf(section);
      for (let i = currentIndex + 1; i < sections.length; i++) {
        this[sections[i]] = false;
      }
    },

    showLocationViewNextBtn() {
      if (!this.latlng) {
        this.locationError = 'Please select a location for the job.'
        return;
      }
      // check if user is logged in as homesperson then navigate to congrats page
      if (this.loggedInUser) {
        this.submitForm()
        return;
      }
      this.showAuthView = true;
      this.navButtonPosition = 'showAuthView';
      this.scrollToView('showAuthView');
    },
    showAuthViewBackBtn() {
      this.showLocationView = true;
      this.navButtonPosition = 'showLocationView';
      this.showAuthView = false;
      this.scrollToView('showLocationView');
    },

    verifyHomeOwnerEmail() {
      this.submitLoading = true;
      this.verificationError = '';
      const payload = {
        email: this.email
      }
      userService.verifyHomeOwner(payload).then((res) => {
        this.submitLoading = false;
        const {status, message} = res;
        if (status) {
          this.showLoginView = true;
          this.navButtonPosition = 'showLoginView';
          this.scrollToView('showLoginView')
        } else {
          if (message === 'User not found.') {
            this.showRegisterView = true;
            this.navButtonPosition = 'showRegisterView';
            this.scrollToView('showRegisterView')
          } else if (message === 'User is not a homeowner.') {
            this.verificationError = 'Use a different email address to post your job'
          } else {
            this.verificationError = message
          }
        }
      });

    },

    loginHomeOwner() {
    },
    registerHomeOwner() {
      this.submitLoading = true;
      const payload = {
        email: this.email,
        password: this.password,
        name: this.name,
        phone: this.phoneNumber,
        marketing_consent: this.marketing_consent
      };
      userService.registerHomeOwner(payload).then((res) => {
        this.submitLoading = false;
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.$store.dispatch('updateUserInfo', extra);
        this.submitForm()
      });
    },

    goToAuthView() {
      this.showAuthView = true;
      this.showLoginView = false;
    },
    submitForm() {
      this.submitLoading = true;
      const formData = new FormData();

      formData.append('trade_id', this.selectedTrade);
      formData.append('headline', this.headline);
      formData.append('city_name', this.cityName);
      formData.append('parish_name', this.parishName);
      formData.append('latitude', this.latlng.lat);
      formData.append('longitude', this.latlng.lng);
      formData.append('email', this.email);
      formData.append('user_id', this.$store.getters.GET_USER_INFO.id);

      // Append questions as JSON string
      formData.append('questions', JSON.stringify(this.questions));

      // Append photos if 'Yes'
      if (this.photo === 'Yes') {
        const files = this.$refs.dropzone.getAcceptedFiles();
        files.forEach((file, index) => {
          formData.append(`photo[${index}]`, file);
        });
      }

      userService.postJob(formData).then((res) => {
        this.submitLoading = false;
        this.trades = res.extra;
        this.$router.push('/service-request-posted');
      })
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
    }
  }
  ,
  created() {
    this.getTrades();
  }
  ,
}
;
</script>

<style scoped>
.question-section {
  padding-bottom: 20px;
}

.option-box {
  border: 1px solid #ddd;
  padding: 15px;
  margin: 10px 0;
  border-radius: 10px;
  cursor: pointer;
  display: block;
}

.option-box:hover {
  background: #f9f9f9;
}

.option-box input[type="radio"],
.option-box input[type="checkbox"] {
  margin-right: 10px;
}

select {
  height: 3rem !important;
  appearance: auto !important;
}

input[type="text"], input[type="password"] {
  height: 3rem !important;
}

.form-control {
  font-size: 17px !important;
}

.button-container {
  display: flex;
  gap: 10px;
}
</style>
